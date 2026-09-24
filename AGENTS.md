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
- **`/teamwork-preview`**: Parallel subagent fleet to divide and conquer large deliverables across isolated workspaces (Google Cloud native).
- **`/zen-team`**: Autonomous two-phase teamwork fleet powered by local Zen Router (MiMo v2.5 / Muse Spark) and Ollama (DeepSeek-R1) with zero cloud token consumption.
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

## Native Multi-Agent Orchestration & Clean Master-Worker Separation (Option B)

### 1. Native `/teamwork-preview` Protocol (Google Native Specification)
- When the user triggers `/teamwork-preview`:
  1. **Phase 1 (Drafting & Acceptance Criteria)**: Scaffolds `prompt_draft.md` with structured requirements (R1, R2...), objective verification mechanisms, and checkable acceptance criteria.
  2. **Phase 2 (Native Delegation)**: Upon user confirmation ("go", "launch", "looks good"), delegates to Google's official native multi-agent framework:
     - Invoke `TypeName: "teamwork_preview"`, `Model: "inherit"` (Gemini 3.8 Flash) with the complete prompt text.
  3. **Zero Hijacking & Zero Interference**:
     - NEVER replace `teamwork_preview` with ad-hoc `TypeName: "self"` subagents.
     - NEVER inject alien local shell directives into Google's native cloud subagents.
     - Allow Google's built-in cloud Orchestrator, Explorers, Implementers, and Reviewers to operate natively with full platform capability.

### 2. Clean Master-Worker Separation
- **Primary Brain (Cloud Gemini 3.8 Flash)**:
  - Natively handles 100% of high-level architecture, design reasoning, surgical line reviews, and multi-agent orchestration.
- **Local & Zen Router Fleet (Mechanical Utility Sidecar Only)**:
  - Local Ollama and Zen Router exist strictly as auxiliary CLI tools for mechanical offloading:
    - `agy-cleanlog`: Compresses verbose test suites and terminal traces (Qwen 1.5B) before pasting to cloud context.
    - `agy-commit`: Audits staged git diffs and drafts conventional commit messages (Qwen 7B).
    - `agy-zen`: Scaffolds repetitive single-file boilerplate or mock fixtures directly to disk when explicitly called via CLI (`agy-zen --prompt "..." --out <path>`).
  - These sidecar tools never intercept, modify, or hijack Google's native cloud agent pipeline.

### 3. The Prompt Contract Protocol (Contract-Level Worker Prompting)
- Small and free worker models (`qwen2.5-coder:7b`, `mimo-v2.5-free`) are literal code executors that default to generic training habits unless constrained.
- **Never economize on instruction depth from Cloud Gemini**: Spending 300–500 cloud tokens to provide an exhaustive, contract-level prompt achieves 95%+ first-pass success:
  1. **Explicit DOM & State Contracts**: Specify exact HTML element IDs, `data-*` attributes (e.g. `data-segment="<name>"`), classes, and matching JavaScript event handlers and query selectors so the worker never desynchronizes markup from script.
  2. **Negative Constraints ("NEVER" Rules)**: Explicitly forbid bad training defaults:
     - *"NEVER reduce touch targets below 44×44pt in media queries."*
     - *"NEVER use linear or ease-in-out transitions for interactive controls."*
     - *"NEVER omit accessibility roles (role='tablist', role='tab', aria-selected) or unhandled error states."*
  3. **Exact Mathematical & Physics Tokens**: Supply concrete CSS cubic-bezier curves (e.g., `cubic-bezier(0.25, 1, 0.5, 1)`), exact diffused shadow opacities (alpha ≤ 0.28), and exact typography stacks directly in the prompt.



