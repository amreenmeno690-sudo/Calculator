
export enum CalculatorMode {
  STANDARD = 'Standard',
  SCIENTIFIC = 'Scientific'
}

export enum AngleUnit {
  DEG = 'DEG',
  RAD = 'RAD'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export type CalcButtonType = 'number' | 'operator' | 'action' | 'function';

export interface AISolverState {
  isOpen: boolean;
  explanation: string;
  isLoading: boolean;
}
