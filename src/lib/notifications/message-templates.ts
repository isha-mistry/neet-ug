import { LEAD_FORM_TYPES, type LeadFormType } from "@/lib/leads/types";
import type { LeadMessageContext, NotificationMessageSpec } from "./types";

function greeting(ctx: LeadMessageContext): string {
  const name = ctx.name?.trim();
  return name ? `Hi ${name},` : "Hi,";
}

function line(label: string, value: string | number | null | undefined): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text ? `${label}: ${text}` : null;
}

/** Shared profile lines pulled from whatever the form collected. */
function profileLines(ctx: LeadMessageContext): string[] {
  return [
    line("NEET score", ctx.neetScore),
    line("Category", ctx.neetCategory),
    line("Domicile state", ctx.domicileState),
    line("Target states", ctx.targetStates),
    line("City", ctx.city),
    line("Query type", ctx.queryType),
    line("Preferred slot", ctx.preferredSlot),
    line("Page", ctx.pageLabel),
  ].filter((value): value is string => Boolean(value));
}

function withProfile(intro: string[], ctx: LeadMessageContext, outro: string[]): string {
  const profile = profileLines(ctx);
  const blocks = [
    intro.join("\n"),
    profile.length ? profile.join("\n") : null,
    outro.join("\n"),
  ].filter(Boolean);
  return blocks.join("\n\n");
}

const REGISTRY: Record<LeadFormType, NotificationMessageSpec> = {
  [LEAD_FORM_TYPES.freeCounselling]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} thank you for booking a free MBBS counselling review with Dravio.`,
          "We have received your request.",
        ],
        ctx,
        [
          "A counsellor will review your profile and connect with you on WhatsApp shortly.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.freeCounsellingCollegePreferenceList]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} thank you for requesting a college preference list from Dravio.`,
          "We will prepare a shortlist suited to your NEET profile.",
        ],
        ctx,
        [
          "Our team will share your preference guidance on WhatsApp soon.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.counsellingRoundsAlert]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} you are subscribed to Dravio counselling round alerts.`,
          "We will notify you when important round updates are published.",
        ],
        ctx,
        ["Stay tuned on WhatsApp for the next counselling updates."],
      ),
  },

  [LEAD_FORM_TYPES.neetUg2026InfoAlerts]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} thanks for signing up for NEET UG 2026 information alerts from Dravio.`,
        ],
        ctx,
        [
          "We will share exam, counselling, and admission updates with you on WhatsApp.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.neetUgLiveUpdates]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} you are now on Dravio's NEET UG live updates list.`,
        ],
        ctx,
        [
          "Expect timely WhatsApp alerts as counselling and exam news breaks.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.getNriCounsellingSupport]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} thank you for requesting NRI counselling support from Dravio.`,
          "Our NRI admission specialists have received your request.",
        ],
        ctx,
        [
          "We will connect with you on WhatsApp to discuss NRI quota options and next steps.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.getCounsellingGlossaryHelp]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} thank you for asking for counselling glossary help on Dravio.`,
        ],
        ctx,
        [
          "A counsellor will clarify counselling terms and process steps with you on WhatsApp.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.contactInquiry]: {
    kind: "text",
    text: (ctx) => {
      const parts = [
        `${greeting(ctx)} we received your enquiry on Dravio.`,
        ctx.queryType?.trim()
          ? `Topic: ${ctx.queryType.trim()}`
          : null,
        ctx.message?.trim()
          ? `Your message:\n${ctx.message.trim()}`
          : null,
        ...profileLines(ctx).filter(
          (l) => !l.startsWith("Query type:"),
        ),
        "Our team will reply on WhatsApp as soon as possible.",
      ].filter(Boolean);
      return parts.join("\n\n");
    },
  },

  [LEAD_FORM_TYPES.callbackRequest]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} your callback request on Dravio is confirmed.`,
        ],
        ctx,
        [
          "A counsellor will call you on WhatsApp during your preferred time window.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.journeyModal]: {
    kind: "text",
    text: (ctx) => {
      const planHint = ctx.variant?.trim()
        ? `Plan / source: ${ctx.variant.trim()}`
        : null;
      return withProfile(
        [
          `${greeting(ctx)} thank you for starting your MBBS journey counselling request with Dravio.`,
          planHint,
        ].filter(Boolean) as string[],
        ctx,
        [
          "Our team will review your details and guide you on WhatsApp.",
        ],
      );
    },
  },

  [LEAD_FORM_TYPES.predictorGate]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} your college matcher request on Dravio is saved.`,
          "We will help you explore safe, borderline, and reach medical colleges.",
        ],
        ctx,
        [
          "A counsellor will follow up on WhatsApp with next steps.",
        ],
      ),
  },

  [LEAD_FORM_TYPES.neetContentMagnet]: {
    kind: "text",
    text: (ctx) => {
      const variantLabel =
        ctx.variant === "email-guide"
          ? "NEET guide / email request"
          : ctx.variant === "phone-whatsapp"
            ? "WhatsApp counselling request"
            : ctx.variant === "whatsapp-alerts"
              ? "WhatsApp alerts subscription"
              : ctx.variant?.trim() || "NEET content request";

      return withProfile(
        [
          `${greeting(ctx)} thank you for your ${variantLabel} on Dravio.`,
        ],
        ctx,
        [
          "We will share the relevant NEET UG guidance with you on WhatsApp.",
        ],
      );
    },
  },

  [LEAD_FORM_TYPES.rankPredictor]: {
    kind: "text",
    text: (ctx) => {
      const stage =
        ctx.variant === "estimate_only"
          ? "rank estimate"
          : ctx.variant === "phone_verified"
            ? "rank prediction (phone verified)"
            : ctx.variant === "profile_complete"
              ? "full rank prediction profile"
              : "NEET rank prediction";

      return withProfile(
        [
          `${greeting(ctx)} your ${stage} is saved on Dravio.`,
        ],
        ctx,
        [
          "Open the rank predictor anytime to refine inputs. Our team can also help interpret your result on WhatsApp.",
        ],
      );
    },
  },

  [LEAD_FORM_TYPES.collegePredictor]: {
    kind: "text",
    text: (ctx) => {
      const stage =
        ctx.variant === "estimate_only"
          ? "college predictor summary"
          : ctx.variant === "phone_verified"
            ? "college predictor (phone verified)"
            : ctx.variant === "profile_complete"
              ? "unlocked college predictor profile"
              : "college predictor session";

      return withProfile(
        [
          `${greeting(ctx)} your ${stage} is saved on Dravio.`,
          "We can help you map AIR and category to realistic MBBS options.",
        ],
        ctx,
        [
          "A counsellor will share college shortlisting guidance on WhatsApp.",
        ],
      );
    },
  },

  [LEAD_FORM_TYPES.cutoffAnalyser]: {
    kind: "text",
    text: (ctx) => {
      const stage =
        ctx.variant === "estimate_only"
          ? "cutoff analysis summary"
          : ctx.variant === "phone_verified"
            ? "cutoff analysis (phone verified)"
            : ctx.variant === "profile_complete"
              ? "full cutoff analysis profile"
              : "cutoff analysis";

      return withProfile(
        [
          `${greeting(ctx)} your ${stage} is saved on Dravio.`,
        ],
        ctx,
        [
          "Our team can help you read closing ranks and plan counselling choices on WhatsApp.",
        ],
      );
    },
  },

  [LEAD_FORM_TYPES.homePlaybook]: {
    kind: "text",
    text: (ctx) =>
      withProfile(
        [
          `${greeting(ctx)} thank you for requesting the Dravio MBBS counselling playbook.`,
        ],
        ctx,
        [
          "We will share the playbook and follow-up guidance with you on WhatsApp.",
        ],
      ),
  },
};

const FALLBACK_SPEC: NotificationMessageSpec = {
  kind: "text",
  text: (ctx) =>
    withProfile(
      [
        `${greeting(ctx)} thank you for contacting Dravio.`,
        "We have received your request.",
      ],
      ctx,
      [
        "Our counselling team will connect with you on WhatsApp shortly.",
      ],
    ),
};

export function getNotificationMessageSpec(
  formType: string,
): NotificationMessageSpec {
  return REGISTRY[formType as LeadFormType] ?? FALLBACK_SPEC;
}

/** SMS fallback uses plain text derived from the same template registry. */
export function getSmsFallbackText(ctx: LeadMessageContext): string {
  const spec = getNotificationMessageSpec(ctx.formType);
  if (spec.kind === "text") {
    return spec.text(ctx);
  }
  const caption = spec.caption?.(ctx);
  if (caption?.trim()) return caption.trim();
  return FALLBACK_SPEC.kind === "text" ? FALLBACK_SPEC.text(ctx) : "Thank you for contacting Dravio.";
}
