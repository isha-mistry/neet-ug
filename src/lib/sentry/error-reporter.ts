import * as Sentry from "@sentry/nextjs";
import { sanitizeContextData } from "./sanitizer";

export type ErrorReporterContext = {
  /** High-level business domain */
  module: "lead" | "auth" | "counseling" | "predictor" | "catalog" | "payment" | "general" | string;
  /** Granular feature or component area */
  feature: string;
  /** Specific operation being executed */
  action: string;
  /** Page path or API route */
  route?: string;
  /** Server Action identifier if applicable */
  serverAction?: string;
  /** Candidate / Student User ID */
  userId?: string;
  /** Inquiry / Lead CUID */
  leadId?: string;
  /** Tenant / Organization identifier */
  tenantId?: string;
  /** Additional safe debugging attributes */
  metadata?: Record<string, unknown>;
};

/**
 * Centralized Observability Error Reporter.
 * Traps exceptions, standardizes telemetry tags, sanitizes PII, and dispatches to Sentry.
 */
export function reportAppError(error: unknown, context: ErrorReporterContext): void {
  try {
    const isProd = process.env.NODE_ENV === "production";
    const environment = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || (isProd ? "production" : "development");

    // Always log locally in non-production environments for developer visibility
    if (!isProd) {
      console.error(`[reportAppError] [${context.module}:${context.feature}] (${context.action}):`, error, context);
    }

    // Sanitize any extra metadata before attaching to scope
    const safeMetadata = context.metadata
      ? (sanitizeContextData(context.metadata) as Record<string, unknown>)
      : undefined;

    Sentry.withScope((scope) => {
      // Standardized Sentry Tags for issue grouping and alert routing
      scope.setTag("module", context.module);
      scope.setTag("feature", context.feature);
      scope.setTag("action", context.action);
      scope.setTag("environment", environment);

      if (context.route) scope.setTag("route", context.route);
      if (context.serverAction) scope.setTag("server_action", context.serverAction);

      // User Context
      if (context.userId) {
        scope.setUser({ id: context.userId });
      }

      // Contextual Attributes
      const extraContext: Record<string, unknown> = {
        timestamp: new Date().toISOString(),
      };
      if (context.leadId) extraContext.leadId = context.leadId;
      if (context.tenantId) extraContext.tenantId = context.tenantId;
      if (safeMetadata) extraContext.metadata = safeMetadata;

      scope.setContext("diagnostics", extraContext);

      // Capture Exception
      if (error instanceof Error) {
        Sentry.captureException(error);
      } else if (typeof error === "string") {
        Sentry.captureMessage(error, "error");
      } else {
        Sentry.captureException(new Error(`[Non-Error Exception] ${JSON.stringify(sanitizeContextData(error))}`));
      }
    });
  } catch (reporterError) {
    // Fallback trap to ensure observability utility itself never crashes runtime
    console.error("[reportAppError] Internal Observability Failure:", reporterError);
  }
}
