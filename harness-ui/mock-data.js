export const HARNESS_TELEMETRY = {
  models: [
    {
      id: 'qwen2.5-coder:1.5b',
      role: 'quick-scaffold',
      parameterCount: '1.5B',
      status: 'online',
      latencyMs: 320,
      description: 'Rapid prototyping and lightweight scaffolding tasks. Ideal for tight loops and low-latency local inference.'
    },
    {
      id: 'qwen2.5-coder:7b',
      role: 'primary-coder',
      parameterCount: '7B',
      status: 'online',
      latencyMs: 890,
      description: 'Main workhorse for code generation, refactoring, and multi-file edits. Balanced quality-to-speed ratio for local inference.'
    },
    {
      id: 'deepseek-r1:8b',
      role: 'reasoning-critic',
      parameterCount: '8B',
      status: 'online',
      latencyMs: 1150,
      description: 'Chain-of-thought reasoning specialist. Used for architectural review, edge-case analysis, and logical validation of generated code.'
    },
    {
      id: 'moondream:latest',
      role: 'vision-annotator',
      parameterCount: '1.6B',
      status: 'idle',
      latencyMs: 610,
      description: 'Lightweight multimodal model for UI screenshot analysis, diagram parsing, and visual-to-code annotation tasks.'
    }
  ],

  zenWorkers: [
    {
      model: 'mimo-v2.5-free',
      provider: 'ZenRouter',
      contextWindow: 32768,
      costPerToken: 0.0,
      status: 'active'
    },
    {
      model: 'muse-spark-1.3-contributor-free',
      provider: 'ZenRouter',
      contextWindow: 16384,
      costPerToken: 0.0,
      status: 'active'
    },
    {
      model: 'nemotron-3.5-lightning-free',
      provider: 'ZenRouter',
      contextWindow: 40960,
      costPerToken: 0.0,
      status: 'throttled'
    }
  ],

  tokenSavings: {
    masterCloudTokensSaved: 142500,
    workerFreeTokensUsed: 210000,
    totalEstimatedCostSavedUSD: 4.25,
    cacheHitRatePercent: 94.2,
    sessionStartedAt: '2025-07-13T08:00:00.000Z',
    lastUpdated: '2025-07-13T14:32:17.441Z'
  },

  auditHistory: [
    {
      timestamp: '2025-07-13T14:32:17.441Z',
      component: 'ASTValidator',
      status: 'pass',
      details: 'All 12 generated modules passed AST parse check. No syntax errors detected.'
    },
    {
      timestamp: '2025-07-13T14:28:03.112Z',
      component: 'CacheManager',
      status: 'pass',
      details: 'Cache eviction integrity verified. 2048 entries managed with correct LRU ordering.'
    },
    {
      timestamp: '2025-07-13T14:15:44.789Z',
      component: 'ZenRouter',
      status: 'warning',
      details: 'nemotron-3.5-lightning-free provider returned HTTP 429. Request queued and retried after 2000ms backoff.'
    },
    {
      timestamp: '2025-07-13T13:58:22.003Z',
      component: 'HarnessOrchestrator',
      status: 'fail',
      details: 'Model deepseek-r1:8b unresponsive after 3 consecutive timeout windows. Task rerouted to qwen2.5-coder:7b.'
    },
    {
      timestamp: '2025-07-13T13:41:09.665Z',
      component: 'TokenBudgetGuard',
      status: 'pass',
      details: 'Session token spend within 73% of daily budget. No throttling required.'
    }
  ],

  sampleBenchmarks: [
    {
      task: 'LRU Cache Scaffolding',
      workerModel: 'qwen2.5-coder:7b',
      executionTimeMs: 4200,
      astValid: true,
      generatedChars: 3847
    },
    {
      task: 'Pydantic Schema Generation',
      workerModel: 'mimo-v2.5-free',
      executionTimeMs: 2100,
      astValid: true,
      generatedChars: 2156
    },
    {
      task: 'Regex Extractor Unit Tests',
      workerModel: 'deepseek-r1:8b',
      executionTimeMs: 5870,
      astValid: true,
      generatedChars: 6293
    }
  ]
};
