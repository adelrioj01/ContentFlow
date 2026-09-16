---
name: contentflow-repurpose
description: Convert a user-owned or authorized long video, podcast, interview, webinar, or stream into ranked vertical short-video candidates for ContentFlow. Use for clipping and reframing existing media, not topic-to-video generation.
metadata:
  version: "1.0.0"
  project: "ContentFlow"
---

# ContentFlow Repurpose

Create short-form candidates from source media the user owns or is authorized to reuse. Do not download, clip, or publish third-party content without a clear right to do so.

## Inputs

Resolve:

- source file or authorized URL
- target platforms
- desired clip count and duration range
- language
- layout preference
- brand and caption rules
- whether publication is requested

Do not request information already available from the source or project configuration.

## Workflow

1. Validate that the source is readable and record its duration, resolution, audio streams, and aspect ratio.
2. Transcribe with word timestamps. Use speaker diarization when multiple speakers and speaker-aware reframing are material.
3. Divide the transcript into self-contained candidate moments. Never cut in the middle of a claim, explanation, or necessary context.
4. Score candidates on:
   - opening hook
   - narrative completeness
   - information or emotional density
   - clarity without the preceding segment
   - silence and filler burden
   - visual feasibility
   - novelty relative to other candidates
5. Return ranked candidates with `start_seconds`, `end_seconds`, transcript, score components, rationale, suggested title, and any context-risk warning.
6. Render only the selected candidates:
   - 9:16 output
   - active-speaker framing where reliable
   - a stable split-screen or blurred-background fallback when reframing is uncertain
   - ContentFlow caption and brand settings
   - optional intro text only when it does not cover essential visuals
7. Send every render to `contentflow-review`.
8. Do not publish unless the user separately authorizes publishing and the candidate passes review.

## Technical Guidance

Prefer existing ContentFlow and FFmpeg components. Faster-whisper is the lightweight default. WhisperX or ClipsAI may be used as optional adapters for precise alignment, diarization, clip discovery, or speaker-aware crops; keep them optional so normal ContentFlow installations remain lightweight.

Keep original timestamps and an audit record connecting every output clip to the source. Do not overwrite source media.

## Failure Handling

If transcription, speaker detection, or face tracking is unreliable, preserve the transcript and candidate list and use a conservative crop. Report the affected stage rather than silently producing a misleading or badly framed result.