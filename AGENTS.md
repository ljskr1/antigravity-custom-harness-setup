# Antigravity Dynamic Agent System & Comprehensive Slash Command Protocol

## Living Self-Learning Directive (`GEMINI.md` & `AGENTS.md`)
- `GEMINI.md` and `AGENTS.md` are living, self-evolving documents.
- In **every session**, the agent is required to update and refine these files whenever:
  1. New user preferences, habits, or interaction modes are established.
  2. Engineering patterns, tool configurations, or framework fixes are uncovered.
  3. Existing instructions can be made sharper, more token-efficient, or deduplicated.
- Never allow rules to remain static or decay. Active learning must be synthesized directly into these documents.

---

## The Complete Slash Command Spectrum (`/`)

The slash command palette (`/`) encompasses two distinct categories:

### 1. Core Orchestration Slash Commands
- **`/btw`**: Quick side-questions without interrupting, pausing, or losing state in the primary active task.
- **`/goal`**: Persistent autonomous execution until 100% finished with iterative self-healing test loops.
- **`/schedule`**: Deferred timers or recurring background cron jobs.
- **`/browser`**: Dedicated browser automation agent for DOM scraping, navigation, and web verification.
- **`/grill-me`**: Interactive interview mode to dissect requirements, test edge cases, and align on architecture before coding.
- **`/teamwork-preview`**: Parallel subagent fleet to divide and conquer large deliverables across isolated workspaces.
- **`/learn`**: Reflect on corrections or workflows to capture durable rules and skills.
- **`/boost`**: Deep multi-agent orchestrator for complex reasoning, planning, and high-assurance algorithmic audits.

### 2. Skill-Backed Slash Commands (`/<skill-name>`)
Every active skill in your system (e.g. `/apple-design`, `/modern-web-guidance`, `/chrome-extensions`, `/a11y-debugging`, `/graphify`, etc.) functions as a direct slash command to inject specialized domain guidance into context.

---

## Operating Protocol
1. **Autonomous Emulation**:
   - Act in the spirit of these commands automatically (e.g. answer side queries cleanly without derailing, interrogate ambiguity like `/grill-me`, parallelize with subagents like `/teamwork-preview`, use deep reasoning like `/boost`, and uphold specialized skill standards).
2. **Contextual Recommendations**:
   - Recommend any core or skill-backed command whenever it delivers concrete leverage.
   - Zero boilerplate: always explain the exact mechanical or domain-specific advantage of using that command in the current situation.
3. **Session Learning Synchronization**:
   - Persist structured facts to `agentmemory` and update `GEMINI.md` + `AGENTS.md` continuously as new behaviors are refined.

---

## Multi-Agent Subagent Protocol (`/teamwork-preview` & `/boost`)

### The 429 Quota Hazard & Root Cause Analysis
In complex multi-agent workflows (such as `/teamwork-preview` parallel fleets or `/boost` orchestrators), spawning 4–10 subagents concurrently with `Model: "inherit"` (Gemini Pro) while allowing them to output large code blocks directly in conversation turns leads to rapid API rate limit exhaustion:
`RESOURCE_EXHAUSTED (code 429): Individual quota reached. Resets in 3+ hours.`

### Mandatory Subagent Delegation Rules
Whenever orchestrating or invoking subagents via `invoke_subagent`:

1. **Mandatory Zen Router Directive Injection**:
   Every prompt generated for a worker, reviewer, explorer, or fixer subagent **MUST** inject the local worker directive:
   ```text
   [MANDATORY MASTER-WORKER EXECUTION PROTOCOL]
   DO NOT burn cloud tokens generating large code files in your conversation turns.
   You have access to the local Zen Router on port 3010 and the local Ollama fleet on port 11434:
   - File Scaffolding: Run `agy-zen --model mimo-v2.5-free --prompt "..." --out <path>` via run_command.
   - Deterministic AST Check: Run `bun build --no-bundle <file>` or `python3 -m py_compile <file>`.
   - Noisy Test Logs: Pipe terminal output through `agy-cleanlog` (e.g. `npm test 2>&1 | agy-cleanlog`).
   - Git Diffs: Run `agy-commit` locally.
   ```

2. **Subagent Model Tiering Hierarchy**:
   - **Orchestrator / Primary Lead**: Uses `inherit` (Cloud Gemini 3.8 / 3.7 Pro) for macro-level architectural synthesis.
   - **Worker / Scaffolder / Reviewer / Challenger Subagents**: MUST default to `Model: "flash"` or `Model: "flash_lite"`.
   - Never spawn multiple parallel worker subagents on `Model: "inherit"` / `Model: "pro"` unless explicitly performing a single high-assurance algorithmic proof. Using `flash` for subagents combined with `agy-zen` for direct-to-disk code generation yields 10× higher concurrency limits and prevents 429 quota lockouts.

3. **Compact Handoff Contracts**:
   - Subagents must report back with concise status summaries (file created, AST validity status, tests passed) rather than pasting full multi-hundred-line code files into inter-agent messages.

