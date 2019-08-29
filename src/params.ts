import hostMaster from './host-master';

export const handleParams = (argv) => {
    if (argv.name) {
        hostMaster.activeHost(argv.name)
    } else if (argv.l) {
        hostMaster.listAllHosts()
    } else if (argv.c) {
        hostMaster.closeHost(argv.c)
    } else if (argv.q) {
        hostMaster.closeAllHosts()
    }
}

export const hasParams = (argv: Object) => {
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
