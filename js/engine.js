// ============================================
// Engine: Calculation utilities
// ============================================

window.CalcEngine = {
  format: function(v) {
    if (v === undefined || v === null || isNaN(v)) return '—';
    if (!isFinite(v)) return '∞';
    if (v === 0) return '0';
    if (Math.abs(v) >= 1e9) return v.toExponential(3);
    if (Math.abs(v) < 0.0001) return v.toExponential(3);
    return parseFloat(v.toPrecision(6)).toString();
  },

  calculate: function(mode, inputValues) {
    if (!mode || !mode.calc) return 0;
    try {
      return mode.calc(inputValues);
    } catch (e) {
      console.error('Calculation error:', e);
      return NaN;
    }
  }
};
