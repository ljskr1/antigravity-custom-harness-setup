#!/usr/bin/env python3
import json
import os
import subprocess
import sys
import time
import urllib.request

CACHE_FILE = "/tmp/agy_zen_cache.json"

def probe_ollama():
    try:
        req = urllib.request.Request("http://localhost:11434/api/tags", headers={"User-Agent": "AntigravityHarness"})
        with urllib.request.urlopen(req, timeout=0.25) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                return [m.get("name", "") for m in data.get("models", []) if m.get("name")]
    except Exception:
        pass
    return None

def probe_zen():
    now = time.time()
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r") as f:
                cached = json.load(f)
                if now - cached.get("timestamp", 0) < 60:
                    return cached.get("models", [])
        except Exception:
            pass

    try:
        req = urllib.request.Request("http://localhost:3010/v1/models", headers={"User-Agent": "curl/8.7.1"})
        with urllib.request.urlopen(req, timeout=2.5) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                raw_models = [m.get("id", "") for m in data.get("data", []) if m.get("id")]
                # Filter out known unavailable models and prioritize reliable free workers
                preferred = ["mimo-v2.5-free", "muse-spark-1.3-contributor-free", "nemotron-3.5-lightning-free", "big-pickle"]
                ordered = [m for m in preferred if m in raw_models]
                for m in raw_models:
                    if m not in ordered and m != "deepseek-v4-flash-free":
                        ordered.append(m)
                with open(CACHE_FILE, "w") as f:
                    json.dump({"timestamp": now, "models": ordered}, f)
                return ordered
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
    zen_models = probe_zen()

    if local_models is None:
        try:
            subprocess.Popen(["brew", "services", "start", "ollama"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except Exception:
            pass

    workspace_paths = payload.get("workspacePaths", [])
    has_graph = any(os.path.exists(os.path.join(p, "graphify-out", "graph.json")) for p in workspace_paths)

    ollama_status = f"Active ({', '.join(local_models[:3])})" if local_models else "Offline/Spinning up"
    zen_status = f"Active ({', '.join(zen_models[:3])})" if zen_models else "Offline"

    guidance = (
        f"[Antigravity Harness Step 0 Gate]\n"
        f"• Local Ollama Fleet: {ollama_status}\n"
        f"• Zen Router (Free Worker): {zen_status}\n"
        f"• Codebase AST Graph: {'Found (use graphify query)' if has_graph else 'None (use AST grep/search)'}\n"
        f"• Master-Worker Protocol:\n"
        f"  1. Master Architect (Cloud Gemini): Handles macro planning, architecture, and verification.\n"
        f"  2. Free Code Generation: Delegate heavy file scaffolding to 'agy-zen --prompt \"...\" --out <file>' to protect context.\n"
        f"  3. Token Efficiency: Pipe noisy logs through agy-cleanlog and diffs through agy-commit."
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
