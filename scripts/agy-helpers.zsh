# ==============================================================================
# Antigravity Local LLM Helper Suite (Token Savers & Pre-Filters)
# Integrates with local Ollama runtime (http://localhost:11434)
# ==============================================================================

# Ensure Ollama auto-unloads to protect system RAM for Docker / IDE
export OLLAMA_KEEP_ALIVE="2m"
export OLLAMA_NUM_PARALLEL=1

# Helper: Auto-heal / auto-start Ollama if stopped
_ensure_ollama() {
  if ! curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
    echo "Local Ollama daemon not responding. Attempting auto-start..." >&2
    if command -v brew >/dev/null 2>&1 && brew services list 2>/dev/null | grep -q ollama; then
      brew services start ollama >/dev/null 2>&1
    else
      nohup ollama serve >/dev/null 2>&1 &
    fi
    local retries=6
    while [ $retries -gt 0 ]; do
      if curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
        echo "Ollama daemon connected." >&2
        return 0
      fi
      sleep 0.5
      retries=$((retries - 1))
    done
    echo "Warning: Ollama is not running. Start with 'brew services start ollama' or 'ollama serve'." >&2
    return 1
  fi
  return 0
}

# 1. Compress noisy terminal logs/errors before pasting to Cloud Gemini
# Usage: npm test 2>&1 | agy-cleanlog   OR   cat error.log | agy-cleanlog
agy-cleanlog() {
  local input
  input=$(cat)
  if [ -z "$input" ]; then
    echo "Usage: <command> 2>&1 | agy-cleanlog"
    return 1
  fi

  if ! _ensure_ollama; then
    echo "\n--- Raw Error (Ollama offline fallback) ---"
    echo "$input" | tail -n 25
    return 0
  fi

  echo "Compressing log with local Qwen 1.5B..." >&2
  local bounded_input
  bounded_input=$(echo "$input" | tail -c 8000)
  local prompt="You are a developer log compression filter. Extract ONLY the root cause error, failing test/module name, and relevant stack trace in under 12 lines. Strip all noisy passing tests, build logs, and progress bars:\n\n$bounded_input"
  
  local summary
  summary=$(curl -s http://localhost:11434/api/generate -d "$(jq -n --arg m "qwen2.5-coder:1.5b" --arg p "$prompt" '{model: $m, prompt: $p, stream: false, options: {temperature: 0.1}}')" | jq -r '.response')
  
  echo "\n--- Compressed Error Summary (Copied to Clipboard) ---"
  echo "$summary"
  if command -v pbcopy >/dev/null 2>&1; then
    echo "$summary" | pbcopy
  fi
}

# 2. Local Diff Review & Conventional Commit Generator
# Usage: agy-commit   (reviews staged git diff)
agy-commit() {
  local stat
  local diff
  stat=$(git diff --staged --stat)
  diff=$(git diff --staged)
  if [ -z "$diff" ]; then
    stat=$(git diff --stat)
    diff=$(git diff)
    if [ -z "$diff" ]; then
      echo "No git changes detected."
      return 1
    fi
    echo "Note: Reviewing unstaged changes (stage with git add to commit)." >&2
  fi

  if ! _ensure_ollama; then
    echo "Ollama offline. Stage and commit manually." >&2
    return 1
  fi

  local bounded_diff
  bounded_diff=$(echo "$diff" | head -c 12000)

  local prompt="Here is the git diff summary and changes:
### Changed Files:
$stat

### Diff Excerpt:
$bounded_diff

Instructions:
1. Check for any exposed secrets, keys, or forgotten debug prints.
2. Propose a single, concise Conventional Commit message (feat, fix, docs, refactor, chore) with an optional 2-3 bullet description. Output ONLY the commit message."

  echo "Analyzing diff with local Qwen 7B Coder..." >&2
  curl -s http://localhost:11434/api/generate -d "$(jq -n --arg m "qwen2.5-coder:7b" --arg p "$prompt" '{model: $m, prompt: $p, stream: false, options: {temperature: 0.2}}')" | jq -r '.response'
}

# 3. Unit Test Scaffolder (Zen Router Muse Spark 1.3 Free)
# Usage: agy-tests src/services/auth.ts
agy-tests() {
  local file="$1"
  if [ ! -f "$file" ]; then
    echo "Usage: agy-tests <path-to-source-file>"
    return 1
  fi

  if command -v agy-zen >/dev/null 2>&1; then
    echo "Scaffolding unit tests for $file using Zen Router (Muse Spark 1.3 Free)..." >&2
    agy-zen --model muse-spark-1.3-contributor-free --prompt "Write comprehensive unit tests with edge-case coverage for this code. Output ONLY valid test code." -f "$file"
  else
    echo "Zen Router client (agy-zen) not found. Ask Cloud Gemini to generate unit tests directly." >&2
    return 1
  fi
}

# 4. Deep Algorithmic & Concurrency Logic Audit (DeepSeek-R1)
# Usage: agy-audit src/concurrency/queue.go
agy-audit() {
  local file="$1"
  if [ ! -f "$file" ]; then
    echo "Usage: agy-audit <path-to-source-file>"
    return 1
  fi

  if ! _ensure_ollama; then
    return 1
  fi

  local code
  code=$(head -c 16000 "$file")

  local prompt="Perform a deep step-by-step logic, race-condition, deadlock, and edge-case verification of this code. Output a concise 5-bullet audit report of risks and fixes:\n\n$code"

  echo "Running deep logic & race-condition audit with DeepSeek-R1..." >&2
  curl -s http://localhost:11434/api/generate -d "$(jq -n --arg m "deepseek-r1:8b" --arg p "$prompt" '{model: $m, prompt: $p, stream: false, options: {temperature: 0.2}}')" | jq -r '.response'
}

# 5. Offline Zero-Cost Graphify Extraction
# Usage: agy-graphify ./src
agy-graphify() {
  local target="${1:-.}"
  if ! _ensure_ollama; then
    return 1
  fi
  echo "Running 100% offline Graphify extraction on $target with Qwen 7B Coder..."
  graphify extract --backend ollama --model qwen2.5-coder:7b "$target"
}

# 6. Unified Helper Directory & Status
# Usage: agy-help
agy-help() {
  cat <<'EOF'
Antigravity Local Sidecar & Zen Fleet Overview:
----------------------------------------------------------------------
• agy-cleanlog      Pipe noisy logs/test output to compress via Qwen 1.5B
                    Usage: npm test 2>&1 | agy-cleanlog
• agy-commit        Audit git diff for leaks and draft conventional commit
                    Usage: agy-commit
• agy-tests <file>  Generate unit tests for source file via Zen Router (Muse Spark 1.3)
                    Usage: agy-tests src/service.ts
• agy-audit <file>  Deep adversarial logic/concurrency audit via DeepSeek-R1
                    Usage: agy-audit src/queue.go
• agy-graphify <dir> Offline AST knowledge graph extraction via Qwen 7B
                    Usage: agy-graphify ./src
• agy-update        Check and auto-update open-source tools (Graphify, AgentMemory, Ollama)
                    Usage: agy-update   OR   agy-update --apply
• agy-zen           Scaffold boilerplate directly to disk via Zen Router
                    Usage: agy-zen --prompt "..." --out path/to/file
----------------------------------------------------------------------
EOF
}
