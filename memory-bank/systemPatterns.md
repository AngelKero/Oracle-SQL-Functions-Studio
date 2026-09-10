# System Patterns: Oracle SQL Single-Row Functions Learning Platform

## Arquitectura de la Aplicación
La aplicación se diseña como una Single-Page Application (SPA) moderna, de alto rendimiento y autocontenida o estructurada en módulos limpios:
- **Core Engine (In-Browser SQL Simulator & Evaluator)**:
  - Base de datos en memoria (`EMPLOYEES` y `DUAL`) con soporte para tipos `VARCHAR2`, `NUMBER`, `DATE`.
  - Intérprete y parser de funciones de fila única que emula fielmente la semántica de Oracle:
    - `LOWER`, `UPPER`, `INITCAP`
    - `CONCAT`, `SUBSTR` (positivo, negativo, longitud opcional), `LENGTH`, `INSTR`
    - `LPAD`, `RPAD`, `TRIM`, `REPLACE`
    - `ROUND(num, n)`, `TRUNC(num, n)`, `MOD(m, n)`
    - `SYSDATE`, `MONTHS_BETWEEN`, `ADD_MONTHS`, `NEXT_DAY`, `LAST_DAY`, `ROUND(date)`, `TRUNC(date)`
    - `TO_CHAR(date, fmt)`, `TO_CHAR(num, fmt)`, `TO_NUMBER`, `TO_DATE`
    - Formato `RR` vs `YY`
    - `NVL`, `NVL2`, `NULLIF`, `COALESCE`
    - `CASE` y `DECODE`
    - Anidamiento de funciones arbitrario (`UPPER(CONCAT(SUBSTR(...)))`)
- **Visualizer Engine**:
  - Renderizador visual interactivo de slicing de cadenas (índices 1-based, índices negativos, caracteres marcados).
  - Visualizador de regla numérica para `ROUND` y `TRUNC` con precisión positiva/cero/negativa.
  - Simulador de matriz del siglo `RR` (con gráfico dinámico del año actual y año especificado).
  - Diagrama de árbol de evaluación para funciones anidadas.
  - Diagrama de flujo de bifurcación para `NVL`, `NVL2`, `COALESCE`, `CASE` y `DECODE`.
- **Modo Prácticas & Retos**:
  - Evaluador de ejercicios interactivo: compara resultados generados por el usuario contra la solución esperada.
  - Sistema de pistas progresivas y explicación detallada de cada paso.
- **Diseño Visual & UI**:
  - Tema oscuro/luz refinado con estética de terminal de datos moderna (glassmorphism sutil, acentos cian/violeta/esmeralda, tipografía tipográfica limpia JetBrains Mono / Inter).
  - Microinteracciones ágiles y animaciones fluidas a 60 FPS sin jank.
