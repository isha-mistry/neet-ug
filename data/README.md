# Data Notes

This project now treats Postgres as the source of truth for catalog data.
No data-build or import scripts are maintained in this repository.

## Database workflow

- Use `npm run db:migrate` to apply schema migrations.
- Use `npm run db:migrate:dev` while authoring schema changes.
- Use `npm run db:generate` after editing `prisma/schema.prisma`.

## Runtime source

- The app reads catalog data from `app.college_documents` and `app.state_documents`.
- If those tables are empty, seed/import data using your external process before running the app.

## Admin

`/admin/data-quality` reports quality flags from the currently seeded Postgres catalog.
