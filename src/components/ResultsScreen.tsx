import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsScreenProps {
  wpm: number;
  accuracy: number;
  errors: number;
  totalTyped: number;
  duration: number;
  isNewPersonalBest: boolean;
  onRetry: () => void;
  onNewTest: () => void;
}

export function ResultsScreen({
  wpm,
  accuracy,
  errors,
  totalTyped,
  duration,
  isNewPersonalBest,
  onRetry,
  onNewTest
}: ResultsScreenProps) {
  const cpm = Math.round((totalTyped / duration) * 60) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-[400px] flex flex-col items-center justify-center bg-surface border border-border rounded-xl p-8"
      data-testid="results-screen"
    >
      <div className="text-center mb-8 relative">
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold tracking-widest text-secondary-text uppercase mb-2"
        >
          WPM
        </motion.div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl font-mono font-bold text-accent"
          data-testid="results-wpm"
        >
          {wpm}
        </motion.div>

        {isNewPersonalBest && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute -top-4 -right-12 bg-warning/20 text-warning px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-warning/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            data-testid="new-best-badge"
          >
            NEW BEST
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mb-10"
      >
        <div className="bg-secondary-bg border border-border rounded-lg p-4 text-center">
          <div className="text-[10px] tracking-wider text-secondary-text uppercase mb-1">Accuracy</div>
          <div className="text-2xl font-mono text-primary-text">{accuracy}%</div>
        </div>
        <div className="bg-secondary-bg border border-border rounded-lg p-4 text-center">
          <div className="text-[10px] tracking-wider text-secondary-text uppercase mb-1">CPM</div>
          <div className="text-2xl font-mono text-primary-text">{cpm}</div>
        </div>
        <div className="bg-secondary-bg border border-border rounded-lg p-4 text-center">
          <div className="text-[10px] tracking-wider text-secondary-text uppercase mb-1">Errors</div>
          <div className="text-2xl font-mono text-error">{errors}</div>
        </div>
        <div className="bg-secondary-bg border border-border rounded-lg p-4 text-center">
          <div className="text-[10px] tracking-wider text-secondary-text uppercase mb-1">Characters</div>
          <div className="text-2xl font-mono text-primary-text">{totalTyped}</div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4"
      >
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="bg-secondary-bg border-border text-primary-text hover:bg-surface hover:text-accent font-mono"
          data-testid="btn-retry"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry Test
        </Button>
        <Button 
          onClick={onNewTest}
          className="bg-accent text-[#060B14] hover:bg-accent/90 font-mono font-semibold"
          data-testid="btn-new-test"
        >
          <Play className="w-4 h-4 mr-2" />
          New Test
        </Button>
      </motion.div>
    </motion.div>
  );
}
