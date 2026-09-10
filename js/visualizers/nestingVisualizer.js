/**
 * Function Nesting Pipeline Visualizer
 * Visualizes the "Inside-to-Outside" evaluation law from PDF Slides 37-38.
 */

import { SUBSTR, CONCAT, UPPER, LOWER, LENGTH } from '../engine/functions.js';
import { getIcon } from '../data/icons.js';

export function renderNestingVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3 style="display: flex; align-items: center;"><span class="heading-icon">${getIcon('layers', 'svg-icon', 22)}</span> Tubería de Anidamiento de Funciones (Pipeline Inside-Out)</h3>
          <p class="viz-desc">Observa el viaje de un dato a través de capas concéntricas de funciones evaluadas desde el nivel más interno al más externo.</p>
        </div>
        <div class="viz-badge">Diapositivas 37-38</div>
      </div>

      <div class="viz-controls-grid">
        <div class="control-group">
          <label for="nest-input">Valor de Entrada (last_name):</label>
          <input type="text" id="nest-input" class="modern-input" value="Lorentz" maxlength="25" />
          <div class="preset-links">
            <span>Ejemplos del PDF (Depto 60):</span>
            <button type="button" class="btn-preset" data-val="Lorentz">Lorentz</button>
            <button type="button" class="btn-preset" data-val="Hunold">Hunold</button>
            <button type="button" class="btn-preset" data-val="Ernst">Ernst</button>
            <button type="button" class="btn-preset" data-val="Austin">Austin</button>
          </div>
        </div>

        <div class="control-group">
          <label for="nest-pipeline-select">Fórmula de Anidamiento:</label>
          <select id="nest-pipeline-select" class="modern-select">
            <option value="PDF_EXAMPLE">UPPER( CONCAT( SUBSTR(last_name, 1, 8), '_US' ) )</option>
            <option value="LOWER_CONCAT">LOWER( CONCAT( 'EMP_', SUBSTR(last_name, 1, 4) ) )</option>
            <option value="LENGTH_CONCAT">LENGTH( CONCAT( UPPER(last_name), '_CORP' ) )</option>
          </select>
        </div>
      </div>

      <!-- Pipeline Node Visualizer -->
      <div class="pipeline-container">
        <div class="pipeline-title">Flujo de Transformación Paso a Paso (Dentro ${getIcon('arrowRight', 'svg-icon', 14)} Fuera)</div>
        <div class="pipeline-nodes-row" id="pipeline-nodes"></div>
      </div>

      <!-- Execution Log -->
      <div class="viz-explanation-box" id="nest-explanation"></div>
    </div>
  `;

  const inputEl = container.querySelector('#nest-input');
  const pipeSelect = container.querySelector('#nest-pipeline-select');
  const nodesContainer = container.querySelector('#pipeline-nodes');
  const explanationBox = container.querySelector('#nest-explanation');

  function updatePipeline() {
    const rawVal = inputEl.value || 'Lorentz';
    const pipelineType = pipeSelect.value;

    let steps = [];

    if (pipelineType === 'PDF_EXAMPLE') {
      const step1 = SUBSTR(rawVal, 1, 8);
      const step2 = CONCAT(step1, '_US');
      const step3 = UPPER(step2);

      steps = [
        {
          level: 0,
          type: 'Entrada Cruda',
          func: 'Columna LAST_NAME',
          input: null,
          output: `'${rawVal}'`,
          desc: 'Dato original obtenido del registro en la tabla EMPLOYEES.'
        },
        {
          level: 1,
          type: 'Nivel 1 (Más Interno)',
          func: `SUBSTR('${rawVal}', 1, 8)`,
          input: `'${rawVal}'`,
          output: `'${step1}'`,
          desc: 'Extrae hasta los primeros 8 caracteres.'
        },
        {
          level: 2,
          type: 'Nivel 2 (Intermedio)',
          func: `CONCAT('${step1}', '_US')`,
          input: `'${step1}'`,
          output: `'${step2}'`,
          desc: 'Une la subcadena anterior con el sufijo literal \'_US\'.'
        },
        {
          level: 3,
          type: 'Nivel 3 (Más Externo)',
          func: `UPPER('${step2}')`,
          input: `'${step2}'`,
          output: `'${step3}'`,
          desc: 'Convierte el texto concatenado completo a mayúsculas.'
        }
      ];
    } else if (pipelineType === 'LOWER_CONCAT') {
      const step1 = SUBSTR(rawVal, 1, 4);
      const step2 = CONCAT('EMP_', step1);
      const step3 = LOWER(step2);

      steps = [
        { level: 0, type: 'Entrada', func: 'LAST_NAME', input: null, output: `'${rawVal}'`, desc: 'Valor original.' },
        { level: 1, type: 'Nivel 1 (Interno)', func: `SUBSTR('${rawVal}', 1, 4)`, input: `'${rawVal}'`, output: `'${step1}'`, desc: 'Extrae 4 caracteres.' },
        { level: 2, type: 'Nivel 2', func: `CONCAT('EMP_', '${step1}')`, input: `'${step1}'`, output: `'${step2}'`, desc: 'Prefija \'EMP_\'.' },
        { level: 3, type: 'Nivel 3 (Externo)', func: `LOWER('${step2}')`, input: `'${step2}'`, output: `'${step3}'`, desc: 'Convierte a minúsculas.' }
      ];
    } else {
      const step1 = UPPER(rawVal);
      const step2 = CONCAT(step1, '_CORP');
      const step3 = LENGTH(step2);

      steps = [
        { level: 0, type: 'Entrada', func: 'LAST_NAME', input: null, output: `'${rawVal}'`, desc: 'Valor original.' },
        { level: 1, type: 'Nivel 1 (Interno)', func: `UPPER('${rawVal}')`, input: `'${rawVal}'`, output: `'${step1}'`, desc: 'Mayúsculas.' },
        { level: 2, type: 'Nivel 2', func: `CONCAT('${step1}', '_CORP')`, input: `'${step1}'`, output: `'${step2}'`, desc: 'Concatena sufijo.' },
        { level: 3, type: 'Nivel 3 (Externo)', func: `LENGTH('${step2}')`, input: `'${step2}'`, output: `${step3}`, desc: 'Calcula longitud total en caracteres (devuelve NUMBER).' }
      ];
    }

    // Render pipeline nodes
    let html = '';
    steps.forEach((step, idx) => {
      const isLast = idx === steps.length - 1;
      html += `
        <div class="pipe-node ${step.level === 0 ? 'node-input' : (isLast ? 'node-final' : 'node-mid')}">
          <div class="pipe-level-badge">${step.type}</div>
          <div class="pipe-func">${step.func}</div>
          <div class="pipe-data-box">
            <span class="pipe-data-lbl">Salida:</span>
            <code class="pipe-data-val">${step.output}</code>
          </div>
        </div>
      `;
      if (!isLast) {
        html += `<div class="pipe-arrow">${getIcon('arrowRight', 'svg-icon', 20)}</div>`;
      }
    });

    nodesContainer.innerHTML = html;

    // Explanation
    explanationBox.innerHTML = `
      <strong>Principio de Ejecución de Oracle (Diapositiva 37):</strong><br>
      • Las funciones anidadas se procesan siempre desde el nivel más interior hacia el exterior.<br>
      • El resultado final producido por esta consulta para <code>'${rawVal}'</code> es <strong class="result-highlight">${steps[steps.length - 1].output}</strong>.
    `;
  }

  inputEl.addEventListener('input', updatePipeline);
  pipeSelect.addEventListener('change', updatePipeline);

  container.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      inputEl.value = btn.getAttribute('data-val');
      updatePipeline();
    });
  });

  // Initial
  updatePipeline();
}
