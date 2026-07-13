# Catalog data

Postgres (`app` schema) is the **only** source of truth. The app assembles `CollegeRecord` / `StateRecord` at runtime from relational tables (no JSON document tables).

## Tables

| Layer | Tables |
|-------|--------|
| Reference | `states` |
| Spine | `colleges` (incl. optional NIRF Medical fields), `college_aliases` |
| Facts | `fee_schedules`, `fee_line_items`, `seat_snapshots`, `seat_buckets`, `cutoffs` |

Runtime assembly lives in `src/lib/catalog/assemble-college-record.ts` and `src/lib/catalog/catalog-loader.ts`.

## Go-live: 4 states + MCC from backup (GJ, RJ, MP, MH)

**Authoritative source:** [`supabase-backup.sql`](../supabase-backup.sql) — not MCC CSV files.

| Layer | Source tag | Origin |
|-------|------------|--------|
| Headline seat total | `colleges.seat_count` | Backup spine |
| State seats / cutoffs | `{state}_dump` (`gujarat_dump`, `rajasthan_dump`, `mp_dump`, `mh_dump`) | Backfill split from backup |
| MCC seats / cutoffs / matrix | `mcc_csv` | Backfill split from backup |
| MCC fees | `mcc_fee_csv` | Backup `fee_schedules` (unchanged) |

```powershell
$env:FORCE_RESTORE = "1"
npm run db:restore:prod-seed-4-states
```

Steps: restore → migrate → backfill → prune (`mcc_production` removed where `mcc_csv` exists) → verify seat counts + dual counselling.

**Do not run** `db:seed:mcc`, `db:seed:mcc-fees-csv`, or `db:seed:karnataka-up` for this path.

## Restore production backup + add Karnataka / UP only

When local GJ/RJ/MP/MH data was overwritten, restore from `supabase-backup.sql` first, then add KA/UP incrementally. **MCC cutoffs/fees come from the backup** — do not run `db:seed:mcc-fees-csv` unless you have `mcc_fees.csv` locally.

State fees are written to **separate** `fee_schedules` rows (`source = karnataka_dump` or `up_dump`). Existing production MCC schedules (`mcc_fee_csv`) are left untouched.

### Windows (PowerShell) — recommended

```powershell
cd D:\Project\Dravio\dravio-app

# One command: restore prod backup → migrate → seed KA/UP
$env:FORCE_RESTORE = "1"
npm run db:restore:prod-seed-ka-up
```

**Or step by step:**

```powershell
# 1. Restore production catalog (replaces app schema only)
$env:FORCE_RESTORE = "1"
npm run db:restore:supabase-backup

# 2. Allow separate MCC + karnataka_dump / up_dump fee schedules (skip prisma migrate deploy)
npm run db:apply:fee-schedule-source-unique
npx prisma generate

# 3. Optional: verify KA/UP college name → slug matches
npm run db:build:ka-up-slug-map

# 4. Seed Karnataka + UP (cutoffs, fees, seats) — no MCC CSV seed
npm run db:seed:karnataka-up

# 5. Verify
npx tsx scripts/catalog/verify-dual-counselling.ts
npm run dev
```

**Prerequisites on Windows**

- PostgreSQL client tools installed (`pg_restore` on PATH).  
  Check: `pg_restore --version`
- File `supabase-backup.sql` in the repo root
- `DATABASE_URL` or `DIRECT_URL` in `.env` → `postgresql://postgres:root@localhost:5432/dravio`

**If bash script fails with `set: pipefail: invalid option name`**  
Use `npm run db:restore:supabase-backup` (runs the TypeScript script, not bash).

### Git Bash / macOS / Linux

```bash
FORCE_RESTORE=1 npm run db:restore:prod-seed-ka-up
```

**Or step by step:**

```bash
FORCE_RESTORE=1 npm run db:restore:supabase-backup
npx prisma migrate deploy && npx prisma generate
npm run db:build:ka-up-slug-map   # optional
npm run db:seed:karnataka-up
```

**Rules**

- `db:restore:supabase-backup` / `db:restore:catalog` — full `app` schema replace; GJ/RJ/MP/MH + MCC from backup.
- `db:restore:prod-seed-4-states` — **go-live:** restore backup, migrate, backfill 4 states + MCC from backup (no CSV, no KA/UP).
- `db:restore:prod-seed-ka-up` — restore backup, migrate, seed KA/UP only.
- `db:seed:mcc` — **dev/KA only:** MCC from `mcc_cutoff.csv` / `mcc_seats.csv`; use `--csv-wins` on prune to prefer CSV.
- `db:prune:superseded-facts` — default: delete `mcc_csv` when `mcc_production` exists (backup wins for 4 states).
- `db:seed:mcc-fees-csv` — optional; requires local `mcc_fees.csv`.
- Never run `db:seed:catalog` on production-backed DB unless rebuilding from scratch.

Karnataka categories are configured in `src/lib/colleges/state-config.ts` (extensible per state without affecting GJ/RJ/MP/MH).

## Re-seeding safely (avoid duplicate cutoffs/seats)

After the source-bifurcation migration, **do not** re-run `db:backfill:counselling-sources` on an already-backfilled DB unless you have restored from `supabase-backup.sql` first. Backfill is one-time per restore.

Re-running CSV seeds without cleanup leaves overlapping rows (`mcc_production` from backup + `mcc_csv` from CSV). The UI then shows duplicate cutoffs with mismatched ranks.

**Full refresh for 4 states (backup-first):**

```powershell
$env:FORCE_RESTORE = "1"
npm run db:restore:prod-seed-4-states
```

**Dev refresh (KA/UP + MCC CSV):**

```powershell
npm run db:seed:karnataka-up
npm run db:seed:mcc
npm run db:prune:superseded-facts
npx tsx scripts/catalog/verify-dual-counselling.ts
```

`db:seed:mcc` and `db:seed:karnataka-up` call prune automatically at the end. Run `db:prune:superseded-facts` manually if you seeded out of order.

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
