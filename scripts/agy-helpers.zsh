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
  local summary
  summary=$(echo "$input" | ollama run qwen2.5-coder:1.5b \
    "You are a developer log compression filter. Extract ONLY the root cause error, failing test/module name, and relevant stack trace in under 12 lines. Strip all noisy passing tests, build logs, and progress bars.")
  
  echo "\n--- Compressed Error Summary (Copied to Clipboard) ---"
  echo "$summary"
  if command -v pbcopy >/dev/null 2>&1; then
    echo "$summary" | pbcopy
  fi
}

# 2. Local Diff Review & Conventional Commit Generator
# Usage: agy-commit   (reviews staged git diff)
agy-commit() {
  local diff
  diff=$(git diff --staged)
  if [ -z "$diff" ]; then
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

  echo "Analyzing diff with local Qwen 7B Coder..." >&2
  ollama run qwen2.5-coder:7b \
    "Analyze this git diff. 
1. Check for any forgotten debug prints (e.g. console.log, print, debugger) or secrets.
2. Output a clean Conventional Commit message (type(scope): description).
Output ONLY the audit notes (if any) followed by the commit message.

Diff:
$diff"
}

# 3. Local Unit Test Scaffolder
# Usage: agy-tests src/services/auth.ts
agy-tests() {
  local file="$1"
  if [ ! -f "$file" ]; then
    echo "Usage: agy-tests <path-to-source-file>"
    return 1
  fi

  if ! _ensure_ollama; then
    return 1
  fi

  echo "Scaffolding unit tests for $file using Qwen 7B Coder..." >&2
  ollama run qwen2.5-coder:7b \
    "Write comprehensive unit tests with edge-case coverage for the following code. Use the standard test framework for this language. Output ONLY valid test code.

Code:
$(cat "$file")"
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

  echo "Running deep logic & race-condition audit with DeepSeek-R1..." >&2
  ollama run deepseek-r1:8b \
    "Perform a deep step-by-step logic, race-condition, deadlock, and edge-case verification of this code. Explain your reasoning:

$(cat "$file")"
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
