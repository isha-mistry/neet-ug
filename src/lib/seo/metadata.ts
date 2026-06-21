import type { Metadata } from "next";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
}

/**
 * Per-page SEO is centralized in the root layout (`siteMetadata`).
 * Call sites are kept for a future per-route metadata pass.
 */
export function buildMetadata(_input: BuildMetadataInput): Metadata {
  return {};
}
