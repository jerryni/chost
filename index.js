#! /usr/bin/env node

'use strict'

var hostMaster = require('./util/host-master')
var fsp = require('./util/promise-fs')
var chalk = require('chalk')
var yargs = require('yargs')
var argv = yargs
    .option('name', {
        type: 'string',
        describe: '[hostName] Switch host by name',
        alias: 'n'
    })
    .option('list', {
        boolean: true,
        default: false,
        describe: 'Show hostName list',
        alias: 'l'
    })
    .option('closeAll', {
        boolean: true,
        default: false,
        describe: 'Close all hosts',
        alias: 'q'
    })
    .option('close', {
        type: 'string',
        describe: 'close certain host',
        alias: 'c'
    })
    .example('chost -n localhost', 'Switch localhost successfully!')
    .example('chost -c localhost', 'Close localhost successfully!')
    .example('chost -q', 'Close all hosts successfully!')
    .example('chost -l', 'All host name list: xxx')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2017')
    .argv

var cacheOriginContent,
    HOST_PATH,
    isWin = /^win/.test(process.platform)

if(isWin){
    HOST_PATH = 'C:/Windows/System32/drivers/etc/hosts'
} else {
    HOST_PATH = '/private/etc/hosts'
}

function showActivedHost() {
    function show(activedHost){
        var str = ''
        if(activedHost.length){
            str += chalk.yellow('Actived host name list:\n')
            activedHost.forEach(item=>{
                str += `${item.name} (${item.activeCount} lines)\n`
            })

            console.log(str)
        } else {
            console.log(chalk.red('There is no actvied host'))
        }
    }

    if(cacheOriginContent){
        show(hostMaster.getActivedHost(cacheOriginContent))
        return
    }

    fsp.readFile(HOST_PATH).then(fileContent =>{
        show(hostMaster.getActivedHost(fileContent))
    })
}

function processParams() {
    if (argv.name) { // switch host

        fsp.readFile(HOST_PATH).then(fileContent =>{
            var newContent = hostMaster.activeHost(fileContent, argv.name)

            cacheOriginContent = newContent

            return fsp.writeFile(HOST_PATH, newContent)
        }).then(()=>{
            console.log(chalk.green(`Switch ${argv.name} successfully!`))
            showActivedHost()
        })

    } else if (argv.l) { // show host list
        fsp.readFile(HOST_PATH).then(fileContent =>{
            var allHostNames = hostMaster.getAllHostName(fileContent)
            console.log(chalk.yellow('All host name list:\n') + allHostNames.join(','))
            
            cacheOriginContent = fileContent
            showActivedHost()
        })
    } else if (argv.c){

        fsp.readFile(HOST_PATH).then(fileContent =>{
            var newContent = hostMaster.closeHost(fileContent,argv.c)

            return fsp.writeFile(HOST_PATH, newContent)
        }).then(()=>{
            console.log(chalk.green(`Close ${argv.c} successfully!`))
            showActivedHost()
        })
    }  else if (argv.q){
        fsp.readFile(HOST_PATH).then(fileContent =>{
            var newContent = hostMaster.closeAllHost(fileContent)

            return fsp.writeFile(HOST_PATH, newContent)
        }).then(()=>{
            console.log(chalk.green(`Close all hosts successfully!`))
            showActivedHost()
        })
    }
}

// showHelp by if has params
function init() {
    var i,
        noParams = true

    for (i in argv) {
        if (/[_$0]/g.test(i)) {
            continue
        }

        if (argv[i]) {
            noParams = false
            break
        }
    }

    if (noParams) {
        showActivedHost()
        yargs.showHelp()
        return
    }

    processParams()
}

init()
