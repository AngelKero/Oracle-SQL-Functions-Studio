# Product Context: Oracle SQL Functions Studio

## ¿Por qué existe este proyecto?
El aprendizaje de funciones en bases de datos relacionales (específicamente en Oracle SQL) suele ser complejo cuando solo se cuenta con diapositivas teóricas estáticas o documentación formal en PDF. Los estudiantes y desarrolladores suelen tropezar en:
1. **Manipulación de Cadenas**: Confusión recurrente con índices 1-based, índices negativos en `SUBSTR`, desplazamientos en `INSTR`, y recorte o relleno con `LPAD`/`RPAD`/`TRIM`.
2. **Aritmética y Redondeo de Fechas**: Cómo se redondea un día a mitad de mes (`ROUND(hire_date, 'MONTH')`) o año, y el cálculo fraccionario de horas y días.
3. **Lógica del Formato de Año `RR` vs `YY`**: Matriz de decisión de siglos según el año del sistema y el año especificado.
4. **Manejo de Nulos (`NULL`)**: Diferencias sutiles entre `NVL`, `NVL2`, `NULLIF` y `COALESCE`.
5. **Expresiones Lógicas en SQL**: Equivalencias y diferencias entre `CASE` y `DECODE`.
6. **Agregación y Agrupamiento (`GROUP BY` & `HAVING`)**:
   - Cómo las filas individuales se compactan en buckets o grupos.
   - El tratamiento especial de `NULL` en funciones de grupo (ignorado por `AVG`, `SUM`, `COUNT(col)`, pero preservado con `NVL`).
   - La distinción crítica entre `WHERE` (filtra filas antes de agrupar) y `HAVING` (filtra grupos después de agrupar).
   - Errores clásicos de certificación Oracle:
     - `ORA-00937`: Columna individual en `SELECT` que no está en la cláusula `GROUP BY`.
     - `ORA-00934`: Intentar usar una función de grupo dentro de la cláusula `WHERE`.

## Experiencia de Usuario Diseñada
- **Jerarquía Didáctica de 3 Niveles**:
  - Selector de Clase en la parte superior del visor curricular:
    - **Clase 1: Funciones Single-Row** (5 Temas, 8 Módulos).
    - **Clase 2: Funciones de Grupo y Agregación** (5 Temas, 10 Módulos).
  - Cada clase agrupa temas lógicos y módulos con páginas de referencia del PDF, diagramas interactivos y consultas de prueba directa.
- **Interactiva y Visual**: Siete herramientas dedicadas en el Laboratorio Visual con sliders, dropdowns, rectas numéricas, diagramas de flujo y partición en tarjetas bucket que responden en milisegundos.
- **Simulación Real de Errores Oracle**:
  - Botones interactivos para provocar `ORA-00937` y `ORA-00934` en vivo en el visualizador con explicaciones claras de por qué ocurre el error y cómo resolverlo.
- **SQL Studio Integrado**:
  - Permite ejecutar cualquier consulta del PDF o inventada por el usuario con un editor rápido, historial de presets canónicos organizados por Clase 1 y Clase 2, y renderizado en tabla interactiva con conteo de filas y tiempo de ejecución.
- **Laboratorio de Evaluación y Prácticas**:
  - Retos de código guiados con pistas y solución para Práctica 3 y Práctica 4.
  - Cuestionario de 20 preguntas de autoevaluación con calificación instantánea y explicación de cada respuesta.
- **Cheatsheet y Glosario Exhaustivo**:
  - Buscador en tiempo real de todas las funciones Single-Row y Group Functions.
