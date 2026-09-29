---
title: Chemistry Model Deployment on Vertex AI
summary: >-
  Turning open-source synthesis and retrosynthesis models into production
  microservices with a shared contract and a repeatable onboarding blueprint.
company: Quantiphi
period: 2026
order: 3
tags: [Vertex AI, MLOps, Docker, Model serving]
metrics:
  - value: "4"
    label: models deployed (scope was 3)
  - value: "1"
    label: shared request/response contract
  - value: "~2 wks"
    label: to onboard each additional model
pipeline_title: Onboarding blueprint
pipeline:
  - title: Onboard & resolve dependencies
    kind: deterministic
    detail: >-
      Untangle architecture, memory, and library conflicts across distinct
      open-source research codebases.
  - title: Containerize with custom inference logic
    kind: deterministic
    detail: >-
      Docker images wrap model-specific pre/post-processing behind a
      standardized request and response schema.
  - title: Deploy to Vertex AI endpoints
    kind: parallel
    detail: >-
      Configure machine types and accelerators per model; validate endpoints
      for downstream services.
  - title: Tune & harden
    kind: deterministic
    detail: >-
      Latency tuning, refactoring, and peer code review for maintainability and
      operational stability.
stack:
  Serving: [Vertex AI Endpoints, Docker, Google Cloud]
  Models: [Synthesis models, Retrosynthesis models]
  Engineering: [Python, Latency tuning, Code review]
---

## The problem

Open-source chemistry models are research code. Each one has its own
framework, dependency pins, memory profile, and input format. Downstream
services needed to call them reliably, which research code wasn't built for.

## The approach

I treated each model as a microservice behind one **shared contract**:

- **Dependency resolution** across frameworks with very different
  architectures and memory requirements.
- **Containers with custom inference logic** that adapt each model's I/O to a
  standardized request/response schema.
- **Vertex AI endpoints** configured, deployed, and validated for production
  access by dependent services.
- **Latency tuning, refactoring, and peer review** to make the endpoints
  maintainable after handoff.

## A reusable blueprint

The modular deployment components and design patterns are the lasting output.
Onboarding the next model is a known ~2-week path instead of a research project.

## Outcome

**Four** synthesis and retrosynthesis models were deployed to Vertex AI against
an initial scope of three, with a much shorter onboarding cycle for future
models. Natural next steps include a GenAI front end that lets chemists ask
"How can I synthesize this compound?" and route optimization that factors in
inventory, supplier availability, and cost.
