"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filePath) {
    return new Promise(function (resolve) {
        fs.readFile(filePath, 'utf-8', function (err, content) {
            if (err)
                throw err;
            resolve(content);
        });
    });
}
exports.readFile = readFile;
function writeFile(filePath, content) {
    return new Promise(function (resolve) {
        fs.writeFile(filePath, content, 'utf-8', function (err) {
            if (err)
                throw err;
            resolve();
        });
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=promise-fs.js.map