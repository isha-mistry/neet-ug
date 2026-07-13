"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CollegeCutoff, CollegeFees, CollegeSeatMatrix } from "@/types/college";
import {
  COUNSELLING_AUTHORITY_LABELS,
  type CounsellingAuthority,
} from "@/lib/colleges/counselling-pool";
import {
  isMccOnlySeatMatrix,
  seatMatrixHasQuotaOrCategoryData,
  seatMatrixHasStateCounsellingData,
} from "@/lib/catalog/seat-matrix-from-snapshot";
import {
  hasMccFeeScheduleData,
  hasStateFeeScheduleData,
  resolveFeeRowAuthority,
} from "@/lib/colleges/fee-source";

type CounsellingScopeContextValue = {
  authority: CounsellingAuthority;
  setAuthority: (authority: CounsellingAuthority) => void;
  hasState: boolean;
  hasMcc: boolean;
  showToggle: boolean;
  stateLabel: string;
  mccLabel: string;
};

const CounsellingScopeContext = createContext<CounsellingScopeContextValue | null>(
  null,
);

export function useCounsellingScope(): CounsellingScopeContextValue | null {
  return useContext(CounsellingScopeContext);
}

export function useCounsellingScopeRequired(): CounsellingScopeContextValue {
  const ctx = useContext(CounsellingScopeContext);
  if (!ctx) {
    throw new Error("useCounsellingScopeRequired must be used within CounsellingScopeProvider");
  }
  return ctx;
}

/** Toggle only when both state and MCC seat matrices exist with data. */
function detectAuthorities(input: {
  seatMatrix?: CollegeSeatMatrix;
  mccSeatMatrix?: CollegeSeatMatrix;
  fees?: CollegeFees;
}): { hasState: boolean; hasMcc: boolean } {
  const hasState = Boolean(
    input.seatMatrix &&
      seatMatrixHasStateCounsellingData(input.seatMatrix),
  );
  const hasDedicatedMcc = Boolean(
    input.mccSeatMatrix &&
      seatMatrixHasQuotaOrCategoryData(input.mccSeatMatrix),
  );
  const legacyMccOnly = Boolean(
    input.seatMatrix &&
      !input.mccSeatMatrix &&
      isMccOnlySeatMatrix(input.seatMatrix),
  );

  let hasMcc = hasDedicatedMcc || legacyMccOnly;

  if (!hasState && !hasMcc && input.fees) {
    hasMcc = hasMccFeeScheduleData(input.fees);
    return {
      hasState: hasStateFeeScheduleData(input.fees),
      hasMcc,
    };
  }

  return { hasState, hasMcc };
}

function resolveDefaultAuthority(
  hasState: boolean,
  hasMcc: boolean,
  fees: CollegeFees,
): CounsellingAuthority {
  if (hasState && !hasMcc) return "state";
  if (hasMcc && !hasState) return "mcc";
  if (hasState && hasMcc) return "state";

  if (hasMccFeeScheduleData(fees) && !hasStateFeeScheduleData(fees)) {
    return "mcc";
  }
  return "state";
}

export function CounsellingScopeProvider({
  cutoffs,
  fees,
  seatMatrix,
  mccSeatMatrix,
  stateSlug,
  children,
}: {
  cutoffs: CollegeCutoff[];
  fees: CollegeFees;
  seatMatrix?: CollegeSeatMatrix;
  mccSeatMatrix?: CollegeSeatMatrix;
  stateSlug?: string;
  children: ReactNode;
}) {
  void cutoffs;

  const { hasState, hasMcc } = useMemo(
    () => detectAuthorities({ seatMatrix, mccSeatMatrix, fees }),
    [seatMatrix, mccSeatMatrix, fees],
  );

  const showToggle = hasState && hasMcc;
  const defaultAuthority = resolveDefaultAuthority(hasState, hasMcc, fees);

  const [authority, setAuthority] =
    useState<CounsellingAuthority>(defaultAuthority);

  const stateLabel =
    stateSlug === "karnataka"
      ? "State"
      : stateSlug === "uttar-pradesh"
        ? "State"
        : COUNSELLING_AUTHORITY_LABELS.state.short;

  const value = useMemo(
    () => ({
      authority: showToggle ? authority : defaultAuthority,
      setAuthority,
      hasState,
      hasMcc,
      showToggle,
      stateLabel,
      mccLabel: COUNSELLING_AUTHORITY_LABELS.mcc.short,
    }),
    [
      authority,
      defaultAuthority,
      hasMcc,
      hasState,
      showToggle,
      stateLabel,
    ],
  );

  return (
    <CounsellingScopeContext.Provider value={value}>
      {children}
    </CounsellingScopeContext.Provider>
  );
}

export function cutoffMatchesAuthority(
  cutoff: CollegeCutoff,
  authority: CounsellingAuthority,
): boolean {
  const pool = cutoff.counsellingPool;

  if (pool) {
    return authority === "mcc"
      ? pool.startsWith("mcc-")
      : !pool.startsWith("mcc-");
  }

  if (authority === "mcc") {
    return (
      cutoff.dbSeatType === "AIQ" ||
      (cutoff.quota ?? "").toLowerCase().includes("all india")
    );
  }

  return !(
    cutoff.dbSeatType === "AIQ" ||
    (cutoff.quota ?? "").toLowerCase().includes("all india")
  );
}

export function feeRowMatchesAuthority(
  row: NonNullable<CollegeFees["stateFeeSchedule"]>[number],
  authority: CounsellingAuthority,
): boolean {
  return resolveFeeRowAuthority(row) === authority;
}
