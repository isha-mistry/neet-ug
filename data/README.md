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
npm run db:seed:catalog   # states + colleges JSON spine + Gujarat dump facts
npm run db:seed:nirf      # NIRF Medical 2025 ranks → matched colleges
npm run dev
```

## Commands

- `npm run db:migrate` — apply migrations
- `npm run db:migrate:dev` — author schema changes
- `npm run db:generate` — refresh Prisma client
- `npm run db:seed:catalog` — load `src/data/generated/*.json` and `public/gujarat_data`
- `npm run db:seed:nirf` — apply `data/nirf/medical-2025.json` (see `collegeSlug` mappings)

NIRF source rows live in `data/nirf/medical-2025.json`. Entries without a `collegeSlug` are not written until the institute exists in `app.colleges` (e.g. PGIMER, SGPGI, NIMHANS).

## Detail page performance

`loadCollegeBySlugFromDb()` loads one college with the same includes as the list query, so detail routes avoid re-fetching the full catalog when used via `findCollegeBySlug()`.
