"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let host, isWin = /^win/.test(process.platform);
if (isWin) {
    host = 'C:/Windows/System32/drivers/etc/hosts';
}
else {
    host = '/private/etc/hosts';
}
exports.HOST_PATH = host;
//# sourceMappingURL=constant.js.map