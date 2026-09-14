#!/usr/bin/env python3
import json
import os
import subprocess
import sys
import urllib.request

def probe_ollama():
    try:
        req = urllib.request.Request("http://localhost:11434/api/tags", headers={"User-Agent": "AntigravityHarness"})
        with urllib.request.urlopen(req, timeout=0.3) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                return [m.get("name", "") for m in data.get("models", []) if m.get("name")]
    except Exception:
        pass
    return None

def main():
    try:
        raw_input = sys.stdin.read()
        payload = json.loads(raw_input) if raw_input.strip() else {}
    except Exception:
        payload = {}

    local_models = probe_ollama()
    auto_started = False

    # Auto-heal: If Ollama is down, trigger background start
    if local_models is None:
        try:
            subprocess.Popen(["brew", "services", "start", "ollama"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            auto_started = True
        except Exception:
            try:
                subprocess.Popen(["ollama", "serve"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                auto_started = True
            except Exception:
                pass

    # Check workspace graph
    workspace_paths = payload.get("workspacePaths", [])
    has_graph = False
    for path in workspace_paths:
        if os.path.exists(os.path.join(path, "graphify-out", "graph.json")):
            has_graph = True
            break

    # Determine status string
    if local_models:
        fleet_status = f"Active: {', '.join(local_models[:3])}"
    elif auto_started:
        fleet_status = "Spinning up in background (fallback to Cloud Gemini for this turn)"
    else:
        fleet_status = "Offline (Cloud Gemini active for all tasks)"

    guidance = (
        f"[Antigravity Harness Step 0 Gate]\n"
        f"• Local Ollama Fleet: {fleet_status}\n"
        f"• Codebase AST Graph: {'Found (use graphify query)' if has_graph else 'None (use AST grep/search)'}\n"
        f"• Mandatory Directives:\n"
        f"  1. Start of task: Check AgentMemory (memory_recall/memory_smart_search) for past architecture decisions.\n"
        f"  2. Fast-evolving APIs (Next.js/Supabase/Tailwind): Query Context7 before writing code.\n"
        f"  3. Token Efficiency: Pipe noisy build/test logs through agy-cleanlog, diffs through agy-commit (Qwen), and tricky concurrency audits through agy-audit (DeepSeek-R1)."
    )

    output = {
        "injectSteps": [
            {
                "ephemeralMessage": guidance
            }
        ]
    }

    print(json.dumps(output))

if __name__ == "__main__":
    main()
