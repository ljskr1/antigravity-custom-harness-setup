/**
 * Antigravity Mission Control — Frontend Controller
 * Conforms to Apple Design System standards
 */

import { HARNESS_TELEMETRY } from "./mock-data.js";

document.addEventListener("DOMContentLoaded", () => {
  initMetrics();
  initFleetCards();
  initAuditTable();
  initTabs();
  initWorkbench();
  initTokenFlowCanvas();
});

/* -------------------------------------------------------------------------- */
/* 1. KEY PERFORMANCE INDICATORS                                              */
/* -------------------------------------------------------------------------- */
function initMetrics() {
  const { tokenSavings } = HARNESS_TELEMETRY;
  if (!tokenSavings) return;

  const cloudTokensEl = document.getElementById("cloudTokensCount");
  const workerTokensEl = document.getElementById("workerTokensCount");
  const costAvoidedEl = document.getElementById("costAvoidedCount");

  if (cloudTokensEl) cloudTokensEl.textContent = tokenSavings.masterCloudTokensSaved.toLocaleString();
  if (workerTokensEl) workerTokensEl.textContent = tokenSavings.workerFreeTokensUsed.toLocaleString();
  if (costAvoidedEl) costAvoidedEl.textContent = `$${tokenSavings.totalEstimatedCostSavedUSD.toFixed(2)}`;
}

/* -------------------------------------------------------------------------- */
/* 2. FLEET CARDS RENDERING                                                   */
/* -------------------------------------------------------------------------- */
function initFleetCards() {
  const grid = document.getElementById("fleetCardsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  // Render Local Ollama Fleet
  HARNESS_TELEMETRY.models.forEach((m) => {
    const card = document.createElement("article");
    card.className = "fleet-card";
    card.setAttribute("aria-label", `Model ${m.id}`);

    card.innerHTML = `
      <div class="fleet-card-header">
        <span class="model-name">${escapeHtml(m.id)}</span>
        <span class="model-badge ${escapeHtml(m.status)}">${escapeHtml(m.status)}</span>
      </div>
      <p class="model-desc">${escapeHtml(m.description)}</p>
      <div class="model-meta">
        <span>Role: <strong>${escapeHtml(m.role)}</strong></span>
        <span>Params: <strong>${escapeHtml(m.parameterCount)}</strong></span>
        <span>Latency: <strong>${m.latencyMs}ms</strong></span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Render Zen Router Workers
  HARNESS_TELEMETRY.zenWorkers.forEach((z) => {
    const card = document.createElement("article");
    card.className = "fleet-card";
    card.setAttribute("aria-label", `Worker ${z.model}`);

    card.innerHTML = `
      <div class="fleet-card-header">
        <span class="model-name">${escapeHtml(z.model)}</span>
        <span class="model-badge ${escapeHtml(z.status)}">${escapeHtml(z.status)}</span>
      </div>
      <p class="model-desc">Zero-cost worker proxied via ${escapeHtml(z.provider)} on localhost:3010. Direct-to-disk code generation engine.</p>
      <div class="model-meta">
        <span>Context: <strong>${(z.contextWindow / 1024).toFixed(0)}k</strong></span>
        <span>Cost/tok: <strong>$${z.costPerToken.toFixed(2)}</strong></span>
        <span>Tier: <strong>Free Worker</strong></span>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* -------------------------------------------------------------------------- */
/* 3. AUDIT TABLE RENDERING                                                   */
/* -------------------------------------------------------------------------- */
function initAuditTable() {
  const tbody = document.getElementById("auditTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  HARNESS_TELEMETRY.auditHistory.forEach((log) => {
    const tr = document.createElement("tr");

    const dateStr = new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    tr.innerHTML = `
      <td style="font-family: monospace;">${escapeHtml(dateStr)}</td>
      <td style="font-weight: 600; color: var(--text-primary);">${escapeHtml(log.component)}</td>
      <td><span class="status-tag ${escapeHtml(log.status)}">${escapeHtml(log.status)}</span></td>
      <td>${escapeHtml(log.details)}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* -------------------------------------------------------------------------- */
/* 4. TAB NAVIGATION CONTROLLER                                               */
/* -------------------------------------------------------------------------- */
function initTabs() {
  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  const fleetSec = document.getElementById("fleetSection");
  const benchSec = document.getElementById("workbenchSection");
  const auditSec = document.getElementById("auditSection");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.getAttribute("data-tab");

      if (tab === "all") {
        if (fleetSec) fleetSec.style.display = "block";
        if (benchSec) benchSec.style.display = "block";
        if (auditSec) auditSec.style.display = "block";
      } else if (tab === "fleet") {
        if (fleetSec) fleetSec.style.display = "block";
        if (benchSec) benchSec.style.display = "none";
        if (auditSec) auditSec.style.display = "none";
      } else if (tab === "workbench") {
        if (fleetSec) fleetSec.style.display = "none";
        if (benchSec) benchSec.style.display = "block";
        if (auditSec) auditSec.style.display = "none";
      } else if (tab === "audit") {
        if (fleetSec) fleetSec.style.display = "none";
        if (benchSec) benchSec.style.display = "none";
        if (auditSec) auditSec.style.display = "block";
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. INTERACTIVE WORKBENCH & LIVE SIMULATOR                                 */
/* -------------------------------------------------------------------------- */
function initWorkbench() {
  const runBtn = document.getElementById("runBenchmarkBtn");
  const clearBtn = document.getElementById("clearConsoleBtn");
  const select = document.getElementById("benchmarkSelect");
  const consoleOutput = document.getElementById("consoleOutput");
  const consoleStatus = document.getElementById("consoleStatus");

  if (!runBtn || !consoleOutput) return;

  clearBtn?.addEventListener("click", () => {
    consoleOutput.textContent = "// Terminal output cleared.\n";
    if (consoleStatus) consoleStatus.textContent = "READY";
  });

  runBtn.addEventListener("click", async () => {
    const taskKey = select?.value || "lru";
    runBtn.disabled = true;
    if (consoleStatus) consoleStatus.textContent = "RUNNING";

    appendConsole(`\n[${new Date().toLocaleTimeString()}] Starting execution workflow: ${taskKey}...`);
    appendConsole(`[Step 0 Gate] Probing Ollama (11434) and Zen Router (3010)... OK`);
    appendConsole(`[Master Architect] Evaluating Delegation Decision Matrix:`);

    let targetModel = "mimo-v2.5-free";
    let targetFile = "src/cache.ts";
    let isDelegated = true;

    if (taskKey === "lru") {
      appendConsole(`  • Task Category: Boilerplate Data Structure`);
      appendConsole(`  • Decision: DELEGATE TO ZEN WORKER (${targetModel})`);
      appendConsole(`  • Invoking: agy-zen --model ${targetModel} --out ${targetFile}`);
    } else if (taskKey === "pydantic") {
      targetFile = "schemas/payload.py";
      appendConsole(`  • Task Category: Pydantic Schema Scaffolding`);
      appendConsole(`  • Decision: DELEGATE TO ZEN WORKER (${targetModel})`);
      appendConsole(`  • Invoking: agy-zen --model ${targetModel} --out ${targetFile}`);
    } else if (taskKey === "regex") {
      targetFile = "tests/extractor.test.ts";
      appendConsole(`  • Task Category: Repetitive Unit Test Scaffolding`);
      appendConsole(`  • Decision: DELEGATE TO ZEN WORKER (${targetModel})`);
      appendConsole(`  • Invoking: agy-zen --model ${targetModel} --out ${targetFile}`);
    } else if (taskKey === "audit") {
      isDelegated = false;
      targetModel = "Gemini 3.8 Flash + DeepSeek-R1 8B";
      appendConsole(`  • Task Category: Concurrency / Race Condition Audit`);
      appendConsole(`  • Decision: GEMINI MUST WRITE DIRECTLY (Hazard: race conditions)`);
      appendConsole(`  • Delegating audit critique to local DeepSeek-R1 (agy-audit)`);
    }

    // Simulate streaming execution delay
    await sleep(600);
    if (isDelegated) {
      appendConsole(`[Stream] Incoming tokens: 2,450 chars received via SSE stream...`);
      await sleep(500);
      appendConsole(`[Multi-Block Extractor] Fences detected and extracted into ${targetFile}.`);
      appendConsole(`[Deterministic AST Check] Running syntax validation...`);
      await sleep(400);
      appendConsole(`  ✓ ${targetFile} [Syntax: Valid AST] (Verified in 18ms)`);
      appendConsole(`[Strike 1 Gate] Verified successfully. Zero retries needed.`);
      appendConsole(`[Token Report] Gemini cloud tokens burned: ~140 | Free tokens generated: 2,450\n`);
    } else {
      appendConsole(`[Deep Reasoning] DeepSeek-R1 analyzing lock invariants...`);
      await sleep(700);
      appendConsole(`[Audit Report] 5 concurrency checks verified: No deadlock hazard.`);
      appendConsole(`[Master Code] Gemini wrote clean Mutex implementation directly.\n`);
    }

    if (consoleStatus) consoleStatus.textContent = "COMPLETE";
    runBtn.disabled = false;
  });

  function appendConsole(text) {
    consoleOutput.textContent += text + "\n";
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeHtml(str) {
  if (typeof str !== "string") return String(str);
  return str.replace(/[&<>'"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[tag] || tag));
}

/* -------------------------------------------------------------------------- */
/* 6. TOKEN FLOW VISUALIZER (CANVAS 2D)                                       */
/* Strictly uses programmatic CanvasGradient or solid colors per rule          */
/* -------------------------------------------------------------------------- */
function initTokenFlowCanvas() {
  const canvas = document.getElementById("tokenFlowCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement?.clientWidth || 1152);
  let height = (canvas.height = 140);

  window.addEventListener("resize", () => {
    width = canvas.width = canvas.parentElement?.clientWidth || 1152;
    height = canvas.height = 140;
  });

  // Particle Stream Data
  const particles = [];
  const PARTICLE_COUNT = 45;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: height * 0.5 + (Math.random() - 0.5) * 40,
      radius: 1.5 + Math.random() * 2,
      speed: 1.2 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.7,
      type: Math.random() > 0.3 ? "free-worker" : "master-cloud",
    });
  }

  let step = 0;

  function render() {
    step += 0.03;

    // Clear background with solid hex
    ctx.fillStyle = "#161618";
    ctx.fillRect(0, 0, width, height);

    // Draw Smooth Wave Stream using Programmatic CanvasGradient
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, "rgba(41, 151, 255, 0.05)");
    grad.addColorStop(0.5, "rgba(48, 209, 88, 0.15)");
    grad.addColorStop(1, "rgba(41, 151, 255, 0.05)");

    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    for (let x = 0; x < width; x += 10) {
      const y = height * 0.5 + Math.sin(x * 0.008 + step) * 18 + Math.cos(x * 0.004 + step * 0.5) * 10;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw Stream Line
    ctx.beginPath();
    for (let x = 0; x < width; x += 10) {
      const y = height * 0.5 + Math.sin(x * 0.008 + step) * 18 + Math.cos(x * 0.004 + step * 0.5) * 10;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(41, 151, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw Particles (Tokens Flowing)
    particles.forEach((p) => {
      p.x += p.speed;
      if (p.x > width) {
        p.x = 0;
        p.y = height * 0.5 + (Math.random() - 0.5) * 45;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y + Math.sin(p.x * 0.008 + step) * 12, p.radius, 0, Math.PI * 2);

      if (p.type === "free-worker") {
        ctx.fillStyle = `rgba(48, 209, 88, ${p.alpha})`; // Apple Green: Free worker tokens
      } else {
        ctx.fillStyle = `rgba(41, 151, 255, ${p.alpha})`; // Apple Blue: Cloud tokens
      }
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
