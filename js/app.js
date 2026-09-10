/**
 * Main Application Orchestrator
 * Coordinates Navigation, Visualizers, SQL Studio, Curriculum, Practices, and Cheatsheet.
 */

import { SQLEngine } from './engine/sqlEngine.js';
import { SimulationConfig, TO_CHAR_DATE } from './engine/functions.js';
import { EMPLOYEES_TABLE, EMPLOYEES_SCHEMA, DUAL_TABLE } from './data/employees.js';
import { CURRICULUM_MODULES } from './data/curriculum.js';
import { PRACTICE_EXERCISES, QUIZ_QUESTIONS } from './data/exercises.js';
import { CHEATSHEET_DATA } from './data/cheatsheet.js';

import { renderStringVisualizer } from './visualizers/stringVisualizer.js';
import { renderNumberVisualizer } from './visualizers/numberVisualizer.js';
import { renderDateVisualizer } from './visualizers/dateVisualizer.js';
import { renderRRFormatVisualizer } from './visualizers/rrFormatVisualizer.js';
import { renderNullLogicVisualizer } from './visualizers/nullLogicVisualizer.js';
import { renderNestingVisualizer } from './visualizers/nestingVisualizer.js';

// Global instances
const sqlEngine = new SQLEngine();

// All 19 Canonical Queries directly from the PDF
const PDF_QUERIES = [
  {
    name: 'Pág. 8: LOWER en WHERE (Búsqueda Case-Insensitive)',
    sql: "SELECT employee_id, last_name, department_id\nFROM   employees\nWHERE  LOWER(last_name) = 'higgins';"
  },
  {
    name: 'Pág. 10: CONCAT, LENGTH, INSTR y SUBSTR',
    sql: "SELECT employee_id, CONCAT(first_name, last_name) NAME, \n       job_id, LENGTH(last_name), \n       INSTR(last_name, 'a') \"Contains 'a'?\"\nFROM   employees\nWHERE  SUBSTR(job_id, 4) = 'REP';"
  },
  {
    name: 'Pág. 12: ROUND con Decimales, Entero y Negativo en DUAL',
    sql: "SELECT ROUND(45.923, 2), ROUND(45.923, 0), ROUND(45.923, -1)\nFROM   DUAL;"
  },
  {
    name: 'Pág. 13: TRUNC con Decimales y Negativo en DUAL',
    sql: "SELECT TRUNC(45.923, 2), TRUNC(45.923), TRUNC(45.923, -1)\nFROM   DUAL;"
  },
  {
    name: 'Pág. 14: MOD para Residuo Salarial',
    sql: "SELECT last_name, salary, MOD(salary, 5000)\nFROM   employees\nWHERE  job_id = 'SA_REP';"
  },
  {
    name: 'Pág. 15: Filtrado de Fecha (hire_date < 01-FEB-88)',
    sql: "SELECT last_name, hire_date\nFROM   employees\nWHERE  hire_date < '01-FEB-88';"
  },
  {
    name: 'Pág. 18: Aritmética de Fechas (Semanas Empleado)',
    sql: "SELECT last_name, (SYSDATE-hire_date)/7 AS WEEKS\nFROM   employees\nWHERE  department_id = 90;"
  },
  {
    name: 'Pág. 31: TO_CHAR con Formato Fecha fmDD Month YYYY',
    sql: "SELECT last_name, \n       TO_CHAR(hire_date, 'fmDD Month YYYY') AS HIREDATE\nFROM   employees;"
  },
  {
    name: 'Pág. 33: TO_CHAR con Formato Monetario $99,999.00',
    sql: "SELECT TO_CHAR(salary, '$99,999.00') AS SALARY\nFROM   employees\nWHERE  last_name = 'Ernst';"
  },
  {
    name: 'Pág. 34: TO_DATE con Formato de Siglo DD-MON-RR',
    sql: "SELECT last_name, TO_CHAR(hire_date, 'DD-Mon-YYYY')\nFROM   employees\nWHERE  hire_date < TO_DATE('01-JAN-90', 'DD-MON-RR');"
  },
  {
    name: 'Pág. 38: Anidamiento UPPER(CONCAT(SUBSTR(last_name, 1, 8), \'_US\'))',
    sql: "SELECT last_name, \n       UPPER(CONCAT(SUBSTR(last_name, 1, 8), '_US')) AS CODE\nFROM   employees\nWHERE  department_id = 60;"
  },
  {
    name: 'Pág. 41: NVL con Salario Anual y Comisión',
    sql: "SELECT last_name, salary, NVL(commission_pct, 0),\n       (salary*12) + (salary*12*NVL(commission_pct, 0)) AS AN_SAL\nFROM   employees;"
  },
  {
    name: 'Pág. 42: NVL2 para Estado de Comisión',
    sql: "SELECT last_name, salary, commission_pct,\n       NVL2(commission_pct, 'SAL+COMM', 'SAL') AS INCOME\nFROM   employees;"
  },
  {
    name: 'Pág. 43: NULLIF Comparando Longitudes de Nombres',
    sql: "SELECT first_name, LENGTH(first_name) \"expr1\", \n       last_name,  LENGTH(last_name)  \"expr2\",\n       NULLIF(LENGTH(first_name), LENGTH(last_name)) AS RESULT\nFROM   employees;"
  },
  {
    name: 'Pág. 45: COALESCE con Manager, Comisión y -1',
    sql: "SELECT last_name, \n       COALESCE(manager_id, commission_pct, -1) AS COMM\nFROM   employees\nORDER BY commission_pct;"
  },
  {
    name: 'Pág. 48: Expresión CASE de Salarios Revisados',
    sql: "SELECT last_name, job_id, salary,\n       CASE job_id WHEN 'IT_PROG'  THEN 1.10*salary\n                   WHEN 'ST_CLERK' THEN 1.15*salary\n                   WHEN 'SA_REP'   THEN 1.20*salary\n       ELSE salary END AS \"REVISED_SALARY\"\nFROM   employees;"
  },
  {
    name: 'Pág. 50: Función DECODE de Salarios Revisados',
    sql: "SELECT last_name, job_id, salary,\n       DECODE(job_id, 'IT_PROG',  1.10*salary,\n                      'ST_CLERK', 1.15*salary,\n                      'SA_REP',   1.20*salary,\n              salary) AS REVISED_SALARY\nFROM   employees;"
  },
  {
    name: 'Pág. 51: DECODE con TRUNC(salary/2000, 0) para Tramos Fiscales',
    sql: "SELECT last_name, salary,\n       DECODE (TRUNC(salary/2000, 0),\n                         0, 0.00,\n                         1, 0.09,\n                         2, 0.20,\n                         3, 0.30,\n                         4, 0.40,\n                         5, 0.42,\n                         6, 0.44,\n                            0.45) AS TAX_RATE\nFROM   employees\nWHERE  department_id = 80;"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSysdatePill();
  initCurriculumView();
  initVisualizersView();
  initSQLStudio();
  initPracticesView();
  initCheatsheetView();
  initSchemaView();
});

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function initNavigation() {
  const navButtons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.view-section');

  function switchTab(targetView) {
    navButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-view') === targetView));
    sections.forEach(sec => sec.classList.toggle('active', sec.id === `view-${targetView}`));
    window.location.hash = targetView;
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      switchTab(targetView);
    });
  });

  // Check initial hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.querySelector(`.tab-btn[data-view="${initialHash}"]`)) {
    switchTab(initialHash);
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`.tab-btn[data-view="${hash}"]`)) {
      switchTab(hash);
    }
  });
}

function navigateToTab(tabName) {
  const btn = document.querySelector(`.tab-btn[data-view="${tabName}"]`);
  if (btn) btn.click();
}

/* ==========================================================================
   SYSDATE TOGGLE PILL
   ========================================================================== */
function initSysdatePill() {
  const pill = document.querySelector('#sysdate-pill');
  const textEl = document.querySelector('#sysdate-display');

  function updateDisplay() {
    const d = SimulationConfig.getSysdate();
    textEl.textContent = `SYSDATE: ${TO_CHAR_DATE(d, 'DD-MON-RR')} (${SimulationConfig.useFixedReferenceDate ? 'Demo PDF' : 'En Vivo'})`;
  }

  pill.addEventListener('click', () => {
    SimulationConfig.useFixedReferenceDate = !SimulationConfig.useFixedReferenceDate;
    updateDisplay();
    // Re-render date visualizer if active
    const dateVizContainer = document.querySelector('#viz-date-container');
    if (dateVizContainer) renderDateVisualizer(dateVizContainer);
  });

  updateDisplay();
}

/* ==========================================================================
   MARKDOWN PARSER FOR CURRICULUM CONTENT
   ========================================================================== */
function renderMarkdown(md) {
  if (!md) return '';
  const lines = md.trim().split('\n');
  const output = [];

  let inCodeBlock = false;
  let codeBlockLines = [];

  let inTable = false;
  let tableRows = [];

  let inList = false;
  let listItems = [];
  let listType = 'ul';

  function formatInline(str) {
    return str
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function flushTable() {
    if (!inTable || tableRows.length === 0) return;
    let html = '<div class="results-table-scroll" style="margin: 1rem 0;"><table class="oracle-table"><thead>';
    const headerCells = tableRows[0].split('|').slice(1, -1).map(c => c.trim());
    html += '<tr>' + headerCells.map(c => `<th>${formatInline(c)}</th>`).join('') + '</tr></thead><tbody>';

    let startBody = 1;
    if (tableRows.length > 1 && tableRows[1].includes('---')) {
      startBody = 2;
    }

    for (let r = startBody; r < tableRows.length; r++) {
      const cells = tableRows[r].split('|').slice(1, -1).map(c => c.trim());
      html += '<tr>' + cells.map(c => `<td>${formatInline(c)}</td>`).join('') + '</tr>';
    }
    html += '</tbody></table></div>';
    output.push(html);
    tableRows = [];
    inTable = false;
  }

  function flushList() {
    if (!inList || listItems.length === 0) return;
    output.push(`<${listType} style="margin: 0.75rem 0 1rem 1.5rem;">${listItems.map(li => `<li>${formatInline(li)}</li>`).join('')}</${listType}>`);
    listItems = [];
    inList = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Code block toggle
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        output.push(`<div class="code-snippet-box"><pre><code>${codeBlockLines.join('\n')}</code></pre></div>`);
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushTable();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Table line
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      inTable = true;
      tableRows.push(line);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Bullet or Numbered List
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    const numMatch = line.match(/^\d+\.\s+(.*)$/);

    if (bulletMatch) {
      flushTable();
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(bulletMatch[1]);
      continue;
    } else if (numMatch) {
      flushTable();
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(numMatch[1]);
      continue;
    } else if (inList && line === '') {
      flushList();
      continue;
    } else if (inList) {
      flushList();
    }

    if (line === '') continue;

    // Subheadings
    if (line.startsWith('### ')) {
      output.push(`<h4 style="color: #fff; margin: 1.25rem 0 0.5rem 0;">${formatInline(line.substring(4))}</h4>`);
      continue;
    }

    // Regular paragraph
    output.push(`<p style="margin-bottom: 0.85rem;">${formatInline(line)}</p>`);
  }

  if (inCodeBlock && codeBlockLines.length > 0) {
    output.push(`<div class="code-snippet-box"><pre><code>${codeBlockLines.join('\n')}</code></pre></div>`);
  }
  flushTable();
  flushList();

  return output.join('\n');
}

/* ==========================================================================
   CURRICULUM VIEW
   ========================================================================== */
function initCurriculumView() {
  const sidebar = document.querySelector('#curriculum-sidebar');
  const detailContainer = document.querySelector('#curriculum-detail');

  // Render Sidebar
  sidebar.innerHTML = CURRICULUM_MODULES.map((m, idx) => `
    <div class="module-nav-item ${idx === 0 ? 'active' : ''}" data-mod-id="${m.id}">
      <span class="mod-icon">${m.icon}</span>
      <div class="mod-info">
        <div class="mod-num">Módulo ${m.number} • ${m.pdfPages}</div>
        <div class="mod-title">${m.title}</div>
      </div>
    </div>
  `).join('');

  function renderModuleDetail(mod) {
    let sectionsHtml = mod.sections.map(s => {
      let extra = '';
      if (s.highlightBox) {
        extra += `
          <div class="callout-box callout-${s.highlightBox.type}">
            <div class="callout-title">${s.highlightBox.title}</div>
            <p>${s.highlightBox.text.replace(/\n/g, '<br>')}</p>
          </div>
        `;
      }
      if (s.diagram) {
        extra += `<pre class="code-snippet-box"><code>${s.diagram}</code></pre>`;
      }
      if (s.sampleCode) {
        extra += `
          <div class="code-snippet-box">
            <button type="button" class="btn-run-sample" data-sql="${encodeURIComponent(s.sampleCode)}">⚡ Probar en SQL Studio</button>
            <pre><code>${s.sampleCode}</code></pre>
          </div>
        `;
      }

      // Render full markdown: tables, lists, code blocks, paragraphs, and inline styles
      const formattedContent = renderMarkdown(s.content);

      return `
        <div class="mod-section-block">
          <h3>${s.title}</h3>
          <div class="mod-prose">${formattedContent}</div>
          ${extra}
        </div>
      `;
    }).join('');

    detailContainer.innerHTML = `
      <div class="mod-detail-header">
        <h2>${mod.icon} Módulo ${mod.number}: ${mod.title}</h2>
        <div class="mod-detail-sub">${mod.subtitle}</div>
        <p class="viz-desc" style="margin-top: 0.5rem;">${mod.summary}</p>
      </div>

      <div class="mod-body">${sectionsHtml}</div>

      ${mod.sampleQuery ? `
        <div class="card-panel" style="margin-top: 2rem;">
          <h4 style="color: #fff; margin-bottom: 0.75rem;">🚀 Consulta Integradora del Módulo</h4>
          <div class="code-snippet-box">
            <button type="button" class="btn-run-sample" data-sql="${encodeURIComponent(mod.sampleQuery)}">⚡ Abrir en SQL Studio</button>
            <pre><code>${mod.sampleQuery}</code></pre>
          </div>
        </div>
      ` : ''}
    `;

    // Attach sample buttons
    detailContainer.querySelectorAll('.btn-run-sample').forEach(btn => {
      btn.addEventListener('click', () => {
        const sql = decodeURIComponent(btn.getAttribute('data-sql'));
        openInSQLStudio(sql);
      });
    });
  }

  function selectModule(modId) {
    sidebar.querySelectorAll('.module-nav-item').forEach(i => i.classList.toggle('active', i.getAttribute('data-mod-id') === modId));
    const mod = CURRICULUM_MODULES.find(m => m.id === modId);
    if (mod) renderModuleDetail(mod);
  }

  sidebar.querySelectorAll('.module-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const modId = item.getAttribute('data-mod-id');
      selectModule(modId);
      window.location.hash = modId;
    });
  });

  // Initial check from URL hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash.startsWith('mod-')) {
    selectModule(initialHash);
  } else {
    renderModuleDetail(CURRICULUM_MODULES[0]);
  }

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    if (h.startsWith('mod-')) {
      navigateToTab('curso');
      selectModule(h);
    }
  });
}

/* ==========================================================================
   VISUALIZERS VIEW
   ========================================================================== */
function initVisualizersView() {
  const tabs = document.querySelectorAll('.viz-sub-tab');
  const panels = document.querySelectorAll('.viz-panel');

  // Render each visualizer once into its container
  renderStringVisualizer(document.querySelector('#viz-string-container'));
  renderNumberVisualizer(document.querySelector('#viz-number-container'));
  renderDateVisualizer(document.querySelector('#viz-date-container'));
  renderRRFormatVisualizer(document.querySelector('#viz-rr-container'));
  renderNullLogicVisualizer(document.querySelector('#viz-null-container'));
  renderNestingVisualizer(document.querySelector('#viz-nesting-container'));

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-viz');
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('active', p.id === `viz-${target}-container`));
    });
  });
}

/* ==========================================================================
   SQL STUDIO
   ========================================================================== */
function initSQLStudio() {
  const editor = document.querySelector('#sql-editor');
  const runBtn = document.querySelector('#btn-run-sql');
  const formatBtn = document.querySelector('#btn-format-sql');
  const clearBtn = document.querySelector('#btn-clear-sql');
  const presetSelect = document.querySelector('#preset-query-select');
  const resultsContainer = document.querySelector('#sql-results-container');
  const metricRows = document.querySelector('#metric-rows');
  const metricTime = document.querySelector('#metric-time');

  // Populate presets
  presetSelect.innerHTML = `
    <option value="">-- Cargar Consulta del PDF (${PDF_QUERIES.length} Ejemplos) --</option>
    ${PDF_QUERIES.map((q, idx) => `
      <option value="${idx}">${q.name}</option>
    `).join('')}
  `;

  presetSelect.addEventListener('change', () => {
    const idx = presetSelect.value;
    if (idx !== '') {
      editor.value = PDF_QUERIES[parseInt(idx, 10)].sql;
      runQuery();
    }
  });

  function runQuery() {
    const sql = editor.value.trim();
    if (!sql) return;

    try {
      const res = sqlEngine.execute(sql);
      metricRows.textContent = res.rowCount;
      metricTime.textContent = `${res.executionTime} ms`;
      renderResultsTable(res);
    } catch (err) {
      resultsContainer.innerHTML = `
        <div style="padding: 1.5rem; color: var(--rose-primary); background: rgba(244, 63, 94, 0.1); border-left: 4px solid var(--rose-primary);">
          <strong>Error de Ejecución Oracle:</strong> ${err.message}
        </div>
      `;
      metricRows.textContent = '0';
      metricTime.textContent = '0 ms';
    }
  }

  function renderResultsTable(result) {
    if (result.rowCount === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-subtle);">
          La consulta no devolvió ninguna fila. (0 filas)
        </div>
      `;
      return;
    }

    const headersHtml = result.headers.map(h => `<th>${h}</th>`).join('');
    const rowsHtml = result.rows.map(row => {
      const cellsHtml = row.map(cell => {
        if (cell === null || cell === undefined) {
          return `<td><span class="null-pill">(null)</span></td>`;
        }
        if (cell instanceof Date) {
          return `<td>${TO_CHAR_DATE(cell, 'DD-MON-RR')}</td>`;
        }
        return `<td>${cell}</td>`;
      }).join('');
      return `<tr>${cellsHtml}</tr>`;
    }).join('');

    resultsContainer.innerHTML = `
      <div class="results-table-scroll">
        <table class="oracle-table">
          <thead><tr>${headersHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  }

  runBtn.addEventListener('click', runQuery);

  formatBtn.addEventListener('click', () => {
    // Basic SQL uppercase keywords format
    let s = editor.value;
    s = s.replace(/\b(select|from|where|order by|and|or|as|case|when|then|else|end|group by)\b/gi, m => m.toUpperCase());
    editor.value = s;
  });

  clearBtn.addEventListener('click', () => {
    editor.value = '';
    editor.focus();
  });

  // Hotkey Ctrl+Enter or Cmd+Enter to run query
  editor.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
  });

  // Default query on initial load
  editor.value = PDF_QUERIES[1].sql; // Page 10 query
  runQuery();
}

export function openInSQLStudio(sql) {
  const editor = document.querySelector('#sql-editor');
  if (editor) {
    editor.value = sql;
    navigateToTab('studio');
    const runBtn = document.querySelector('#btn-run-sql');
    if (runBtn) runBtn.click();
  }
}

/* ==========================================================================
   PRACTICES & QUIZZES VIEW
   ========================================================================== */
function initPracticesView() {
  const challengesContainer = document.querySelector('#challenges-container');
  const quizzesContainer = document.querySelector('#quizzes-container');
  const scoreBadge = document.querySelector('#quiz-score-badge');

  // Render Practice 3 Challenges
  challengesContainer.innerHTML = PRACTICE_EXERCISES.map(p => `
    <div class="challenge-card" id="card-${p.id}">
      <div class="challenge-header">
        <div class="challenge-title">${p.title}</div>
        <span class="difficulty-badge diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
      </div>
      <p class="mod-prose" style="margin-bottom: 1rem;">${p.description}</p>
      <div class="code-snippet-box">
        <pre><code id="code-${p.id}">${p.starterSql}</code></pre>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <button type="button" class="btn-primary btn-run-chal" data-sql="${encodeURIComponent(p.starterSql)}" data-id="${p.id}">⚡ Probar en Consola</button>
        <button type="button" class="btn-secondary btn-hint-chal" data-hint="${encodeURIComponent(p.hint)}">💡 Ver Pista</button>
      </div>
      <div id="hint-${p.id}" class="callout-box callout-tip" style="display: none; margin-top: 1rem;"></div>
    </div>
  `).join('');

  challengesContainer.querySelectorAll('.btn-run-chal').forEach(btn => {
    btn.addEventListener('click', () => {
      const sql = decodeURIComponent(btn.getAttribute('data-sql'));
      openInSQLStudio(sql);
    });
  });

  challengesContainer.querySelectorAll('.btn-hint-chal').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.challenge-card');
      const hintEl = card.querySelector('.callout-box');
      hintEl.textContent = decodeURIComponent(btn.getAttribute('data-hint'));
      hintEl.style.display = hintEl.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Render Interactive Quizzes
  let correctCount = 0;
  const answered = new Set();

  quizzesContainer.innerHTML = QUIZ_QUESTIONS.map((q, idx) => `
    <div class="quiz-card" id="quiz-${q.id}">
      <div style="font-size: 0.75rem; color: var(--cyan-primary); font-weight: 700; margin-bottom: 0.25rem;">PREGUNTA ${idx + 1} DE ${QUIZ_QUESTIONS.length} • ${q.category.toUpperCase()}</div>
      <div class="quiz-q-text">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, optIdx) => `
          <label class="quiz-opt-label" data-q-id="${q.id}" data-opt-idx="${optIdx}">
            <input type="radio" name="radio-${q.id}" value="${optIdx}" />
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>
      <div id="quiz-expl-${q.id}" class="quiz-expl-box" style="display: none;"></div>
    </div>
  `).join('');

  quizzesContainer.querySelectorAll('.quiz-opt-label').forEach(label => {
    label.addEventListener('click', () => {
      const qId = label.getAttribute('data-q-id');
      const optIdx = parseInt(label.getAttribute('data-opt-idx'), 10);
      const q = QUIZ_QUESTIONS.find(item => item.id === qId);
      const card = document.querySelector(`#quiz-${qId}`);
      const explBox = document.querySelector(`#quiz-expl-${qId}`);

      if (answered.has(qId)) return; // Prevent changing after answer
      answered.add(qId);

      const isCorrect = optIdx === q.answer;
      if (isCorrect) {
        correctCount++;
        label.classList.add('correct-opt');
        explBox.innerHTML = `<strong>¡Correcto! 🎉</strong> ${q.explanation}`;
        explBox.style.background = 'rgba(16, 185, 129, 0.15)';
        explBox.style.color = '#6ee7b7';
      } else {
        label.classList.add('wrong-opt');
        // highlight the correct one
        const correctLabel = card.querySelector(`[data-opt-idx="${q.answer}"]`);
        if (correctLabel) correctLabel.classList.add('correct-opt');
        explBox.innerHTML = `<strong>Incorrecto.</strong> ${q.explanation}`;
        explBox.style.background = 'rgba(244, 63, 94, 0.15)';
        explBox.style.color = '#fda4af';
      }

      explBox.style.display = 'block';
      scoreBadge.textContent = `Puntuación: ${correctCount} / ${QUIZ_QUESTIONS.length}`;
    });
  });
}

/* ==========================================================================
   CHEATSHEET VIEW
   ========================================================================== */
function initCheatsheetView() {
  const grid = document.querySelector('#cheatsheet-grid');
  const searchInput = document.querySelector('#cheatsheet-search-input');
  const filterBar = document.querySelector('#cat-filter-bar');

  // Categories
  const categories = ['Todas', ...new Set(CHEATSHEET_DATA.map(c => c.category))];
  filterBar.innerHTML = categories.map((cat, idx) => `
    <button type="button" class="cat-filter-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  let activeCat = 'Todas';
  let searchTerm = '';

  function renderCheatsheet() {
    const filtered = CHEATSHEET_DATA.filter(item => {
      const matchCat = activeCat === 'Todas' || item.category === activeCat;
      const matchSearch = item.name.toLowerCase().includes(searchTerm) ||
                          item.description.toLowerCase().includes(searchTerm) ||
                          item.syntax.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    grid.innerHTML = filtered.map(item => `
      <div class="cheat-card">
        <div class="cheat-header">
          <span class="cheat-name">${item.name}</span>
          <span class="cheat-cat-badge">${item.category}</span>
        </div>
        <div class="cheat-syntax"><code>${item.syntax}</code></div>
        <div class="cheat-desc">${item.description}</div>
        <div class="cheat-example">
          <span>Ej: <code>${item.example}</code></span>
          <span style="color: var(--emerald-primary);">${item.output}</span>
        </div>
        <div class="cheat-actions">
          <button type="button" class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;" data-sql="${encodeURIComponent(item.sqlExample)}">⚡ Probar en Studio</button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('click', () => {
        const sql = decodeURIComponent(btn.getAttribute('data-sql'));
        openInSQLStudio(sql);
      });
    });
  }

  filterBar.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-cat');
      renderCheatsheet();
    });
  });

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    renderCheatsheet();
  });

  renderCheatsheet();
}

/* ==========================================================================
   SCHEMA VIEW
   ========================================================================== */
function initSchemaView() {
  const schemaTbody = document.querySelector('#schema-columns-tbody');
  const employeesTbody = document.querySelector('#employees-data-tbody');

  schemaTbody.innerHTML = EMPLOYEES_SCHEMA.map(col => `
    <tr>
      <td><strong style="color: var(--cyan-primary);">${col.name}</strong> ${col.pk ? '<span class="diff-facil" style="font-size:0.65rem;">PK</span>' : ''}</td>
      <td><code>${col.type}</code></td>
      <td>${col.nullable}</td>
      <td style="color: var(--text-muted);">${col.desc}</td>
    </tr>
  `).join('');

  employeesTbody.innerHTML = EMPLOYEES_TABLE.slice(0, 10).map(emp => `
    <tr>
      <td>${emp.employee_id}</td>
      <td>${emp.first_name}</td>
      <td>${emp.last_name}</td>
      <td>${emp.email}</td>
      <td>${emp.hire_date}</td>
      <td><code>${emp.job_id}</code></td>
      <td>$${emp.salary.toLocaleString()}</td>
      <td>${emp.commission_pct !== null ? emp.commission_pct : '<span class="null-pill">null</span>'}</td>
      <td>${emp.department_id || '<span class="null-pill">null</span>'}</td>
    </tr>
  `).join('');
}
