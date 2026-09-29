---
title: Agentic Underwriting Evaluation System
summary: >-
  A hybrid multi-agent pipeline that automates high-value home insurance
  evaluations — from policy lookup to image-based risk exposure — in minutes.
company: Quantiphi
period: 2025 — Present
order: 1
tags: [Multi-agent, Google ADK, Gemini, Vertex AI, Cloud Run]
metrics:
  - value: 1.5 h → 3 min
    label: evaluation time (~97% faster)
  - value: "62"
    label: underwriting attributes extracted from imagery
  - value: "9+"
    label: enterprise systems integrated
pipeline_title: Execution flow
pipeline:
  - title: Orchestrator agent
    kind: agent
    detail: >-
      A ReAct-style orchestrator built on Google ADK receives a quote ID and a
      scoped bearer token, owns session state, and sequences every downstream step.
  - title: Policy & admin data gathering
    kind: deterministic
    detail: >-
      Cloud Run service drives Playwright automation against legacy policy systems
      (Guidewire PolicyCenter, Duck Creek, A360) through a MuleSoft gateway.
  - title: Eligibility pre-check
    kind: deterministic
    detail: >-
      Binary business rules run as plain code — address standardization and
      property-risk lookups with zero LLM involvement and zero hallucination risk.
  - title: Property data aggregation
    kind: parallel
    detail: >-
      Fan-out calls to document archives, aerial imagery, MLS listing photos, and
      automated valuation APIs; results merge into the shared session state.
  - title: Risk exposure evaluation
    kind: agent
    detail: >-
      Maps property signals to an underwriter-vetted exposure taxonomy — roof
      condition, overhanging trees, water perils, business on premises.
  - title: Multimodal image classification & attribute extraction
    kind: parallel
    detail: >-
      Images are bucketed (roof, exterior, kitchen…) with Vertex AI, then parallel
      workers call Gemini directly to extract fine-grained attributes — skipping
      the agent loop for high-volume visual work.
  - title: Final report agent
    kind: agent
    detail: >-
      Synthesizes the full session state into an underwriter-ready executive
      summary and evaluation report.
stack:
  Agents & models: [Google ADK, ReAct, Gemini API, Vertex AI]
  Compute: [Cloud Run, Python, Playwright]
  Integration: [MuleSoft API gateway, Guidewire, Duck Creek, NearMap, MLS]
  State & audit: [Firestore, Cloud Storage]
---

## The problem

High-value home policies need a manual evaluation before they're written. An
underwriter pulls policy data from several legacy systems, checks eligibility,
collects aerial and listing imagery, looks for risk exposures, and writes up the
findings. Each evaluation took about **an hour and a half**, and the work was
repetitive but high-stakes.

## The approach: agents where reasoning pays, code everywhere else

The key design decision was **not** to hand everything to an LLM. Each stage
was assigned the cheapest mechanism that could do it reliably:

- **Agentic reasoning** for orchestration, exposure judgement against the
  underwriting taxonomy, and final report synthesis. These steps need context
  switching and judgement.
- **Deterministic scripts** for eligibility. The rules are strict and binary, and
  RAG adds nothing, so code gives maximum speed and no hallucination risk.
- **Direct parallel Gemini calls** for image attribute extraction. Sending
  dozens of images through an agent loop would multiply latency and cost for no
  gain in quality.

## Built for traceability

Every hop writes its raw JSON payload to Cloud Storage and its step metadata to
Firestore. If a stage fails mid-run, the session can be inspected and resumed
rather than restarted. Underwriters also get a complete audit trail for each
decision the system surfaces.

## Decoupled integration

Legacy insurance platforms speak a mix of SOAP, REST, and "a web UI only."
Putting them behind a MuleSoft gateway, with Playwright covering UI-only
systems, gave the Python backend one uniform interface. Adding a new data source
became a gateway change, not a rewrite of the agent.

## Outcome

End-to-end evaluation time dropped from **~1.5 hours to ~3 minutes**. The
system extracts **62 underwriting attributes** from property imagery and flags
exposures such as overhanging trees according to the underwriting guidelines.
