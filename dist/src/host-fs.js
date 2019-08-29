"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var promise_fs_1 = require("../util/promise-fs");
exports.default = {
    readHost: function () {
        return new Promise(function (resolve) {
            promise_fs_1.readFile(constant_1.HOST_PATH).then(function (fileContent) { return resolve(fileContent); });
        });
    },
    writeHost: function (newContent) {
        return new Promise(function (resolve) {
            promise_fs_1.writeFile(constant_1.HOST_PATH, newContent).then(function (fileContent) { return resolve(fileContent); });
        });
    },
    readAndWrite: function (handle) {
        var _this = this;
        return this.readHost().then(function (content) {
            return handle(content);
        }).then(function (newContent) {
            return _this.writeHost(newContent);
        });
    }
};
//# sourceMappingURL=host-fs.js.map