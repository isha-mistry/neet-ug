#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

TARGET_URL="${DIRECT_URL:-${DATABASE_URL:-}}"
if [[ -z "${TARGET_URL}" ]]; then
  echo "Error: set DIRECT_URL (recommended) or DATABASE_URL in .env for the hosted database" >&2
  exit 1
fi

DUMP_PATH="${1:-data/dumps/app-catalog-latest.dump}"
if [[ ! -f "${DUMP_PATH}" ]]; then
  echo "Error: dump not found at ${DUMP_PATH}" >&2
  echo "Run: npm run db:dump:local" >&2
  exit 1
fi

if [[ "${FORCE_RESTORE:-}" != "1" ]]; then
  echo "This will DROP and replace the entire app schema on the target database." >&2
  echo "Target: ${TARGET_URL%%@*}@***" >&2
  echo "Dump:   ${DUMP_PATH}" >&2
  echo "Re-run with: FORCE_RESTORE=1 npm run db:restore:catalog" >&2
  exit 1
fi

if ! command -v pg_restore >/dev/null 2>&1; then
  echo "Error: pg_restore not found. Install PostgreSQL client tools." >&2
  exit 1
fi

echo "Restoring app schema → hosted database"
pg_restore \
  --dbname="${TARGET_URL}" \
  --schema=app \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  --verbose \
  "${DUMP_PATH}"

echo "Done. Verify with: DATABASE_URL=<hosted> npx prisma db execute --stdin <<< 'SELECT COUNT(*) FROM app.colleges;'"
