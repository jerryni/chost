import * as yargs from 'yargs';

export default yargs.option('name', {
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
.epilog('copyright 2019')
.argv
