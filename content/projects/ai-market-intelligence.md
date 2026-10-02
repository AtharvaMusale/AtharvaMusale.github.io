---
title: AI Market Intelligence Platform
summary: >-
  A daily market briefing and Q&A assistant where every number is computed in
  code, the model only narrates, and every claim is cited back to a data field
  or a filing.
company: Personal project
period: 2026
order: 8
side: true   # shown under Side projects, not Work
tags: [LangGraph, RAG, Evaluation, DuckDB, Pinecone, Claude Haiku 4.5]
pipeline_title: Daily briefing flow
pipeline:
  - title: Ingest free data
    kind: deterministic
    detail: >-
      Prices and Treasury yields from Yahoo Finance, filings from SEC EDGAR and
      headlines from GDELT land in a local DuckDB file, following each source's
      access terms.
  - title: Compute in code
    kind: deterministic
    detail: >-
      Sector returns, VIX regime, SPY trend, breadth, yields and per-stock
      technicals are calculated with DuckDB and pandas. The model never does
      arithmetic.
  - title: Retrieve documents
    kind: parallel
    detail: >-
      Recent filings and headlines are chunked and indexed in Pinecone for
      semantic search, with deterministic IDs so re-runs add nothing twice.
  - title: Plan and call tools
    kind: agent
    detail: >-
      A LangGraph flow routes each question to the right tools: sectors,
      regime, documents or a single-stock drill-down.
  - title: Narrate with citations
    kind: agent
    detail: >-
      Claude Haiku 4.5 receives only structured numbers and document excerpts,
      and writes short claims that each list their sources.
  - title: Validate citations
    kind: deterministic
    detail: >-
      Any claim that cites a source which does not exist is dropped before the
      reader sees it.
  - title: Evaluate
    kind: deterministic
    detail: >-
      A separate harness recomputes every number from DuckDB and checks each
      claim's figures, directions and wording against the sources it cites.
stack:
  Agents & models: [LangGraph, Claude Haiku 4.5, prompt-injection boxing]
  Data & retrieval: [DuckDB, pandas, Pinecone, yfinance, SEC EDGAR, GDELT]
  App & quality: [Streamlit, pytest, GitHub Actions, evaluation harness]
---

## What it achieved

- **A briefing you can audit.** Every claim shows the data path or the filing it came from, so a reader can verify any statement in seconds.
- **Numbers the model can't get wrong.** All figures come from code, and the model is limited to narrating them.
- **Unsupported claims never reach the reader.** A citation validator removes anything that points to a source that doesn't exist.
- **Accuracy that is measured, not assumed.** An independent harness recomputes the numbers from the database and checks the model's output, including direction words like "up" and "down" and phrases like "uptrend" or "overbought".
- **Free to explore, cheap to run for real.** A mock writer lets you test the whole pipeline at no cost, and responses are cached so repeats cost nothing.

## The problem

Market commentary mixes real data with confident-sounding guesses, and a chat model will happily invent a figure or explain a move with no evidence. I wanted a daily briefing where each statement can be traced back to its source.

## What I built

- **A data layer** that pulls prices, yields, filings and headlines from free sources into DuckDB, with provenance recorded for each.
- **Analytics** for market regime, sector strength, rates and individual stocks, computed deterministically.
- **A LangGraph agent** that plans, calls the right tools, writes cited claims and validates them.
- **A Streamlit app** with a regime panel, a sector heatmap, a Treasury yield chart, the cited daily brief, a question box and an evaluation tab. It opens the database read-only and never displays keys.
- **An evaluation harness** with a fixed question set that also checks tool routing, plus a replay mode that scores the briefing as of past dates using only the data available then.

## Decisions that mattered

- **Code does the arithmetic, the model does the words.** That one rule removes a whole class of errors.
- **Citations are enforced, not requested.** The validator drops unsupported claims instead of trusting the model to behave.
- **Evaluate against a threshold set in advance.** The pass mark was fixed before the first real run, so the harness measures the system rather than flattering it.
- **Treat documents as untrusted.** Filing and news text is boxed as data so it can't give the model instructions.

## Built to be trusted

- **Offline test suite.** Analytics, text processing, agents, evaluation and the app are all tested with synthetic data and no network or keys.
- **Source terms respected.** Declared SEC user agent and rate limits, titles and URLs only from GDELT, and raw data kept local and never republished.
- **Cost-aware by design.** Disk caching by input hash, a token budget guard on indexing and a per-run cost log.

## Links

- Source code: [github.com/AtharvaMusale/ai-market-intelligence](https://github.com/AtharvaMusale/ai-market-intelligence)
