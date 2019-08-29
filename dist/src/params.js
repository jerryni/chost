"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var host_master_1 = require("./host-master");
exports.handleParams = function (argv) {
    if (argv.name) {
        host_master_1.default.activeHost(argv.name);
    }
    else if (argv.l) {
        host_master_1.default.listAllHosts();
    }
    else if (argv.c) {
        host_master_1.default.closeHost(argv.c);
    }
    else if (argv.q) {
        host_master_1.default.closeAllHosts();
    }
};
exports.hasParams = function (argv) {
    for (var i in argv) {
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