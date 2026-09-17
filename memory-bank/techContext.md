# Tech Context: Oracle SQL Functions Studio

## Stack Tecnológico
- **Frontend Core**:
  - HTML5 semántico con roles accesibles y estructura moderna.
  - Vanilla CSS3 con diseño basado en variables CSS (`:root`), flexbox, grid, glassmorphism (`backdrop-filter`) y paleta de colores curada (azules, cianes, esmeraldas y violetas neón).
  - JavaScript ES6+ modular (`import`/`export`), sin dependencias pesadas de terceros (React, Angular o bundlers) para máxima portabilidad, ligereza y carga instantánea.
- **Visualizadores Interactivos**:
  - Manipulación directa del DOM con renderizado reactivo y eficiente.
  - Visualizador de grupos y buckets con tarjetas interactivas de departamentos, chips de empleados, cálculo dinámico de estadísticas y simulador de errores Oracle.
  - Visualizadores para slicing de cadenas, recta numérica de redondeo, reloj de fechas, matriz RR y grafos de flujo condicionales.
- **Entorno de Pruebas Automatizadas (Node.js)**:
  - `test/test_sql_engine.js`: 17 pruebas que validan todas las consultas canónicas de la Clase 1 (Single-Row Functions).
  - `test/test_group_engine.js`: 15 pruebas que validan todas las consultas canónicas de la Clase 2 (Group Functions, agregaciones, `GROUP BY`, `HAVING`, anidamiento y errores `ORA-00937`, `ORA-00934`).
  - `test/test_functions.js`: Pruebas unitarias de las funciones puras de fecha, cadena y número.
  - `test/test_markdown.js`: Verificación de consistencia del parser Markdown para todos los 18 módulos curriculares (35 secciones).
- **Servidor y Ejecución**:
  - Cualquier servidor estático HTTP (e.g. `python3 -m http.server 8088` o GitHub Pages).
  - Ejecutable 100% en cliente sin requerir instalación de servidor Oracle ni base de datos local.
- **Dataset Canónico HR**:
  - Tabla `EMPLOYEES` con los 22 registros oficiales del esquema HR de Oracle (con valores salariales, departamentos, fechas de contratación y comisiones exactas del PDF).
  - Tabla `DUAL` estándar.
