# Production Sentry Observability & Slack Alert Integration Guide

This document explains the production-grade architecture for capturing unhandled runtime exceptions, database failures, Server Action errors, and UI transition crashes across Med-Seat (Dravio), routing critical business alerts directly to dedicated engineering Slack channels.

---

## 1. Architecture Overview

Med-Seat utilizes a centralized observability design built on `@sentry/nextjs` (Next.js 16 App Router compatible).

```mermaid
graph TD
    UI[React Lead Forms & UI Components] --> Reporter[reportAppError Utility]
    Action[Server Actions: submit-lead / send-otp] --> Reporter
    DB[Prisma Database Persistence] --> Reporter
    Reporter --> Sanitizer[sanitizeContextData Utility]
    Sanitizer --> SentrySDK[@sentry/nextjs Scope]
    SentrySDK --> SentryCloud[Sentry Cloud Telemetry]
    SentryCloud -->|tags.module = lead| Slack[Slack Channel Alerts]
```

### Key Architectural Layers:
1. **Centralized Error Reporter (`src/lib/sentry/error-reporter.ts`)**: The single entry point `reportAppError()` standardizes telemetry tagging (`module`, `feature`, `action`, `environment`) and attaches diagnostic context.
2. **PII Sanitizer (`src/lib/sentry/sanitizer.ts`)**: Automatically intercepts payloads before transmission, masking 10-digit phone numbers (`[REDACTED_PHONE_10_DIGITS]`), local email prefixes (`[REDACTED_EMAIL] (@domain.com)`), passwords, OTPs, and auth tokens.
3. **Instrumentation Hooks (`src/instrumentation.ts`)**: Next.js 16 lifecycle hooks (`register`, `onRequestError`) that trap unhandled server framework errors.

---

## 2. Required Environment Variables

Add these settings to your production environment (e.g. Vercel deployment settings or `.env`):

```env
# Sentry DSN (Client & Server)
NEXT_PUBLIC_SENTRY_DSN="https://key@o0.ingest.sentry.io/project"
SENTRY_DSN="https://key@o0.ingest.sentry.io/project"

# Organization & CI/CD Source Map Upload Token
SENTRY_ORG="dravio"
SENTRY_PROJECT="dravio-nextjs"
SENTRY_AUTH_TOKEN="sentry_ci_auth_token"

# Deployment Environment Tagging
NEXT_PUBLIC_SENTRY_ENVIRONMENT="production"
```

---

## 3. How New Modules Should Report Errors

Whenever building a new feature (e.g. Payments, College Predictor, Admin Catalog), **never** call `Sentry.captureException` directly. Instead, import `reportAppError`:

```typescript
import { reportAppError } from "@/lib/sentry/error-reporter";

async function processCollegePredictor(input: PredictorInput) {
  try {
    return await executePrediction(input);
  } catch (error) {
    reportAppError(error, {
      module: "predictor",
      feature: "college_chances",
      action: "processCollegePredictor",
      route: "/college-predictor",
      userId: currentUser?.id,
      metadata: { neetScore: input.score, category: input.category },
    });
    throw new Error("Could not calculate college chances.");
  }
}
```

---

## 4. Configuring Slack Alert Rules in Sentry

To route critical business failures into Slack without notification fatigue:

1. **Authorize Sentry in Slack**:
   * In Sentry → **Settings** → **Integrations** → **Slack** → **Add Workspace**.
2. **Create Issue Alert Rule (Lead Workflows)**:
   * **Trigger**: A new issue is created OR an issue changes state from resolved to unresolved.
   * **Filter Conditions**:
     * `tags[module] equals lead`
     * `tags[environment] equals production`
   * **Actions**: Send a Slack notification to `#production-lead-alerts`.
3. **Create Spike Emergency Alert Rule**:
   * **Trigger**: When an issue affects >10 unique users in 1 hour.
   * **Actions**: Send notification to `#emergency-alerts` and tag `@channel`.

---

## 5. Local Developer Testing

To verify Sentry observability locally:

1. Set `NEXT_PUBLIC_SENTRY_DSN` in your local `.env` file.
2. Temporarily throw an exception inside any lead form or server action:
   ```typescript
   throw new Error("[Dev Observability Test] Simulating lead submission crash");
   ```
3. Submit the form in your browser.
4. Verify in your terminal logs:
   `[reportAppError] [lead:free_counselling_form] (handleSubmit): Error...`
5. Check your Sentry dashboard under **Issues** to see the captured stack trace tagged with `module: lead`.
