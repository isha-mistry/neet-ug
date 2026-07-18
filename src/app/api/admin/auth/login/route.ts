import { verifyAdminCredentials } from "@/lib/admin/credentials";
import { signAdminJwt } from "@/lib/admin/jwt";
import {
  checkLoginRateLimit,
  clientIpFromRequest,
} from "@/lib/admin/rate-limit";

export const runtime = "nodejs";

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  const ip = clientIpFromRequest(request);
  const rate = checkLoginRateLimit(ip);
  if (!rate.allowed) {
    return Response.json(
      { error: "Too many login attempts. Try again later." },
      {
        status: 429,
        headers: rate.retryAfterSec
          ? { "Retry-After": String(rate.retryAfterSec) }
          : undefined,
      }
    );
  }

  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyAdminCredentials(email, password)) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  try {
    const { token, expiresAt } = signAdminJwt(email.trim().toLowerCase());
    return Response.json({ token, expiresAt });
  } catch {
    return Response.json(
      { error: "Admin auth is not configured" },
      { status: 503 }
    );
  }
}
