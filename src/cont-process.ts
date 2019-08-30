import log from './log';

export default {

    getRegByHost(hostName:string){
        hostName = hostName || ''

        return new RegExp('(#=+[\\s]*' + hostName + '[\\s\\n\\r]+)([^=]+)(#=+)', 'g')
    },

    getIpRegWithDomain(domain:string) {
        return new RegExp('^((?![\\r\\n])[\\d\\.\\s]{10,})' + domain, 'gm')
    },

    getDomainReg(): RegExp {
        return /[\d\.\s]+([\w\.]+)/g
    },

    /*
        1. get snippet like '#=== hostName content #=== '
        2. content.replace('#', '')
        3. comment other lines of same-ip
    */
    activeHost(fileContent: string, hostName: string): string {
        let hostReg = this.getRegByHost(hostName)
        let [, startToken, hostLines, EndToken] = hostReg.exec(fileContent)

        if (!hostLines) throw 'Do not have this host'

        hostLines = hostLines.replace(/[#]/g, '')
        hostLines
            .split(/[\r\n]/)
            .forEach(line => {
                if (!line || !line.trim()) {
                    return
                }

                let [, domain] = this.getDomainReg().exec(line.trim())
                let ipReg = this.getIpRegWithDomain(domain)
                fileContent = fileContent.replace(ipReg, '#$1' + domain)
            })

        return fileContent.replace(hostReg,
            startToken + hostLines + EndToken)
    },

    closeHost(fileContent:string, hostName:string) {
        let targetSnippetReg = this.getRegByHost(hostName),
            execResult,
            middleContent

        execResult = targetSnippetReg.exec(fileContent)
        if (!execResult || !execResult[2]) throw 'Do not have this host'

        middleContent = execResult[2].replace(/[#]/g, '')

        // clear all # and add # back to the head
        middleContent= middleContent.split(/[\r\n]/)
            .map(item => item.trim())
            .filter(item => !!item)
            .map(item => '#' + item)
            .join('\n') + '\n'

        targetSnippetReg.lastIndex = 0
        return fileContent.replace(targetSnippetReg, execResult[1] +
            middleContent +
            execResult[3])
    },

    getAllHostName(fileContent:string) {
        let allHostNameReg = /#=+[\s]?([\d\w_\-\u4E00-\u9FFF]+)/g,
            matches,
            allHostNames = []

        while (matches = allHostNameReg.exec(fileContent)) {
            allHostNames.push(matches[1])
        }

        return allHostNames
    },

    getActivedHost(fileContent: string): any[] {
        let execResult,
            middleContent,
            eachLineArray,
            activedHost = [],
            activeCount = 0,
            targetSnippetReg = new RegExp('(#=+[\\s]*([\\d\\w\\u4E00-\\u9FFF]+))([^=]+)(#=+)', 'g')

        while(execResult = targetSnippetReg.exec(fileContent)){
            if (!execResult || !execResult[2]) throw 'Do not have this host'

            middleContent = execResult[3],
            activeCount = 0

            eachLineArray = middleContent.split(/[\r\n]/)
                .map(item => item.trim())
                .filter(item => !!item)

            eachLineArray.forEach(item=>{
                if(/^(?![#]+)[\d]+/.test(item)){
                    activeCount++
                }
            })

            if(activeCount){
                activedHost.push({
                    activeCount,
                    name: execResult[2]
                })
            }
        }

        return activedHost
    },

    closeAllHost(fileContent): string {
        try {
            var allHostName = this.getAllHostName(fileContent)
            allHostName.forEach(hostName => {
                fileContent = this.closeHost(fileContent, hostName)
            })

            return fileContent
        } catch(e) {
            log.catch(e)
            return ''
        }
    }
}
