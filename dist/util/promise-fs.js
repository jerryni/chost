"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readFile(filePath) {
    return new Promise(resolve => {
        fs.readFile(filePath, 'utf-8', function (err, content) {
            if (err)
                throw err;
            resolve(content);
        });
    });
}
exports.readFile = readFile;
function writeFile(filePath, content) {
    return new Promise(resolve => {
        fs.writeFile(filePath, content, 'utf-8', function (err) {
            if (err)
                throw err;
            resolve();
        });
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=promise-fs.js.map