import { Badge } from "@/components/ui/Badge";
import { toTitleCase } from "@/lib/utils";
import type { CollegeType } from "@/types/college";

interface CollegeTypeBadgeProps {
  type: CollegeType;
}

export function CollegeTypeBadge({ type }: CollegeTypeBadgeProps) {
  return <Badge tone="brand">{toTitleCase(type)}</Badge>;
}
