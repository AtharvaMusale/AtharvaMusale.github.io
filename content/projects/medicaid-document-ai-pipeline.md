---
title: Medicaid Document AI Pipeline
summary: >-
  A serverless, event-driven pipeline that classifies, extracts, and validates
  multi-page Medicaid forms at scale on Google Cloud.
company: Quantiphi
period: 2025 — Present
order: 2
tags: [Document AI, Vertex AI, Event-driven, Cloud Run, Pub/Sub]
metrics:
  - value: "2,000+"
    label: concurrent documents in flight
  - value: "0"
    label: duplicate-execution failures
  - value: "$0"
    label: idle infrastructure cost
pipeline_title: Event flow
pipeline:
  - title: Ingest & trigger
    kind: deterministic
    detail: >-
      Eventarc and Pub/Sub turn incoming documents into events, decoupling intake
      from processing.
  - title: Acquire state lock
    kind: storage
    detail: >-
      A Firestore transaction claims the document before any work begins, so
      redelivered or duplicate events are acknowledged and dropped.
  - title: Classify
    kind: agent
    detail: >-
      Document AI and Vertex AI identify form type and split multi-page packets
      into logical documents.
  - title: Extract entities
    kind: parallel
    detail: >-
      Entities are extracted from complex multi-page forms on autoscaling
      Cloud Run workers.
  - title: Validate & persist
    kind: deterministic
    detail: >-
      Business-rule validation, status transitions, and results written back to
      Firestore; failures retry with backoff or route to a failure state.
stack:
  AI: [Document AI, Vertex AI]
  Compute & events: [Cloud Run, Pub/Sub, Eventarc, Docker]
  State: [Firestore, Cloud Storage]
  Operations: [Cloud Logging, Cloud Monitoring]
---

## The problem

Medicaid applications arrive as long, multi-page packets that mix several form
types. Processing them by hand is slow and error-prone. A naive batch job also
fails in exactly the ways a distributed system does: duplicate events,
timeouts on long documents, and partial failures.

## Architecture

The pipeline is fully **serverless and event-driven**. Cloud Run, Pub/Sub,
Eventarc, and Firestore decouple each stage, so a burst of uploads scales out
automatically and scales to zero when idle.

## Reliability engineering

Most of the work was in making the pipeline correct under concurrency:

- **Idempotent processing with state locking.** A Firestore transaction claims
  each document before work starts. At-least-once delivery from Pub/Sub can't
  cause a document to be processed twice.
- **Retries and failure handling.** Transient errors retry with backoff.
  Permanent failures land in an explicit failure state instead of silently
  disappearing.
- **Eventual consistency by design.** Status transitions are explicit, so every
  document is always in exactly one known state.

## Tuning long-running inference

Multi-page extraction is slow compared with typical request/response traffic.
I tuned Cloud Run timeouts, per-instance concurrency, autoscaling limits, and
resources for these workloads. I also built logging and monitoring views to
find latency bottlenecks and failure hot spots.

## Outcome

The pipeline sustains **2,000+ concurrent documents** with **zero
duplicate-execution failures**, automatic retries, and **no idle
infrastructure cost**.
