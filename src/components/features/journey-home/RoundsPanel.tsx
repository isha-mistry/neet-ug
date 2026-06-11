"use client";

import { useState } from "react";
import { ROUNDS_DATA } from "@/lib/journey-home/rounds-data";

const ROUND_BUTTONS = [
  { i: 0, dot: "R1", label: "Round 1", time: "AUG–SEP" },
  { i: 1, dot: "R2", label: "Round 2", time: "SEP–OCT" },
  { i: 2, dot: "M", label: "Mop-up", time: "OCT–NOV" },
  { i: 3, dot: "SV", label: "Stray vacancy", time: "NOV" },
];

export function RoundsPanel() {
  const [active, setActive] = useState(0);
  const d = ROUNDS_DATA[active];

  return (
    <>
      <div className="rounds-track" id="rtrack">
        {ROUND_BUTTONS.map((btn) => (
          <div
            key={btn.i}
            className={`rnode2${active === btn.i ? " on" : ""}`}
            data-i={btn.i}
          >
            <button type="button" onClick={() => setActive(btn.i)}>
              <span className="rdot">{btn.dot}</span>
              <span className="rl">{btn.label}</span>
              <span className="rt">{btn.time}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="card rpanel" id="rpanel">
        <div>
          <h3>
            {d.t}{" "}
            <span className="mono">{d.m}</span>
          </h3>
          <p>{d.d}</p>
        </div>
        <div className="our">
          <span className="k">What we do</span>
          <p>{d.o}</p>
        </div>
      </div>
    </>
  );
}
