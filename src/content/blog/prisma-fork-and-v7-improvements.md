---
title: "Prisma Is Splitting in Two"
description: "Prisma v7.4 ships query caching and partial indexes. Meanwhile, Prisma Next — a ground-up TypeScript rewrite — is redefining what an ORM can be. Here's what changed, what's coming, and why it matters."
date: 2026-03-31
tags: ["prisma", "typescript", "database", "orm", "backend"]
---

Prisma is in the middle of a fork. Not a community fork — an official one. The project is splitting its energy between two parallel tracks: incremental improvements to the current ORM, and a ground-up rewrite called Prisma Next that rethinks the fundamentals.

Both tracks shipped meaningful updates in the last few weeks. They are worth understanding separately.

## What Shipped in v7.4

Prisma v7.4 landed in February 2026 with two headlining features: query caching and partial index support.

**Query caching** is the more immediately impactful one. Prisma's query engine has historically run as a WASM binary compiled from Rust, which means it lives inside the JavaScript event loop. Under load, the WASM query compiler can block the main thread while it processes queries — this is the classic event-loop contention problem. Every millisecond the compiler holds the thread is a millisecond your server is not handling incoming requests.

Query caching addresses this directly. When Prisma sees an identical query shape, it can skip the compilation step entirely and reuse the cached query plan. Under high concurrency, this removes the main source of WASM-induced contention. The gains are not marginal. Benchmarks show significant throughput improvements for applications that run the same query patterns repeatedly under load — which describes the majority of real web backends.

**Partial indexes** are a database-level feature that Prisma now exposes through the schema. A partial index only indexes rows that match a given condition, making it smaller and faster than a full index on the same column.

```prisma
model Order {
  id        Int      @id
  status    String
  createdAt DateTime

  @@index([createdAt], map: "idx_pending_orders", where: "status = 'PENDING'")
}
```

If your application frequently queries a subset of rows — active users, pending orders, unread notifications — a partial index on that condition is almost always faster than indexing the full column. Prisma now lets you define these directly in the schema rather than writing raw migration SQL.

## Prisma Next: The Rewrite

On March 4, Prisma announced Prisma Next — a complete rewrite of the ORM in TypeScript, from the ground up. The roadmap was published on March 20.

The motivation is architectural. The current Prisma stack has a Rust query engine compiled to WASM, a schema language (PSL) that is its own DSL, and a code generation pipeline that produces the client. This has worked, but it creates friction: the generated client is opaque, the schema DSL has its own learning curve, and extending Prisma's behavior requires working around rather than through the system.

Prisma Next is rebuilding with different constraints.

**Fully TypeScript.** The query engine moves out of WASM and into TypeScript. This makes the internals debuggable, inspectable, and extensible without needing to touch Rust.

**Type-safe SQL escape hatch.** One of the persistent frustrations with Prisma has been what to do when you outgrow the query API. Prisma has `$queryRaw`, but it is weakly typed and loses all the safety guarantees. Prisma Next adds a type-safe SQL query builder — you can drop down to raw SQL without losing TypeScript inference. This is a significant ergonomic improvement for complex queries.

**Rethought migrations.** The current migration workflow works but has rough edges, especially around team workflows and CI environments. Prisma Next is redesigning this from scratch.

**AI-friendly workflows.** Prisma Next is being designed with LLM tooling in mind. The schema and query APIs are structured to be more predictable for code generation, which matters as more teams use AI assistants to write database access code.

**pgvector extensions.** Prisma Next adds first-class support for pgvector, the PostgreSQL extension for vector similarity search. You can define vector columns in the schema, write similarity queries, and use the results in your application — without dropping to raw SQL or a separate client library.

## Why the Split Makes Sense

Maintaining backward compatibility while doing a ground-up rewrite is genuinely hard. The current Prisma has a large installed base and many projects that depend on its current behavior. A complete swap would break too much.

The two-track approach makes sense: keep shipping improvements to v7.x for teams on the current stack, while building Prisma Next without the constraints of the existing architecture. When Prisma Next stabilizes, the migration path will be clearer because the new system will have been validated in production.

This is the same pattern other mature libraries have used when the architecture needs to change more than incremental refactors allow. React's Fiber rewrite, Vue 3, Angular's Ivy — all followed roughly this shape.

## What to Pay Attention To

**Query caching in v7.4 is worth examining now** if you are running a Node.js backend with any burst traffic. The fix is specifically for the WASM contention pattern, and it requires no schema changes. If your application processes bursts of similar queries, the throughput improvement is effectively free — upgrade the package and run your benchmarks.

**Partial indexes are worth auditing for** if you have tables with clear subsetting patterns. Common candidates: orders filtered by status, users filtered by active/inactive, events filtered by a date range. The gains depend on selectivity, but for high-cardinality filtered queries, the index size reduction alone can speed up cold queries.

**Prisma Next's pgvector support** is the more forward-looking item. If you are building anything with RAG pipelines, semantic search, or embedding-based retrieval, the current approach requires a separate vector client alongside Prisma or raw SQL. Prisma Next collapses this into the schema layer. It is not ready for production yet, but if you are planning that kind of feature, it is worth watching the roadmap rather than committing deeply to a workaround architecture.

## The Bottom Line

The v7.4 improvements are real and available today. Query caching in particular addresses a known pain point for high-concurrency Node.js applications, and partial indexes have been a standard database optimization that Prisma has been slow to expose.

Prisma Next is the more ambitious bet. A TypeScript-native query engine, a type-safe SQL escape hatch, first-class vector support, and rethought migrations — if it delivers, it resolves most of the recurring criticisms of Prisma as a serious production ORM. The roadmap is public and the March 20 publication suggests the project is far enough along to commit to specifics.

Keep shipping on v7.x. Watch Prisma Next.
