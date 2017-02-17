#! /usr/bin/env node

'use strict'

var HOST_PATH = '/private/etc/hosts'
var hostMaster = require('./util/host-master')
var fsp = require('./util/promise-fs')
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
    .example('chost -n localhost', 'now you\'re at localhost')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2017')
    .argv

var cacheOriginContent

function showActivedHost() {
    function show(activedHost){
        var str = ''
        if(activedHost.length){
            activedHost.forEach(item=>{
                str += `${item.name} (${item.activeCount} lines)\n`
            })
            console.log(`Actived host name list:\n${str}`)
        } else {
            console.log('There is no actvied host')
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
            console.log(`Switch ${argv.name} successfully!`)
            showActivedHost()
        })

    } else if (argv.l) { // show host list
        fsp.readFile(HOST_PATH).then(fileContent =>{
            var allHostNames = hostMaster.getAllHostName(fileContent)
            console.log('All host name list:\n'+allHostNames.join(','))
            
            cacheOriginContent = fileContent
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