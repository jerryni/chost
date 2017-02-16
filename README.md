## chost(change-host)

Host file change for mac

## features

quick change host:
> chost -n localhost

hostFile format like below:
```
#==== stable_master
# 10.165.124.255  www.xx.com
# 10.165.124.255  www.xx.com.hk
# 10.165.124.255  globalms.ll.com
# 10.165.124.255  m.xx.com
# 10.165.124.255  m.xx.com.hk
#====

#==== stable_dev
# 10.165.124.255  www.xx.com
# 10.165.124.255  www.xx.com.hk
# 10.165.124.255  globalms.ll.com
# 10.165.124.255  m.xx.com
# 10.165.124.255  m.xx.com.hk
#====
```

show host list(not finished yet)
> chost -l

## TODO

- chost -n name
- `chost -l` list all available hostname
- unit-test: https://mochajs.org/ like gulp
- config host helper
- support window
- close certain host