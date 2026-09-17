/**
 * Group Engine & Aggregator Visualizer
 * Visualizes GROUP BY partitioning, HAVING filtering, and Oracle Error Diagnostics (ORA-00937 & ORA-00934)
 */

import { EMPLOYEES_TABLE } from '../data/employees.js';
import { getIcon } from '../data/icons.js';

export function renderGroupVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3 style="display: flex; align-items: center;">
            <span class="heading-icon">${getIcon('barChart2', 'svg-icon', 22)}</span> 
            Agrupador Visual y Flujo de Ejecución (GROUP BY & HAVING)
          </h3>
          <p class="viz-desc">
            Visualiza cómo Oracle particiona filas en "buckets" (grupos), calcula las funciones agregadas y filtra los grupos resultantes con HAVING (Ciclo de 3 pasos).
          </p>
        </div>
        <div class="viz-badge">GROUP BY / HAVING / ORA DIAGNOSTICS</div>
      </div>

      <!-- Controls Panel -->
      <div class="viz-controls-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="control-group">
          <label for="grp-col-select">Agrupar por (GROUP BY):</label>
          <select id="grp-col-select" class="modern-select">
            <option value="department_id" selected>department_id (8 Departamentos)</option>
            <option value="job_id">job_id (Puestos de Trabajo)</option>
            <option value="department_id, job_id">department_id, job_id (Multicolumna)</option>
            <option value="none">Ninguno (Toda la tabla como 1 grupo)</option>
          </select>
        </div>

        <div class="control-group">
          <label for="grp-func-select">Función de Grupo:</label>
          <select id="grp-func-select" class="modern-select">
            <option value="AVG(salary)" selected>AVG(salary) - Salario Promedio</option>
            <option value="SUM(salary)">SUM(salary) - Masa Salarial</option>
            <option value="MAX(salary)">MAX(salary) - Salario Máximo</option>
            <option value="MIN(salary)">MIN(salary) - Salario Mínimo</option>
            <option value="COUNT(*)">COUNT(*) - Total de Filas</option>
            <option value="COUNT(commission_pct)">COUNT(commission_pct) - Solo No Nulos</option>
            <option value="COUNT(DISTINCT department_id)">COUNT(DISTINCT department_id) - Únicos</option>
            <option value="AVG(commission_pct)">AVG(commission_pct) - Ignora Nulos (.2125)</option>
            <option value="AVG(NVL(commission_pct, 0))">AVG(NVL(commission_pct, 0)) - Con Nulos</option>
          </select>
        </div>

        <div class="control-group">
          <label for="grp-where-select">Filtro de Filas (WHERE previo):</label>
          <select id="grp-where-select" class="modern-select">
            <option value="none" selected>Sin filtro WHERE (Todas las filas)</option>
            <option value="job_id LIKE '%REP%'">job_id LIKE '%REP%' (Pág. 6)</option>
            <option value="job_id NOT LIKE '%REP%'">job_id NOT LIKE '%REP%' (Pág. 22)</option>
            <option value="department_id = 50">department_id = 50 (Pág. 8)</option>
            <option value="department_id = 80">department_id = 80 (Pág. 8)</option>
          </select>
        </div>

        <div class="control-group">
          <label for="grp-having-select">Filtro de Grupos (HAVING posterior):</label>
          <select id="grp-having-select" class="modern-select">
            <option value="none" selected>Sin cláusula HAVING</option>
            <option value="MAX(salary) > 10000">HAVING MAX(salary) > 10000 (Pág. 21)</option>
            <option value="SUM(salary) > 13000">HAVING SUM(salary) > 13000 (Pág. 22)</option>
            <option value="AVG(salary) > 8000">HAVING AVG(salary) > 8000</option>
            <option value="COUNT(*) > 2">HAVING COUNT(*) > 2</option>
          </select>
        </div>
      </div>

      <!-- Live Generated SQL Query Banner -->
      <div class="code-snippet-box" style="margin-bottom: 1.5rem; position: relative;">
        <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: 0.35rem;">
          Consulta SQL Generada en Tiempo Real:
        </div>
        <pre id="grp-live-sql" style="margin: 0; font-family: var(--font-mono); color: var(--cyan-primary); font-size: 0.95rem;"></pre>
      </div>

      <!-- Oracle 3-Step Execution Pipeline Visualization -->
      <div class="pipeline-flow-container" style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <div class="pipeline-step-card" id="step-card-where" style="flex: 1; min-width: 200px; padding: 1rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
          <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Paso 1: Filtrado WHERE</div>
          <div style="font-size: 1.25rem; font-weight: 700; color: #fff; margin: 0.25rem 0;" id="pipeline-count-where">20 Filas</div>
          <div style="font-size: 0.8rem; color: var(--text-subtle);" id="pipeline-desc-where">Filas candidatas antes de agrupar</div>
        </div>

        <div class="pipeline-step-card" id="step-card-group" style="flex: 1; min-width: 200px; padding: 1rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
          <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Paso 2: Partición GROUP BY</div>
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--cyan-primary); margin: 0.25rem 0;" id="pipeline-count-groups">8 Grupos</div>
          <div style="font-size: 0.8rem; color: var(--text-subtle);">Buckets formados por valor común</div>
        </div>

        <div class="pipeline-step-card" id="step-card-having" style="flex: 1; min-width: 200px; padding: 1rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
          <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Paso 3: Restricción HAVING</div>
          <div style="font-size: 1.25rem; font-weight: 700; color: var(--emerald-primary); margin: 0.25rem 0;" id="pipeline-count-having">8 Aprobados</div>
          <div style="font-size: 0.8rem; color: var(--text-subtle);">Grupos que pasan el filtro final</div>
        </div>
      </div>

      <!-- Buckets Display Grid -->
      <div style="margin-bottom: 2rem;">
        <h4 style="color: #fff; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
          <span style="display: flex; align-items: center;">
            <span class="heading-icon">${getIcon('grid', 'svg-icon', 18)}</span>
            Partición Visual en Grupos ("Buckets")
          </span>
          <span id="grp-status-badge" class="result-code" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;"></span>
        </h4>
        <div id="grp-buckets-container" class="grp-buckets-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;"></div>
      </div>

      <!-- Oracle Errors Simulator & Interactive Diagnostic Sandbox -->
      <div class="ora-simulator-panel" style="background: rgba(239, 68, 68, 0.04); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-lg); padding: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <h4 style="color: #f87171; margin: 0; display: flex; align-items: center;">
            <span class="heading-icon">${getIcon('alertOctagon', 'svg-icon', 20)}</span>
            Simulador de Errores Oracle (Prueba y Diagnóstico ORA)
          </h4>
          <span style="font-size: 0.75rem; color: var(--text-subtle);">Haz clic en un botón para provocar y analizar el error en vivo</span>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <button type="button" id="btn-trigger-ora937" class="btn-secondary" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">
            ${getIcon('alertOctagon', 'btn-icon', 16)} Provocar ORA-00937 (Columna faltante en GROUP BY)
          </button>
          <button type="button" id="btn-trigger-ora934" class="btn-secondary" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">
            ${getIcon('alertTriangle', 'btn-icon', 16)} Provocar ORA-00934 (Función de grupo en WHERE)
          </button>
          <button type="button" id="btn-reset-simulator" class="btn-secondary" style="margin-left: auto;">
            Restablecer Normal
          </button>
        </div>

        <div id="ora-error-banner" style="display: none; background: #160b0b; border: 1px solid #ef4444; border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); color: #fca5a5; font-size: 0.9rem; line-height: 1.5;"></div>
      </div>

    </div>
  `;

  // DOM Elements
  const grpColSelect = container.querySelector('#grp-col-select');
  const grpFuncSelect = container.querySelector('#grp-func-select');
  const grpWhereSelect = container.querySelector('#grp-where-select');
  const grpHavingSelect = container.querySelector('#grp-having-select');
  const liveSql = container.querySelector('#grp-live-sql');

  const countWhere = container.querySelector('#pipeline-count-where');
  const descWhere = container.querySelector('#pipeline-desc-where');
  const countGroups = container.querySelector('#pipeline-count-groups');
  const countHaving = container.querySelector('#pipeline-count-having');
  const bucketsContainer = container.querySelector('#grp-buckets-container');
  const statusBadge = container.querySelector('#grp-status-badge');

  const btnOra937 = container.querySelector('#btn-trigger-ora937');
  const btnOra934 = container.querySelector('#btn-trigger-ora934');
  const btnReset = container.querySelector('#btn-reset-simulator');
  const oraBanner = container.querySelector('#ora-error-banner');

  function updateVisualizer() {
    oraBanner.style.display = 'none';

    const grpBy = grpColSelect.value;
    const func = grpFuncSelect.value;
    const where = grpWhereSelect.value;
    const having = grpHavingSelect.value;

    // 1. Build live SQL text
    let sql = 'SELECT ';
    if (grpBy !== 'none') {
      sql += `${grpBy}, ${func}\nFROM   employees`;
    } else {
      sql += `${func}\nFROM   employees`;
    }

    if (where !== 'none') {
      sql += `\nWHERE  ${where}`;
    }

    if (grpBy !== 'none') {
      sql += `\nGROUP BY ${grpBy}`;
    }

    if (having !== 'none') {
      sql += `\nHAVING ${having}`;
    }
    sql += ';';
    liveSql.textContent = sql;

    // 2. Filter rows with WHERE
    const sourceData = [...EMPLOYEES_TABLE];
    const filteredRows = sourceData.filter(row => {
      if (where === 'none') return true;
      if (where === "job_id LIKE '%REP%'") return String(row.job_id).includes('REP');
      if (where === "job_id NOT LIKE '%REP%'") return !String(row.job_id).includes('REP');
      if (where === 'department_id = 50') return row.department_id === 50;
      if (where === 'department_id = 80') return row.department_id === 80;
      return true;
    });

    countWhere.textContent = `${filteredRows.length} Filas`;
    descWhere.textContent = where === 'none' ? 'Total de filas de EMPLOYEES' : `Filtradas por WHERE ${where}`;

    // 3. Partition into groups
    const groups = new Map();
    for (const row of filteredRows) {
      let key = 'Toda la tabla';
      if (grpBy === 'department_id') {
        key = row.department_id === null ? 'NULL (Sin Dept)' : `Dept ${row.department_id}`;
      } else if (grpBy === 'job_id') {
        key = `Job: ${row.job_id}`;
      } else if (grpBy === 'department_id, job_id') {
        const d = row.department_id === null ? 'NULL' : row.department_id;
        key = `Dept ${d} • ${row.job_id}`;
      }

      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    }

    countGroups.textContent = `${groups.size} Grupos`;

    // 4. Calculate Aggregate Function per group
    function calcGroupAggregate(rows) {
      if (func === 'COUNT(*)') return rows.length;
      if (func === 'COUNT(commission_pct)') return rows.filter(r => r.commission_pct !== null).length;
      if (func === 'COUNT(DISTINCT department_id)') {
        const s = new Set(rows.map(r => r.department_id).filter(v => v !== null));
        return s.size;
      }
      if (func === 'SUM(salary)') return rows.reduce((acc, r) => acc + (r.salary || 0), 0);
      if (func === 'AVG(salary)') {
        if (rows.length === 0) return 0;
        const avg = rows.reduce((acc, r) => acc + (r.salary || 0), 0) / rows.length;
        return Number.isInteger(avg) ? avg : Math.round(avg * 100) / 100;
      }
      if (func === 'MAX(salary)') return Math.max(...rows.map(r => r.salary || 0));
      if (func === 'MIN(salary)') return Math.min(...rows.map(r => r.salary || 0));
      if (func === 'AVG(commission_pct)') {
        const comms = rows.map(r => r.commission_pct).filter(v => v !== null);
        if (comms.length === 0) return 0;
        return Math.round((comms.reduce((a, b) => a + b, 0) / comms.length) * 10000) / 10000;
      }
      if (func === 'AVG(NVL(commission_pct, 0))') {
        const avg = rows.reduce((acc, r) => acc + (r.commission_pct || 0), 0) / rows.length;
        return Math.round(avg * 10000) / 10000;
      }
      return 0;
    }

    // 5. Evaluate HAVING
    let passedCount = 0;
    const bucketCardsHtml = [];

    groups.forEach((rows, groupKey) => {
      const aggVal = calcGroupAggregate(rows);

      let passesHaving = true;
      if (having !== 'none') {
        if (having === 'MAX(salary) > 10000') {
          const maxSal = Math.max(...rows.map(r => r.salary || 0));
          passesHaving = maxSal > 10000;
        } else if (having === 'SUM(salary) > 13000') {
          const sumSal = rows.reduce((acc, r) => acc + (r.salary || 0), 0);
          passesHaving = sumSal > 13000;
        } else if (having === 'AVG(salary) > 8000') {
          const avgSal = rows.reduce((acc, r) => acc + (r.salary || 0), 0) / rows.length;
          passesHaving = avgSal > 8000;
        } else if (having === 'COUNT(*) > 2') {
          passesHaving = rows.length > 2;
        }
      }

      if (passesHaving) passedCount++;

      const badgeStyle = passesHaving 
        ? 'background: rgba(16, 185, 129, 0.15); color: var(--emerald-primary); border: 1px solid rgba(16, 185, 129, 0.3);' 
        : 'background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3); text-decoration: line-through;';

      const cardStyle = passesHaving
        ? 'border: 1px solid rgba(16, 185, 129, 0.3); background: rgba(15, 23, 42, 0.6);'
        : 'border: 1px solid rgba(239, 68, 68, 0.2); background: rgba(15, 23, 42, 0.3); opacity: 0.45; filter: grayscale(0.5);';

      const rowsPreview = rows.map(r => `
        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; padding: 0.2rem 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
          <span style="color: #fff;">${r.last_name} (${r.job_id})</span>
          <span style="font-family: var(--font-mono); color: var(--text-subtle);">$${r.salary.toLocaleString()}${r.commission_pct ? ` • ${r.commission_pct}` : ''}</span>
        </div>
      `).join('');

      bucketCardsHtml.push(`
        <div class="bucket-card" style="border-radius: var(--radius-md); padding: 1rem; transition: all 0.2s; ${cardStyle}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <div>
              <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${groupKey}</div>
              <div style="font-size: 0.75rem; color: var(--text-subtle);">${rows.length} fila(s) en grupo</div>
            </div>
            <span style="font-size: 0.7rem; font-weight: 600; border-radius: 4px; padding: 0.15rem 0.4rem; ${badgeStyle}">
              ${passesHaving ? '✓ CUMPLE' : '✗ DESCARTADO'}
            </span>
          </div>

          <div style="background: rgba(0,0,0,0.25); border-radius: 6px; padding: 0.6rem; margin-bottom: 0.75rem;">
            <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--cyan-primary);">${func}</div>
            <div style="font-size: 1.35rem; font-weight: 700; font-family: var(--font-mono); color: #fff;">${aggVal.toLocaleString()}</div>
          </div>

          <div style="max-height: 120px; overflow-y: auto; padding-right: 0.25rem;">
            ${rowsPreview}
          </div>
        </div>
      `);
    });

    countHaving.textContent = `${passedCount} Aprobados`;
    statusBadge.textContent = `${passedCount} de ${groups.size} grupos mostrados en resultado`;
    bucketsContainer.innerHTML = bucketCardsHtml.join('');
  }

  // Event Listeners
  grpColSelect.addEventListener('change', updateVisualizer);
  grpFuncSelect.addEventListener('change', updateVisualizer);
  grpWhereSelect.addEventListener('change', updateVisualizer);
  grpHavingSelect.addEventListener('change', updateVisualizer);

  // Trigger ORA-00937 Error
  btnOra937.addEventListener('click', () => {
    liveSql.textContent = `SELECT department_id, COUNT(last_name)\nFROM   employees;\n\n* ERROR en línea 1:\nORA-00937: not a single-group group function`;
    oraBanner.style.display = 'block';
    oraBanner.innerHTML = `
      <div style="color: #ef4444; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">
        🛑 ORA-00937: not a single-group group function (Pág. 17 del PDF)
      </div>
      <p style="margin: 0 0 0.5rem 0; color: #cbd5e1;">
        <strong>Causa del Error:</strong> Se ha incluido la columna individual <code>department_id</code> en el <code>SELECT</code> junto con la función de grupo <code>COUNT(last_name)</code> sin especificar <code>GROUP BY department_id</code>.
      </p>
      <div style="background: rgba(0,0,0,0.4); padding: 0.75rem; border-radius: 4px; border-left: 3px solid #ef4444; margin-bottom: 0.5rem;">
        <code>COUNT(last_name)</code> produce <strong>1 fila escalar</strong>.<br>
        <code>department_id</code> produce <strong>20 filas distintas</strong>.<br>
        Oracle no puede tabular filas individuales con escalares sin agrupar.
      </div>
      <p style="margin: 0; color: var(--emerald-primary);">
        💡 <strong>Solución:</strong> Añadir la cláusula <code>GROUP BY department_id</code> o remover la columna suelta del SELECT.
      </p>
    `;
  });

  // Trigger ORA-00934 Error
  btnOra934.addEventListener('click', () => {
    liveSql.textContent = `SELECT   department_id, AVG(salary)\nFROM     employees\nWHERE    AVG(salary) > 8000\nGROUP BY department_id;\n\n* ERROR en línea 3:\nORA-00934: group function is not allowed here`;
    oraBanner.style.display = 'block';
    oraBanner.innerHTML = `
      <div style="color: #ef4444; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">
        🛑 ORA-00934: group function is not allowed here (Pág. 18 del PDF)
      </div>
      <p style="margin: 0 0 0.5rem 0; color: #cbd5e1;">
        <strong>Causa del Error:</strong> Se intentó usar una función de grupo (<code>AVG(salary)</code>) dentro de la cláusula <code>WHERE</code> para restringir grupos.
      </p>
      <div style="background: rgba(0,0,0,0.4); padding: 0.75rem; border-radius: 4px; border-left: 3px solid #ef4444; margin-bottom: 0.5rem;">
        <strong>Orden de Ejecución de Oracle:</strong><br>
        1. <code>WHERE</code> evalúa y filtra filas individuales <em>antes</em> de que existan los grupos.<br>
        2. Por tanto, en el <code>WHERE</code> el promedio grupal todavía no ha sido calculado.
      </div>
      <p style="margin: 0; color: var(--emerald-primary);">
        💡 <strong>Solución:</strong> Trasladar la condición a la cláusula <code>HAVING AVG(salary) > 8000</code>.
      </p>
    `;
  });

  btnReset.addEventListener('click', () => {
    grpColSelect.value = 'department_id';
    grpFuncSelect.value = 'AVG(salary)';
    grpWhereSelect.value = 'none';
    grpHavingSelect.value = 'none';
    updateVisualizer();
  });

  // Initial render
  updateVisualizer();
}
