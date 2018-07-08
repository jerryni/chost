const chalk = require('chalk')
const log = console.log

module.exports = {
    activedHosts(hosts) {
        log(chalk.yellow('Actived host name list:\n'),
            hosts.map(host => {
                return `${host.name} (${host.activeCount} lines)\n`
            }).join('')
        )
    },

    noActviedHost() {
        log(chalk.red('There is no actvied host'))
    },

    activeHost(host) {
        log(chalk.green(`Switch ${host} successfully!`))
    },

    allHosts(hosts) {
        log(chalk.yellow('All host name list:\n') + hosts.join(','))
    },

    closeHost(host) {
        log(chalk.green(`Close ${host} successfully!`))
    },

    closeAllHost() {
        log(chalk.green('Close all hosts successfully!'))
    },

    catch(msg) {
        log(chalk.red(msg))
    }
}
