/**
 * Rounds sticky-scroll state shared by RoundsPanel + ScrollJourney.
 *
 * Flow: scroll reaches Step 06 heading → auto-pin → wheel/touch drives the
 * pointer continuously through R1→R2→M→SV → unpin → Step 07. Reverse
 * re-enters from 07 with the same continuous mapping.
 */

export const ROUNDS_COUNT = 4;
export const NAV_HEIGHT = 70;
/** Total wheel/touch delta (px) to traverse Step 06 → SV while pinned. */
export const ROUNDS_SCROLL_BUDGET = 720;
const SETTLED_EPSILON = 0.01;

export type RoundsChangeSource =
  | "wheel"
  | "touch"
  | "click"
  | "enter"
  | "engage"
  | "exit-up"
  | "reenter";

let roundIndex = 0;
let smoothProgress = 0;
let roundFracs: number[] = [];
let pinnedScrollY: number | null = null;
let pointerAtStep06 = false;
let roundsCompletedDown = false;
let exitingUpTo06 = false;
let pinnedAt06 = false;
let step06Frac = 0;
let roundsScrollProgress = 0;

function getRoundsStickyAnchor(): HTMLElement | null {
  return document.getElementById("rounds-eyebrow");
}

function syncRoundsStickyCss() {
  const section = document.getElementById("rounds");
  const anchor = getRoundsStickyAnchor();
  if (!section || !anchor) return;

  const anchorOffset =
    anchor.getBoundingClientRect().top - section.getBoundingClientRect().top;
  section.style.setProperty(
    "--rounds-sticky-top",
    `${NAV_HEIGHT - anchorOffset}px`,
  );
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

function syncDom() {
  const section = document.getElementById("rounds");
  const journeyHome = document.querySelector(".journey-home");
  if (!section) return;
  section.setAttribute("data-active-round", String(roundIndex));
  const pinned = pinnedScrollY !== null;
  section.classList.toggle("rounds-pinned", pinned);
  journeyHome?.classList.toggle("journey-rounds-pinned", pinned);
  if (pinned) syncRoundsStickyCss();
}

function dispatchLayout() {
  document
    .getElementById("rounds")
    ?.dispatchEvent(new CustomEvent("journey:rounds-layout"));
}

function lockPinScroll() {
  const y = pinnedScrollY;
  if (y === null) return;
  if (Math.abs(window.scrollY - y) > 1) {
    window.scrollTo({ top: y, behavior: "instant" });
  }
}

function progressForRound(idx: number): number {
  if (!roundFracs.length) return idx / Math.max(ROUNDS_COUNT - 1, 1);
  const sv = roundFracs[roundFracs.length - 1];
  const target = roundFracs[idx];
  if (sv <= step06Frac || target === undefined) return 0;
  return Math.max(0, Math.min(1, (target - step06Frac) / (sv - step06Frac)));
}

function syncRoundIndexFromProgress() {
  if (!roundFracs.length) return;
  const target = getPinnedPathTarget();
  if (target === null) return;

  let idx = 0;
  for (let i = 0; i < roundFracs.length; i++) {
    if (target >= roundFracs[i] - 0.006) idx = i;
  }

  if (idx !== roundIndex) {
    roundIndex = idx;
    syncDom();
  }
}

export function getRoundIndex() {
  return roundIndex;
}

export function getActiveRound() {
  return roundIndex;
}

export function getTargetRound() {
  return roundIndex;
}

export function getRoundsScrollProgress() {
  return roundsScrollProgress;
}

export function setRoundFracs(fracs: number[]) {
  roundFracs = fracs;
}

export function reportSmoothProgress(p: number) {
  smoothProgress = p;
}

export function setPointerAtStep06(at: boolean) {
  pointerAtStep06 = at;
}

export function isPointerAtStep06() {
  return pointerAtStep06;
}

export function isRoundsPinned() {
  return pinnedScrollY !== null;
}

export function isPinnedAt06() {
  return isRoundsPinned() && roundsScrollProgress <= 0.005;
}

export function clearPinnedAt06() {
  pinnedAt06 = false;
}

export function setStep06Frac(frac: number) {
  step06Frac = frac;
}

export function getStep06Frac() {
  return step06Frac;
}

export function getPinnedPathTarget(): number | null {
  if (!isRoundsPinned()) return null;
  if (exitingUpTo06) return step06Frac;
  if (!roundFracs.length) return step06Frac;

  const sv = roundFracs[roundFracs.length - 1];
  if (sv <= step06Frac) return step06Frac;

  return step06Frac + roundsScrollProgress * (sv - step06Frac);
}

export function addRoundsScrollDelta(
  deltaY: number,
  source: "wheel" | "touch" = "wheel",
): boolean {
  if (!isRoundsPinned() || !roundFracs.length) return false;

  const sv = roundFracs[roundFracs.length - 1];
  if (sv <= step06Frac) return false;

  const prevProgress = roundsScrollProgress;
  const prevRound = roundIndex;

  pinnedAt06 = false;
  roundsScrollProgress = Math.max(
    0,
    Math.min(1, roundsScrollProgress + deltaY / ROUNDS_SCROLL_BUDGET),
  );
  syncRoundIndexFromProgress();

  if (
    roundsScrollProgress === prevProgress &&
    roundIndex === prevRound
  ) {
    return false;
  }

  document.getElementById("rounds")?.dispatchEvent(
    new CustomEvent("journey:rounds-change", {
      detail: { round: roundIndex, source },
    }),
  );
  notify();
  return true;
}

export function isApproachSettledAt06() {
  if (!step06Frac) return false;
  return Math.abs(smoothProgress - step06Frac) < SETTLED_EPSILON;
}

export function isPointerSettled() {
  if (!isRoundsPinned()) return true;
  const target = getPinnedPathTarget();
  if (target === null) return true;
  return Math.abs(smoothProgress - target) < SETTLED_EPSILON;
}

export function isRoundTransitioning() {
  return !isPointerSettled();
}

/** Scroll Y that aligns the Step 06 eyebrow with the bottom of the fixed navbar. */
export function computeRoundsPinY(): number {
  const anchor = getRoundsStickyAnchor();
  if (!anchor) return window.scrollY;
  return anchor.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
}

export function isHeadingAtPinLine() {
  const anchor = getRoundsStickyAnchor();
  if (!anchor) return false;
  const top = anchor.getBoundingClientRect().top;
  return top <= NAV_HEIGHT + 6 && top >= NAV_HEIGHT - 12;
}

/** Pin when the Step 06 heading reaches the sticky line (scroll-driven). */
export function autoPinAtStep06(): boolean {
  if (isRoundsPinned()) return false;

  syncRoundsStickyCss();
  pinnedScrollY = computeRoundsPinY();
  roundsScrollProgress = 0;
  pinnedAt06 = true;
  exitingUpTo06 = false;
  roundIndex = 0;
  syncDom();
  lockPinScroll();
  dispatchLayout();
  notify();
  return true;
}

/** Re-pin when scrolling back up from Step 07 into the rounds sequence. */
export function reenterRoundsFrom07(): boolean {
  if (isRoundsPinned()) return false;

  resetRoundsCompletedDown();
  syncRoundsStickyCss();
  pinnedScrollY = computeRoundsPinY();
  roundsScrollProgress = 1;
  pinnedAt06 = false;
  exitingUpTo06 = false;
  roundIndex = ROUNDS_COUNT - 1;
  syncDom();
  lockPinScroll();
  dispatchLayout();
  document.getElementById("rounds")?.dispatchEvent(
    new CustomEvent("journey:rounds-change", {
      detail: { round: roundIndex, source: "reenter" },
    }),
  );
  notify();
  return true;
}

export function beginExitUpTo06() {
  if (exitingUpTo06 || !isRoundsPinned()) return;
  exitingUpTo06 = true;
  pinnedAt06 = false;
  roundsScrollProgress = 0;
  document
    .getElementById("rounds")
    ?.dispatchEvent(new CustomEvent("journey:rounds-exit-up-start"));
  notify();
}

export function isExitingUpTo06() {
  return exitingUpTo06;
}

export function finishExitUpTo06() {
  exitingUpTo06 = false;
  pinnedAt06 = false;
  pinnedScrollY = null;
  syncDom();
  document.getElementById("rounds")?.dispatchEvent(
    new CustomEvent("journey:rounds-exit", {
      detail: { direction: "up", round: roundIndex },
    }),
  );
  notify();
}

export function hasRoundsCompletedDown() {
  return roundsCompletedDown;
}

export function resetRoundsCompletedDown() {
  roundsCompletedDown = false;
}

export function releaseRoundsPin(direction?: "down" | "up") {
  if (direction === "down" && roundIndex >= ROUNDS_COUNT - 1) {
    roundsCompletedDown = true;
  }
  if (direction === "up") {
    roundsCompletedDown = false;
    exitingUpTo06 = false;
    pinnedAt06 = false;
    roundsScrollProgress = 0;
  }

  pinnedScrollY = null;
  syncDom();

  document.getElementById("rounds")?.dispatchEvent(
    new CustomEvent("journey:rounds-exit", {
      detail: { direction: direction ?? "none", round: roundIndex },
    }),
  );

  notify();
}

export function goToRound(idx: number, source: RoundsChangeSource): boolean {
  const clamped = Math.max(0, Math.min(ROUNDS_COUNT - 1, idx));
  if (clamped === roundIndex && source !== "enter" && source !== "engage") {
    return false;
  }

  roundIndex = clamped;

  if (
    isRoundsPinned() &&
    (source === "click" || source === "wheel" || source === "touch")
  ) {
    roundsScrollProgress = progressForRound(clamped);
    pinnedAt06 = roundsScrollProgress <= 0.005;
  }

  syncDom();

  document.getElementById("rounds")?.dispatchEvent(
    new CustomEvent("journey:rounds-change", {
      detail: { round: roundIndex, source },
    }),
  );

  notify();
  return true;
}

export function setActiveRound(
  idx: number,
  source: RoundsChangeSource,
): boolean {
  return goToRound(idx, source);
}

export function subscribeActiveRound(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getRoundsPinScrollY() {
  return pinnedScrollY;
}

export function canExitRoundsScroll(direction: "down" | "up") {
  if (!isRoundsPinned() || !isPointerSettled()) return false;
  if (direction === "down") {
    return roundsScrollProgress >= 0.995;
  }
  return roundsScrollProgress <= 0.005;
}

export function isRoundsEngageZone() {
  return isRoundsPinned();
}

export function shouldClampPinnedScroll() {
  return isRoundsPinned();
}

/** @deprecated use isRoundsEngageZone */
export function isRoundsFocusZone() {
  return isRoundsEngageZone();
}
