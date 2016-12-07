+++
title = "simple wifi driver"
date = "2016-12-03T10:48:31+05:30"
linktitle = " A Simple WIFI driver"
description = "A dummy wifi driver with loopback support"
categories = ['Linux']
author = "Prem Mallappa"
type = "post"
featuredalt = ""
featuredpath = ""
featured = ""
draft = true
tags = ['linux', 'driver']
+++

Some one in an interview asked me to write a simple wifi driver with following features

  - Works with 802.11 framework
  - registers as a WIFI driver
  - Scan support (dummy)
  - Assoiation support (dummy)
  - Tx (initially)
  - Rx support (loopback)
  - Performance measure using iperf utility

Though I could not do much justice to the software at that time, I took that as a challenge and to explore the WIFI stack.
This blog post is a result of such an effort

# Preparing your system for development
I have a laptop with Linux installed, however during development of a driver there are bugs/programming errors concountered. During driver development if there is an error there is a high chance that the kernel module is stuck and cant remove it; in which case 'restart' is the only option.

## Let the computer do the work
I suggest installing a virtual Operating system environment. Virtual environment consist of a [QEMU](http://www.qemu.org) running an x86 kernel or a ARM64 kernel (those are the only two setup I am familiar with).

## Installation
For now I will consider an aarch64 environment (ARM64). QEMU running inside the host Linux box.

### Installing and setting up QEMU

**ArchLinux**
```sh
$ sudo pacman -S qemu-system-aarch64
```
I personally only use ArchLinux, but for the sake of majority of the other linux users...

**Ubuntu/Debian/Mint** 
``` sh
$ sudo apt-get install qemu-system
```
This should install all the needed dependancies.

### Installing rootfs 
Archlinux provides needed rootfilesystem for the aarch64 installation, since we are using the simulated environment, we'll just extract the archive contents and we are done.

``` sh
$ export ROOTFSDIR=<my-favorite-path>
$ cd $ROOTFSDIR
$ wget http://archlinuxarm.org/os/ArchLinuxARM-aarch64-latest.tar.gz
$ tar -xzvf ArchLinuxARM-aarch64-latest.tar.gz

```

To run the Qemu with new root fs and installed Linux Image use the following

``` sh
qemu-system-aarch64 -machine virt -cpu cortex-a57 -nographic \
-m 512M -kernel boot/Image -initrd boot/initramfs-linux.img \
-fsdev local,id=root9p,path=${ROOTFSDIR},security_model=none \
-device virtio-9p-pci,fsdev=root9p,mount_tag=root9p  \
 -append 'root=root9p rw rootfstype=9p \
 rootflags=trans=virtio,version=9p2000.L  \
 console=ttyAMA0 init=/usr/lib/systemd/systemd' \
 -chardev socket,host=localhost,port=5000,server,id=serial0 \
 -serial chardev:serial0 -chardev stdio,mux=on,id=char0 \
 -mon chardev=char0,mode=readline,default 
```

Note the ROOTFSDIR which is earlier setup to point the extracted rootfs.

This will drop to '(qemu)' prompt where in the other line in the command line has the Input/Output redirected to a telnet prompt

In another window launch the telnet session
``` sh
$ telnet localhost 5000
```

The Telnet port should be same as what is given in the command line
