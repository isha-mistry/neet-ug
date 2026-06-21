"use client";

import { FiCalendar } from "react-icons/fi";
import {
  useBookCounsellingModal,
  type BookCounsellingModalOptions,
} from "@/components/features/leads/BookCounsellingModalProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type BookCounsellingTriggerProps = {
  source: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  label?: string;
  shortLabel?: string;
  showLeadingIcon?: boolean;
  modalOptions?: BookCounsellingModalOptions;
  onAfterClick?: () => void;
};

export function BookCounsellingTrigger({
  source,
  variant = "primary",
  size = "sm",
  fullWidth,
  className,
  label = "Book a Counselling",
  shortLabel = "Book a Counselling",
  showLeadingIcon = true,
  modalOptions,
  onAfterClick,
}: BookCounsellingTriggerProps) {
  const { openBookCounsellingModal } = useBookCounsellingModal();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      leadingIcon={
        showLeadingIcon ? (
          <FiCalendar
            className={cn(
              "shrink-0",
              size === "sm" ? "h-3 w-3 lg:h-3.5 lg:w-3.5" : "h-4 w-4",
            )}
            aria-hidden
          />
        ) : undefined
      }
      className={className}
      onClick={() => {
        openBookCounsellingModal(source, modalOptions);
        onAfterClick?.();
      }}
    >
      {fullWidth ? (
        label
      ) : (
        <>
          <span className="lg:hidden">{shortLabel}</span>
          <span className="hidden lg:inline">{label}</span>
        </>
      )}
    </Button>
  );
}
