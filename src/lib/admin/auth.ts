import "server-only";

import { verifyAdminJwt, type AdminJwtPayload } from "@/lib/admin/jwt";

export type AdminAuthSuccess = {
  ok: true;
  payload: AdminJwtPayload;
};

export type AdminAuthFailure = {
  ok: false;
  response: Response;
};

export type AdminAuthResult = AdminAuthSuccess | AdminAuthFailure;

function unauthorized(message = "Unauthorized"): Response {
  return Response.json({ error: message }, { status: 401 });
}

/** Extract and verify `Authorization: Bearer <jwt>` for admin APIs. */
export function requireAdminBearer(request: Request): AdminAuthResult {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return { ok: false, response: unauthorized("Missing bearer token") };
  }
  const token = header.slice("Bearer ".length).trim();
  if (!token) {
    return { ok: false, response: unauthorized("Missing bearer token") };
  }
  const payload = verifyAdminJwt(token);
  if (!payload) {
    return { ok: false, response: unauthorized("Invalid or expired token") };
  }
  return { ok: true, payload };
}
