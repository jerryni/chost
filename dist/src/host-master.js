"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cont_process_1 = require("./cont-process");
var host_fs_1 = require("./host-fs");
var log_1 = require("./log");
var HostMaster = /** @class */ (function () {
    function HostMaster() {
    }
    HostMaster.prototype.showActivedHost = function (fileContent) {
        function show(hosts) {
            if (hosts.length) {
                log_1.default.activedHosts(hosts);
            }
            else {
                log_1.default.noActviedHost();
            }
        }
        if (fileContent) {
            show(cont_process_1.default.getActivedHost(fileContent));
            return;
        }
        host_fs_1.default.readHost().then(function (content) {
            show(cont_process_1.default.getActivedHost(content));
        });
    };
    HostMaster.prototype.activeHost = function (host) {
        var _this = this;
        host_fs_1.default.readAndWrite(function (fileContent) {
            return cont_process_1.default.activeHost(fileContent, host);
        }).then(function (newContent) {
            log_1.default.activeHost(host);
            _this.showActivedHost(newContent);
        });
    };
    HostMaster.prototype.listAllHosts = function () {
        var _this = this;
        host_fs_1.default.readHost().then(function (fileContent) {
            log_1.default.allHosts(cont_process_1.default.getAllHostName(fileContent));
            _this.showActivedHost(fileContent);
        });
    };
    HostMaster.prototype.closeHost = function (host) {
        var _this = this;
        host_fs_1.default.readAndWrite(function (fileContent) {
            return cont_process_1.default.closeHost(fileContent, host);
        }).then(function (newContent) {
            log_1.default.closeHost(host);
            _this.showActivedHost(newContent);
        });
    };
    HostMaster.prototype.closeAllHosts = function () {
        var _this = this;
        host_fs_1.default.readAndWrite(function (fileContent) {
            return cont_process_1.default.closeAllHost(fileContent);
        }).then(function (newContent) {
            log_1.default.closeAllHost();
            _this.showActivedHost(newContent);
        });
    };
    return HostMaster;
}());
exports.default = new HostMaster();
//# sourceMappingURL=host-master.js.map