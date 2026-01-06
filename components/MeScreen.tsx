
import React, { useState } from 'react';
import { soundService } from '../services/soundService';

const MeScreen: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2, 3]);

  const toggleDay = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays(prev => prev.filter(d => d !== day));
      soundService.playClick();
    } else {
      setCompletedDays(prev => [...prev, day]);
      soundService.playSuccess();
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in overflow-y-auto no-scrollbar pb-24">
      <div className="flex items-center gap-6 mb-10">
        <div className="size-24 rounded-[2rem] bg-gradient-to-tr from-primary to-purple-600 p-1">
          <div className="size-full rounded-[1.8rem] bg-background-dark flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">Alex Rivera</h2>
          <p className="text-primary font-bold text-sm uppercase tracking-widest">Premium Member</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-[2rem] mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">20-Day Skin Care</h3>
          <span className="text-primary font-bold">{completedDays.length}/20</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 20 }).map((_, i) => {
            const day = i + 1;
            const isDone = completedDays.includes(day);
            return (
              <button 
                key={day}
                onClick={() => toggleDay(day)}
                className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 font-bold text-sm ${isDone ? 'bg-primary text-white shadow-lg shadow-primary/30 animate-confetti' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
              >
                {isDone ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-6 rounded-[2rem]">
          <span className="material-symbols-outlined text-primary text-3xl mb-2">monitoring</span>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Health Score</p>
          <p className="text-3xl font-black mt-1">94%</p>
        </div>
        <div className="glass-panel p-6 rounded-[2rem]">
          <span className="material-symbols-outlined text-purple-500 text-3xl mb-2">shopping_bag</span>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Routine Items</p>
          <p className="text-3xl font-black mt-1">12</p>
        </div>
      </div>
    </div>
  );
};

export default MeScreen;
