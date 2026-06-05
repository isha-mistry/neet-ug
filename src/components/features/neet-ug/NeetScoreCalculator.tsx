"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MaterialSymbol } from "@/components/common/MaterialSymbol";

export function NeetScoreCalculator() {
  const [correct, setCorrect] = useState<number>(140);
  const [incorrect, setIncorrect] = useState<number>(20);
  const [calculatedScore, setCalculatedScore] = useState<number>(540);
  const [unattempted, setUnattempted] = useState<number>(20);

  useEffect(() => {
    const totalAttempted = correct + incorrect;
    if (totalAttempted > 180) {
      const diff = totalAttempted - 180;
      if (correct > incorrect) {
        setCorrect(Math.max(0, correct - diff));
      } else {
        setIncorrect(Math.max(0, incorrect - diff));
      }
    }
    
    const unattempt = 180 - correct - incorrect;
    setUnattempted(unattempt);
    
    const score = (correct * 4) - (incorrect * 1);
    setCalculatedScore(score);
  }, [correct, incorrect]);

  return (
    <Card padded bordered className="bg-white/80 shadow-md rounded-2xl">
      <h3 className="text-xl font-bold text-text flex items-center gap-2 mb-6">
        <MaterialSymbol name="calculate" className="text-primary" />
        Real-time NEET Score Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-text-secondary flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Correct Answers (+4)
              </label>
              <span className="text-sm font-bold text-green-700">{correct} Qs</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              value={correct}
              onChange={(e) => setCorrect(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-text-secondary flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Incorrect Answers (-1)
              </label>
              <span className="text-sm font-bold text-red-700">{incorrect} Qs</span>
            </div>
            <input
              type="range"
              min="0"
              max={180 - correct}
              value={incorrect}
              onChange={(e) => setIncorrect(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
          </div>

          <div className="bg-slate-50 border border-border p-4 rounded-xl flex items-center justify-between text-sm">
            <span className="text-text-secondary font-medium flex items-center gap-1">
              <MaterialSymbol name="do_not_disturb_on" className="text-slate-400" />
              Unattempted Questions:
            </span>
            <span className="font-bold text-slate-700">{unattempted} Qs</span>
          </div>

          <div className="bg-brand-50 border border-brand-100 p-4 rounded-xl flex items-center justify-between text-sm">
            <span className="text-text-secondary font-medium flex items-center gap-1">
              <MaterialSymbol name="pending_actions" className="text-primary" />
              Total Attempted Questions:
            </span>
            <span className="font-bold text-primary">{correct + incorrect} / 180</span>
          </div>
        </div>

        {/* Big Circular Score Render */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-brand-50 to-white border border-brand-100/50 rounded-2xl text-center">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Estimated NEET Score</span>
          
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-8 border-brand-100 bg-white shadow-inner mt-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-extrabold text-brand-700 tracking-tight">{calculatedScore}</span>
              <span className="text-xs font-semibold text-text-muted mt-1">out of 720</span>
            </div>
          </div>

          <p className="text-xs text-text-secondary mt-4 max-w-[200px] leading-relaxed">
            Based on standard marking structure: +4 marks per correct answer, -1 mark deduction per error.
          </p>

          <Button
            as="link"
            href={`/rank-predictor?score=${calculatedScore}`}
            variant="primary"
            className="mt-5 w-full shadow-md"
            trailingIcon={<MaterialSymbol name="trending_up" />}
          >
            Predict Rank With Score
          </Button>
        </div>
      </div>
    </Card>
  );
}
