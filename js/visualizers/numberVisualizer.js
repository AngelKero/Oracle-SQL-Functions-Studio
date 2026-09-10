/**
 * Number Precision Scaler Visualizer
 * Visualizes ROUND vs TRUNC across positive, zero, and negative decimal powers, plus MOD.
 */

import { ROUND, TRUNC, MOD } from '../engine/functions.js';
import { getIcon } from '../data/icons.js';

export function renderNumberVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3 style="display: flex; align-items: center;"><span class="heading-icon">${getIcon('hash', 'svg-icon', 22)}</span> Recta Numérica y Precisión Decimal (ROUND vs. TRUNC)</h3>
          <p class="viz-desc">Comprende cómo los índices positivos redondean decimales, el índice 0 redondea al entero y los índices negativos (-1, -2) redondean a decenas o centenas.</p>
        </div>
        <div class="viz-badge">ROUND / TRUNC / MOD</div>
      </div>

      <div class="viz-controls-grid">
        <div class="control-group">
          <label for="num-input">Número de Entrada:</label>
          <input type="number" id="num-input" class="modern-input" value="45.923" step="0.001" />
        </div>

        <div class="control-group">
          <label for="num-precision-slider">Precisión Decimal (n): <span id="num-precision-val" class="badge-param">2</span></label>
          <input type="range" id="num-precision-slider" min="-2" max="3" value="2" class="modern-slider" />
          <div class="slider-ticks">
            <span>-2 (Centenas)</span>
            <span>-1 (Decenas)</span>
            <span>0 (Entero)</span>
            <span>1 (Décimas)</span>
            <span>2 (Centésimas)</span>
            <span>3 (Milésimas)</span>
          </div>
        </div>
      </div>

      <!-- Comparison Cards -->
      <div class="num-compare-grid">
        <div class="compare-card card-round">
          <div class="compare-badge">ROUND(valor, n)</div>
          <div class="compare-val" id="res-round">45.92</div>
          <div class="compare-desc" id="desc-round">Redondeo aritmético al valor más cercano</div>
        </div>

        <div class="compare-card card-trunc">
          <div class="compare-badge">TRUNC(valor, n)</div>
          <div class="compare-val" id="res-trunc">45.92</div>
          <div class="compare-desc" id="desc-trunc">Corta y descarta sin redondear</div>
        </div>
      </div>

      <!-- Visual Digit Breakdown & Place-Value Ruler -->
      <div class="digit-ruler-panel">
        <div class="ruler-title">Desglose Posicional y Punto de Corte</div>
        <div id="digit-breakdown-container" class="digit-breakdown-row"></div>
      </div>

      <!-- MOD Calculator Section -->
      <div class="mod-section">
        <h4 style="display: flex; align-items: center;"><span class="heading-icon">${getIcon('calculator', 'svg-icon', 18)}</span> Simulador de Residuo: MOD(m, n)</h4>
        <div class="mod-controls">
          <div class="mod-input-group">
            <label>Dividendo (m):</label>
            <input type="number" id="mod-m" class="modern-input" value="1600" />
          </div>
          <div class="mod-symbol">÷</div>
          <div class="mod-input-group">
            <label>Divisor (n):</label>
            <input type="number" id="mod-n" class="modern-input" value="300" />
          </div>
          <div class="mod-symbol">=</div>
          <div class="mod-result-box">
            <div class="mod-res-lbl">MOD(m, n) =</div>
            <div class="mod-res-val" id="mod-result">100</div>
          </div>
        </div>
        <div id="mod-explanation" class="mod-expl"></div>
      </div>
    </div>
  `;

  const numInput = container.querySelector('#num-input');
  const slider = container.querySelector('#num-precision-slider');
  const precisionVal = container.querySelector('#num-precision-val');
  const resRound = container.querySelector('#res-round');
  const resTrunc = container.querySelector('#res-trunc');
  const descRound = container.querySelector('#desc-round');
  const descTrunc = container.querySelector('#desc-trunc');
  const digitContainer = container.querySelector('#digit-breakdown-container');

  const modM = container.querySelector('#mod-m');
  const modN = container.querySelector('#mod-n');
  const modRes = container.querySelector('#mod-result');
  const modExpl = container.querySelector('#mod-explanation');

  function updateNumberViz() {
    const val = parseFloat(numInput.value) || 0;
    const n = parseInt(slider.value, 10);
    precisionVal.textContent = n;

    const roundVal = ROUND(val, n);
    const truncVal = TRUNC(val, n);

    resRound.textContent = roundVal;
    resTrunc.textContent = truncVal;

    let explanationTextRound = '';
    let explanationTextTrunc = '';

    if (n > 0) {
      explanationTextRound = `Redondea a ${n} decimales. Se evalúa el dígito en la posición ${n+1}.`;
      explanationTextTrunc = `Corta en el ${n}º decimal y descarta todos los siguientes.`;
    } else if (n === 0) {
      explanationTextRound = `Redondea al número entero más cercano.`;
      explanationTextTrunc = `Elimina toda la parte decimal conservando la parte entera.`;
    } else {
      const unitName = n === -1 ? 'decenas (múltiplo de 10)' : 'centenas (múltiplo de 100)';
      explanationTextRound = `Redondea a ${unitName}. Se evalúa el dígito previo.`;
      explanationTextTrunc = `Reemplaza por ceros los dígitos a la izquierda del punto decimal.`;
    }

    descRound.textContent = explanationTextRound;
    descTrunc.textContent = explanationTextTrunc;

    // Render digit breakdown
    renderDigitRuler(val, n);
  }

  function renderDigitRuler(val, n) {
    const strVal = val.toFixed(3);
    const parts = strVal.split('.');
    const intStr = parts[0];
    const decStr = parts[1] || '000';

    let html = '';

    // Digits of integer part
    for (let i = 0; i < intStr.length; i++) {
      const powerFromDot = -(intStr.length - 1 - i); // -2, -1, 0
      const isCutoff = powerFromDot === n;
      const isAffected = n < 0 && powerFromDot >= n;

      html += `
        <div class="digit-box ${isCutoff ? 'cutoff-point' : ''} ${isAffected ? 'digit-affected' : ''}">
          <span class="digit-val">${intStr[i]}</span>
          <span class="digit-label">${powerLabel(powerFromDot)}</span>
          <span class="digit-pos">n = ${powerFromDot}</span>
        </div>
      `;
    }

    // Decimal Point
    html += `
      <div class="dot-box">
        <span class="dot-char">.</span>
        <span class="digit-label">PUNTO</span>
      </div>
    `;

    // Decimal Digits
    for (let i = 0; i < decStr.length; i++) {
      const pos = i + 1; // 1, 2, 3
      const isCutoff = pos === n;
      const isKept = pos <= n;
      const isDecider = pos === n + 1;

      html += `
        <div class="digit-box ${isCutoff ? 'cutoff-point' : ''} ${isKept ? 'digit-kept' : ''} ${isDecider ? 'digit-decider' : ''}">
          <span class="digit-val">${decStr[i]}</span>
          <span class="digit-label">${decLabel(pos)}</span>
          <span class="digit-pos">n = ${pos}</span>
          ${isDecider ? '<span class="decider-tag">Decisivo</span>' : ''}
        </div>
      `;
    }

    digitContainer.innerHTML = html;
  }

  function powerLabel(pos) {
    if (pos === 0) return 'Unidades';
    if (pos === -1) return 'Decenas';
    if (pos === -2) return 'Centenas';
    return `10^${-pos}`;
  }

  function decLabel(pos) {
    if (pos === 1) return 'Décimas';
    if (pos === 2) return 'Centésimas';
    if (pos === 3) return 'Milésimas';
    return `10^-${pos}`;
  }

  function updateModViz() {
    const m = parseFloat(modM.value) || 0;
    const n = parseFloat(modN.value) || 1;
    const result = MOD(m, n);
    modRes.textContent = result !== null ? result : 'Error (Div por 0)';

    if (n !== 0) {
      const quotient = Math.floor(m / n);
      modExpl.innerHTML = `
        <strong>Desglose:</strong> ${m} = (${quotient} × ${n}) + <span class="highlight-val">${result}</span><br>
        • El cociente entero es <strong>${quotient}</strong> y el residuo es <strong>${result}</strong>.
      `;
    } else {
      modExpl.innerHTML = `No es posible dividir entre 0.`;
    }
  }

  numInput.addEventListener('input', updateNumberViz);
  slider.addEventListener('input', updateNumberViz);
  modM.addEventListener('input', updateModViz);
  modN.addEventListener('input', updateModViz);

  // Initial
  updateNumberViz();
  updateModViz();
}
