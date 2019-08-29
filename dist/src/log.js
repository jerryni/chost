"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var log = console.log;
exports.default = {
    activedHosts: function (hosts) {
        log(chalk.yellow('Actived hosts:\n'), hosts.map(function (host) {
            return host.name + " (" + host.activeCount + " lines)\n";
        }).join(''));
    },
    noActviedHost: function () {
        log(chalk.red('There is no actvied host'));
    },
    activeHost: function (host) {
        log(chalk.green("Switch " + host + " successfully!"));
    },
    allHosts: function (hosts) {
        log(chalk.yellow('All hosts:\n') + hosts.join(','));
    },
    closeHost: function (host) {
        log(chalk.green("Close " + host + " successfully!"));
    },
    closeAllHost: function () {
        log(chalk.green('Close all hosts successfully!'));
    },
    catch: function (msg) {
        log(chalk.red(msg));
    }
};
//# sourceMappingURL=log.js.map