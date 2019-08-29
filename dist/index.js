#! /usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
var host_master_1 = require("./src/host-master");
var argv_1 = require("./src/argv");
var params_1 = require("./src/params");
function main() {
    var hasParam = params_1.hasParams(argv_1.default);
    if (!hasParam) {
        host_master_1.default.showActivedHost('');
        yargs_1.default.showHelp();
        process.exit();
    }
    params_1.handleParams(argv_1.default);
}
main();
//# sourceMappingURL=index.js.map