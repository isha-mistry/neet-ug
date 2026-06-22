#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

SOURCE_URL="${LOCAL_DATABASE_URL:-${DATABASE_URL:-}}"
if [[ -z "${SOURCE_URL}" ]]; then
  echo "Error: set LOCAL_DATABASE_URL or DATABASE_URL in .env" >&2
  exit 1
fi

DUMP_DIR="data/dumps"
mkdir -p "${DUMP_DIR}"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="${DUMP_DIR}/app-catalog-${STAMP}.dump"

echo "Dumping app schema from local database → ${OUT}"
pg_dump "${SOURCE_URL}" \
  --schema=app \
  --format=custom \
  --no-owner \
  --no-acl \
  --file="${OUT}"

ln -sf "$(basename "${OUT}")" "${DUMP_DIR}/app-catalog-latest.dump"
echo "Done. Latest symlink: ${DUMP_DIR}/app-catalog-latest.dump"
