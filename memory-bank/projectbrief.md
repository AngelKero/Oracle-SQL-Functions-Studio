# Project Brief: Oracle SQL Single-Row Functions Interactive Learning Platform

## Objetivo
Desarrollar una herramienta web interactiva, educativa y de estética premium de última generación que permita a estudiantes y desarrolladores dominar de forma visual, práctica y exhaustiva todos los conceptos explicados en el documento `usingsingle-rowfunctionstocustomizeoutput-170503103323.pdf` (Oracle Database SQL: Using Single-Row Functions to Customize Output).

## Alcance del Contenido del PDF (51 Páginas)
1. **Fundamentos**: Diferencias entre funciones de fila única (*Single-row*) y funciones de grupos de filas (*Multiple-row*), características, argumentos, tipos de datos y retorno.
2. **Funciones de Carácter**:
   - Manipulación de mayúsculas/minúsculas: `LOWER`, `UPPER`, `INITCAP`.
   - Manipulación de caracteres: `CONCAT`, `SUBSTR` (con índices positivos y negativos), `LENGTH`, `INSTR` (búsqueda de ocurrencias), `LPAD`, `RPAD`, `TRIM` (especificando prefijos/sufijos), `REPLACE`.
3. **Funciones Numéricas**: `ROUND`, `TRUNC` (decimales positivos, 0 y negativos), `MOD` (residuo).
4. **Funciones de Fecha y Aritmética de Fechas**:
   - Formato interno de Oracle (siglo, año, mes, día, hora, minutos, segundos) y formato por defecto `DD-MON-RR`.
   - Función `SYSDATE`.
   - Aritmética: suma/resta de días, resta entre fechas (días transcurridos), fracciones de día (`/24`).
   - Funciones especializadas: `MONTHS_BETWEEN`, `ADD_MONTHS`, `NEXT_DAY`, `LAST_DAY`, `ROUND` y `TRUNC` de fechas a nivel `MONTH` y `YEAR`.
5. **Funciones de Conversión y Formateo**:
   - Conversión implícita vs. explícita.
   - `TO_CHAR` con fechas: modelos de formato (`YYYY`, `YEAR`, `MM`, `MONTH`, `MON`, `DY`, `DAY`, `DD`, `HH24:MI:SS AM`, sufijo `"de"`, elemento `fm` supresor de espacios).
   - `TO_CHAR` con números: elementos de formato (`9`, `0`, `$`, `L`, `.`, `,`, `MI`, `PR`, `EEEE`, `V`, `B`).
   - `TO_NUMBER` y `TO_DATE`.
   - Formato de siglo `RR` vs `YY`: matriz de decisión de siglos según el año actual (0-49 vs 50-99).
6. **Anidamiento de Funciones (Nesting)**: Evaluación desde el nivel más interno al más externo.
7. **Funciones Generales para Manejo de Nulos**:
   - `NVL(expr1, expr2)`
   - `NVL2(expr1, expr2, expr3)`
   - `NULLIF(expr1, expr2)`
   - `COALESCE(expr1, expr2, ..., exprn)`
8. **Expresiones Condicionales**:
   - Expresión `CASE` (simple y con búsqueda).
   - Función `DECODE` (lógica de bifurcación condicional y cálculo de tramos con `TRUNC(salary/2000)`).

## Requisitos Clave
- **Simulador Interactivo de Funciones**: Un laboratorio/playground interactivo donde se puede probar cada función con parámetros en vivo, desglosando la ejecución paso a paso (visualizando cómo se cortan caracteres, cómo se redondea en la recta numérica, cómo se calcula la matriz de siglos RR, etc.).
- **Motor SQL Simulado en Memoria**: Con la tabla clásica `EMPLOYEES` (con columnas reales: `employee_id`, `first_name`, `last_name`, `job_id`, `salary`, `commission_pct`, `hire_date`, `manager_id`, `department_id`) y tabla `DUAL`, permitiendo ejecutar consultas SQL reales del PDF y consultas personalizadas.
- **Visualizador Paso a Paso ("Visual Explainer")**: Para funciones complejas como `SUBSTR`, `INSTR`, `LPAD/RPAD`, `ROUND/TRUNC` de fechas, `RR Date Format`, y `DECODE`.
- **Modo Guía de Estudio / Módulos Interactivos**: Organización por módulos temáticos con explicaciones claras, diagramas visuales, sintaxis, ejemplos del PDF y ejercicios prácticos de autoevaluación.
- **Modo Retos y Quizzes (Gamificación & Práctica)**: Desafíos guiados (como los de Practice 3 del PDF) con retroalimentación inmediata, pistas y soluciones comentadas.
- **Hoja de Referencia Rápida (Cheatsheet)**: Buscador instantáneo de funciones con sintaxis, parámetros y ejemplos interactivos.
