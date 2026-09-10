/**
 * RR vs YY Century Matrix Visualizer
 * Directly reproduces and animates the 2x2 decision grid from PDF Slides 35-36.
 */

import { resolveRRYear } from '../engine/functions.js';
import { getIcon } from '../data/icons.js';

export function renderRRFormatVisualizer(container) {
  container.innerHTML = `
    <div class="visualizer-card">
      <div class="viz-header">
        <div>
          <h3 style="display: flex; align-items: center;"><span class="heading-icon">${getIcon('refreshCw', 'svg-icon', 22)}</span> Matriz de Decisión del Siglo: Formato RR vs. YY</h3>
          <p class="viz-desc">Resuelve el enigma del cambio de milenio de Oracle: cómo interpreta fechas de 2 dígitos según el año actual del sistema.</p>
        </div>
        <div class="viz-badge">Diapositivas 35-36</div>
      </div>

      <div class="viz-controls-grid">
        <div class="control-group">
          <label for="rr-curr-year">Año Actual del Sistema (Current Year): <span id="lbl-curr-year" class="badge-param">1995</span></label>
          <input type="range" id="rr-curr-year" min="1950" max="2050" value="1995" class="modern-slider" />
          <div class="preset-links">
            <span>Ejemplos del PDF:</span>
            <button type="button" class="btn-preset" data-year="1995">1995 (Rango 50-99)</button>
            <button type="button" class="btn-preset" data-year="2001">2001 (Rango 0-49)</button>
            <button type="button" class="btn-preset" data-year="2026">2026 (Año Actual)</button>
          </div>
        </div>

        <div class="control-group">
          <label for="rr-spec-year">Año de 2 Dígitos Introducido: <span id="lbl-spec-year" class="badge-param">95</span></label>
          <input type="range" id="rr-spec-year" min="0" max="99" value="95" class="modern-slider" />
          <div class="preset-links">
            <span>Casos Clave:</span>
            <button type="button" class="btn-preset-spec" data-spec="95">'95'</button>
            <button type="button" class="btn-preset-spec" data-spec="17">'17'</button>
            <button type="button" class="btn-preset-spec" data-spec="88">'88'</button>
            <button type="button" class="btn-preset-spec" data-spec="02">'02'</button>
          </div>
        </div>
      </div>

      <!-- Live Comparison Result -->
      <div class="num-compare-grid">
        <div class="compare-card card-rr">
          <div class="compare-badge">Formato RR (Oracle Smart Century)</div>
          <div class="compare-val" id="res-rr-year">1995</div>
          <div class="compare-desc" id="desc-rr-year">Calculado con la matriz 0-49 vs 50-99</div>
        </div>

        <div class="compare-card card-yy">
          <div class="compare-badge">Formato Tradicional YY (Mismo Siglo)</div>
          <div class="compare-val" id="res-yy-year">1995</div>
          <div class="compare-desc" id="desc-yy-year">Fuerza el siglo del año actual sin lógica</div>
        </div>
      </div>

      <!-- 2x2 Matrix from Slide 35 -->
      <div class="matrix-section">
        <div class="matrix-title">Matriz Oficial de Decisión RR (Diapositiva 35)</div>
        <div class="matrix-table-wrap">
          <table class="rr-table">
            <thead>
              <tr>
                <th rowspan="2" class="th-corner">Año Actual (Sistema)</th>
                <th colspan="2" class="th-group">Año Especificado en la Consulta</th>
              </tr>
              <tr>
                <th class="th-sub">0 - 49</th>
                <th class="th-sub">50 - 99</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="td-row-hdr"><strong>0 - 49</strong><br><small>(Ej. 2001, 2026)</small></td>
                <td id="cell-0-0" class="matrix-cell">
                  <div class="cell-century">Siglo Actual</div>
                  <div class="cell-example">Ej: 20xx</div>
                </td>
                <td id="cell-0-1" class="matrix-cell">
                  <div class="cell-century">Siglo Anterior</div>
                  <div class="cell-example">Ej: 19xx</div>
                </td>
              </tr>
              <tr>
                <td class="td-row-hdr"><strong>50 - 99</strong><br><small>(Ej. 1995, 1988)</small></td>
                <td id="cell-1-0" class="matrix-cell">
                  <div class="cell-century">Siglo Siguiente</div>
                  <div class="cell-example">Ej: 20xx</div>
                </td>
                <td id="cell-1-1" class="matrix-cell">
                  <div class="cell-century">Siglo Actual</div>
                  <div class="cell-example">Ej: 19xx</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Dynamic Detailed Explanation -->
      <div id="rr-detailed-explanation" class="viz-explanation-box"></div>
    </div>
  `;

  const currSlider = container.querySelector('#rr-curr-year');
  const specSlider = container.querySelector('#rr-spec-year');
  const lblCurr = container.querySelector('#lbl-curr-year');
  const lblSpec = container.querySelector('#lbl-spec-year');

  const resRR = container.querySelector('#res-rr-year');
  const resYY = container.querySelector('#res-yy-year');
  const descRR = container.querySelector('#desc-rr-year');
  const descYY = container.querySelector('#desc-yy-year');
  const explanationBox = container.querySelector('#rr-detailed-explanation');

  const cells = {
    '0-0': container.querySelector('#cell-0-0'),
    '0-1': container.querySelector('#cell-0-1'),
    '1-0': container.querySelector('#cell-1-0'),
    '1-1': container.querySelector('#cell-1-1')
  };

  function updateRRViz() {
    const currentYear = parseInt(currSlider.value, 10);
    const specYear = parseInt(specSlider.value, 10);

    lblCurr.textContent = currentYear;
    lblSpec.textContent = String(specYear).padStart(2, '0');

    const currLastTwo = currentYear % 100;
    const isCurrLow = currLastTwo <= 49;
    const isSpecLow = specYear <= 49;

    const rowIdx = isCurrLow ? 0 : 1;
    const colIdx = isSpecLow ? 0 : 1;
    const activeKey = `${rowIdx}-${colIdx}`;

    // Clear active highlight
    Object.values(cells).forEach(c => c.classList.remove('active-cell'));
    cells[activeKey].classList.add('active-cell');

    // Calculate RR full year
    const fullRR = resolveRRYear(specYear, currentYear);

    // Calculate YY full year (always same century)
    const currentCentury = Math.floor(currentYear / 100) * 100;
    const fullYY = currentCentury + specYear;

    resRR.textContent = fullRR;
    resYY.textContent = fullYY;

    let centuryRuleText = '';
    if (isCurrLow && isSpecLow) centuryRuleText = 'Mismo siglo (Siglo Actual)';
    if (isCurrLow && !isSpecLow) centuryRuleText = 'Siglo Anterior (-100 años)';
    if (!isCurrLow && isSpecLow) centuryRuleText = 'Siglo Siguiente (+100 años)';
    if (!isCurrLow && !isSpecLow) centuryRuleText = 'Mismo siglo (Siglo Actual)';

    descRR.textContent = `Regla activada: ${centuryRuleText} -> ${fullRR}`;
    descYY.textContent = `Sin ajuste: Siglo actual ${currentCentury} + ${specYear} = ${fullYY}`;

    explanationBox.innerHTML = `
      <strong>Análisis del Cuadrante Activado:</strong><br>
      • <strong>Año actual (${currentYear}):</strong> Los 2 últimos dígitos son <code>${currLastTwo}</code> (${isCurrLow ? 'rango 0-49' : 'rango 50-99'}).<br>
      • <strong>Año introducido:</strong> <code>'${String(specYear).padStart(2, '0')}'</code> (${isSpecLow ? 'rango 0-49' : 'rango 50-99'}).<br>
      • <strong>Decisión Oracle RR:</strong> Asigna el <strong>${centuryRuleText.toUpperCase()}</strong>.<br>
      • ${fullRR !== fullYY 
        ? `<span class="alert-diff"><span class="heading-icon" style="color: var(--amber-primary);">${getIcon('alertTriangle', 'svg-icon', 16)}</span> <strong>Diferencia Crítica con YY:</strong> Con formato <code>RR</code> obtienes <strong>${fullRR}</strong>, mientras que el formato obsoleto <code>YY</code> daría erróneamente <strong>${fullYY}</strong>.</span>` 
        : `<span>Ambos formatos coinciden en el año <strong>${fullRR}</strong> en este cuadrante.</span>`}
    `;
  }

  currSlider.addEventListener('input', updateRRViz);
  specSlider.addEventListener('input', updateRRViz);

  container.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      currSlider.value = btn.getAttribute('data-year');
      updateRRViz();
    });
  });

  container.querySelectorAll('.btn-preset-spec').forEach(btn => {
    btn.addEventListener('click', () => {
      specSlider.value = btn.getAttribute('data-spec');
      updateRRViz();
    });
  });

  // Initial
  updateRRViz();
}
