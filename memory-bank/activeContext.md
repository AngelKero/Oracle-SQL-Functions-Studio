# Active Context: Oracle SQL Functions Studio

## Estado Actual
- **Fase**: Incorporación Completa de la Clase 2 (Group Functions & Aggregation) y Estructura Jerárquica (Clases → Temas → Módulos) - **COMPLETADA Y VALIDADA AL 100%**.
- **Logros de la Fase**:
  1. **Motor SQL (`sqlEngine.js`)**:
     - Soporte completo para `GROUP BY` con múltiples columnas y agregación implícita de grupo único.
     - Funciones de agregación: `AVG`, `SUM`, `MIN`, `MAX`, `COUNT(*)`, `COUNT(col)`, `COUNT(DISTINCT col)`, `STDDEV`, `VARIANCE`.
     - Soporte para agregaciones anidadas (`MAX(AVG(salary))` según pág. 23 del PDF).
     - Cláusula `HAVING` con filtrado dinámico de agregados y condiciones combinadas.
     - Operador `NOT LIKE` en cláusula `WHERE`.
     - Diagnóstico exacto y emulación de errores Oracle:
       - `ORA-00937: not a single-group group function` (cuando se seleccionan columnas individuales no incluidas en `GROUP BY`).
       - `ORA-00934: group function is not allowed here` (cuando se usa una función de grupo en `WHERE`).
  2. **Estructura Curricular Jerárquica (`curriculum.js`)**:
     - Organización en 2 Clases principales:
       - **Clase 1: Funciones de Fila Única (Single-Row Functions)**: 5 Temas, 8 Módulos (Págs. 1-51).
       - **Clase 2: Funciones de Grupo y Agregación (Group Functions)**: 5 Temas, 10 Módulos (Págs. 1-25).
     - Cobertura exhaustiva de las 25 diapositivas del PDF de funciones de grupo.
  3. **Visualizador de Grupo (`groupVisualizer.js`)**:
     - 7ª herramienta interactiva en el Laboratorio Visual.
     - Flujo de 4 pasos (WHERE -> GROUP BY Buckets -> Agregaciones -> Restricción HAVING).
     - Generador de consultas SQL sincronizado en tiempo real con resaltado de sintaxis y métricas de filas/grupos.
     - Simulador interactivo de errores `ORA-00937` y `ORA-00934` con explicaciones didácticas y botón de restablecimiento.
  4. **Prácticas & Quizzes (`exercises.js`)**:
     - Retos guiados de Práctica 4 añadidos con botones de ejecución directa y pistas.
     - Cuestionarios de evaluación ampliados a 20 preguntas con selector de filtro por Clase.
  5. **Hoja de Referencia (`cheatsheet.js`)**:
     - Nueva categoría de Funciones de Grupo y Cláusulas Agregadas.
  6. **UI & Routing (`index.html`, `css/sql-studio.css`, `js/app.js`)**:
     - Selector de clase estilo segmented pill bar en la vista curricular.
     - Presets en SQL Studio agrupados en `<optgroup>` para Clase 1 y Clase 2.
     - Corrección del enrutamiento por hash para preservar URLs profundas (`#viz-group`, `#mod-13`, etc.).
  7. **Suite de Pruebas**:
     - `test_sql_engine.js`: 17/17 pruebas aprobadas (0 regresiones).
     - `test_group_engine.js`: 15/15 pruebas aprobadas (100% de consultas del PDF y diagnósticos de error).
     - `test_functions.js` y `test_markdown.js`: 100% aprobadas.

## Siguientes Pasos
- Generar el artefacto de cierre y resumen del trabajo (`walkthrough.md`).
- Presentar la solución terminada al usuario.
