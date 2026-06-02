import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** One pool per process; keep defaults tunable for build-time static generation. */
function databaseUrlWithPoolConfig(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;

  const params: string[] = [];
  if (!/[?&]connection_limit=/i.test(url)) {
    params.push(`connection_limit=${process.env.PRISMA_CONNECTION_LIMIT ?? "5"}`);
  }
  if (!/[?&]pool_timeout=/i.test(url)) {
    params.push(`pool_timeout=${process.env.PRISMA_POOL_TIMEOUT ?? "30"}`);
  }
  if (!params.length) return url;

  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}${params.join("&")}`;
}

function createPrismaClient(): PrismaClient {
  const url = databaseUrlWithPoolConfig();
  return new PrismaClient({
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

globalForPrisma.prisma = prisma;
