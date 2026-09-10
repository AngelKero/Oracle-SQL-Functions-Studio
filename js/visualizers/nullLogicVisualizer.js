/**
 * Null Handling & Conditional Logic Flowchart Visualizer
 * Visualizes NVL, NVL2, NULLIF, COALESCE and compares CASE vs DECODE.
 */

import { NVL, NVL2, NULLIF, COALESCE, DECODE } from '../engine/functions.js';

export function renderNullLogicVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3>⚖️ Manejo de Nulos y Lógica Condicional (Flowcharts)</h3>
          <p class="viz-desc">Comprende cómo evalúan caminos lógicos NVL, NVL2, NULLIF, COALESCE y cómo bifurcan CASE y DECODE.</p>
        </div>
        <div class="viz-badge">NVL / NVL2 / NULLIF / COALESCE / CASE / DECODE</div>
      </div>

      <!-- Function Selector Tabs -->
      <div class="sub-tab-bar">
        <button type="button" class="sub-tab-btn active" data-flow="NVL">NVL</button>
        <button type="button" class="sub-tab-btn" data-flow="NVL2">NVL2</button>
        <button type="button" class="sub-tab-btn" data-flow="NULLIF">NULLIF</button>
        <button type="button" class="sub-tab-btn" data-flow="COALESCE">COALESCE</button>
        <button type="button" class="sub-tab-btn" data-flow="DECODE">CASE / DECODE</button>
      </div>

      <!-- Flowchart Stage Area -->
      <div id="flow-content-area" class="flow-stage"></div>
    </div>
  `;

  const flowBtns = container.querySelectorAll('.sub-tab-btn');
  const stage = container.querySelector('#flow-content-area');

  function showFlow(flowName) {
    flowBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-flow') === flowName));

    if (flowName === 'NVL') {
      stage.innerHTML = `
        <div class="flow-panel">
          <div class="flow-controls">
            <div class="control-row">
              <label><input type="checkbox" id="nvl-null-check" /> ¿La columna es <strong>NULL</strong>?</label>
              <input type="text" id="nvl-val" class="modern-input" value="0.25" placeholder="Valor si no es null" />
            </div>
            <div class="control-row">
              <label>Valor de Reemplazo (expr2):</label>
              <input type="text" id="nvl-rep" class="modern-input" value="0" />
            </div>
          </div>

          <div class="flow-diagram-container">
            <div class="flow-node node-start">NVL(expr1, expr2)</div>
            <div class="flow-arrow">▼</div>
            <div class="flow-decision" id="nvl-decision">¿expr1 es NULL?</div>
            <div class="flow-branches">
              <div class="branch branch-yes" id="nvl-b-yes">
                <span class="branch-label">SÍ (Es NULL)</span>
                <div class="flow-arrow">▼</div>
                <div class="flow-node node-res">Devuelve <strong>expr2</strong> (Reemplazo)</div>
              </div>
              <div class="branch branch-no" id="nvl-b-no">
                <span class="branch-label">NO (Tiene Valor)</span>
                <div class="flow-arrow">▼</div>
                <div class="flow-node node-res">Devuelve <strong>expr1</strong> (Original)</div>
              </div>
            </div>
          </div>

          <div class="flow-summary">
            Resultado Evaluado: <strong id="nvl-result" class="result-highlight">0.25</strong>
          </div>
        </div>
      `;

      const check = stage.querySelector('#nvl-null-check');
      const val = stage.querySelector('#nvl-val');
      const rep = stage.querySelector('#nvl-rep');
      const res = stage.querySelector('#nvl-result');
      const bYes = stage.querySelector('#nvl-b-yes');
      const bNo = stage.querySelector('#nvl-b-no');

      function update() {
        const isNull = check.checked;
        val.disabled = isNull;
        const expr1 = isNull ? null : val.value;
        const expr2 = rep.value;
        const r = NVL(expr1, expr2);
        res.textContent = r === null ? 'NULL' : r;

        bYes.classList.toggle('flow-active-branch', isNull);
        bNo.classList.toggle('flow-active-branch', !isNull);
      }

      check.addEventListener('change', update);
      val.addEventListener('input', update);
      rep.addEventListener('input', update);
      update();

    } else if (flowName === 'NVL2') {
      stage.innerHTML = `
        <div class="flow-panel">
          <div class="flow-controls">
            <div class="control-row">
              <label><input type="checkbox" id="nvl2-null-check" /> ¿commission_pct es <strong>NULL</strong>?</label>
            </div>
            <div class="control-row">
              <label>Retorno si NO es nulo (expr2):</label>
              <input type="text" id="nvl2-val2" class="modern-input" value="SAL+COMM" />
              <label>Retorno si ES nulo (expr3):</label>
              <input type="text" id="nvl2-val3" class="modern-input" value="SAL" />
            </div>
          </div>

          <div class="flow-diagram-container">
            <div class="flow-node node-start">NVL2(expr1, expr2, expr3)</div>
            <div class="flow-arrow">▼</div>
            <div class="flow-decision">¿expr1 es NOT NULL?</div>
            <div class="flow-branches">
              <div class="branch branch-yes" id="nvl2-b-notnull">
                <span class="branch-label">SÍ (NOT NULL)</span>
                <div class="flow-arrow">▼</div>
                <div class="flow-node node-res">Devuelve <strong>expr2</strong> ('SAL+COMM')</div>
              </div>
              <div class="branch branch-no" id="nvl2-b-null">
                <span class="branch-label">NO (Es NULL)</span>
                <div class="flow-arrow">▼</div>
                <div class="flow-node node-res">Devuelve <strong>expr3</strong> ('SAL')</div>
              </div>
            </div>
          </div>

          <div class="flow-summary">
            Resultado Evaluado: <strong id="nvl2-result" class="result-highlight">'SAL+COMM'</strong>
          </div>
        </div>
      `;

      const check = stage.querySelector('#nvl2-null-check');
      const v2 = stage.querySelector('#nvl2-val2');
      const v3 = stage.querySelector('#nvl2-val3');
      const res = stage.querySelector('#nvl2-result');
      const bNotNull = stage.querySelector('#nvl2-b-notnull');
      const bNull = stage.querySelector('#nvl2-b-null');

      function update() {
        const isNull = check.checked;
        const expr1 = isNull ? null : '0.2';
        const r = NVL2(expr1, v2.value, v3.value);
        res.textContent = `'${r}'`;

        bNotNull.classList.toggle('flow-active-branch', !isNull);
        bNull.classList.toggle('flow-active-branch', isNull);
      }

      check.addEventListener('change', update);
      v2.addEventListener('input', update);
      v3.addEventListener('input', update);
      update();

    } else if (flowName === 'NULLIF') {
      stage.innerHTML = `
        <div class="flow-panel">
          <div class="flow-controls">
            <div class="control-row">
              <label>Expresión 1 (ej. longitud nombre):</label>
              <input type="number" id="nullif-e1" class="modern-input" value="6" />
              <label>Expresión 2 (ej. longitud apellido):</label>
              <input type="number" id="nullif-e2" class="modern-input" value="6" />
            </div>
          </div>

          <div class="flow-diagram-container">
            <div class="flow-node node-start">NULLIF(expr1, expr2)</div>
            <div class="flow-arrow">▼</div>
            <div class="flow-decision">¿expr1 = expr2?</div>
            <div class="flow-branches">
              <div class="branch branch-yes" id="nullif-b-equal">
                <span class="branch-label">SÍ (Son Iguales)</span>
                <div class="flow-arrow">▼</div>
                <div class="flow-node node-res">Devuelve <strong>NULL</strong></div>
              </div>
              <div class="branch branch-no" id="nullif-b-diff">
                <span class="branch-label">NO (Son Diferentes)</span>
                <div class="flow-arrow">▼</div>
                <div class="flow-node node-res">Devuelve <strong>expr1</strong></div>
              </div>
            </div>
          </div>

          <div class="flow-summary">
            Resultado Evaluado: <strong id="nullif-result" class="result-highlight">NULL</strong>
          </div>
        </div>
      `;

      const e1 = stage.querySelector('#nullif-e1');
      const e2 = stage.querySelector('#nullif-e2');
      const res = stage.querySelector('#nullif-result');
      const bEq = stage.querySelector('#nullif-b-equal');
      const bDiff = stage.querySelector('#nullif-b-diff');

      function update() {
        const v1 = parseFloat(e1.value) || 0;
        const v2 = parseFloat(e2.value) || 0;
        const r = NULLIF(v1, v2);
        const isEqual = v1 === v2;
        res.textContent = r === null ? 'NULL (Sin valor)' : r;

        bEq.classList.toggle('flow-active-branch', isEqual);
        bDiff.classList.toggle('flow-active-branch', !isEqual);
      }

      e1.addEventListener('input', update);
      e2.addEventListener('input', update);
      update();

    } else if (flowName === 'COALESCE') {
      stage.innerHTML = `
        <div class="flow-panel">
          <div class="flow-controls">
            <p class="hint-text">COALESCE retorna la primera expresión NO nula de la lista (Pág. 44-45).</p>
            <div class="control-row">
              <label><input type="checkbox" id="coal-c1" checked /> expr1 (manager_id) es NULL</label>
              <label><input type="checkbox" id="coal-c2" checked /> expr2 (commission_pct) es NULL</label>
              <label><input type="checkbox" id="coal-c3" /> expr3 (valor -1) es NULL</label>
            </div>
          </div>

          <div class="coalesce-ladder">
            <div class="ladder-step" id="l-step-1">
              <span class="step-num">1</span> Evalúa expr1 (manager_id) ➔ <span class="step-res" id="lbl-l1">NULL</span>
            </div>
            <div class="ladder-step" id="l-step-2">
              <span class="step-num">2</span> Evalúa expr2 (commission_pct) ➔ <span class="step-res" id="lbl-l2">NULL</span>
            </div>
            <div class="ladder-step" id="l-step-3">
              <span class="step-num">3</span> Evalúa expr3 (-1) ➔ <span class="step-res" id="lbl-l3">-1</span>
            </div>
          </div>

          <div class="flow-summary">
            Resultado de COALESCE: <strong id="coal-result" class="result-highlight">-1</strong>
          </div>
        </div>
      `;

      const c1 = stage.querySelector('#coal-c1');
      const c2 = stage.querySelector('#coal-c2');
      const c3 = stage.querySelector('#coal-c3');
      const res = stage.querySelector('#coal-result');
      const l1 = stage.querySelector('#l-step-1');
      const l2 = stage.querySelector('#l-step-2');
      const l3 = stage.querySelector('#l-step-3');
      const lblL1 = stage.querySelector('#lbl-l1');
      const lblL2 = stage.querySelector('#lbl-l2');
      const lblL3 = stage.querySelector('#lbl-l3');

      function update() {
        const v1 = c1.checked ? null : 100;
        const v2 = c2.checked ? null : 0.20;
        const v3 = c3.checked ? null : -1;

        lblL1.textContent = v1 === null ? 'NULL ➔ Pasa al siguiente' : `${v1} (¡SE DETIENE AQUÍ!)`;
        lblL2.textContent = v2 === null ? 'NULL ➔ Pasa al siguiente' : `${v2} (¡SE DETIENE AQUÍ!)`;
        lblL3.textContent = v3 === null ? 'NULL' : `${v3} (¡SE DETIENE AQUÍ!)`;

        const r = COALESCE(v1, v2, v3);
        res.textContent = r === null ? 'NULL (Todos eran nulos)' : r;

        l1.classList.toggle('step-winner', v1 !== null);
        l2.classList.toggle('step-winner', v1 === null && v2 !== null);
        l3.classList.toggle('step-winner', v1 === null && v2 === null && v3 !== null);
      }

      c1.addEventListener('change', update);
      c2.addEventListener('change', update);
      c3.addEventListener('change', update);
      update();

    } else {
      // CASE / DECODE
      stage.innerHTML = `
        <div class="flow-panel">
          <div class="flow-controls">
            <div class="control-row">
              <label for="dec-job">Puesto (JOB_ID):</label>
              <select id="dec-job" class="modern-select">
                <option value="IT_PROG">IT_PROG (+10% salario)</option>
                <option value="ST_CLERK">ST_CLERK (+15% salario)</option>
                <option value="SA_REP">SA_REP (+20% salario)</option>
                <option value="AD_PRES">AD_PRES (Salario sin cambio)</option>
              </select>

              <label for="dec-sal">Salario Base ($):</label>
              <input type="number" id="dec-sal" class="modern-input" value="6000" />
            </div>
          </div>

          <div class="cond-comparison-box">
            <div class="cond-col">
              <h5>ANSI SQL: Expresión CASE</h5>
              <pre class="cond-code"><code>CASE job_id 
  WHEN 'IT_PROG'  THEN 1.10*salary
  WHEN 'ST_CLERK' THEN 1.15*salary
  WHEN 'SA_REP'   THEN 1.20*salary
  ELSE salary 
END</code></pre>
            </div>
            <div class="cond-col">
              <h5>Oracle SQL: Función DECODE</h5>
              <pre class="cond-code"><code>DECODE(job_id,
  'IT_PROG',  1.10*salary,
  'ST_CLERK', 1.15*salary,
  'SA_REP',   1.20*salary,
  salary)</code></pre>
            </div>
          </div>

          <div class="flow-summary">
            Salario Revisado Resultante: <strong id="cond-result" class="result-highlight">$6,600.00</strong>
          </div>
        </div>
      `;

      const jobSelect = stage.querySelector('#dec-job');
      const salInput = stage.querySelector('#dec-sal');
      const res = stage.querySelector('#cond-result');

      function update() {
        const job = jobSelect.value;
        const sal = parseFloat(salInput.value) || 0;
        const revised = DECODE(job, 'IT_PROG', 1.10 * sal, 'ST_CLERK', 1.15 * sal, 'SA_REP', 1.20 * sal, sal);
        res.textContent = `$${revised.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      jobSelect.addEventListener('change', update);
      salInput.addEventListener('input', update);
      update();
    }
  }

  flowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showFlow(btn.getAttribute('data-flow'));
    });
  });

  // Initial
  showFlow('NVL');
}
