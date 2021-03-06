const assert = require('assert')
const contProcess = require('../dist/src/cont-process').default

describe('HostMaster', function() {
    describe('activeHost', function() {
        var origin = `#==== stable_master
10.165.124.255  www.xx.com
10.165.124.255  www.xx.com.hk
#====

#==== stable_dev
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====`

        var target = `#==== stable_master
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====

#==== stable_dev
10.165.124.255  www.xx.com
10.165.124.255  www.xx.com.hk
#====`

        it('active stable_dev and comment stable_master', function() {
            assert.equal(target, contProcess.activeHost(origin, 'stable_dev'))
        })
    })

    describe('getAllHostName', function() {
        var origin = `#==== stable_master
10.165.124.255  www.xx.com
10.165.124.255  www.xx.com.hk
#====

#==== stable_dev
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====`

        it('it should be ["stable_master", "stable_dev"]', function() {
            assert.deepEqual([ 'stable_master', 'stable_dev' ], contProcess.getAllHostName(origin))
        })
    })

    describe('getActivedHost', function() {
        var origin = `#==== stable_master
10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====

#==== stable_dev
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====`

        it('actived host', function() {
            assert.deepEqual([{name: 'stable_master', activeCount: 1}], contProcess.getActivedHost(origin))
        })
    })

    describe('closeHost', function() {
        var origin = `#==== stable_master
10.165.124.255  www.xx.com
10.165.124.255  www.xx.com.hk
#====

#==== stable_dev
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====`

        var target = `#==== stable_master
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====

#==== stable_dev
#10.165.124.255  www.xx.com
#10.165.124.255  www.xx.com.hk
#====`

        it('close stable_master', function() {
            assert.equal(target, contProcess.closeHost(origin, 'stable_master'))
        })
    })
})
