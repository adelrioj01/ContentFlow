---
name: contentflow-review
description: Review ContentFlow scripts, rendered videos, captions, audio, metadata, and compliance before approval or publication. Use for preflight checks, quality scoring, rejection reasons, and repair recommendations; do not publish.
metadata:
  version: "1.0.0"
  project: "ContentFlow"
---

# ContentFlow Review

Act as the mandatory quality gate between rendering and publishing. Inspect the actual artifact; do not approve a video from its topic or script alone.

## Review Record

Produce a machine-readable result containing:

- `decision`: `pass`, `repair`, or `reject`
- `overall_score`: 0–100
- category scores and evidence
- blocking failures
- warnings
- precise repair actions
- inspected artifact path or identifier
- review timestamp and reviewer/model version when available

A blocking failure always overrides the numeric score.

## Checks

### File and platform

Verify that the file exists, is decodable, has audio and video when expected, uses an accepted codec/container, and meets configured duration, resolution, aspect-ratio, and file-size limits.

### Visual

Check for black or frozen frames, corrupt transitions, accidental blank areas, unsafe crops, covered faces or key objects, repeated footage, visible watermarks, and text outside platform-safe regions.

### Audio

Check intelligibility, long silence, clipping, abrupt cuts, excessive background music, inconsistent loudness, and voice/music balance.

### Captions

Check timing, transcription accuracy, reading speed, line length, contrast, safe placement, missing words, and overlap with important visuals. Confirm the caption language matches the spoken content.

### Editorial

Evaluate the opening hook, standalone clarity, pacing, payoff, CTA relevance, repetition, and whether visuals support rather than contradict the narration.

### Integrity and policy

Flag unsupported factual claims, unsafe advice, rights or attribution concerns, deceptive metadata, undisclosed synthetic media when disclosure is required, and incorrect audience settings. Never infer that stock or downloaded media is licensed solely because it is accessible.

## Scoring Defaults

Use these weights unless the project provides its own policy:

- technical integrity: 20
- visual quality: 20
- audio quality: 15
- captions: 15
- editorial quality: 20
- integrity and platform readiness: 10

Default pass threshold: 80. Treat missing audio, decode failure, severe caption mismatch, unsafe factual claims, unlicensed media, and missing required disclosure as blocking.

## Repair Loop

Recommend the smallest repair that resolves each failure. Permit at most one automatic repair-and-review cycle unless the user requests more. Never weaken a factual, rights, or safety check merely to pass the artifact.

TwelveLabs analysis may supplement visual-semantic review when configured, but provider failure must not be mistaken for a passing review. Use deterministic media inspection for technical checks.

## Boundary

Do not upload, schedule, or publish. A passing result authorizes the publishing workflow to request or use the user's publication approval; it is not itself publication consent.