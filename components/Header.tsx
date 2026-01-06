
import React from 'react';
import { CalculatorMode, AngleUnit } from '../types';

interface HeaderProps {
  mode: CalculatorMode;
  angleUnit: AngleUnit;
  hasExpression: boolean;
  onToggleHistory: () => void;
  onToggleMode: () => void;
  onToggleAngleUnit: () => void;
  onOpenAI: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  mode, 
  angleUnit, 
  hasExpression,
  onToggleHistory, 
  onToggleMode, 
  onToggleAngleUnit,
  onOpenAI
}) => {
  return (
    <div className="flex items-center justify-between p-6 pt-12 pb-4 shrink-0">
      <div className="flex gap-1">
        <button 
          onClick={onToggleHistory}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          title="History"
        >
          <span className="material-symbols-outlined text-[24px]">history</span>
        </button>
        
        {hasExpression && (
          <button 
            onClick={onOpenAI}
            className="flex items-center justify-center size-10 rounded-full hover:bg-primary/20 transition-all text-primary hover:text-blue-300 relative group"
            title="Explain with Gemini AI"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:scale-110">psychology</span>
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </button>
        )}
      </div>

      {mode === CalculatorMode.SCIENTIFIC ? (
        <div className="flex bg-black/20 rounded-full p-1 border border-white/5 shadow-inner">
          <button 
            className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-white/10 rounded-full shadow-sm"
          >
            Scientific
          </button>
          <button 
            onClick={onToggleMode}
            className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-300 transition-colors"
          >
            Standard
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
          <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(19,19,236,0.8)]"></div>
          <div className="size-1.5 rounded-full bg-white/10"></div>
          <div className="size-1.5 rounded-full bg-white/10"></div>
        </div>
      )}

      {mode === CalculatorMode.SCIENTIFIC ? (
        <button 
          onClick={onToggleAngleUnit}
          className="flex items-center justify-center h-8 px-3 rounded-full hover:bg-white/10 transition-colors text-primary font-black text-xs tracking-tighter"
        >
          {angleUnit}
        </button>
      ) : (
        <button 
          onClick={onToggleMode}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          title="Settings & Scientific Mode"
        >
          <span className="material-symbols-outlined text-[24px]">grid_view</span>
        </button>
      )}
    </div>
  );
};

export default Header;
