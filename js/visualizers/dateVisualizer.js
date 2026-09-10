/**
 * Date Machine and Calendar Visualizer
 * Visualizes ROUND/TRUNC of dates (the 16th day and July 1st rules), date arithmetic, and MONTHS_BETWEEN.
 */

import {
  parseDate,
  TO_CHAR_DATE,
  ROUND_DATE,
  TRUNC_DATE,
  MONTHS_BETWEEN,
  ADD_MONTHS,
  NEXT_DAY,
  LAST_DAY,
  MONTH_NAMES
} from '../engine/functions.js';

export function renderDateVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3>📅 Máquina del Tiempo de Fechas Oracle (Date Machine)</h3>
          <p class="viz-desc">Explora la regla crítica del día 16 para ROUND(date, 'MONTH') y del 1 de Julio para ROUND(date, 'YEAR'), más aritmética de días y horas.</p>
        </div>
        <div class="viz-badge">ROUND / TRUNC / MONTHS_BETWEEN</div>
      </div>

      <!-- Presets & Date Input -->
      <div class="viz-controls-grid">
        <div class="control-group">
          <label for="date-input">Fecha Base de Análisis:</label>
          <input type="date" id="date-input" class="modern-input" value="2003-07-25" />
          <div class="preset-links">
            <span>Preajustes del PDF:</span>
            <button type="button" class="btn-preset" data-date="2003-07-25">25-JUL-03 (Pág. 21)</button>
            <button type="button" class="btn-preset" data-date="1995-09-01">01-SEP-95 (Pág. 20)</button>
            <button type="button" class="btn-preset" data-date="1987-06-17">17-JUN-87 (King)</button>
          </div>
        </div>

        <div class="control-group">
          <label for="date-unit-select">Unidad de Redondeo / Truncado:</label>
          <select id="date-unit-select" class="modern-select">
            <option value="MONTH">MONTH (Punto de corte: Día 16)</option>
            <option value="YEAR">YEAR (Punto de corte: 1 de Julio)</option>
          </select>
        </div>
      </div>

      <!-- Comparison of ROUND vs TRUNC for Dates -->
      <div class="num-compare-grid">
        <div class="compare-card card-round">
          <div class="compare-badge">ROUND(date, '<span class="curr-unit">MONTH</span>')</div>
          <div class="compare-val" id="res-date-round">01-AUG-03</div>
          <div class="compare-desc" id="desc-date-round"></div>
        </div>

        <div class="compare-card card-trunc">
          <div class="compare-badge">TRUNC(date, '<span class="curr-unit">MONTH</span>')</div>
          <div class="compare-val" id="res-date-trunc">01-JUL-03</div>
          <div class="compare-desc" id="desc-date-trunc"></div>
        </div>
      </div>

      <!-- Visual Threshold Rule Display -->
      <div class="threshold-visual-box" id="threshold-display"></div>

      <!-- Specialized Date Operations Bar -->
      <div class="date-ops-section">
        <h4>⚡ Funciones de Calendario Relacionales</h4>
        <div class="ops-grid">
          <div class="op-card">
            <div class="op-name">LAST_DAY(date)</div>
            <div class="op-val" id="res-last-day">31-JUL-03</div>
            <div class="op-sub">Fin del mes actual</div>
          </div>
          <div class="op-card">
            <div class="op-name">NEXT_DAY(date, 'FRIDAY')</div>
            <div class="op-val" id="res-next-day">01-AUG-03</div>
            <div class="op-sub">Próximo viernes</div>
          </div>
          <div class="op-card">
            <div class="op-name">ADD_MONTHS(date, 6)</div>
            <div class="op-val" id="res-add-months">25-JAN-04</div>
            <div class="op-sub">+6 meses exactos</div>
          </div>
          <div class="op-card">
            <div class="op-name">date + 30 (Días)</div>
            <div class="op-val" id="res-add-days">24-AUG-03</div>
            <div class="op-sub">Aritmética de días (+30)</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const dateInput = container.querySelector('#date-input');
  const unitSelect = container.querySelector('#date-unit-select');
  const resRound = container.querySelector('#res-date-round');
  const resTrunc = container.querySelector('#res-date-trunc');
  const descRound = container.querySelector('#desc-date-round');
  const descTrunc = container.querySelector('#desc-date-trunc');
  const thresholdBox = container.querySelector('#threshold-display');
  const currUnitLabels = container.querySelectorAll('.curr-unit');

  const resLastDay = container.querySelector('#res-last-day');
  const resNextDay = container.querySelector('#res-next-day');
  const resAddMonths = container.querySelector('#res-add-months');
  const resAddDays = container.querySelector('#res-add-days');

  function updateDateViz() {
    const rawVal = dateInput.value;
    if (!rawVal) return;
    const dateObj = parseDate(rawVal);
    if (!dateObj) return;

    const unit = unitSelect.value;
    currUnitLabels.forEach(el => el.textContent = unit);

    const rounded = ROUND_DATE(dateObj, unit);
    const truncated = TRUNC_DATE(dateObj, unit);

    resRound.textContent = TO_CHAR_DATE(rounded, 'DD-MON-RR');
    resTrunc.textContent = TO_CHAR_DATE(truncated, 'DD-MON-RR');

    const day = dateObj.getDate();
    const month = dateObj.getMonth(); // 0-11
    const monthName = MONTH_NAMES[month];

    if (unit === 'MONTH') {
      const isPast16 = day >= 16;
      descRound.textContent = isPast16
        ? `Día ${day} ≥ 16: Redondea hacia arriba al día 1 del mes siguiente (${TO_CHAR_DATE(rounded, 'MON-YYYY')}).`
        : `Día ${day} < 16: Redondea hacia abajo al día 1 del mes actual (${TO_CHAR_DATE(rounded, 'MON-YYYY')}).`;
      descTrunc.textContent = `Descarta los días transcurridos y regresa siempre al 1 de ${monthName}.`;

      thresholdBox.innerHTML = `
        <div class="threshold-track">
          <div class="track-segment seg-down ${!isPast16 ? 'active' : ''}">
            Días 1 a 15 ➔ 1 de ${monthName}
          </div>
          <div class="track-divider">
            <span class="divider-line"></span>
            <span class="divider-badge">Día 16 (Corte)</span>
          </div>
          <div class="track-segment seg-up ${isPast16 ? 'active' : ''}">
            Días 16 a 31 ➔ 1 del Mes Siguiente
          </div>
        </div>
        <div class="threshold-status">
          Fecha seleccionada: <strong>${TO_CHAR_DATE(dateObj, 'fmDD Month YYYY')}</strong>. Está en el tramo: 
          <span class="badge-tag ${isPast16 ? 'tag-up' : 'tag-down'}">${isPast16 ? 'Día ≥ 16 (Siguiente Mes)' : 'Día < 16 (Mes Actual)'}</span>
        </div>
      `;
    } else {
      // YEAR
      const isPastJuly = month >= 6; // July is 6
      descRound.textContent = isPastJuly
        ? `Mes de ${monthName} (≥ Julio): Redondea hacia arriba al 1 de Enero del año siguiente.`
        : `Mes de ${monthName} (< Julio): Redondea hacia abajo al 1 de Enero del año actual.`;
      descTrunc.textContent = `Descarta los meses transcurridos y regresa siempre al 1 de Enero del año actual.`;

      thresholdBox.innerHTML = `
        <div class="threshold-track">
          <div class="track-segment seg-down ${!isPastJuly ? 'active' : ''}">
            Enero a Junio ➔ 1 de Enero de ${dateObj.getFullYear()}
          </div>
          <div class="track-divider">
            <span class="divider-line"></span>
            <span class="divider-badge">1 de Julio (Corte)</span>
          </div>
          <div class="track-segment seg-up ${isPastJuly ? 'active' : ''}">
            Julio a Diciembre ➔ 1 de Enero de ${dateObj.getFullYear() + 1}
          </div>
        </div>
        <div class="threshold-status">
          Mes seleccionado: <strong>${monthName}</strong>. Está en el tramo: 
          <span class="badge-tag ${isPastJuly ? 'tag-up' : 'tag-down'}">${isPastJuly ? '≥ Julio (Año Siguiente)' : '< Julio (Año Actual)'}</span>
        </div>
      `;
    }

    // Specialized ops
    resLastDay.textContent = TO_CHAR_DATE(LAST_DAY(dateObj), 'DD-MON-RR');
    resNextDay.textContent = TO_CHAR_DATE(NEXT_DAY(dateObj, 'FRIDAY'), 'DD-MON-RR');
    resAddMonths.textContent = TO_CHAR_DATE(ADD_MONTHS(dateObj, 6), 'DD-MON-RR');

    const plus30 = new Date(dateObj.getTime() + 30 * 24 * 60 * 60 * 1000);
    resAddDays.textContent = TO_CHAR_DATE(plus30, 'DD-MON-RR');
  }

  dateInput.addEventListener('input', updateDateViz);
  unitSelect.addEventListener('change', updateDateViz);

  container.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      dateInput.value = btn.getAttribute('data-date');
      updateDateViz();
    });
  });

  // Initial
  updateDateViz();
}
