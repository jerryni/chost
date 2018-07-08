const chalk = require('chalk')
const fsp = require('../util/promise-fs')
const { HOST_PATH } = require('./constant')
const hostMaster = require('./host-master')
const log = console.log
let fileContentCache

module.exports = {
    handleParams(argv) {
        if (argv.name) { // switch host

            fsp.readFile(HOST_PATH).then(fileContent => {
                let newContent = hostMaster.activeHost(fileContent, argv.name)

                fileContentCache = newContent

                return fsp.writeFile(HOST_PATH, newContent)
            }).then(() => {
                log(chalk.green(`Switch ${argv.name} successfully!`))
                hostMaster.showActivedHost(fileContentCache)
            })

        } else if (argv.l) { // show host list
            fsp.readFile(HOST_PATH).then(fileContent => {
                let allHostNames = hostMaster.getAllHostName(fileContent)
                log(chalk.yellow('All host name list:\n') + allHostNames.join(','))

                fileContentCache = fileContent
                hostMaster.showActivedHost(fileContentCache)
            })
        } else if (argv.c) {

            fsp.readFile(HOST_PATH).then(fileContent => {
                let newContent = hostMaster.closeHost(fileContent, argv.c)

                return fsp.writeFile(HOST_PATH, newContent)
            }).then(() => {
                log(chalk.green(`Close ${argv.c} successfully!`))
                hostMaster.showActivedHost(fileContentCache)
            })
        } else if (argv.q) {
            fsp.readFile(HOST_PATH).then(fileContent => {
                let newContent = hostMaster.closeAllHost(fileContent)

                return fsp.writeFile(HOST_PATH, newContent)
            }).then(() => {
                log(chalk.green('Close all hosts successfully!'))
                hostMaster.showActivedHost(fileContentCache)
            })
        }
    },

    hasParams(argv) {
        for (let i in argv) {
            if (/[_$0]/g.test(i)) {
                continue
            }

            if (argv[i]) {
                return true
            }
        }

        return false
    }
}
