const hostMaster = require('./host-master')
const log = require('./log')
const hostFs = require('./host-fs')
let fileContentCache

module.exports = {
    handleParams(argv) {
        if (argv.name) { // switch host

            hostFs.readHost().then(fileContent => {
                let newContent = hostMaster.activeHost(fileContent, argv.name)

                fileContentCache = newContent

                return hostFs.writeHost(newContent)
            }).then(() => {
                log.activeHost(argv.name)
                hostMaster.showActivedHost(fileContentCache)
            })

        } else if (argv.l) { // show host list
            hostFs.readHost().then(fileContent => {
                log.allHosts(hostMaster.getAllHostName(fileContent))
                fileContentCache = fileContent
                hostMaster.showActivedHost(fileContentCache)
            })
        } else if (argv.c) {

            hostFs.readHost().then(fileContent => {
                let newContent = hostMaster.closeHost(fileContent, argv.c)

                return hostFs.writeHost(newContent)
            }).then(() => {
                log.closeHost(argv.c)
                hostMaster.showActivedHost(fileContentCache)
            })
        } else if (argv.q) {
            hostFs.readHost().then(fileContent => {
                let newContent = hostMaster.closeAllHost(fileContent)

                return hostFs.writeHost(newContent)
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
