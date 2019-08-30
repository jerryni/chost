#! /usr/bin/env node
'use strict';
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
const yargs = require("yargs");
const host_master_1 = require("./src/host-master");
const argv_1 = require("./src/argv");
const params_1 = require("./src/params");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const hasParam = params_1.hasParams(argv_1.default);
        if (!hasParam) {
            host_master_1.default.showActivedHost('');
            yargs.showHelp();
            process.exit();
        }
        yield params_1.handleParams(argv_1.default);
    });
}
main();
//# sourceMappingURL=index.js.map