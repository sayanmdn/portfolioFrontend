---
title: "AWS Now Lets You Run a Hypervisor Inside an EC2 Instance"
description: "AWS quietly shipped nested virtualization support for virtual EC2 instances in February 2026. Here's what it means, which instances support it, and why it matters."
date: 2026-03-28
tags: ["aws", "cloud", "infrastructure", "virtualization"]
---

For years, if you wanted to run a hypervisor inside AWS, your only real option was to pay for a bare metal EC2 instance. No shared CPU, no Nitro hypervisor layer sitting between you and the silicon. Just raw hardware, and the freedom to do whatever you wanted with it.

That changed in February 2026. AWS now supports nested virtualization on select virtual EC2 instances. You can run KVM or Hyper-V inside a regular EC2 VM, create virtual machines within those VMs, and do it without renting dedicated bare metal.

It is a genuinely useful capability, and it was a long time coming.

## What Nested Virtualization Actually Means

The standard EC2 setup has two layers. AWS runs the Nitro hypervisor on physical hardware. Your EC2 instance sits on top of that. You get a VM. It works. You deploy things.

Nested virtualization adds a third layer.

- **L0** — AWS physical infrastructure, running the Nitro hypervisor
- **L1** — Your EC2 instance, now also acting as a hypervisor host
- **L2** — Virtual machines you spin up inside that EC2 instance

AWS makes this work by having the Nitro system pass Intel VT-x extensions through directly to the guest instance. Your L1 instance gets hardware virtualization access, which means it can run a real hypervisor rather than emulating one in software. The performance is significantly better than pure software emulation.

## Which Instances Support It

Not every EC2 instance gets this. Currently, only three instance families are supported, all Intel-based, all 8th generation:

| Instance Family | Type |
|---|---|
| **C8i** | Compute optimized |
| **M8i** | General purpose |
| **R8i** | Memory optimized |

If you are on Graviton, you are out of luck for now. ARM-based instances are not supported. Older Intel generations are also excluded. The feature is specifically tied to the 8th generation Intel families and their Nitro integration.

At the L1 level, the supported hypervisors are **KVM** on Linux and **Hyper-V** on Windows.

## How to Turn It On

You enable nested virtualization via a CPU option. You can set it at launch or on a stopped instance.

**At launch:**
```bash
aws ec2 run-instances \
    --image-id ami-0abcdef1234567890 \
    --instance-type r8i.4xlarge \
    --cpu-options "NestedVirtualization=enabled"
```

**On an existing stopped instance:**
```bash
aws ec2 modify-instance-cpu-options \
    --instance-id i-1234567890abcdef0 \
    --core-count 4 \
    --threads-per-core 2 \
    --nested-virtualization enabled
```

There is no additional charge for the feature itself. You pay for the instance, same as always.

## What You Can Actually Do With This

The use cases range from the practical to the genuinely interesting.

**Android emulators** are the most immediately obvious one. Running Android Studio's AVD on EC2 has historically been painful because hardware acceleration was unavailable on virtual instances. With nested virtualization, AVD runs with KVM acceleration, which makes it substantially faster and more usable for CI pipelines testing mobile apps.

**Windows Subsystem for Linux 2** requires Hyper-V internally. WSL2 on a Windows EC2 instance was not possible on virtual instances before this. Now it is.

**Docker Desktop** uses a lightweight VM internally on both Windows and Mac. On EC2, this now works as intended rather than requiring workarounds.

**Cloud-in-cloud setups** are where things get more exotic. You can run platforms like Apache CloudStack or OpenStack inside EC2 instances, creating a private cloud environment on top of AWS infrastructure. AWS even published a blog post walking through running CloudStack on EC2 as a reference architecture.

**Dev and test environments** that need VM isolation can now be built on regular EC2 without the cost floor of bare metal.

## The Caveats Worth Knowing

AWS is reasonably straightforward about the limitations.

On Windows instances, enabling nested virtualization automatically disables Virtual Secure Mode (VSM). Hibernation is also not supported on Windows with this feature enabled. And if you are on a Windows instance with more than 192 vCPUs, nested virtualization is not available at all — this rules out the largest instance sizes like `m8i.96xlarge`.

Performance is the other honest caveat. AWS explicitly recommends bare metal instances for workloads where latency or performance are critical. Nested virtualization adds overhead. It is acceptable for development, testing, emulation, and moderate production workloads. For high-throughput, latency-sensitive hypervisor use cases, bare metal is still the right answer.

Security responsibility also shifts. AWS secures the Nitro layer. Everything above it — your L1 hypervisor, your L2 VMs, guest operating systems, data — is your responsibility. The shared responsibility model gets a new layer when you add a layer.

## Why This Took So Long

Passing hardware virtualization extensions through a hypervisor is not a trivial thing to do securely. The Nitro hypervisor has to maintain isolation between tenants while exposing VT-x to the guest. Getting that right, at scale, across a fleet of shared infrastructure, takes time.

Bare metal was always the safe answer because it sidesteps the problem entirely. With bare metal, there is no L0 hypervisor to worry about. You get the hardware, you run what you want, AWS is not in the middle.

Making nested virtualization work on virtual instances required building confidence in the Nitro implementation specifically for this use case. The decision to limit it to 8th generation Intel instances suggests they are being deliberate about where they have validated the security properties, rather than enabling it broadly and hoping for the best.

## The Bottom Line

If you have been running bare metal EC2 instances primarily to get hypervisor access for dev tooling, Android emulation, or WSL2, you may not need to anymore. The C8i, M8i, and R8i families now cover that use case at a lower cost and without the bare metal commitment.

For production hypervisor workloads where performance genuinely matters, bare metal remains the better choice. But for everything else, this removes a real friction point that has been around since EC2 launched.

The feature is available now in all commercial AWS regions. Full documentation is at the [AWS EC2 nested virtualization docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/amazon-ec2-nested-virtualization.html).
