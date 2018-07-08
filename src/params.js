const fsp = require('../util/promise-fs')
const { HOST_PATH } = require('./constant')
const hostMaster = require('./host-master')
const log = require('./log')
let fileContentCache

module.exports = {
    handleParams(argv) {
        if (argv.name) { // switch host

            fsp.readFile(HOST_PATH).then(fileContent => {
                let newContent = hostMaster.activeHost(fileContent, argv.name)

                fileContentCache = newContent

                return fsp.writeFile(HOST_PATH, newContent)
            }).then(() => {
                log.activeHost(argv.name)
                hostMaster.showActivedHost(fileContentCache)
            })

        } else if (argv.l) { // show host list
            fsp.readFile(HOST_PATH).then(fileContent => {
                log.allHosts(hostMaster.getAllHostName(fileContent))
                fileContentCache = fileContent
                hostMaster.showActivedHost(fileContentCache)
            })
        } else if (argv.c) {

            fsp.readFile(HOST_PATH).then(fileContent => {
                let newContent = hostMaster.closeHost(fileContent, argv.c)

                return fsp.writeFile(HOST_PATH, newContent)
            }).then(() => {
                log.closeHost(argv.c)
                hostMaster.showActivedHost(fileContentCache)
            })
        } else if (argv.q) {
            fsp.readFile(HOST_PATH).then(fileContent => {
                let newContent = hostMaster.closeAllHost(fileContent)

                return fsp.writeFile(HOST_PATH, newContent)
            }).then(() => {
                log.closeAllHost()
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
