
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CalculatorMode, AngleUnit, HistoryItem } from './types';
import StandardKeypad from './components/StandardKeypad';
import ScientificKeypad from './components/ScientificKeypad';
import HistoryScreen from './components/HistoryScreen';
import Display from './components/Display';
import Header from './components/Header';
import SmartSolver from './components/SmartSolver';
import LabScreen from './components/LabScreen';
import MeScreen from './components/MeScreen';
import Navigation from './components/Navigation';
import { evaluateExpression } from './services/calculatorService';
import { soundService } from './services/soundService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.STANDARD);
  const [angleUnit, setAngleUnit] = useState<AngleUnit>(AngleUnit.DEG);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Sound toggle state
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  useEffect(() => {
    soundService.toggle(soundsEnabled);
  }, [soundsEnabled]);

  const handleInput = useCallback((value: string) => {
    soundService.playClick();
    setExpression(prev => {
      // If result is shown (e.g., from hitting '='), starting fresh unless it's an operator
      if (result && ![' + ', ' - ', ' × ', ' ÷ ', ' ^ ', ' % '].includes(value)) {
        setResult('');
        return value;
      }
      // Carrying over result to new operation
      if (result && [' + ', ' - ', ' × ', ' ÷ ', ' ^ ', ' % '].includes(value)) {
        const carryOver = result.replace(/,/g, '');
        setResult('');
        return carryOver + value;
      }
      
      const segments = prev.split(/[\s+\-×÷^]/);
      const lastSegment = segments[segments.length - 1];
      if (value === '.' && lastSegment.includes('.')) return prev;
      return prev + value;
    });
  }, [result]);

  const handleClear = useCallback(() => {
    soundService.playPop();
    setExpression('');
    setResult('');
  }, []);

  const handleBackspace = useCallback(() => {
    soundService.playClick();
    setExpression(prev => prev.slice(0, -1));
  }, []);

  const handleEqual = useCallback(() => {
    if (!expression) return;
    const calcResult = evaluateExpression(expression, angleUnit);
    if (calcResult === 'Error') {
      setResult('Error');
      return;
    }
    
    soundService.playChime();
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      expression,
      result: calcResult,
      timestamp: new Date(),
    };
    setHistory(prev => [newItem, ...prev]);
    setResult(calcResult);
  }, [expression, angleUnit]);

  // Safely calculate live result for display
  const liveResult = useMemo(() => {
    if (!expression || isHistoryOpen || isAIOpen) return '';
    
    // Don't show live result if it exactly matches the expression (like a single number)
    // or if the current expression is just the previous final result
    const currentEval = evaluateExpression(expression, angleUnit);
    
    const cleanExpr = expression.replace(/,/g, '').trim();
    const cleanResult = currentEval.replace(/,/g, '').trim();
    
    if (cleanExpr === cleanResult || currentEval === 'Error') return '';
    return currentEval;
  }, [expression, angleUnit, isHistoryOpen, isAIOpen]);

  const toggleMode = useCallback(() => {
    soundService.playPop();
    setMode(prev => prev === CalculatorMode.STANDARD ? CalculatorMode.SCIENTIFIC : CalculatorMode.STANDARD);
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'lab': return <LabScreen />;
      case 'me': return <MeScreen />;
      default: return (
        <div className="flex flex-col h-full animate-fade-in">
           <Header 
              mode={mode} 
              angleUnit={angleUnit}
              hasExpression={!!expression}
              onToggleHistory={() => { soundService.playPop(); setIsHistoryOpen(true); }}
              onToggleMode={toggleMode}
              onToggleAngleUnit={() => { soundService.playPop(); setAngleUnit(u => u === AngleUnit.DEG ? AngleUnit.RAD : AngleUnit.DEG); }}
              onOpenAI={() => { soundService.playPop(); setIsAIOpen(true); }}
            />

            <Display 
              expression={expression} 
              result={liveResult} 
              finalResult={result}
              isScientific={mode === CalculatorMode.SCIENTIFIC}
            />

            <div className="flex-none pb-24 px-6">
              {mode === CalculatorMode.STANDARD ? (
                <StandardKeypad 
                  onInput={handleInput} 
                  onClear={handleClear} 
                  onEqual={handleEqual}
                  onOperator={(op) => { soundService.playClick(); handleInput(` ${op} `); }}
                />
              ) : (
                <ScientificKeypad 
                  onInput={handleInput} 
                  onClear={handleClear} 
                  onEqual={handleEqual}
                  onBackspace={handleBackspace}
                  onOperator={(op) => { soundService.playClick(); handleInput(` ${op} `); }}
                  onFunc={(fn) => { soundService.playClick(); handleInput(`${fn}(`); }}
                />
              )}
            </div>
        </div>
      );
    }
  };

  return (
    <div className="relative h-screen w-full bg-background-dark flex justify-center items-center overflow-hidden">
      <div className="fixed inset-0 pointer-events-none glow-bg z-0"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto shadow-2xl glass-panel md:rounded-[2.5rem] md:h-[92vh] md:my-auto overflow-hidden">
        
        {renderContent()}

        <Navigation currentTab={activeTab} onTabChange={setActiveTab} />

        {/* Overlays */}
        {isHistoryOpen && (
          <HistoryScreen 
            history={history} 
            onClose={() => { soundService.playPop(); setIsHistoryOpen(false); }}
            onClear={() => { soundService.playPop(); setHistory([]); }}
            onSelectItem={(item) => {
              setExpression(item.expression);
              setResult(item.result);
              setIsHistoryOpen(false);
              soundService.playPop();
            }}
          />
        )}

        {isAIOpen && (
          <SmartSolver 
            expression={expression}
            result={result || evaluateExpression(expression, angleUnit)}
            onClose={() => { soundService.playPop(); setIsAIOpen(false); }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
