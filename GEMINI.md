# Antigravity Custom Harness Setup Workspace
<!-- Inherits living global directives from ~/.gemini/GEMINI.md and ~/.gemini/AGENTS.md -->

## Project Scope & Conventions
This workspace is the public repository for `antigravity-custom-harness-setup` (https://github.com/ljskr1/antigravity-custom-harness-setup).
- **Global Directives**: Step 0 Execution Gate, Master-Worker delegation, and slash commands are active via `~/.gemini/GEMINI.md` and `~/.gemini/AGENTS.md`.
- **Public Templates**: Production templates reside in `templates/` (`GEMINI.md`, `AGENTS.md`, `hooks.json`, `mcp_config.example.json`).
- **Security & Privacy**: Ensure all committed files remain 100% sanitized. Never commit real API keys, secrets, tokens, or personal paths. Zero sensitive data to free workers.
- **Verification**: Verify all helper scripts with deterministic tooling (`zsh -n`, `python3 -m py_compile`, `bun build --no-bundle`, `agy-update`).
