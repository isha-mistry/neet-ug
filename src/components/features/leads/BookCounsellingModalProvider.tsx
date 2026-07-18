"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { BookCounsellingLeadForm } from "@/components/features/leads/BookCounsellingLeadForm";
import { LeadModalCloseButton } from "@/components/features/leads/LeadModalCloseButton";
import { cn } from "@/lib/utils";

export type BookCounsellingModalOptions = {
  /** After save, countdown then open WhatsApp with the free counselling message + form details. */
  redirectToWhatsApp?: boolean;
  /** Fired when the modal is dismissed (close button, backdrop, Escape, or post-submit reset). */
  onClose?: () => void;
};

type BookCounsellingModalContextValue = {
  openBookCounsellingModal: (source: string, options?: BookCounsellingModalOptions) => void;
  isBookCounsellingModalOpen: boolean;
};

const BookCounsellingModalContext = createContext<BookCounsellingModalContextValue | null>(
  null,
);

export function useBookCounsellingModal(): BookCounsellingModalContextValue {
  const ctx = useContext(BookCounsellingModalContext);
  if (!ctx) {
    throw new Error("useBookCounsellingModal must be used within BookCounsellingModalProvider");
  }
  return ctx;
}

function BookCounsellingLeadModal({
  open,
  source,
  options,
  onClose,
  formKey,
}: {
  open: boolean;
  source: string;
  options: BookCounsellingModalOptions;
  onClose: () => void;
  formKey: number;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleDismiss() {
    if (pending) return;
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "m-auto max-h-[min(90vh,640px)] w-[min(100%-2rem,400px)] max-w-none",
        "border-0 bg-transparent p-0 shadow-none backdrop:bg-on-surface/50",
      )}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        handleDismiss();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleDismiss();
      }}
    >
      <div className="relative rounded-[20px] border border-outline-variant/60 bg-surface p-5 shadow-[0_22px_60px_-24px_rgba(0,0,0,0.35)] md:p-6">
        <LeadModalCloseButton onClick={handleDismiss} disabled={pending} skin="surface" />
        <BookCounsellingLeadForm
          key={formKey}
          source={source}
          redirectToWhatsApp={options.redirectToWhatsApp === true}
          active={open}
          titleId={titleId}
          titleClassName="pr-8"
          hideResetLink
          onPendingChange={setPending}
          onReset={() => onClose()}
          className=""
        />
      </div>
    </dialog>
  );
}

export function BookCounsellingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("site");
  const [options, setOptions] = useState<BookCounsellingModalOptions>({});
  const [openSession, setOpenSession] = useState(0);
  const onCloseRef = useRef<(() => void) | undefined>(undefined);

  const openBookCounsellingModal = useCallback(
    (nextSource: string, nextOptions: BookCounsellingModalOptions = {}) => {
      onCloseRef.current = nextOptions.onClose;
      setSource(nextSource);
      setOptions(nextOptions);
      setOpenSession((n) => n + 1);
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    const onClose = onCloseRef.current;
    onCloseRef.current = undefined;
    onClose?.();
  }, []);

  return (
    <BookCounsellingModalContext.Provider
      value={{ openBookCounsellingModal, isBookCounsellingModalOpen: open }}
    >
      {children}
      <BookCounsellingLeadModal
        open={open}
        source={source}
        options={options}
        formKey={openSession}
        onClose={handleClose}
      />
    </BookCounsellingModalContext.Provider>
  );
}
