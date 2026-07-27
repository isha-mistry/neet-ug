function readIntEnv(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export const workerConfig = {
  databaseUrl:
    process.env.DIRECT_URL?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    "",
  sendIntervalMs: readIntEnv("SEND_INTERVAL_MS", 6000),
  pollIntervalMs: readIntEnv("WORKER_POLL_MS", 2000),
  staleClaimMs: readIntEnv("WORKER_STALE_CLAIM_MS", 300_000),
};

export function assertWorkerConfig(): void {
  if (!workerConfig.databaseUrl) {
    throw new Error("DIRECT_URL or DATABASE_URL is required for notifier-worker.");
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
