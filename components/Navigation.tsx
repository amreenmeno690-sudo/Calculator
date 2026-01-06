
import React from 'react';
import { soundService } from '../services/soundService';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: 'grid_view', label: 'Suite' },
    { id: 'lab', icon: 'biotech', label: 'Lab' },
    { id: 'me', icon: 'person', label: 'Me' }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-panel rounded-full h-20 flex items-center justify-around px-4 z-40 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {tabs.map(tab => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              soundService.playPop();
            }}
            className={`flex flex-col items-center justify-center transition-all duration-300 relative ${isActive ? 'text-primary' : 'text-slate-500'}`}
          >
            {isActive && (
              <div className="absolute -top-1 size-1 bg-primary rounded-full shadow-[0_0_10px_#1313ec]"></div>
            )}
            <span className={`material-symbols-outlined text-[28px] ${isActive ? 'scale-110 font-black' : 'scale-100 font-light'}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
