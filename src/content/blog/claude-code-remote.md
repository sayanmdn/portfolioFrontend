---
title: "Claude Code Now Supports Remote Connections"
description: "Anthropic just shipped remote connection support for Claude Code — here's what it means and why it's a big deal."
date: 2026-03-27
tags: ["ai", "tooling", "claude"]
---

Anthropic quietly shipped one of the more exciting Claude Code updates recently: **remote connections**. You can now connect to a running Claude Code session from another machine or interface — no need to be local.

## What it does

The remote control feature lets you attach to an active Claude Code session over a network connection. Think of it like `tmux` attach, but for your AI coding agent. You open a session on one machine, and you (or a teammate) can connect to it from anywhere.

## Why it matters

A few use cases jump out immediately:

- **Pair programming with AI** — share a live session without screen sharing overhead
- **Remote dev machines** — run Claude Code on a beefy cloud box, control it from a lightweight laptop
- **Async handoffs** — leave a session running, pick it up later from a different device

## How to use it

In Claude Code, the `/remote-control` command starts the remote server. Once connected, the remote client gets full visibility into the session — tool calls, outputs, the works.

It's early days for this feature, but the primitives are solid. Remote-first AI tooling is the direction things are heading, and this is a meaningful step.
