/**
 * String Anatomy Slicer Visualizer
 * Visualizes 1-based indexing, negative indexing, SUBSTR slicing, INSTR search, and padding.
 */

import { SUBSTR, INSTR, LPAD, RPAD, TRIM, REPLACE, LENGTH, LOWER, UPPER, INITCAP } from '../engine/functions.js';

export function renderStringVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3>🔬 Inspector Visual de Cadenas (String Anatomy)</h3>
          <p class="viz-desc">Visualiza cómo Oracle indexa caracteres (1-based), interpreta índices negativos y realiza cortes, rellenos y búsquedas.</p>
        </div>
        <div class="viz-badge">Índices 1-Based & Negativos</div>
      </div>

      <div class="viz-controls-grid">
        <div class="control-group">
          <label for="str-input">Cadena de Texto de Entrada:</label>
          <input type="text" id="str-input" class="modern-input" value="HelloWorld" maxlength="30" />
        </div>

        <div class="control-group">
          <label for="str-func-select">Función a Visualizar:</label>
          <select id="str-func-select" class="modern-select">
            <option value="SUBSTR">SUBSTR(str, m, [n]) - Extraer Subcadena</option>
            <option value="INSTR">INSTR(str, target) - Localizar Posición</option>
            <option value="LPAD">LPAD(str, n, pad) - Relleno Izquierda</option>
            <option value="RPAD">RPAD(str, n, pad) - Relleno Derecha</option>
            <option value="TRIM">TRIM(char FROM str) - Recortar Extremos</option>
            <option value="REPLACE">REPLACE(str, search, rep) - Sustituir</option>
            <option value="CASE_OPS">LOWER / UPPER / INITCAP</option>
          </select>
        </div>
      </div>

      <!-- Dynamic Parameter Controls -->
      <div id="str-params-container" class="viz-params-panel"></div>

      <!-- Interactive String Ruler & Character Matrix -->
      <div class="ruler-container">
        <div class="ruler-header">
          <span class="ruler-tag tag-pos">▲ Índices Positivos (1 a N)</span>
          <span class="ruler-tag tag-neg">▼ Índices Negativos (-N a -1)</span>
        </div>
        <div id="str-chars-matrix" class="char-matrix"></div>
      </div>

      <!-- Result and Explanation Panel -->
      <div class="viz-output-panel">
        <div class="output-row">
          <span class="output-label">Resultado Oracle SQL:</span>
          <code id="str-result-display" class="result-code">'Hello'</code>
        </div>
        <div id="str-explanation" class="viz-explanation-box"></div>
      </div>
    </div>
  `;

  const strInput = container.querySelector('#str-input');
  const funcSelect = container.querySelector('#str-func-select');
  const paramsContainer = container.querySelector('#str-params-container');
  const matrixContainer = container.querySelector('#str-chars-matrix');
  const resultDisplay = container.querySelector('#str-result-display');
  const explanationBox = container.querySelector('#str-explanation');

  function updateParamsUI() {
    const fn = funcSelect.value;
    const strLen = strInput.value.length || 1;

    if (fn === 'SUBSTR') {
      paramsContainer.innerHTML = `
        <div class="param-item">
          <label>Posición Inicial (m): <span id="val-m" class="badge-param">1</span></label>
          <input type="range" id="param-m" min="-${strLen}" max="${strLen}" value="1" class="modern-slider" />
          <span class="hint-text">Si m > 0 desde el inicio; si m < 0 cuenta desde el final.</span>
        </div>
        <div class="param-item">
          <label>Longitud (n): <span id="val-n" class="badge-param">5</span></label>
          <input type="range" id="param-n" min="1" max="${strLen}" value="5" class="modern-slider" />
          <span class="hint-text">Número de caracteres a extraer.</span>
        </div>
      `;
    } else if (fn === 'INSTR') {
      paramsContainer.innerHTML = `
        <div class="param-item">
          <label>Subcadena a Buscar (target):</label>
          <input type="text" id="param-target" class="modern-input" value="W" maxlength="10" />
        </div>
        <div class="param-item">
          <label>Posición de Inicio (m): <span id="val-m" class="badge-param">1</span></label>
          <input type="range" id="param-m" min="1" max="${strLen}" value="1" class="modern-slider" />
        </div>
      `;
    } else if (fn === 'LPAD' || fn === 'RPAD') {
      paramsContainer.innerHTML = `
        <div class="param-item">
          <label>Ancho Total (n): <span id="val-n" class="badge-param">${strLen + 5}</span></label>
          <input type="range" id="param-n" min="${strLen}" max="${strLen + 15}" value="${strLen + 5}" class="modern-slider" />
        </div>
        <div class="param-item">
          <label>Carácter de Relleno:</label>
          <input type="text" id="param-pad" class="modern-input" value="*" maxlength="3" style="width: 80px;" />
        </div>
      `;
    } else if (fn === 'TRIM') {
      paramsContainer.innerHTML = `
        <div class="param-item">
          <label>Modo de Recorte:</label>
          <select id="param-trim-mode" class="modern-select">
            <option value="BOTH">BOTH (Ambos extremos)</option>
            <option value="LEADING">LEADING (Solo al inicio)</option>
            <option value="TRAILING">TRAILING (Solo al final)</option>
          </select>
        </div>
        <div class="param-item">
          <label>Carácter a Recortar:</label>
          <input type="text" id="param-trim-char" class="modern-input" value="H" maxlength="1" style="width: 60px;" />
        </div>
      `;
    } else if (fn === 'REPLACE') {
      paramsContainer.innerHTML = `
        <div class="param-item">
          <label>Texto a Reemplazar (search):</label>
          <input type="text" id="param-rep-search" class="modern-input" value="l" maxlength="10" />
        </div>
        <div class="param-item">
          <label>Texto de Reemplazo (replace):</label>
          <input type="text" id="param-rep-target" class="modern-input" value="X" maxlength="10" />
        </div>
      `;
    } else {
      paramsContainer.innerHTML = `
        <div class="param-item">
          <span class="hint-text">Muestra las transformaciones LOWER, UPPER e INITCAP simultáneamente sobre la cadena.</span>
        </div>
      `;
    }

    attachParamEvents();
    renderMatrix();
  }

  function attachParamEvents() {
    const rangeM = container.querySelector('#param-m');
    const rangeN = container.querySelector('#param-n');
    const valM = container.querySelector('#val-m');
    const valN = container.querySelector('#val-n');

    if (rangeM) {
      rangeM.addEventListener('input', () => {
        if (valM) valM.textContent = rangeM.value;
        renderMatrix();
      });
    }
    if (rangeN) {
      rangeN.addEventListener('input', () => {
        if (valN) valN.textContent = rangeN.value;
        renderMatrix();
      });
    }

    paramsContainer.querySelectorAll('input[type="text"], select').forEach(el => {
      el.addEventListener('input', renderMatrix);
      el.addEventListener('change', renderMatrix);
    });
  }

  function renderMatrix() {
    const text = strInput.value;
    const len = text.length;
    const fn = funcSelect.value;

    let highlightedIndices = new Set();
    let result = '';
    let explanation = '';

    if (fn === 'SUBSTR') {
      const m = parseInt(container.querySelector('#param-m')?.value || '1', 10);
      const n = parseInt(container.querySelector('#param-n')?.value || String(len), 10);
      result = SUBSTR(text, m, n);

      let startIdx = m > 0 ? m - 1 : len + m;
      if (startIdx < 0) startIdx = 0;
      for (let i = startIdx; i < startIdx + n && i < len; i++) {
        highlightedIndices.add(i);
      }

      explanation = `
        <strong>Ejecución SUBSTR('${text}', ${m}, ${n}):</strong><br>
        ${m > 0 
          ? `• Posición inicial <strong>${m}</strong> (1-based): Comienza en el carácter #${m} ('${text[m-1] || ''}').` 
          : `• Posición inicial negativa <strong>${m}</strong>: Cuenta hacia atrás desde el final (${len} + ${m} = índice 0-based ${len+m}).`}
        <br>• Extrae <strong>${n}</strong> caracteres ➔ Resultado: <span class="highlight-val">'${result}'</span>
      `;
    } else if (fn === 'INSTR') {
      const target = container.querySelector('#param-target')?.value || '';
      const m = parseInt(container.querySelector('#param-m')?.value || '1', 10);
      const pos = INSTR(text, target, m);
      result = pos;

      if (pos > 0 && target.length > 0) {
        for (let i = pos - 1; i < pos - 1 + target.length && i < len; i++) {
          highlightedIndices.add(i);
        }
      }

      explanation = `
        <strong>Ejecución INSTR('${text}', '${target}', ${m}):</strong><br>
        • Busca '${target}' a partir de la posición ${m}.<br>
        • ${pos > 0 
          ? `Encontrado en la posición <strong>${pos}</strong> (1-based).` 
          : `La subcadena no fue encontrada (retorna 0).`}
      `;
    } else if (fn === 'LPAD') {
      const n = parseInt(container.querySelector('#param-n')?.value || '15', 10);
      const pad = container.querySelector('#param-pad')?.value || '*';
      result = LPAD(text, n, pad);
      explanation = `
        <strong>Ejecución LPAD('${text}', ${n}, '${pad}'):</strong><br>
        • Rellena la cadena por la izquierda hasta alcanzar un ancho total de <strong>${n}</strong> caracteres.<br>
        • Se añadieron ${Math.max(0, n - len)} caracteres '${pad}'.
      `;
    } else if (fn === 'RPAD') {
      const n = parseInt(container.querySelector('#param-n')?.value || '15', 10);
      const pad = container.querySelector('#param-pad')?.value || '*';
      result = RPAD(text, n, pad);
      explanation = `
        <strong>Ejecución RPAD('${text}', ${n}, '${pad}'):</strong><br>
        • Rellena la cadena por la derecha hasta alcanzar un ancho total de <strong>${n}</strong> caracteres.
      `;
    } else if (fn === 'TRIM') {
      const mode = container.querySelector('#param-trim-mode')?.value || 'BOTH';
      const ch = container.querySelector('#param-trim-char')?.value || ' ';
      result = TRIM(text, ch, mode);
      explanation = `
        <strong>Ejecución TRIM(${mode} '${ch}' FROM '${text}'):</strong><br>
        • Elimina caracteres '${ch}' del modo ${mode}.
      `;
    } else if (fn === 'REPLACE') {
      const search = container.querySelector('#param-rep-search')?.value || '';
      const rep = container.querySelector('#param-rep-target')?.value || '';
      result = REPLACE(text, search, rep);
      explanation = `
        <strong>Ejecución REPLACE('${text}', '${search}', '${rep}'):</strong><br>
        • Reemplaza cada aparición de '${search}' por '${rep}'.
      `;
    } else {
      result = `LOWER: '${LOWER(text)}' | UPPER: '${UPPER(text)}' | INITCAP: '${INITCAP(text)}'`;
      explanation = `
        • <strong>LOWER:</strong> Todo a minúsculas ('${LOWER(text)}').<br>
        • <strong>UPPER:</strong> Todo a mayúsculas ('${UPPER(text)}').<br>
        • <strong>INITCAP:</strong> Primera letra mayúscula por palabra ('${INITCAP(text)}').
      `;
    }

    // Build character boxes
    let matrixHtml = '';
    for (let i = 0; i < len; i++) {
      const char = text[i];
      const posIndex = i + 1;
      const negIndex = -(len - i);
      const isSelected = highlightedIndices.has(i);

      matrixHtml += `
        <div class="char-col ${isSelected ? 'char-selected' : ''}">
          <span class="idx-pos">${posIndex}</span>
          <div class="char-box">${char === ' ' ? '␣' : char}</div>
          <span class="idx-neg">${negIndex}</span>
        </div>
      `;
    }

    matrixContainer.innerHTML = matrixHtml || '<span class="empty-hint">(Introduce texto)</span>';
    resultDisplay.textContent = typeof result === 'string' ? `'${result}'` : result;
    explanationBox.innerHTML = explanation;
  }

  strInput.addEventListener('input', () => {
    updateParamsUI();
  });

  funcSelect.addEventListener('change', () => {
    updateParamsUI();
  });

  // Initial load
  updateParamsUI();
}
