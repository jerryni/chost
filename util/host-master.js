'use strict'

class HostMaster {
    constructor() {}

    
    getCertainHostReg(hostName){
        hostName = hostName || ''

        return new RegExp('(#=+[\\s]*' + hostName + '[\\s\\n\\r]+)([^=]+)(#=+)', 'g')
    }
    
    /**
     * Active host by hostName
     * @param  {String} fileContent
     * @param  {String} name 
     * @return {String}
     */
    activeHost(fileContent, hostName) {
        var targetSnippetReg,
            middleContent,
            eachLineArray,
            execResult

        /*
            找到#=== hostName xxx #===这样的片段
            提取出middleContent: xxx
            然后遍历xxx，将xxx开头的#去掉之后，再拼接起来替换回去
         */
        
        targetSnippetReg = this.getCertainHostReg(hostName)
        execResult = targetSnippetReg.exec(fileContent)
        if (!execResult || !execResult[2]) throw 'Do not have this host'

        middleContent = execResult[2].replace(/[#]/g, '')

        //把middleContent中的每一行都提取出来，匹配出文件中未注释的注释掉
        eachLineArray = middleContent.split(/[\r\n]/)
            .map(item => item.trim())
            .filter(item => !!item)

        // comment all other same-ip lines
        eachLineArray.forEach((item) => {
            var domain = /[\d\.\s]+([\w\.]+)/g.exec(item)[1]
            var ipReg = new RegExp('^((?![\\r\\n])[\\d\\.\\s]{10,})' + domain, 'gm')

            ipReg.lastIndex = 0
            fileContent = fileContent.replace(ipReg, '#$1' + domain)
        })

        targetSnippetReg.lastIndex = 0
        return fileContent.replace(targetSnippetReg, execResult[1] +
            middleContent +
            execResult[3])
    }

    closeHost(fileContent, hostName){
        var targetSnippetReg = this.getCertainHostReg(hostName),
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
    }

    getAllHostName(fileContent){
        var allHostNameReg = /#=+[\s]*([\d\w_\u4E00-\u9FFF]+)/g,
            matches,
            allHostNames = []

        while (matches = allHostNameReg.exec(fileContent)) {
            allHostNames.push(matches[1])
        }

        return allHostNames
    }
    getActivedHost(fileContent){
        
        var execResult,
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
    }
}

module.exports = new HostMaster()
