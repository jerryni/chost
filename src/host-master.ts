import contProcess from './cont-process';
import hostFs from './host-fs';
import log from './log';

class HostMaster {
    async showActivedHost(hostContent: string): Promise<void> {
        let activeHostList = [];

        if (!hostContent) {
          hostContent = await hostFs.readHost()
        }

        activeHostList = contProcess.getActivedHost(hostContent);

        if(activeHostList.length) {
            log.activedHosts(activeHostList)
        } else {
            log.noActviedHost()
        }
    }

    async activeHost(hostName: string): Promise<string> {
        const hostContent = await hostFs.readHost();
        const newHostContent = contProcess.activeHost(hostContent, hostName);
        await hostFs.writeHost(newHostContent);

        log.activeHost(hostName)

        return newHostContent;
    }

    async listAllHosts(): Promise<string> {
        const hostContent = await hostFs.readHost();
        const hostNameList = contProcess.getAllHostName(hostContent);

        log.allHosts(hostNameList);
        return hostContent;
    }

    async closeHost(hostName): Promise<string> {
        const hostContent = await hostFs.readHost();
        const newHostContent = contProcess.closeHost(hostContent, hostName);

        log.closeHost(hostName)
        return newHostContent;
    }

    async closeAllHosts(): Promise<string> {
        const hostContent = await hostFs.readHost();
        const newHostContent = contProcess.closeAllHost(hostContent);
        await hostFs.writeHost(newHostContent);

        log.closeAllHost()
        return newHostContent
    }
}

export default new HostMaster()
