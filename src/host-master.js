const contProcess = require('./cont-process')
const hostFs = require('./host-fs')
const log = require('./log')

class HostMaster {
    showActivedHost(fileContent) {
        function show(hosts){
            if(hosts.length){
                log.activedHosts(hosts)
            } else {
                log.noActviedHost()
            }
        }

        if(fileContent){
            show(contProcess.getActivedHost(fileContent))
            return
        }

        hostFs.readHost().then(content =>{
            show(contProcess.getActivedHost(content))
        })
    }

    activeHost(host) {
        hostFs.readAndWrite(fileContent => {
            return contProcess.activeHost(fileContent, host)
        }).then((newContent) => {
            log.activeHost(host)
            this.showActivedHost(newContent)
        })
    }

    listAllHosts() {
        hostFs.readHost().then(fileContent => {
            log.allHosts(contProcess.getAllHostName(fileContent))
            this.showActivedHost(fileContent)
        })
    }

    closeHost(host) {
        hostFs.readAndWrite(fileContent => {
            return contProcess.closeHost(fileContent, host)
        }).then((newContent) => {
            log.closeHost(host)
            this.showActivedHost(newContent)
        })
    }

    closeAllHosts() {
        hostFs.readAndWrite(fileContent => {
            return contProcess.closeAllHost(fileContent)
        }).then((newContent) => {
            log.closeAllHost()
            this.showActivedHost(newContent)
        })
    }
}

module.exports = new HostMaster()
