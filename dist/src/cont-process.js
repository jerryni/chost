"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./log");
exports.default = {
    getRegByHost: function (hostName) {
        hostName = hostName || '';
        return new RegExp('(#=+[\\s]*' + hostName + '[\\s\\n\\r]+)([^=]+)(#=+)', 'g');
    },
    getIpRegWithDomain: function (domain) {
        return new RegExp('^((?![\\r\\n])[\\d\\.\\s]{10,})' + domain, 'gm');
    },
    getDomainReg: function () {
        return /[\d\.\s]+([\w\.]+)/g;
    },
    /*
        1. get snippet like '#=== hostName content #=== '
        2. content.replace('#', '')
        3. comment other lines of same-ip
    */
    activeHost: function (fileContent, hostName) {
        var _this = this;
        var hostReg = this.getRegByHost(hostName);
        var _a = hostReg.exec(fileContent), startToken = _a[1], hostLines = _a[2], EndToken = _a[3];
        if (!hostLines)
            throw 'Do not have this host';
        hostLines = hostLines.replace(/[#]/g, '');
        hostLines
            .split(/[\r\n]/)
            .forEach(function (line) {
            if (!line || !line.trim()) {
                return;
            }
            var _a = _this.getDomainReg().exec(line.trim()), domain = _a[1];
            var ipReg = _this.getIpRegWithDomain(domain);
            fileContent = fileContent.replace(ipReg, '#$1' + domain);
        });
        return fileContent.replace(hostReg, startToken + hostLines + EndToken);
    },
    closeHost: function (fileContent, hostName) {
        var targetSnippetReg = this.getRegByHost(hostName), execResult, middleContent;
        execResult = targetSnippetReg.exec(fileContent);
        if (!execResult || !execResult[2])
            throw 'Do not have this host';
        middleContent = execResult[2].replace(/[#]/g, '');
        // clear all # and add # back to the head
        middleContent = middleContent.split(/[\r\n]/)
            .map(function (item) { return item.trim(); })
            .filter(function (item) { return !!item; })
            .map(function (item) { return '#' + item; })
            .join('\n') + '\n';
        targetSnippetReg.lastIndex = 0;
        return fileContent.replace(targetSnippetReg, execResult[1] +
            middleContent +
            execResult[3]);
    },
    getAllHostName: function (fileContent) {
        var allHostNameReg = /#=+[\s]?([\d\w_\-\u4E00-\u9FFF]+)/g, matches, allHostNames = [];
        while (matches = allHostNameReg.exec(fileContent)) {
            allHostNames.push(matches[1]);
        }
        return allHostNames;
    },
    getActivedHost: function (fileContent) {
        var execResult, middleContent, eachLineArray, activedHost = [], activeCount = 0, targetSnippetReg = new RegExp('(#=+[\\s]*([\\d\\w\\u4E00-\\u9FFF]+))([^=]+)(#=+)', 'g');
        while (execResult = targetSnippetReg.exec(fileContent)) {
            if (!execResult || !execResult[2])
                throw 'Do not have this host';
            middleContent = execResult[3],
                activeCount = 0;
            eachLineArray = middleContent.split(/[\r\n]/)
                .map(function (item) { return item.trim(); })
                .filter(function (item) { return !!item; });
            eachLineArray.forEach(function (item) {
                if (/^(?![#]+)[\d]+/.test(item)) {
                    activeCount++;
                }
            });
            if (activeCount) {
                activedHost.push({
                    activeCount: activeCount,
                    name: execResult[2]
                });
            }
        }
        return activedHost;
    },
    closeAllHost: function (fileContent) {
        var _this = this;
        try {
            var allHostName = this.getAllHostName(fileContent);
            allHostName.forEach(function (hostName) {
                fileContent = _this.closeHost(fileContent, hostName);
            });
            return fileContent;
        }
        catch (e) {
            log_1.default.catch(e);
        }
    }
};
//# sourceMappingURL=cont-process.js.map