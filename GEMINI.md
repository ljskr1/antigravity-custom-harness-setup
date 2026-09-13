<!-- harness_gate:start -->
## Mandatory Step 0 Execution Gate

Before outputting code or executing modifying commands:
1. **Memory Check**: At the START of a task, call `memory_recall` or `memory_smart_search` via `agentmemory` to load past decisions, preferences, and fixes. Do not ask the user to repeat past context.
2. **Framework Accuracy**: When interacting with modern external packages (Next.js, Supabase, Tailwind, Pydantic, etc.), verify exact signatures using `context7` before guessing.
3. **Architecture Navigation**: If `graphify-out/graph.json` exists in the project root, query the graph (`graphify query`) before reading dozens of files.
4. **Local LLM Offloading**: Route noisy logs through `agy-cleanlog` (Qwen 1.5B), diff reviews through `agy-commit` (Qwen 7B), and multithreading/concurrency audits through `agy-audit` (DeepSeek-R1).
<!-- harness_gate:end -->

<!-- agentmemory:start -->
## Agent Memory (agentmemory)

You have persistent long-term memory via the `agentmemory` MCP server. Tools: `memory_recall`, `memory_smart_search`, `memory_save`, `memory_sessions`.

- At the START of a task, call `memory_recall` (or `memory_smart_search`) with the task context to load relevant past decisions, fixes, and preferences before asking the user to repeat anything.
- When you learn something durable (a decision, a fix, a gotcha, a user preference, a project convention), call `memory_save` to persist it.
- Prefer recalling over re-deriving, and save concise reusable facts rather than transcripts.
<!-- agentmemory:end -->

<!-- context7:start -->
## Live Documentation & Modern APIs (Context7)

- For modern framework questions, APIs, external libraries, or fast-evolving packages (e.g. Next.js, React, Tailwind, Supabase, Pydantic, Zustand, LangChain):
  - Consult `context7` for version-exact, verified documentation snippets before relying on web search or guessing.
  - Avoid hallucinating outdated/deprecated signatures.
<!-- context7:end -->

<!-- graphify:start -->
## Codebase Architecture & Knowledge Graph (Graphify)

- When `graphify-out/graph.json` exists in a workspace or project root:
  - For codebase navigation, call flows, or architecture questions, first query the graph (`graphify query "<question>"`) instead of loading/grepping dozens of files.
  - Use `graphify path "<A>" "<B>"` to trace paths between components, and `graphify explain "<concept>"` for module overviews.
  - After making code modifications in a session, run `graphify update .` to keep the local AST graph synchronized.
<!-- graphify:end -->

<!-- token_efficiency:start -->
## Token Efficiency & Workflow Best Practices

- **CLI First**: Favor native shell commands (`gh`, `git`, `ast-grep`, `npm`) via `run_command` over heavy, schema-bloated MCP servers to conserve context tokens.
- **Surgical Reading**: Use targeted line ranges and graph subqueries rather than dumping large files into context.
<!-- token_efficiency:end -->

<!-- local_sidecar:start -->
## Local LLM Specialist Fleet & Autonomous Tooling

You have an active local Ollama runtime at `http://localhost:11434` and shell helper suite (`~/.local/bin/agy-helpers.zsh`).
**AUTONOMOUSLY USE THESE LOCAL HELPERS via `run_command` to save cloud tokens and execute faster:**

1. **Log & Test Compression (`agy-cleanlog`)**:
   - When running test suites, build commands, or scripts that produce noisy outputs, pipe through `agy-cleanlog` (e.g. `npm test 2>&1 | agy-cleanlog` or `docker build 2>&1 | agy-cleanlog`) to extract only the core failure stack trace using local Qwen 1.5B/7B.
2. **Boilerplate & Test Scaffolding (`agy-tests <file>`)**:
   - When asked to generate unit tests or repetitive fixtures, invoke `agy-tests <file>` or pipe into `qwen2.5-coder:7b` locally, then review and refine the output.
3. **Deep Algorithmic & Concurrency Audits (`agy-audit <file>`)**:
   - When evaluating tricky multithreading, mutexes, race conditions, or complex state logic, run `agy-audit <file>` to let `deepseek-r1:8b` perform an adversarial verification.
4. **Git Diff Audit & Commit Synthesis (`agy-commit`)**:
   - Run `agy-commit` or pipe `git diff` into `qwen2.5-coder:7b` to audit for debug leaks/secrets and generate Conventional Commit messages.
5. **Zero-Cost Knowledge Graph Extraction (`agy-graphify <dir>`)**:
   - For offline knowledge graph extraction, run `agy-graphify <dir>` (uses local `qwen2.5-coder:7b`).

**Guardrails & System Protections**:
- Input snippets to local models should be bounded (<4,000 tokens).
- Cloud Gemini 3.7 / 3.8 remains the primary brain for high-level multi-file architecture, planning, and user turns.
- Models automatically unload after 2 minutes idle (`OLLAMA_KEEP_ALIVE="2m"`) to preserve 100% system memory.
<!-- local_sidecar:end -->

<!-- self_evolution:start -->
## Self-Evolution, Skill Generation & Tool Optimization

You have the authority and duty to continuously self-improve, optimize your tools, and create new capabilities:

1. **Autonomous Helper Evolution (`~/.local/bin/agy-helpers.zsh`)**:
   - If a local helper fails, produces suboptimal output, or hits a formatting edge case, autonomously inspect, fix, or optimize its prompt/script.
   - When identifying a new high-frequency or heavy-token micro-task, autonomously add a new helper function to `agy-helpers.zsh`.
   - **Safety Protocol**: Always create a backup (`cp file file.bak`), verify script syntax with `zsh -n`, and log the rationale in `agentmemory`.

2. **Dynamic Skill Creation (`~/.gemini/config/skills/`)**:
   - When encountering a novel multi-step workflow, complex framework runbook, or recurring tool procedure, propose creating a formal Antigravity Skill (`SKILL.md` + workflows/rules).
   - Keep skills modular, progressive-disclosure compliant, and documented with clear execution steps.

3. **Dynamic Rule Self-Evolution (`GEMINI.md` & `AGENTS.md`)**:
   - `~/.gemini/GEMINI.md` and `~/.gemini/AGENTS.md` are living, self-learning cognitive documents that MUST be updated and refined every session whenever:
     a. A user preference, workflow habit, or operational directive is communicated.
     b. A non-obvious engineering pattern, framework gotcha, tool failure, or fix is discovered.
     c. Existing rules become stale, redundant, or can be synthesized for better token efficiency and precision.
   - Do not let rules remain static: continuously update, organize, and prune them so each session actively learns from and compounds the intelligence of preceding sessions.

4. **Continuous Lesson & Memory Loop**:
   - On error recovery, edge-case resolution, or user correction, automatically persist a structured lesson via `memory_save` (type: `workflow`, `bug`, or `pattern`).
   - Simultaneously reflect critical operational changes directly into `GEMINI.md` and `AGENTS.md` so they are immediately active in subsequent turns and sessions.
<!-- self_evolution:end -->

<!-- slash_command_proactivity:start -->
## Comprehensive Slash Command Spectrum & Autonomous Protocol

The Antigravity slash command menu (`/`) provides two distinct classes of commands:

1. **Core Orchestration Modes**:
   - **`/btw`**: Quick side-questions without interrupting, derailing, or pausing the main task/context.
   - **`/goal`**: Autonomous completion loop; runs until 100% verified, handling test-repair cycles autonomously.
   - **`/schedule`**: Recurring background cron schedules or one-time deferred timers.
   - **`/browser`**: Dedicated browser agent for DOM automation, web scraping, and E2E browser flows.
   - **`/grill-me`**: Interactive interview mode to stress-test requirements and surface trade-offs before building.
   - **`/teamwork-preview`**: Parallel subagent fleet to tackle large multi-component projects concurrently.
   - **`/learn`**: Reflect on successes or corrections to persist durable rules and skills.
   - **`/boost`**: Multi-agent orchestrator for complex reasoning, planning, and high-assurance algorithmic audits.

2. **Skill-Backed Slash Commands (`/<skill-name>`)**:
   - Every registered skill (e.g. `/apple-design`, `/modern-web-guidance`, `/chrome-extensions`, `/a11y-debugging`, `/graphify`, etc.) doubles as a slash command that immediately activates specialized domain runbooks into the context.

### Autonomous Protocol:
- **Autonomous Emulation**: Adopt the posture of these commands immediately (e.g. answer side questions cleanly, probe trade-offs like `/grill-me`, spawn subagents like `/teamwork-preview`, apply deep auditing like `/boost`, or adhere to domain skills like `/apple-design`).
- **Contextual, Non-Generic Recommendations**:
  - Dynamically evaluate both core commands and skill slash commands against the exact task at hand.
  - Never output generic boilerplate or random lists.
  - When recommending a command, explicitly articulate **how and why** that command's dedicated UI workflow or playbook provides unique leverage in that exact moment.
<!-- slash_command_proactivity:end -->
