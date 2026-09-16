---
name: contentflow-strategist
description: Plan short-form content for ContentFlow when the user needs video ideas, hooks, campaign briefs, a content backlog, or platform-specific creative direction. Use before generation; do not render or publish videos.
metadata:
  version: "1.0.0"
  project: "ContentFlow"
---

# ContentFlow Strategist

Turn a channel goal, audience, niche, product, or campaign into production-ready short-video briefs. Preserve the user's positioning and avoid inventing business facts.

## Outcome

Return a ranked backlog of briefs. Each brief must be specific enough for `contentflow-create` or the ContentFlow API to produce without repeating strategy work.

For every brief include:

- `id`: stable slug
- `objective`: awareness, education, engagement, conversion, or retention
- `audience`
- `topic` and differentiated `angle`
- `hook_variants`: three materially different openings
- `audience_promise`
- `outline`: setup, development, payoff, CTA
- `visual_direction`
- `search_terms`: concrete footage concepts, not abstract themes
- `target_duration_seconds`
- `platforms`
- `platform_notes`: differences for TikTok, Reels, and Shorts
- `claims_to_verify`
- `risk_notes`
- `success_metric`

## Workflow

1. Use supplied brand rules, product facts, previous topics, and performance data. Ask only for missing information that would materially change the strategy.
2. If current trends, competitors, products, or factual claims matter, research them from authoritative sources and preserve source links in the brief.
3. Generate several candidate angles, then rank them for audience fit, novelty, clarity, production feasibility, and strength of payoff.
4. Reject duplicate, vague, misleading, or footage-dependent ideas that ContentFlow cannot render convincingly.
5. Prefer a varied backlog across formats such as explanation, myth correction, list, story, comparison, demonstration, and response.
6. Mark factual assertions that the script writer must verify. Never convert speculation into fact.
7. Do not trigger rendering or publication. Hand the selected brief to the creation workflow only when the user requests production.

## Handoff

Provide the selected brief as JSON-compatible data. Keep hooks and CTA text separate from the factual outline so they can be tested independently.