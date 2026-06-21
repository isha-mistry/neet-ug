# Catalog data

Postgres (`app` schema) is the **only** source of truth. The app assembles `CollegeRecord` / `StateRecord` at runtime from relational tables (no JSON document tables).

## Tables

| Layer | Tables |
|-------|--------|
| Reference | `states` |
| Spine | `colleges` (incl. optional NIRF Medical fields), `college_aliases` |
| Facts | `fee_schedules`, `fee_line_items`, `seat_snapshots`, `seat_buckets`, `cutoffs` |

Runtime assembly lives in `src/lib/catalog/assemble-college-record.ts` and `src/lib/catalog/catalog-loader.ts`.

## Workflow (recommended)

Postgres holds the catalog. The app never reads `colleges.json` / `states.json` at runtime.

**New environment or hosted Supabase:**

```bash
npm run db:migrate
# .env: LOCAL_DATABASE_URL or DATABASE_URL → source DB with a good catalog
npm run db:dump:local
# .env: DIRECT_URL → target (e.g. Supabase direct, port 5432)
FORCE_RESTORE=1 npm run db:restore:catalog
npm run dev
```

`src/data/generated/colleges.json` and `states.json` are **gitignored** (large / redundant with DB). Keep them locally if you use `scripts/catalog/` (`db:seed:catalog`, `db:reconcile:medical-list`).

**Optional:** `npm run db:seed:nirf` after restore if NIRF ranks are not in the dump.

## Legacy: seed from JSON + SQL dumps

Requires local `scripts/catalog/` and generated JSON (not in git):

```bash
npm run db:migrate
npm run db:seed:catalog
npm run db:seed:nirf
```

**Tips for dump/restore**

- Use `LOCAL_DATABASE_URL` for dump and `DIRECT_URL` (Supabase direct, port 5432) for restore.
- Requires PostgreSQL client tools (`pg_dump`, `pg_restore`).
- `pg_restore --clean` replaces only the **`app` schema**; not `public._prisma_migrations` or Supabase auth/storage.
- Do not commit `data/dumps/`.

## Commands

- `npm run db:migrate` — apply migrations
- `npm run db:migrate:dev` — author schema changes
- `npm run db:generate` — refresh Prisma client
- `npm run db:dump:local` / `db:restore:catalog` — copy `app` schema between databases (see above)
- `npm run db:seed:catalog` — local only (`scripts/catalog/`): JSON spine + optional state SQL dumps
- `npm run db:seed:mp` — **MP facts only** (`data/mp_data.sql`)
- `npm run db:reconcile:medical-list` — local only: match `data/final_medical_colleges_list.sql`
- `npm run db:seed:mh` — **Maharashtra facts only** (`data/mh_data.sql`: seats, fees, cutoffs)
- `npm run db:seed:mcc` — **MCC AIQ facts** (`data/mcc_data_final.sql`: national cutoffs, AIQ seat matrix, deemed fees)
- `npm run db:seed:aiq-manual` — **AIQ round cutoffs** from `data/aiq-manual-cutoffs-2025.json` (verify: `tsx scripts/catalog/seed-aiq-manual-cutoffs.ts`)
- `npm run db:seed:nirf` — apply `data/nirf/medical-2025.json` (see `collegeSlug` mappings)

NIRF source rows live in `data/nirf/medical-2025.json`. Entries without a `collegeSlug` are not written until the institute exists in `app.colleges` (e.g. PGIMER, SGPGI, NIMHANS).

## Detail page performance

`loadCollegeBySlugFromDb()` loads one college with the same includes as the list query, so detail routes avoid re-fetching the full catalog when used via `findCollegeBySlug()`.
