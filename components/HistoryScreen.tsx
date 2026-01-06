
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryScreenProps {
  history: HistoryItem[];
  onClose: () => void;
  onClear: () => void;
  onSelectItem: (item: HistoryItem) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onClose, onClear, onSelectItem }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-md z-50 flex flex-col animate-fade-in">
      <header className="flex items-center justify-between px-4 py-4 shrink-0 border-b border-white/5">
        <button onClick={onClose} className="flex items-center justify-center size-10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">expand_more</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight">History</h1>
        <button onClick={onClear} className="flex items-center justify-center size-10 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <span className="material-symbols-outlined text-[22px]">delete</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-6 no-scrollbar">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">history_off</span>
            <p>No history yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="sticky top-0 z-10 py-2 bg-background-dark/80 backdrop-blur-sm">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">TODAY</h3>
            </div>
            
            {history.map((item, index) => (
              <article 
                key={item.id} 
                onClick={() => onSelectItem(item)}
                className={`group relative flex flex-col justify-between p-4 bg-card-dark rounded-xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer ${index === 0 ? 'border-l-primary border-l-4' : ''}`}
              >
                <div className="flex justify-between items-start w-full mb-1">
                  <span className="text-[10px] font-medium text-slate-500 mt-1">{getTimeAgo(item.timestamp)}</span>
                  <div className="text-slate-400 text-sm font-medium font-mono text-right opacity-80 break-all pl-4">{item.expression}</div>
                </div>
                <div className="flex justify-between items-end w-full mt-2">
                  <button className="text-slate-600 hover:text-primary transition-colors p-1 -ml-1 opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                  <div className="text-2xl font-bold text-white tracking-tight">= {item.result}</div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        {history.length > 0 && (
          <div className="h-12 flex items-center justify-center pb-8">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span className="text-xs font-medium">End of history</span>
            </div>
          </div>
        )}
      </main>
      
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background-dark to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HistoryScreen;
