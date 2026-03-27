---
title: "The Internet Is Breaking More Often. Here's Why That's Not Surprising."
description: "IT outages are rising in frequency, duration, and cost. A look at the numbers, the reasons, and what the next few years might look like."
date: 2026-03-27
tags: ["infrastructure", "cloud", "tech"]
---

We had one job. Keep the internet on. And we are getting progressively worse at it.

If you felt like things broke more often last year, that is not a you problem. The numbers back you up. Global IT outages are rising in frequency, in duration, and in the kind of damage they do to real businesses. This is not a doom post though. It is a data post, with a few uncomfortable truths and a modest amount of dark humor sprinkled in.

## The Numbers First

Let us start with what actually happened.

Between August 2024 and August 2025, the three biggest cloud providers combined, AWS, Azure, and Google Cloud, experienced **more than 100 service outages**. That is roughly two per week, across the companies that the world has collectively decided to trust with everything.

Critical cloud outages rose **18% in 2024** compared to 2023. The duration of those outages also went up by 18.7%. In just the first five months of 2025, global network outages rose another **33%** compared to the same window the prior year. And between November and December 2025 alone, incidents jumped **178%**, going from 421 to 1,170 in a single month.

The economic damage is not abstract either. The Global 2000 companies lose an estimated **$400 billion per year** to IT downtime. Downtime costs an average of **$14,056 per minute**. The percentage of companies reporting monthly losses above $1 million from outages grew from 43% to 51% year over year.

The average company now experiences **86 hours of downtime annually**. That is more than two full work weeks of things just not working.

## The October 2025 Event Was Genuinely Alarming

In October 2025, AWS went down for **15 hours**. Not a partial degradation, not a regional blip. Fifteen hours.

A single DNS failure took out **3,500 companies across 60 countries**, generating over **4 million outage reports in two hours**. To put that in perspective, that is roughly the same number of people who live in Los Angeles suddenly all reporting the same problem at roughly the same time.

One misconfigured DNS record. Millions of people unable to do their jobs. Whoever approved that change is probably still having the occasional nightmare about it.

## So Why Is This Happening More?

### Human error is climbing, not falling

The most surprising part of the data is this: **human error caused 68% of outages in 2024**, up from 53% the year before. We are building more automation, more tooling, more guardrails, and somehow managing to introduce more mistakes at the same time.

The reason is counterintuitive. As systems grow more complex, the blast radius of a single wrong move gets larger. A misconfiguration in 2019 might have taken down one service. The same mistake in 2025 can cascade across a distributed mesh of interdependent services before anyone has had their second cup of coffee.

Automation does not reduce human error. It amplifies it. Fast.

### Concentration risk is a real and growing problem

Here is the structural issue nobody wants to fully confront. The world has consolidated around a tiny number of infrastructure providers. AWS, Azure, and Google Cloud now underpin an enormous percentage of the internet. When one of them has a bad day, hundreds of thousands of downstream services have a bad day simultaneously.

This is the trade-off we made for convenience and cost efficiency. Shared infrastructure meant shared failure modes. The more the world moved to the cloud, the more it moved toward single points of failure dressed up in the language of reliability.

### Complexity has outpaced understanding

Modern systems are genuinely hard to reason about. Microservices, Kubernetes clusters, distributed databases, multi-region failovers, service meshes, and event-driven architectures are all powerful tools. They are also systems where something can go subtly wrong in a way that nobody notices until it very suddenly and catastrophically becomes everyone's problem.

The irony is that a lot of this complexity was introduced to make systems more resilient. More redundancy, more abstraction, more layers of separation. But each new layer is also a new surface for something to go wrong. At some point the cure starts looking a lot like the disease.

## What Only 20% of Companies Are Prepared For

According to the data, only **1 in 5 executives** feels fully prepared to respond to a major outage. That means 4 out of 5 are essentially hoping it does not happen to them today, which is a bold strategy given that 55% of organizations report experiencing outages **at least weekly**.

The preparation gap is not about money or tooling. It is about institutional muscle memory. Incident response is a skill that atrophies when things are going well, and then gets stress-tested at the worst possible moment. The companies that handle outages well tend to be the ones that practice failing on purpose, through chaos engineering, tabletop exercises, and runbooks that someone actually reads before the incident.

## What the Next Few Years Look Like

The trend line here is not pointing in a comforting direction.

**AI workloads will make this harder before they make it easier.** As companies push inference workloads, training runs, and agent-based systems into production, they are adding layers of unpredictability to already complex infrastructure. AI systems fail in ways that are harder to detect and harder to diagnose. A model that starts producing subtly wrong outputs is much harder to catch than a service that returns a 500 error.

**Regulation is coming.** The EU's Digital Operational Resilience Act (DORA) is already forcing financial institutions to take infrastructure resilience seriously. Expect similar regulatory pressure to expand to other sectors as outage costs and public frustration mount. Compliance will become a forcing function for companies that have not voluntarily invested in resilience.

**Consolidation will continue, and so will the risk it creates.** There is no sign that enterprises are going to start building their own data centers again. The economic case for cloud is too strong. What will change is how seriously companies take multi-region and multi-cloud architectures. Full-region failure is no longer a theoretical edge case. It is something engineers need to design for explicitly.

**The human error problem will require a cultural shift, not just better tools.** The jump from 53% to 68% human-caused outages in a single year is a signal that the pace of change is outstripping people's ability to safely operate these systems. Slowing down deployment cadences, investing in better change management, and treating production with genuine respect rather than just with good intentions, those are unglamorous fixes that actually work.

## The Honest Prediction

Outages will continue to increase in 2026 and likely through 2027. The forces driving the trend, complexity growth, human fallibility, and dangerous concentration, are not going away. What will change is the response. The companies and teams that start building seriously for failure now, before it becomes a crisis, will handle the next decade of infrastructure turbulence far better than those who are still hoping their uptime dashboard stays green.

The internet will keep breaking. The question is whether you are surprised by it or ready for it.

Those are, unfortunately, very different things.
