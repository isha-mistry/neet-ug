# Med-Seat (Dravio): Complete Project Flow & Architecture Documentation

Welcome to the comprehensive technical documentation for **Med-Seat (Dravio)** — an advanced, data-driven NEET UG medical counseling, rank prediction, and college research platform. This document provides an end-to-end architectural breakdown, explaining how data flows through frontend components, server actions, database tables, background reconciliation scripts, and external integrations.

---

## Table of Contents

1. [Executive Summary & Project Overview](#1-executive-summary--project-overview)
2. [System Architecture & Tech Stack](#2-system-architecture--tech-stack)
3. [Database Architecture & Entity Relationships](#3-database-architecture--entity-relationships)
4. [Core Feature Modules & Student Journeys](#4-core-feature-modules--student-journeys)
5. [End-to-End Lead Form Workflow](#5-end-to-end-lead-form-workflow)
6. [Instant WhatsApp Engagement Engine](#6-instant-whatsapp-engagement-engine)
7. [Authentication & SMS OTP Security Layer](#7-authentication--sms-otp-security-layer)
8. [Server Actions vs. API Routes Layer](#8-server-actions-vs-api-routes-layer)
9. [Background Jobs, Seeding & Data Pipelines](#9-background-jobs-seeding--data-pipelines)
10. [Third-Party Integrations & CDN Infrastructure](#10-third-party-integrations--cdn-infrastructure)
11. [Developer Onboarding & Environment Setup](#11-developer-onboarding--environment-setup)

---

## 1. Executive Summary & Project Overview

**Med-Seat** is designed to demystify Indian undergraduate medical admissions (NEBS/MBBS/BDS via NEET UG). It aggregates multi-year counseling cutoffs (MCC All India Quota, State Quotas, NRI Quotas), institutional fee structures, clinical exposure metrics (bed counts, daily patient flow), and ranking intelligence into intuitive prediction engines and exploration guides.

### Primary Objectives:
* **High-Accuracy Predictors**: Estimate student All India Ranks (AIR) from expected NEET scores and predict admission probabilities across specific counseling rounds.
* **Radical Transparency**: Present verified fee schedules (tuition, hostel, mess, university fees) side-by-side with bond penalties and return-on-investment (ROI) scores.
* **Frictionless Student Counseling**: Convert marketing traffic into student counseling inquiries using frictionless lead capture forms that immediately connect candidates to expert counselors via WhatsApp.

---

## 2. System Architecture & Tech Stack

Med-Seat is built on a modern, server-first React web architecture leveraging **Next.js App Router** for optimal SEO, zero-bundle server rendering, and type-safe backend RPCs.

```mermaid
graph TD
    subgraph Client Layer
        Browser[Student / User Browser]
        Zustand[Zustand State Stores]
        Maps[React Simple Maps / Three.js 3D]
    end

    subgraph Next.js 16 App Router
        Pages[React 19 Server & Client Components]
        Actions[Server Actions: submit-lead / send-phone-otp]
        APIs[API Routes / Webhook Handlers]
    end

    subgraph Backend & Persistence
        Prisma[Prisma ORM v6.9]
        PG[(PostgreSQL Database)]
        Redis[(Session Cookies / Storage)]
    end

    subgraph External Services
        Fast2SMS[Fast2SMS SMS Gateway]
        WA[WhatsApp wa.me API]
        CDN[Cloudinary CDN]
    end

    Browser <--> Pages
    Pages <--> Actions
    Actions --> Prisma --> PG
    Actions --> Fast2SMS
    Actions --> WA
    Pages --> CDN
```

### Core Technology Stack:
* **Core Framework**: Next.js 16.2.6 powered by React 19.2.4 and TypeScript.
* **Styling & Design System**: Tailwind CSS v4 coupled with CSS modules (`globals.css`, `journey-home.css`, `lead-form-controls.css`). Standardized semantic visual tokens (`--color-primary`, `--color-tertiary` for safe chances, `--color-secondary` for borderline, `--color-error` for high risk).
* **State Management**: Zustand v5 (`src/store/`), supplemented by persistent browser session utilities (`src/lib/rank-predictor/session.ts`, `cutoff-analyser/session.ts`).
* **Database & ORM**: PostgreSQL managed via Prisma ORM v6.9.0 (`@prisma/client` targeting custom schema `app`).
* **Data Visualization & GIS**: Three.js (`three`) for interactive 3D elements, React Simple Maps (`react-simple-maps`, `d3-geo`, `topojson-client`) for choropleth maps of Indian state counseling competition, and Recharts (`recharts`) for historical cutoff trend charts.

---

## 3. Database Architecture & Entity Relationships

The PostgreSQL database encapsulates institutional catalog data, dynamic counseling matrices, and marketing leads inside a dedicated database schema named `app`.

```mermaid
erDiagram
    STATE ||--o{ COLLEGE : contains
    COLLEGE ||--o{ COLLEGE_ALIAS : has
    COLLEGE ||--o{ FEE_SCHEDULE : publishes
    FEE_SCHEDULE ||--o{ FEE_LINE_ITEM : lists
    COLLEGE ||--o{ SEAT_SNAPSHOT : allocates
    SEAT_SNAPSHOT ||--o{ SEAT_BUCKET : categorizes
    COLLEGE ||--o{ CUTOFF : records

    STATE {
        string state_slug PK
        string name
        int total_seats
        string competition_level
        string fee_dimension_profile
    }

    COLLEGE {
        int college_id PK
        string slug UK
        string name
        string state_slug FK
        string college_type
        int seat_count
        int roi_score
        int bond_years
        int bond_penalty
        int bed_count
        int patient_flow_per_day
        int nirf_medical_rank
    }

    CUTOFF {
        int id PK
        int college_id FK
        int year
        string category
        string seat_type
        string quota
        string admission_round
        int closing_rank_air
        int closing_neet_score
    }

    LEAD {
        string id PK
        datetime created_at
        string form_type
        string status
        string phone
        int neet_score
        string domicile_state
        json topics
    }
```

### Key Entity Definitions:

1. **`State` (`app.states`)**: Represents regional counseling jurisdictions. Tracks aggregate medical seats, regional competition tiers, and imports validation rules via `feeDimensionProfile`.
2. **`College` (`app.colleges`)**: Master repository of medical colleges. Stores location, institution ownership type (Govt, Trust, Private, Deemed), clinical exposure stats (`bedCount`, `patientFlowPerDay`), infrastructure tags (`facilities`), bond obligations, and NIRF rankings.
3. **`CollegeAlias` (`app.college_aliases`)**: Resolves discrepancies in college naming conventions across disparate counseling authority PDFs, CSV dumps, and MCC allocations using normalized `matchKey` strings.
4. **`FeeSchedule` & `FeeLineItem` (`app.fee_schedules`, `app.fee_line_items`)**: Multi-dimensional fee tables keyed by academic year, fee component (`tuition`, `hostel`, `mess`, `university`, `exam`), counseling quota seat type (`GQ`, `MQ`, `NRI`), and student category.
5. **`SeatSnapshot` & `SeatBucket` (`app.seat_snapshots`, `app.seat_buckets`)**: Matrix capturing seat matrix distribution across quota buckets (`aiq`, `state_quota`, `open`, `sc`, `st`, `obc`, `ews`, etc.).
6. **`Cutoff` (`app.cutoffs`)**: Granular historical admission thresholds. Contains opening and closing All India Ranks (AIR), State Merit Ranks, NEET raw scores, and percentiles across specific admission rounds (Round 1, Round 2, Mop-up, Stray).
7. **`Lead` (`app.leads`)**: Centralized table capturing student counseling requests, predictor tool submissions, and consent timestamps.

---

## 4. Core Feature Modules & Student Journeys

The application route hierarchy under `src/app` is partitioned into distinct student user journeys:

### 4.1 Marketing & Landing Pages (`src/app/(marketing)`)
* **Journey Home (`/`)**: Main entry portal introducing NEET UG counseling mechanics, counseling authority breakdowns, and interactive CTA triggers.
* **NEET UG Hub (`/neet-ug-2026`)**: Central educational hub housing terms explained, NRI counseling guides, application checklists, and answer key updates.
* **MBBS in India (`/mbbs-in-india` & `/state-counselling`)**: State-by-state counseling directories detailing domicile eligibility, registration rules, and local reservation matrices (e.g., Gujarat SEBC/EWS extensions).

### 4.2 Analytical Predictor Engines
* **Rank Predictor (`/rank-predictor`)**: Accepts estimated marks and calculates projected All India Rank brackets using statistical interpolation models (`src/lib/rank-predictor/`).
* **College Predictor (`/college-predictor`)**: Cross-references candidate AIR, category, and domicile against historical `Cutoff` records to generate categorized college chances:
  * **Safe Chance** (`--color-tertiary`): Historical closing rank comfortably exceeds student rank.
  * **Borderline** (`--color-secondary`): Student rank sits near historical cutoffs.
  * **High Risk / Tough** (`--color-error`): Historical cutoffs demand significantly higher rank.
* **Cutoff Analyser (`/cutoff-analyser`)**: Interactive multi-year comparison tool enabling students to filter opening/closing ranks by college type, state, and quota.

### 4.3 College Explorer Registry (`src/app/(colleges)`)
* **College Profiles (`/colleges/[slug]`)**: Deep-dive institutional pages displaying verified fee schedules, hospital bed counts, bond penalties, and NIRF medical scores.
* **College Comparison (`/compare`)**: Side-by-side comparative matrix evaluating multiple institutions on ROI score, tuition fees, and patient volume.

---

## 5. End-to-End Lead Form Workflow

Lead capture is engineered to minimize friction while maintaining strict data hygiene and PII compliance.

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as React Lead Form UI
    participant Action as submitLeadAction()
    participant Create as createLead()
    participant DB as PostgreSQL (app.leads)
    participant WA as WhatsApp Engagement

    Student->>UI: Enters Name, Mobile (+91), NEET Score, Domicile State
    UI->>Action: Invokes Server Action (SubmitLeadInput)
    Action->>Create: Delegates execution
    Create->>Create: validateSubmitLeadInput(raw)
    Create->>Create: Verify DPDP Act Consent Flag
    Create->>DB: prisma.lead.create({ data })
    DB-->>Create: Returns lead.id (cuid)
    Create-->>Action: { success: true, leadId }
    Action-->>UI: Returns success response
    UI->>WA: openCounselWhatsApp(prefilledLines)
    WA-->>Student: Opens wa.me chat tab with expert counselor
```

### Technical Workflow Steps:
1. **Form Invocation**: Triggered via modal overlays (`BookCounsellingTrigger.tsx`) or inline banners (`RankPredictorFinalCta.tsx`).
2. **Server Action Dispatch**: The client component delegates form state to `persistLeadThenWhatsApp()` (`src/lib/leads/client.ts`), invoking server action `submitLeadAction(input)` (`src/app/actions/submit-lead.ts`).
3. **Payload Validation**: `createLead()` (`src/lib/leads/create-lead.ts`) enforces strict validation (`src/lib/leads/validation.ts`), ensuring valid mobile digits and required fields.
4. **Consent Logging**: Evaluates Digital Personal Data Protection (DPDP) Act compliance via `isLeadConsentGranted()`. If granted, stamps `consentAt: new Date()`.
5. **Database Insertion**: Persists record inside `app.leads` via Prisma RPC. PII fields (phone, email) are indexed for quick administrative lookup.
6. **Handover to WhatsApp**: Upon success confirmation, client-side execution triggers instant WhatsApp redirection.

---

## 6. Instant WhatsApp Engagement Engine

To eliminate the delay of email follow-ups, Med-Seat immediately transitions incoming leads into active WhatsApp conversations.

### Architecture (`src/lib/leads/whatsapp.ts` & `counsel-whatsapp-config.ts`):
* **Target Phone Configuration**: Reads `NEXT_PUBLIC_COUNSEL_WHATSAPP_NUMBER` or `COUNSEL_WHATSAPP_NUMBER` from environment settings. Sanitizes input to pure digits (e.g., `919876543210`).
* **Dynamic Message Assembly**: `buildFreeCounsellingWhatsAppMessage()` generates personalized context lines:
  ```text
  Hi Dravio Team, I want free MBBS counselling review.
  
  Name: John Doe
  Mobile: +91 9876543210
  Domicile state: Gujarat
  ```
* **Protocol Generation**: Formats URL to universal deep link:
  `https://wa.me/919876543210?text=Hi%20Dravio%20Team...`
* **Browser Execution**: Invokes `window.open(url, "_blank", "noopener,noreferrer")`, seamlessly launching desktop WhatsApp Web or native mobile WhatsApp applications.

---

## 7. Authentication & SMS OTP Security Layer

Student login and mobile number verification utilize a robust OTP pipeline powered by the **Fast2SMS API gateway**.

```mermaid
sequenceDiagram
    actor User
    participant Action as sendPhoneLoginOtpAction()
    participant Session as phone-otp-session.ts
    participant SMS as Fast2SMS Gateway
    participant Cookie as HttpOnly Cookie

    User->>Action: Requests OTP (+91 9876543210)
    Action->>Session: sendPhoneLoginOtp({ phone })
    Session->>Session: normalizeIndianMobile()
    Session->>Cookie: Check existing rate-limit cooldown
    Session->>Session: Generate secure 6-digit code (randomInt)
    Session->>Session: Create SHA-256 HMAC hash (otp + phone + secret)
    Session->>SMS: fetch(fast2sms.com/dev/bulkV2, DLT template)
    SMS-->>User: Delivers SMS text with OTP
    Session->>Cookie: Set PHONE_OTP_COOKIE (hash, exp, lastSentAt)
```

### Security Mechanisms (`src/lib/otp/phone-otp-session.ts`):
1. **Normalization**: Enforces strict 10-digit Indian mobile number validation (`normalizeIndianMobile`).
2. **Rate Limiting**: Enforces a strict cooldown window (`PHONE_OTP_RESEND_COOLDOWN_SEC`) between consecutive generation requests to prevent SMS pumping attacks.
3. **Cryptographic Storage**:
   * OTP codes are generated using Node's cryptographically secure `randomInt(100_000, 1_000_000)`.
   * Raw OTPs are **never** stored in the database or cookies. They are hashed using `crypto.createHash("sha256")` keyed with a server-side pepper (`PHONE_OTP_SECRET`).
   * State is serialized into an encrypted `HttpOnly`, `SameSite=Lax`, `Secure` browser cookie (`PHONE_OTP_COOKIE`) containing the hash, expiry timestamp, and sent timestamp.
4. **DLT Compliance**: Supports TRAI Distributed Ledger Technology (`dlt` and `dlt_manual`) template substitution (`{#var#}`) required for Indian enterprise messaging.
5. **Side-Channel Protection**: `verifyPhoneLoginOtp()` compares client submitted OTP hashes against stored hashes using `timingSafeEqual()` to neutralize timing side-channel attacks. Upon successful verification, stamps `setPhoneVerifiedSession()`.

---

## 8. Server Actions vs. API Routes Layer

Med-Seat implements Next.js App Router architectural best practices by clearly dividing server execution paradigms:

| Execution Layer | Location | Primary Purpose | Architectural Benefit |
| :--- | :--- | :--- | :--- |
| **Server Actions** | `src/app/actions/*.ts` | Internal UI form submissions (`submitLeadAction`, `sendPhoneLoginOtpAction`). | Zero API client scaffolding, automatic progressive enhancement, type-safe RPC signatures. |

---

## 9. Background Jobs, Seeding & Data Pipelines

Maintaining an up-to-date college catalog and historical cutoff repository requires dedicated data ingestion scripts located under `scripts/`.

### 9.1 Database Seeding & Reconciliation Scripts
Executed via `tsx` or shell automation during CI/CD or local development:
* **Catalog Seeding**: `seed-catalog.ts`, `seed-mp.ts`, `seed-mh.ts`, `seed-mcc.ts`, `seed-rajasthan.ts`. Parses official authority PDFs/CSVs and populates `app.colleges` and `app.cutoffs`.
* **Manual AIQ Cutoffs**: `seed-aiq-manual-cutoffs.ts --apply`. Ingests manual editorial corrections for ambiguous All India Quota rounds.
* **NIRF Integration**: `seed-nirf-ranks.ts`. Updates institutional research metrics and scores.
* **Registry Reconciliation**: `reconcile-catalog-to-medical-list.ts`. Audits local database records against National Medical Commission (NMC) master college directories to flag unmapped institutions or seat count discrepancies.
* **Dump & Restore Utilities**: `dump-local-catalog.sh` & `restore-catalog-dump.sh`. Facilitates rapid database mirroring between staging and local environments.

### 9.2 CDN Asset Synchronization (`scripts/colleges/sync-college-cover-cache.ts`)
To ensure lightning-fast page loads without hammering Cloudinary transformation quotas, Med-Seat caches college hero images locally:
1. Reads college asset mapping from `src/data/college-cover-images.json`.
2. Initiates a high-concurrency worker pool (`CONCURRENCY = 8`).
3. Connects to Cloudinary API (`buildCollegeCoverCloudinaryUrl`) requesting optimized WebP transformations (`f_auto,q_auto,w_1200`).
4. Downloads binary streams directly into static repository folder `public/college-covers/{slug}.webp`.

---

## 10. Third-Party Integrations & CDN Infrastructure

* **Cloudinary CDN**: Handles dynamic image resizing, format negotiation (AVIF/WebP), and optimization for college cover thumbnails and campus photography.
* **Fast2SMS Gateway**: Enterprise DLT SMS provider handling transactional authentication OTPs.
* **WhatsApp wa.me**: Meta's direct click-to-chat API interface driving student-counselor conversion.
* **React Simple Maps / TopoJSON**: GIS rendering pipeline utilizing lightweight TopoJSON models (`src/data/maps/`) to visualize state counseling competition density without external tile servers.

---

## 11. Developer Onboarding & Environment Setup

### Prerequisites:
* **Node.js**: v20.x or higher.
* **Package Manager**: Yarn or npm.
* **Database**: Running PostgreSQL instance (local or remote Neon/Supabase connection URL).

### Quickstart Guide:

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/isha-mistry/neet-ug.git med-seat
   cd med-seat
   yarn install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory referencing `.env.example`:
   ```env
   # PostgreSQL Connection URLs
   DATABASE_URL="postgresql://user:password@localhost:5432/medseat?schema=app"
   DIRECT_URL="postgresql://user:password@localhost:5432/medseat?schema=app"

   # WhatsApp Counselor Number (Digits only with country code)
   NEXT_PUBLIC_COUNSEL_WHATSAPP_NUMBER="919876543210"

   # Fast2SMS OTP Gateway
   FAST2SMS_API_KEY="your_fast2sms_api_key"
   PHONE_OTP_SECRET="local_development_secret_pepper"
   ```

3. **Database Prisma Initialization**:
   ```bash
   # Generate Prisma TypeScript Client
   yarn db:generate

   # Apply schema migrations / push schema
   npx prisma db push
   ```

4. **Seed Database Catalogs**:
   ```bash
   # Seed master catalog and state counseling cutoffs
   yarn db:seed:catalog
   yarn db:seed:mcc
   ```

5. **Start Development Server**:
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---
*Documentation generated for Med-Seat (Dravio Engineering Team).*
