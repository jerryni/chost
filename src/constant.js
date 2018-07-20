let HOST_PATH,
    isWin = /^win/.test(process.platform)

if(isWin){
    HOST_PATH = 'C:/Windows/System32/drivers/etc/hosts'
} else {
    HOST_PATH = '/private/etc/hosts'
}

module.exports = {
    HOST_PATH
}
