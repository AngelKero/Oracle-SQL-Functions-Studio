# Product Context: Oracle SQL Single-Row Functions Interactive Learning Platform

## ¿Por qué existe este proyecto?
El aprendizaje de funciones de bases de datos relacionales (específicamente en Oracle SQL) a menudo se ve obstaculizado por la lectura pasiva de diapositivas estáticas o tablas de texto abstracto. Los estudiantes suelen tropezar en:
1. **Manipulación de cadenas**: Confusión con índices 1-based, índices negativos en `SUBSTR`, desplazamientos en `INSTR`, y recorte o relleno con `LPAD`/`RPAD`/`TRIM`.
2. **Aritmética y Redondeo de Fechas**: Cómo se redondea un día a mitad de mes (`ROUND(hire_date, 'MONTH')`) o año, y el cálculo fraccionario de horas y días.
3. **La lógica del Formato de Año `RR`**: Por qué '95' en 1995 da 1995, pero '95' en 2005 da 1995 y '15' da 2015.
4. **Manejo de nulos (`NULL`)**: Diferencias sutiles entre `NVL`, `NVL2`, `NULLIF` y `COALESCE`.
5. **Expresiones lógicas en SQL**: Equivalencias y diferencias entre `CASE` y `DECODE`.

## Experiencia de Usuario Diseñada
- **Interactiva y Visual**: Cada concepto tiene un "visualizador" interactivo donde el usuario mueve sliders, introduce textos, cambia fechas y ve la transformación en tiempo real con resaltado de caracteres, índices y pasos intermedios.
- **Práctica Inmediata con Datos Reales**: El dataset de `EMPLOYEES` (Scott/HR standard de Oracle) está precargado para que cualquier consulta de las diapositivas del PDF se pueda ejecutar y comprobar al instante en una consola SQL web.
- **Navegación Intuitiva**:
  - **Módulos Teórico-Prácticos**: 8 lecciones estructuradas con teoría visual, ejemplos interactivos y notas importantes ("Gotchas").
  - **Laboratorio Visual (Visual Sandbox)**: Herramienta dedicada para experimentar con cada función con inspectores paso a paso.
  - **Terminal SQL en Vivo**: Consola interactiva con sintaxis resaltada, selector de consultas del PDF y tabla de resultados interactiva.
  - **Prácticas & Quizzes**: Preguntas interactivas de opción múltiple y retos de escritura de consultas con retroalimentación instantánea.
  - **Cheatsheet & Glosario**: Referencia interactiva filtrable por categoría.
