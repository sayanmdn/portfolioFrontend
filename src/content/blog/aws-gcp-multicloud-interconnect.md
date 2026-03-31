---
title: "AWS and GCP Just Made Multicloud Networking a Managed Service"
description: "AWS and Google Cloud launched a joint private, encrypted interconnect between their networks. No hardware to manage, no colocation needed, and Azure is joining in 2026."
date: 2026-04-01
tags: ["aws", "gcp", "cloud", "networking", "multicloud"]
---

For years, connecting AWS and Google Cloud privately meant one of two things: run traffic over an IPsec VPN across the public internet, or order physical cross-connect circuits through a colocation provider like Equinix or Megaport. The first option trades performance for convenience. The second gives you real private connectivity but requires weeks of lead time, physical presence in a colo, and ongoing hardware management on your end.

AWS and Google Cloud just removed both of those constraints.

At re:Invent 2025, AWS announced the preview of **AWS Interconnect – multicloud**, working in tandem with Google's **Cross-Cloud Interconnect**. Together, they deliver a fully managed, MACsec-encrypted, private path between AWS VPCs and Google Cloud VPCs — provisioned in minutes from either console.

## What Is Actually Being Announced

This is not a marketing partnership. Both providers physically extended their backbone networks to meet each other, then built a joint provisioning layer on top.

The architecture has three meaningful properties:

**Private backbone, not the public internet.** Traffic moves entirely within AWS and Google Cloud's infrastructure. It never touches the public internet at any point. Google physically provisions Cross-Cloud Interconnect ports up to the AWS network boundary. AWS does the same on its side.

**MACsec encryption, always on.** MACsec (IEEE 802.1AE) is hardware-enforced encryption at the physical link layer. It is not software-based like IPsec, so there is no CPU overhead or throughput penalty. Both providers configure their edge routers so customer traffic transmits only when the MACsec session is active — there is no unencrypted fallback mode.

**Fully managed.** No colocation facility, no router provisioning, no cross-connect order. You select the target cloud provider, the destination region, and the bandwidth you want. A single "Interconnect object" appears in both AWS Console and Google Cloud Console representing unified capacity. Adjusting bandwidth later does not require reconfiguration.

## How the Two Products Fit Together

| | AWS Side | Google Cloud Side |
|---|---|---|
| Product name | AWS Interconnect – multicloud | Cross-Cloud Interconnect |
| Redundancy | Quad-redundant | 99.9% (single metro) or 99.99% (two metros) |
| SLA | 99.99% | Matches above tiers |
| AWS integrations | Transit Gateway, Cloud WAN, VPC, Direct Connect Gateway | — |

The underlying API contract between the providers is defined in an open spec — **Connection Coordinator API Specification** (OpenAPI 3.0), published on GitHub at `aws/Interconnect`. This is how Azure will plug in without requiring another bespoke integration.

## Bandwidth and Regions

During preview, each AWS account gets one 1 Gbps connection at no charge. At general availability, the range will expand to 1 Gbps through 100 Gbps on demand. Google's Cross-Cloud Interconnect ports support 10 Gbps, 100 Gbps, and 400 Gbps.

The initial five region pairs are all US and Europe:

| AWS Region | Google Cloud Region |
|---|---|
| US East (N. Virginia) | us-east4 |
| US West (N. California) | us-west2 |
| US West (Oregon) | us-west1 |
| Europe (London) | europe-west2 |
| Europe (Frankfurt) | europe-west3 |

Asia-Pacific is not covered at launch, which is a meaningful gap for teams with workloads in that region.

## How It Compares to What Existed Before

The honest comparison is against third-party interconnect providers, since that was the previous best option for serious multicloud connectivity:

| | VPN (IPsec) | Third-party interconnect | AWS Interconnect – multicloud |
|---|---|---|---|
| Path | Public internet | Private (via colo) | Private (cloud backbone) |
| Encryption | IPsec (software) | Optional, varies | MACsec hardware, always-on |
| Provisioning | Hours | Weeks to months | Minutes |
| Infrastructure management | Self-managed | Customer manages routers | Fully managed |
| Redundancy | Manual | Manual | Quad-redundant, built-in |
| Bandwidth | Tunnel-limited | Up to 100 Gbps | Up to 100 Gbps (400 Gbps on GCP ports) |

The provisioning shift is the most operationally significant change. Cross-connect orders through Equinix or Megaport involve physical circuits, LOAs, cabling, and router configuration that can easily take four to eight weeks. This product replaces that entire process with a console workflow.

## Pricing Reality

AWS has not announced GA pricing for its side of the connection. Google Cloud's Cross-Cloud Interconnect pricing is already public:

| Port size | Price |
|---|---|
| 10 Gbps | $5.60/hr |
| 100 Gbps | $30.00/hr |
| 400 Gbps | $110.00/hr |

VLAN attachments add $0.10–$4.00/hr depending on bandwidth allocation. Data transfer out is $0.020/GiB within US and EU, higher elsewhere.

Running a 10 Gbps redundant connection with ~200 TiB/month of transfer comes to roughly $12,000/month on the Google side alone, before the AWS bill. This is not cheap for small-scale use. The economics make most sense for teams already moving large data volumes between clouds — where the alternative is either the unpredictable cost of internet egress or the operational overhead of managing their own colocation circuits.

One thing this does not fix: egress fees. The underlying data transfer pricing that makes large-scale multicloud expensive is unchanged.

## Who This Is For

The product targets enterprises that are already committed to running across both AWS and GCP — which describes the majority of large organizations. 85%+ of enterprises operate in multiple clouds, and the primary pain point has always been the connectivity layer.

The most compelling use cases:

- **Cross-cloud data replication and disaster recovery** — private path between databases on different providers
- **ML and AI workloads** — moving large model artifacts, training datasets, or inference outputs between clouds without internet exposure
- **Regulatory compliance** — data sovereignty requirements that prohibit transit over public networks
- **Cloud WAN integration** — combining this with AWS Cloud WAN to build a global multicloud fabric
- **Outage resilience** — following the October 2025 AWS outage that affected thousands of dependent services, having a private path to a second provider on standby has become a more common ask

## Azure Is Next

Microsoft Azure has committed to joining the framework in 2026. The open Connection Coordinator API spec is designed to make this a standardized integration rather than another bespoke negotiation. Salesforce has already integrated its Data 360 service as an early enterprise adopter, which shows the spec is working as designed.

When Azure joins, this becomes a true tricloud private networking layer covering all three major hyperscalers. That is a qualitatively different thing from what exists today.

## What It Does Not Solve

Honest assessment of the gaps:

The product handles physical connectivity. It does not handle network policy management, segmentation, observability, or cost analytics across providers. Day-2 operations — figuring out what is talking to what, at what cost, with what security posture — remain unsolved. You still need a network management layer above this.

Geographic coverage is limited at launch. If your workloads are in Tokyo, Singapore, or Sydney, this does not help yet.

The open API spec is published and controlled by AWS. Even with open governance intent, one provider setting the operational baseline is a dependency worth understanding before building on top of it.

## The Bottom Line

The meaningful shift here is not technical — private, encrypted cloud-to-cloud connectivity has been achievable for years. What changed is that AWS and Google Cloud now own and manage the full path themselves, removing the colocation dependency and collapsing multi-week provisioning into a few minutes.

For teams running significant workloads on both providers, this removes the last legitimate reason to have physical presence in a colo for cloud connectivity. For teams that have been using VPNs as a stopgap, it provides a real alternative at a meaningful cost.

For everyone else, watch the Azure announcement in 2026. A managed private path across all three hyperscalers, provisioned from a console, would make multicloud networking substantially more accessible than it has ever been.

AWS Interconnect – multicloud is currently in public preview. More details at the [AWS product page](https://aws.amazon.com/interconnect/multicloud/) and the [Google Cloud blog](https://cloud.google.com/blog/products/networking/aws-and-google-cloud-collaborate-on-multicloud-networking/).
