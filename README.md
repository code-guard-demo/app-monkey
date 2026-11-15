# app-monkey

Target Node.js application repository consuming the centralized AI PR reviewer in [`code-guard-demo/app-central`](https://github.com/code-guard-demo/app-central).

## Local Usage

Requires Node.js 20+ (no external npm dependencies):

```bash
npm run lint   # runs `node --check sum.js`
npm test       # runs `node --test`
```

Current utilities in `sum.js`:
- `average(arr)` — arithmetic mean helper
- `getName(user)` — safe nested name lookup
- `clamp(val, min, max)` — range clamping with `RangeError` guard (added and auto-merged by AI review in `PR #21`)

## Workflows & Secrets

![Architecture Diagram](./docs/architecture.drawio.svg)

> Editable source: [docs/architecture.drawio](./docs/architecture.drawio) (open in [app.diagrams.net](https://app.diagrams.net/) or the VS Code Draw.io extension).

```mermaid
flowchart TD
    DEV["GitHub Events (PR / Comment / Dispatch)"] --> W1[".github/workflows/ai-review.yml"]
    DEV --> W2[".github/workflows/eval.yml (workflow_dispatch)"]

    SEC["Repo Secrets (ANTHROPIC_API_KEY, GEMINI_API_KEY, SKILLS_REPO_TOKEN)"] -.-> W1
    SEC -.-> W2

    W1 -- "workflow_call @v1.2" --> AC["code-guard-demo/app-central (reusable-review.yml)"]
    W2 -- "checkout main via SKILLS_REPO_TOKEN" --> EV["eval/run-eval.js + scripts/test (27 unit tests)"]

    AC --> OUT1["Silent Squash Merge (clean & confidence > 80%)"]
    AC --> OUT2["Escalate Comment (@org/reviewer-oncall / @org/db-admins)"]
    AC --> OUT3["Inline Review + Sticky Summary (CI fail / BLOCKER)"]
    AC --> OUT4["In-Thread Reply (@ai-review)"]
    EV --> OUT5["Precision / Recall / F1 / Cost Summary"]
```

- **`.github/workflows/ai-review.yml`** — Calls `code-guard-demo/app-central/.github/workflows/reusable-review.yml@v1.4` on `pull_request`, `issue_comment`, and `pull_request_review_comment`. Runs `npm run lint && npm test` in Stage-1 CI, routes findings cleanly, silently squash-merges clean PRs when confidence `> 80%`, preserves prior `BLOCK`/inline history with a follow-up resolution comment when fixed (via push or `@ai-review review`), and escalates uncertain PRs to `@org/reviewer-oncall` / `@org/db-admins`.
- **`.github/workflows/eval.yml`** — Manual `workflow_dispatch` workflow checking out `app-central` to run unit tests (`27/27`) and the 10-case live Claude vs Gemini eval suite (`eval/run-eval.js`).

Required repository secrets:
- `ANTHROPIC_API_KEY` — Anthropic API key for Claude reviews & eval
- `GEMINI_API_KEY` — Google Gemini API key for Gemini reviews & eval
- `SKILLS_REPO_TOKEN` — Fine-grained PAT with `Contents: Read` on `code-guard-demo/app-central`

## Verified Capabilities (`PR #1`–`PR #27`)

| Area | Verification Highlights |
|---|---|
| Pluggable central workflow | Reusable `workflow_call` pinned by immutable tag (`v1.4`); central rules (`AGENTS.md`) + domain skills (`db-review`, `ui-review`) loaded dynamically |
| Cost gating & CI context | Doc-only PRs (`PR #8`) & simulated forks (`PR #18`) skip CI and LLM (`$0`); failing unit tests (`PR #9`) pass tail logs to pinpoint root causes |
| Structured inline reviews & replies | `post-review.js` posts hunk-scoped inline comments + `<!-- ai-review -->` summary (`PR #11`); `@ai-review` answers in-thread without bot loops (`PR #13`) and `@ai-review review` triggers full re-review (`PR #27`) |
| Provider equivalence | Claude (`PR #11`) and Gemini (`PR #12`) both flagged `sum.js:4` (`BLOCKER`) and `sum.js:11` (`WARNING`) using identical inputs/outputs |
| Hardening | Lockfile ignore + smallest-first `500`-line diff truncation (`PR #19`), prompt-injection resistance (`PR #20`), SHA-pinned actions without unpinned transitive composites (`v1.3`), `--disallowedTools "Bash"` |
| Confidence gate (`>80%`) & DB/UI lifecycle | Silent auto-merge for clean JS (`PR #21`), clean DB (`PR #24`), and clean UI (`PR #25`); truncation escalation (`PR #22`, `50%`); broken DB/UI → fix → auto-merge (`PR #23`, `PR #26`, `PR #27`) preserving inline comments & original `BLOCK` history on `PR #27` |
