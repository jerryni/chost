const hostMaster = require('./host-master')
module.exports = {
    handleParams(argv) {
        if (argv.name) {
            hostMaster.activeHost(argv.name)
        } else if (argv.l) {
            hostMaster.listAllHosts()
        } else if (argv.c) {
            hostMaster.closeHost(argv.c)
        } else if (argv.q) {
            hostMaster.closeAllHosts()
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
