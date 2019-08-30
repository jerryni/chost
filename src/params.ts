import hostMaster from './host-master';
interface Argv {
  [propName: string]: any;
}

export async function handleParams(argv: Argv): Promise<void> {
    let hostContent:string = '';

    if (argv.name) {
        hostContent = await hostMaster.activeHost(argv.name)
    } else if (argv.l) {
        hostContent = await hostMaster.listAllHosts()
    } else if (argv.c) {
        hostContent = await hostMaster.closeHost(argv.c)
    } else if (argv.q) {
        hostContent = await hostMaster.closeAllHosts()
    }

    await hostMaster.showActivedHost(hostContent);
}

export const hasParams = (argv: Argv): Boolean => {
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
