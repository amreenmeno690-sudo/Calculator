
import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface SmartSolverProps {
  expression: string;
  result: string;
  onClose: () => void;
}

const SmartSolver: React.FC<SmartSolverProps> = ({ expression, result, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Act as a brilliant and friendly math tutor. 
        Please explain the following calculation step-by-step:
        Expression: ${expression}
        Result: ${result}
        
        Structure your answer clearly:
        1. State the objective.
        2. Break down the components (operators, functions).
        3. Explain the order of operations (PEMDAS/BODMAS).
        4. Show the simplified steps.
        
        Keep it concise but insightful. Use a helpful tone.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        setExplanation(response.text || 'I analyzed the math, but I couldn\'t formulate an explanation right now.');
      } catch (error) {
        console.error('AI Solver error:', error);
        setExplanation('I hit a snag while trying to calculate the logic. Please check your expression and try again!');
      } finally {
        setIsLoading(false);
      }
    };

    if (expression) {
      fetchExplanation();
    }
  }, [expression, result]);

  return (
    <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-xl z-[60] flex flex-col animate-fade-in">
      <header className="flex items-center justify-between px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">psychology</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">Smart Analysis</h2>
            <p className="text-[10px] text-primary font-bold tracking-widest uppercase">Powered by Gemini</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="size-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <div className="mb-8 p-6 glass-panel rounded-2xl border-l-4 border-l-primary bg-primary/5">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">Operation</p>
          <div className="text-xl font-mono break-all opacity-80">{expression}</div>
          <div className="text-4xl font-bold text-white mt-1">= {result}</div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded-full w-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center justify-center mt-12 gap-3">
              <div className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-slate-500 text-sm font-medium animate-pulse">Decoding mathematical patterns...</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
             <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-lg font-medium selection:bg-primary/30">
              {explanation}
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 border-t border-white/5 bg-background-dark/50">
        <button 
          onClick={onClose}
          className="w-full py-4 glass-button-primary rounded-xl font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
        >
          Understand
        </button>
      </footer>
    </div>
  );
};

export default SmartSolver;
