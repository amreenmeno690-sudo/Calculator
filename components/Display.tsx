
import React from 'react';

interface DisplayProps {
  expression: string;
  result: string;
  finalResult: string;
  isScientific: boolean;
}

const Display: React.FC<DisplayProps> = ({ expression, result, finalResult, isScientific }) => {
  return (
    <div className="flex-1 flex flex-col justify-end px-6 pb-8 space-y-2">
      <div className={`glass-panel w-full rounded-2xl p-6 flex flex-col items-end justify-center shadow-2xl shadow-black/20 transition-all ${isScientific ? 'min-h-[140px]' : 'min-h-[180px]'}`}>
        {/* Secondary Info / Prev Equation */}
        <div className="w-full text-right mb-1 opacity-80 min-h-[24px]">
          <span className="text-gray-400 text-lg font-medium tracking-wide break-all">
            {isScientific ? expression : ''}
          </span>
        </div>

        {/* Main Display */}
        <h1 className={`text-white font-bold leading-tight tracking-tight text-right break-all transition-all ${isScientific ? 'text-6xl' : (expression.length > 10 ? 'text-4xl' : 'text-6xl')}`}>
          {isScientific ? (finalResult || '0') : (expression || '0')}
        </h1>

        {/* Live Result (Standard mode only as per reference) */}
        {!isScientific && (
          <div className="flex items-center justify-end w-full mt-2 min-h-[40px]">
            {result && (
              <span className="text-white/50 text-3xl font-medium tracking-tight">
                = {result}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;
