let host,
    isWin = /^win/.test(process.platform)

if(isWin){
    host = 'C:/Windows/System32/drivers/etc/hosts'
} else {
    host = '/private/etc/hosts'
}

export const HOST_PATH = host;
