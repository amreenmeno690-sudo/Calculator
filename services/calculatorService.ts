
import { AngleUnit } from '../types';

/**
 * Robust math expression evaluator
 * Handles basic arithmetic and standard scientific functions safely
 */
export const evaluateExpression = (expr: string, angleUnit: AngleUnit): string => {
  if (!expr || expr.trim() === '') return '';

  try {
    // Basic sanitization
    let sanitized = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/%/g, '*0.01');

    // Remove commas from numbers if they were carried over from a previous result
    sanitized = sanitized.replace(/,/g, '');

    // Handle scientific functions
    const angleMultiplier = angleUnit === AngleUnit.DEG ? (Math.PI / 180) : 1;

    // Pattern matching for sin, cos, tan, log, sqrt
    sanitized = sanitized.replace(/sin\(/g, `Math.sin(${angleMultiplier}*`);
    sanitized = sanitized.replace(/cos\(/g, `Math.cos(${angleMultiplier}*`);
    sanitized = sanitized.replace(/tan\(/g, `Math.tan(${angleMultiplier}*`);
    sanitized = sanitized.replace(/log\(/g, 'Math.log10(');
    sanitized = sanitized.replace(/sqrt\(/g, 'Math.sqrt(');
    sanitized = sanitized.replace(/\^/g, '**');

    // Balance parentheses (simple fix for live typing)
    const openParenCount = (sanitized.match(/\(/g) || []).length;
    const closeParenCount = (sanitized.match(/\)/g) || []).length;
    if (openParenCount > closeParenCount) {
      sanitized += ')'.repeat(openParenCount - closeParenCount);
    }

    // Check for trailing operators which would cause a syntax error
    // If the expression ends with an operator, evaluate the portion before it for "live" results
    const trailingOpMatch = sanitized.match(/[\+\-\*\/\*\*\s]+$/);
    if (trailingOpMatch) {
      sanitized = sanitized.slice(0, -trailingOpMatch[0].length);
    }
    
    if (!sanitized.trim()) return '';

    // Use Function constructor for evaluation
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitized}`)();
    
    if (result === undefined || result === null || isNaN(result) || !isFinite(result)) {
      return 'Error';
    }

    // Format results
    const strResult = result.toString();
    if (strResult.includes('.')) {
      const parts = strResult.split('.');
      if (parts[1].length > 8) return result.toFixed(8).replace(/\.?0+$/, '');
    }
    
    // Add thousands separators for readability
    return result.toLocaleString('en-US', { maximumFractionDigits: 8 });
  } catch (e) {
    // Return empty or Error instead of throwing to prevent app crash
    return 'Error';
  }
};
