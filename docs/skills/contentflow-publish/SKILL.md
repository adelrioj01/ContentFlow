---
name: contentflow-publish
description: Prepare, approve, publish, and verify ContentFlow videos on configured short-form platforms after generation and quality review. Use for immediate or scheduled publishing and status checks; never publish without valid user authorization.
metadata:
  version: "1.0.0"
  project: "ContentFlow"
---

# ContentFlow Publish

Publish an existing ContentFlow artifact through configured official or approved provider integrations. Generation and quality review are separate workflows.

## Preconditions

Before any external write:

1. Identify the exact video artifact and destination accounts/platforms.
2. Require a passing `contentflow-review` record for the same artifact.
3. Resolve platform-specific title, caption, hashtags, cover, privacy, audience, commercial-content, and synthetic-media settings.
4. Show the user the artifact, destinations, visibility, and metadata when approval has not already been explicitly granted for those exact targets.
5. Confirm the configured publisher is authenticated and authorized.

A request to create or review a video is not permission to publish it. Never broaden approval from one platform, account, artifact, or time to another.

## Metadata

Create separate metadata for TikTok, Instagram Reels, and YouTube Shorts instead of cross-posting identical text blindly. Respect current platform limits and configured brand rules.

Do not invent claims, mentions, partnerships, or hashtags. Keep disclosure fields and YouTube made-for-kids declarations explicit rather than deriving them from LLM-generated text.

## Publishing

Use ContentFlow's Upload-Post service when configured. An official direct platform adapter may be used when the project provides one. Do not use brittle browser automation to bypass API review, consent, visibility, or rate restrictions.

For scheduled publication, persist:

- artifact identifier
- platform and account
- scheduled time and timezone
- final metadata snapshot
- review identifier
- approval record
- idempotency key
- retry count and status

Use an idempotency key per artifact/platform/account so retries cannot create duplicate posts.

## Verification

After submission:

1. Store the provider request ID immediately.
2. Poll through the provider's supported status endpoint with bounded retries.
3. Record per-platform status, platform post ID, public URL when available, and sanitized error details.
4. Report partial success precisely; never describe the batch as successful when one destination failed.
5. Retry only transient failures. Authentication, policy, validation, and permission failures require user action.
6. Never regenerate the video as a publishing retry.

## AI and audience declarations

Preserve ContentFlow's `containsSyntheticMedia` behavior and the user's explicit YouTube made-for-kids choice. Honor TikTok, Meta, and YouTube disclosure requirements supported by the configured API.

## Output

Return a concise publication receipt with every destination, final visibility, status, platform identifier or request ID, URL when available, and any required next action. Never expose API keys, access tokens, or credential-bearing responses.