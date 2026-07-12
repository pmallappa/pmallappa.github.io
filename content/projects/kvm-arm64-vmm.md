+++
title = "arm64-vmm: Custom KVM Hypervisor"

[extra]
description = "A lightweight hypervisor for arm64 written in Rust using the Linux KVM API, designed for secure and rapid sandbox execution."
date = "2024-03-01"
tags = ["rust", "kvm", "virtualization", "hypervisor", "arm64"]
categories = ["projects"]
draft = false
+++

## Introduction

`arm64-vmm` is a minimalist, secure hypervisor designed to run microVMs on arm64 hardware. Built using Rust, it interacts directly with the Linux `/dev/kvm` API to configure CPU states, construct physical memory layouts, and handle device emulation.

## Key Features

- **Direct Linux KVM Integration** — No bloated QEMU dependence.
- **Minimal Devicetree Generation** — Automatically generates devicetrees for guest kernels.
- **Fast Boot Times** — Booting kernel payloads to userspace in <15ms.
- **VirtIO Console & Block** — Clean, performant virtio bindings for console IO and disk access.

## Architecture

```
+-----------------------------------+
|            arm64-vmm              |
|  +--------------+  +-----------+  |
|  | vCPU Thread  |  | Memory    |  |
|  +--------------+  +-----------+  |
+---------|-----------------|-------+
          | KVM_RUN         | MMAP
+---------v-----------------v-------+
|          Linux Kernel             |
|  +-----------------------------+  |
|  | KVM Subsystem               |  |
|  +-----------------------------+  |
+-----------------------------------+
```
