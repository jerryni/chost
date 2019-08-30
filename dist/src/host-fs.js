"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("./constant");
const promise_fs_1 = require("../util/promise-fs");
exports.default = {
    readHost() {
        return new Promise(resolve => {
            promise_fs_1.readFile(constant_1.HOST_PATH).then((fileContent) => resolve(fileContent));
        });
    },
    writeHost(newContent) {
        return new Promise(resolve => {
            promise_fs_1.writeFile(constant_1.HOST_PATH, newContent).then(fileContent => resolve(fileContent));
        });
    }
};
//# sourceMappingURL=host-fs.js.map