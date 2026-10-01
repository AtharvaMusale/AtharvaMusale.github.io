---
title: FinSight — Agentic RAG over SEC Filings
summary: >-
  An analyst that answers questions about Apple, Microsoft and NVIDIA filings
  with every claim cited, every number pulled from a database, and a verifier
  that checks the draft before you see it.
company: Personal project
period: 2026
order: 6
side: true   # shown under Side projects, not Work
video: /assets/videos/finsight.mp4
tags: [Agentic RAG, LangGraph, MCP, A2A, Pinecone, Claude Haiku 4.5]
pipeline_title: Answer flow
pipeline:
  - title: Ingest SEC filings
    kind: deterministic
    detail: >-
      An allowlisted SEC client (declared User-Agent, 5 requests per second, stops
      on 403 or 429) downloads 10-K and 10-Q filings. The parser splits them by
      Item and chunks them to about 1,800 characters.
  - title: Knowledge base
    kind: storage
    detail: >-
      Chunks go into one Pinecone hybrid index (dense and sparse vectors). XBRL
      financial facts go into a read-only DuckDB database, so numbers live in
      tables and not in prose.
  - title: Plan
    kind: deterministic
    detail: >-
      Rules extract tickers, years, form and section. A comparison fans out into
      one sub-query per company and year. One cheap LLM call decides text versus
      numbers, and only when a metric word appears.
  - title: Retrieve
    kind: parallel
    detail: >-
      One filtered hybrid search per sub-query, merged into the top six passages,
      each with a citation label.
  - title: Facts
    kind: deterministic
    detail: >-
      Text-to-SQL must parse as a single allowlisted SELECT on a read-only
      connection. Growth and margins come from a calculator with four named
      operations. Numbers never come from the model.
  - title: Compose
    kind: agent
    detail: >-
      Claude Haiku 4.5 drafts the answer and labels each claim as filing text,
      a database row or a calculation. Filing text is treated as untrusted data.
  - title: Verify
    kind: deterministic
    detail: >-
      Code checks that every number appears in the evidence and every citation
      exists. An LLM critic must return a verbatim quote for each claim, and code
      confirms the quote is really in the cited text. An unparseable reply fails
      closed.
  - title: Revise and finalize
    kind: agent
    detail: >-
      Issues go back to the writer once, capped. Anything still unsupported gets
      a caveat written by code, never passed off as verified.
stack:
  Agents & models: [LangGraph, Claude Haiku 4.5, LiteLLM, MCP, A2A protocol]
  Retrieval & data: [Pinecone hybrid search, DuckDB, XBRL, BeautifulSoup]
  Serving: [FastAPI, Python 3.11, uv]
  Quality: [pytest, ruff, GitHub Actions, golden eval set, JSONL tracing]
---

## What it achieved

- **Answers you can audit.** Every claim in a response points to the filing passage or database row behind it, so a reader can check any statement in seconds.
- **Numbers that never come from the model.** Figures are read from structured filing data or computed by a calculator, which removes a whole class of invented-number errors.
- **A checker between the model and the reader.** A separate verification pass tests the draft against its evidence, and anything it can't support is flagged instead of presented as fact.
- **One system, three front doors.** The same analyst is reachable over HTTP, through MCP from Claude, and as cooperating A2A agents, with no duplicated logic.
- **Measured and documented.** Design choices and results are written up in a full project document, so the reasoning is open to review.

## The problem

Annual and quarterly reports are long, dense and partly tabular. A chat model
answers questions about them fluently, but it can invent figures, cite nothing
and blur fiscal years. I wanted answers that can be audited claim by claim.

## What I built

- **Ingestion** of 43 filings into 2,967 searchable chunks and 19,033 structured
  facts, under strict SEC access rules.
- **A planner and hybrid retrieval** that fan a comparison out into one search
  per company and year, with metadata filters applied before ranking.
- **A guarded facts route**: read-only text-to-SQL plus a deterministic
  calculator, so every reported number has a source row.
- **A LangGraph orchestrator with a three-layer verifier** and a capped revise
  loop.
- **Three ways in**: an HTTP API, an MCP server with four read-only tools for
  Claude, and four A2A agents (retrieval, facts, verifier, analyst) where
  delegation is opt-in per capability.
- **Tracing** that follows one question ID across every process, recording
  counts and timings but never prompts or filing text.

## Decisions that mattered

- **Code for entities, a model for judgment.** Companies, years and sections
  come from rules that cannot hallucinate. The model only decides whether a
  question needs numbers.
- **The critic cannot just say "supported".** It must return a quote, and code
  checks the quote exists in the cited text.
- **Agents treat each other as untrusted.** Responses are schema-validated and
  size-capped, numbers never cross an agent boundary as facts, and a verifier
  outage fails closed with a caveat.

## Built to be trusted

- **Evaluation-driven.** A golden question set and live runs guided every retrieval and verification choice, so changes were judged on evidence rather than intuition.
- **Tuned hybrid search.** Dense and sparse scores were calibrated onto a common scale, so keyword and semantic matching both contribute to ranking, backed by a regression test.
- **Security by design.** Filing text is treated as untrusted data, SQL runs read-only against an allowlist, the SEC client follows the published access rules, and agents validate each other's responses.
- **Observable end to end.** One trace ID follows a question across every process, recording timings and counts without storing prompts or filing text.
- **Engineered like a product.** A large offline test suite plus lint and tests on every push keep the system safe to change.

## Links

- Source code: [github.com/AtharvaMusale/finsight](https://github.com/AtharvaMusale/finsight)
- Full write-up (PDF, 29 pages):
  [project explanation](https://github.com/AtharvaMusale/finsight/blob/main/docs/FinSight_Project_Document.pdf)
