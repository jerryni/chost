[![Coverage Status](https://coveralls.io/repos/github/jerryni/chost/badge.svg?branch=master)](https://coveralls.io/github/jerryni/chost?branch=master)
![npm version](https://img.shields.io/npm/v/chost.svg)
![travis](https://travis-ci.org/jerryni/chost.svg?branch=master)
[![npm](https://img.shields.io/npm/dm/chost.svg)](https://www.npmjs.com/package/chost)

## chost(change-host) 

Change Host just in command line

Inspired by [chrome-hostadmin](https://github.com/tg123/chrome-hostadmin)

## Demo

![gifdemo](https://jerryni.github.io/gifs/mac/host.gif)

## Installation

> npm install -g chost

## Preparation

Edit your host file content like below:

``` 
# work fine(comments)
#==== stable_master
10.165.124.255  www.xx.com
10.165.124.255  www.xx.com.hk
10.165.124.255  globalms.ll.com
10.165.124.255  m.xx.com
10.165.124.255  m.xx.com.hk
#====

# not work(comments)
#==== stable_dev
# 10.165.124.255  www.xx.com
# 10.165.124.255  www.xx.com.hk
# 10.165.124.255  globalms.ll.com
# 10.165.124.255  m.xx.com
# 10.165.124.255  m.xx.com.hk
#====
```

## Example
quick change host:
> chost -n stable_dev

Then host file content turns to:
```
#==== stable_master
# 10.165.124.255  www.xx.com
# 10.165.124.255  www.xx.com.hk
# 10.165.124.255  globalms.ll.com
# 10.165.124.255  m.xx.com
# 10.165.124.255  m.xx.com.hk
#====

#==== stable_dev
10.165.124.255  www.xx.com
10.165.124.255  www.xx.com.hk
10.165.124.255  globalms.ll.com
10.165.124.255  m.xx.com
10.165.124.255  m.xx.com.hk
#====
```

list all available hostname
> chost -l

close certain host by hostname:
> chost -c stable_dev