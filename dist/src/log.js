"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
let log = console.log;
exports.default = {
    activedHosts(hosts) {
        log(chalk.yellow('Actived hosts:\n'), hosts.map(host => {
            return `${host.name} (${host.activeCount} lines)\n`;
        }).join(''));
    },
    noActviedHost() {
        log(chalk.red('There is no actvied host'));
    },
    activeHost(host) {
        log(chalk.green(`Switch ${host} successfully!`));
    },
    allHosts(hosts) {
        log(chalk.yellow('All hosts:\n') + hosts.join(','));
    },
    closeHost(host) {
        log(chalk.green(`Close ${host} successfully!`));
    },
    closeAllHost() {
        log(chalk.green('Close all hosts successfully!'));
    },
    catch(msg) {
        log(chalk.red(msg));
    }
};
//# sourceMappingURL=log.js.map