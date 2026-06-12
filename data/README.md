# Catalog data

Postgres (`app` schema) is the **only** source of truth. The app assembles `CollegeRecord` / `StateRecord` at runtime from relational tables (no JSON document tables).

## Tables

| Layer | Tables |
|-------|--------|
| Reference | `states` |
| Spine | `colleges` (incl. optional NIRF Medical fields), `college_aliases` |
| Facts | `fee_schedules`, `fee_line_items`, `seat_snapshots`, `seat_buckets`, `cutoffs` |

Runtime assembly lives in `src/lib/catalog/assemble-college-record.ts` and `src/lib/catalog/catalog-loader.ts`.

## Workflow

```bash
npm run db:migrate
npm run db:seed:catalog   # states + colleges JSON spine + Gujarat + Rajasthan dump facts
npm run db:seed:nirf      # NIRF Medical 2025 ranks → matched colleges
npm run dev
```

## Promote local catalog → hosted (fast)

Seeding on a remote Supabase instance is slow (many round-trips). After you have a good **local** database:

1. **Local** — migrate and seed once:

   ```bash
   npm run db:migrate
   npm run db:seed:catalog
   npm run db:seed:nirf
   ```

2. **Dump** only the `app` schema (catalog tables + data):

   ```bash
   # .env: LOCAL_DATABASE_URL or DATABASE_URL → local Postgres
   npm run db:dump:local
   ```

   Writes `data/dumps/app-catalog.dump` (gitignored).

3. **Hosted** — apply migrations if needed, then restore the dump:

   ```bash
   # .env: DIRECT_URL → Supabase *direct* connection (port 5432, not pooler)
   npm run db:migrate
   FORCE_RESTORE=1 npm run db:restore:catalog
   ```

   `pg_restore --clean` replaces the **`app` schema** on the target DB. It does **not** touch `public._prisma_migrations` or Supabase auth/storage.

**Tips**

- Use `LOCAL_DATABASE_URL` for dump and keep `DIRECT_URL` pointed at hosted when restoring (or set `RESTORE_DIRECT_URL` for restore only).
- Requires PostgreSQL client tools (`pg_dump`, `pg_restore`) on your machine.
- Do not commit `data/dumps/`; treat dumps like production data.

## Commands

- `npm run db:migrate` — apply migrations
- `npm run db:migrate:dev` — author schema changes
- `npm run db:generate` — refresh Prisma client
- `npm run db:seed:catalog` — load `src/data/generated/*.json`, `public/gujarat_data`, and `data/rj_data.sql`
- `npm run db:seed:nirf` — apply `data/nirf/medical-2025.json` (see `collegeSlug` mappings)

NIRF source rows live in `data/nirf/medical-2025.json`. Entries without a `collegeSlug` are not written until the institute exists in `app.colleges` (e.g. PGIMER, SGPGI, NIMHANS).

## Detail page performance

`loadCollegeBySlugFromDb()` loads one college with the same includes as the list query, so detail routes avoid re-fetching the full catalog when used via `findCollegeBySlug()`.
