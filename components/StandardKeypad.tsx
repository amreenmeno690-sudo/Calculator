
import React from 'react';

interface StandardKeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onEqual: () => void;
  onOperator: (op: string) => void;
}

const StandardKeypad: React.FC<StandardKeypadProps> = ({ onInput, onClear, onEqual, onOperator }) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full h-auto aspect-[4/5] animate-fade-in">
      <button onClick={onClear} className="glass-button glass-button-secondary rounded-[1.5rem] flex items-center justify-center text-xl font-black text-cyan-400">AC</button>
      <button onClick={() => onOperator('-')} className="glass-button glass-button-secondary rounded-[1.5rem] flex items-center justify-center">
        <span className="material-symbols-outlined text-[24px]">exposure_neg_1</span>
      </button>
      <button onClick={() => onInput('%')} className="glass-button glass-button-secondary rounded-[1.5rem] flex items-center justify-center">
        <span className="material-symbols-outlined text-[24px]">percent</span>
      </button>
      <button onClick={() => onOperator('÷')} className="glass-button-primary rounded-[1.5rem] flex items-center justify-center text-3xl font-light">÷</button>

      {[7, 8, 9].map(n => (
        <button key={n} onClick={() => onInput(n.toString())} className="glass-button rounded-[1.5rem] flex items-center justify-center text-3xl font-bold">{n}</button>
      ))}
      <button onClick={() => onOperator('×')} className="glass-button-primary rounded-[1.5rem] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">close</span>
      </button>

      {[4, 5, 6].map(n => (
        <button key={n} onClick={() => onInput(n.toString())} className="glass-button rounded-[1.5rem] flex items-center justify-center text-3xl font-bold">{n}</button>
      ))}
      <button onClick={() => onOperator('-')} className="glass-button-primary rounded-[1.5rem] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">remove</span>
      </button>

      {[1, 2, 3].map(n => (
        <button key={n} onClick={() => onInput(n.toString())} className="glass-button rounded-[1.5rem] flex items-center justify-center text-3xl font-bold">{n}</button>
      ))}
      <button onClick={() => onOperator('+')} className="glass-button-primary rounded-[1.5rem] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>

      <button onClick={() => onInput('0')} className="col-span-2 glass-button rounded-[1.5rem] flex items-center justify-start pl-9 text-3xl font-bold">0</button>
      <button onClick={() => onInput('.')} className="glass-button rounded-[1.5rem] flex items-center justify-center text-3xl font-bold">.</button>
      <button onClick={onEqual} className="glass-button-primary rounded-[1.5rem] flex items-center justify-center shadow-primary/40 relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span className="material-symbols-outlined text-[32px] relative z-10">equal</span>
      </button>
    </div>
  );
};

export default StandardKeypad;
