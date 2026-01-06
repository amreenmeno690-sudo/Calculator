
import React from 'react';

interface ScientificKeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onEqual: () => void;
  onBackspace: () => void;
  onOperator: (op: string) => void;
  onFunc: (fn: string) => void;
}

const ScientificKeypad: React.FC<ScientificKeypadProps> = ({ 
  onInput, onClear, onEqual, onBackspace, onOperator, onFunc 
}) => {
  return (
    <div className="grid grid-cols-5 gap-3 animate-fade-in">
      <button onClick={onClear} className="glass-button h-14 rounded-2xl flex items-center justify-center text-primary font-bold text-lg">AC</button>
      <button onClick={() => onInput('(')} className="glass-button rounded-2xl flex items-center justify-center text-white font-medium text-lg text-white/60 hover:text-white transition-colors">(</button>
      <button onClick={() => onInput(')')} className="glass-button rounded-2xl flex items-center justify-center text-white font-medium text-lg text-white/60 hover:text-white transition-colors">)</button>
      <button onClick={() => onInput('%')} className="glass-button rounded-2xl flex items-center justify-center text-white font-medium text-lg text-white/60 hover:text-white transition-colors">%</button>
      <button onClick={() => onOperator('÷')} className="glass-button rounded-2xl flex items-center justify-center text-primary text-2xl font-medium">÷</button>

      <button onClick={() => onFunc('sin')} className="glass-button rounded-2xl flex items-center justify-center text-xs font-medium text-white/60 hover:text-white transition-colors">sin</button>
      <button onClick={() => onFunc('cos')} className="glass-button rounded-2xl flex items-center justify-center text-xs font-medium text-white/60 hover:text-white transition-colors">cos</button>
      <button onClick={() => onFunc('tan')} className="glass-button rounded-2xl flex items-center justify-center text-xs font-medium text-white/60 hover:text-white transition-colors">tan</button>
      <button onClick={() => onFunc('log')} className="glass-button rounded-2xl flex items-center justify-center text-xs font-medium text-white/60 hover:text-white transition-colors">log</button>
      <button onClick={() => onOperator('×')} className="glass-button rounded-2xl flex items-center justify-center text-primary text-2xl font-medium">×</button>

      {[7, 8, 9].map(n => (
        <button key={n} onClick={() => onInput(n.toString())} className="glass-button h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">{n}</button>
      ))}
      <button onClick={() => onFunc('sqrt')} className="glass-button rounded-2xl flex items-center justify-center text-white font-medium text-lg text-white/60 hover:text-white transition-colors">
        <span className="material-symbols-outlined text-sm pt-1">square</span>
      </button>
      <button onClick={() => onOperator('-')} className="glass-button rounded-2xl flex items-center justify-center text-primary text-3xl font-medium">-</button>

      {[4, 5, 6].map(n => (
        <button key={n} onClick={() => onInput(n.toString())} className="glass-button h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">{n}</button>
      ))}
      <button onClick={() => onInput('^')} className="glass-button rounded-2xl flex items-center justify-center text-white font-medium text-xl text-white/60 hover:text-white transition-colors">^</button>
      <button onClick={() => onOperator('+')} className="glass-button rounded-2xl flex items-center justify-center text-primary text-3xl font-medium">+</button>

      {[1, 2, 3].map(n => (
        <button key={n} onClick={() => onInput(n.toString())} className="glass-button h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">{n}</button>
      ))}
      <button onClick={() => onInput('π')} className="glass-button rounded-2xl flex items-center justify-center text-white font-serif italic text-lg text-white/60 hover:text-white transition-colors">π</button>
      
      {/* Equal button spanning 2 rows */}
      <button 
        onClick={onEqual} 
        className="glass-button-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl row-span-2 shadow-lg hover:scale-[1.02] active:scale-[0.95] transition-all"
      >
        =
      </button>

      <button onClick={() => onInput('0')} className="glass-button h-14 rounded-2xl flex items-center justify-start pl-6 text-white font-bold text-2xl col-span-2">0</button>
      <button onClick={() => onInput('.')} className="glass-button h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">.</button>
      <button onClick={onBackspace} className="glass-button h-14 rounded-2xl flex items-center justify-center text-red-400 group hover:text-red-300">
        <span className="material-symbols-outlined text-[24px]">backspace</span>
      </button>
    </div>
  );
};

export default ScientificKeypad;
