import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResultsScreenProps {
  wpm: number;
  accuracy: number;
  errors: number;
  totalTyped: number;
  duration: number;
  language: string;
  isNewPersonalBest: boolean;
  onRetry: () => void;
  onNewTest: () => void;
}

function MetricCard({ label, value, valueClassName = "" }: { label: string, value: string | number, valueClassName?: string }) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 flex flex-col items-center justify-center gap-2">
      <div className="text-[#94A3B8] text-xs font-semibold tracking-wider uppercase">{label}</div>
      <div className={`text-white text-3xl font-bold font-mono ${valueClassName}`}>{value}</div>
    </div>
  );
}

export function ResultsScreen({
  wpm,
  accuracy,
  errors,
  totalTyped,
  duration,
  language,
  isNewPersonalBest,
  onRetry,
  onNewTest
}: ResultsScreenProps) {
  const cpm = Math.round((totalTyped / duration) * 60) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full min-h-[400px] gap-8 bg-[#060B14]"
      data-testid="results-screen"
    >
      {/* 1. Header Badges */}
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-[#1F2937] text-[#94A3B8]">
          {`</> ${language}`}
        </Badge>
        <Badge variant="outline" className="border-[#1F2937] text-[#94A3B8]">
          {duration}s
        </Badge>
      </div>

      {/* 2. Personal Best Pill (Conditional) */}
      {isNewPersonalBest && (
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 text-orange-400 bg-orange-500/10 text-sm font-medium">
          <Zap className="w-4 h-4" />
          <span>NEW PERSONAL BEST</span>
        </div>
      )}

      {/* 3. Main WPM Display */}
      <div className="flex flex-col items-center relative my-8">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[#22D3EE] opacity-10 blur-[60px] rounded-full" />
        <h1 className="text-[120px] leading-none font-bold text-[#22D3EE] tracking-tighter drop-shadow-lg z-10 font-mono">
          {wpm}
        </h1>
        <p className="text-[#94A3B8] tracking-[0.3em] text-sm font-medium mt-4">
          WORDS PER MINUTE
        </p>
      </div>

      {/* 4. Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
        <MetricCard label="ACCURACY" value={`${accuracy}%`} />
        <MetricCard label="CPM" value={cpm} />
        <MetricCard label="ERRORS" value={errors} valueClassName="text-[#EF4444]" />
        <MetricCard label="CHARS TYPED" value={totalTyped} />
      </div>

      {/* 5. Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <Button variant="outline" onClick={onRetry} className="bg-transparent border-[#1F2937] hover:bg-[#111827] text-white">
          <RotateCcw className="w-4 h-4 mr-2" /> Retry
        </Button>
        <Button onClick={onNewTest} className="bg-[#22D3EE] text-[#060B14] hover:bg-[#22D3EE]/90">
          <Play className="w-4 h-4 mr-2" /> New Test
        </Button>
      </div>

      {/* 6. Footer Hints */}
      <div className="flex items-center gap-2 text-[#94A3B8] text-sm mt-8">
        <span>Press</span>
        <kbd className="px-2 py-1 bg-[#111827] border border-[#1F2937] rounded-md font-mono text-xs">Tab</kbd>
        <span>for new test</span>
        <span className="mx-2">·</span>
        <kbd className="px-2 py-1 bg-[#111827] border border-[#1F2937] rounded-md font-mono text-xs">Esc</kbd>
        <span>to retry</span>
      </div>
    </motion.div>
  );
}
