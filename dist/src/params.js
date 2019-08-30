"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const host_master_1 = require("./host-master");
function handleParams(argv) {
    return __awaiter(this, void 0, void 0, function* () {
        let hostContent = '';
        if (argv.name) {
            hostContent = yield host_master_1.default.activeHost(argv.name);
        }
        else if (argv.l) {
            hostContent = yield host_master_1.default.listAllHosts();
        }
        else if (argv.c) {
            hostContent = yield host_master_1.default.closeHost(argv.c);
        }
        else if (argv.q) {
            hostContent = yield host_master_1.default.closeAllHosts();
        }
        yield host_master_1.default.showActivedHost(hostContent);
    });
}
exports.handleParams = handleParams;
exports.hasParams = (argv) => {
    for (let i in argv) {
        if (/[_$0]/g.test(i)) {
            continue;
        }
        if (argv[i]) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=params.js.map