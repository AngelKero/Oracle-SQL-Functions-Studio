# Project Brief: Oracle SQL Functions Studio (Single-Row & Group Functions)

## Objetivo
Desarrollar una plataforma web interactiva, educativa y de estética premium de última generación que permita a estudiantes y desarrolladores dominar de forma visual, práctica y exhaustiva todos los conceptos de funciones SQL de Oracle contenidos en dos lecciones fundamentales:
1. **Clase 1**: `usingsingle-rowfunctionstocustomizeoutput-170503103323.pdf` (*Using Single-Row Functions to Customize Output*, 51 páginas).
2. **Clase 2**: `reportingaggregateddatausingthegroupfunctions-170503103401.pdf` (*Reporting Aggregated Data Using the Group Functions*, 25 páginas).

## Jerarquía de Aprendizaje (Clases → Temas → Módulos)
La plataforma estructura el contenido en una jerarquía estricta de 3 niveles:

### Clase 1: Funciones de Fila Única (Single-Row Functions)
- **Tema 1: Fundamentos y Conceptos Clave**
  - Módulo 1: Introducción a Funciones SQL y de Fila Única (Págs. 1-7)
- **Tema 2: Funciones de Manipulación de Caracteres**
  - Módulo 2: Funciones de Caracteres: Case & Manipulation (Págs. 8-11)
- **Tema 3: Funciones Numéricas y Aritmética**
  - Módulo 3: Funciones Numéricas (Págs. 12-14)
- **Tema 4: Fechas, Aritmética y Conversiones**
  - Módulo 4: Fechas y Aritmética de Fechas (Págs. 15-22)
  - Módulo 5: Funciones de Conversión de Datos y Formato RR (Págs. 23-37)
- **Tema 5: Funciones Generales y Expresiones Condicionales**
  - Módulo 6: Anidamiento de Funciones (Nesting) (Págs. 38-39)
  - Módulo 7: Funciones Generales para Manejo de Valores Nulos (Págs. 40-46)
  - Módulo 8: Expresiones Condicionales: CASE y DECODE (Págs. 47-51)

### Clase 2: Funciones de Grupo y Agregación (Group Functions)
- **Tema 1: Fundamentos de Funciones de Grupo**
  - Módulo 9: Qué son las Funciones de Grupo y Sintaxis Básica (Págs. 1-5)
  - Módulo 10: Funciones Agregadas Básicas: AVG, SUM, MIN, MAX (Págs. 6-7)
- **Tema 2: Manejo de Nulos y Conteo Avanzado**
  - Módulo 11: La Función COUNT y Conteo de Filas vs Columnas (Págs. 8-9)
  - Módulo 12: Funciones de Grupo y Valores Nulos (NVL en Agregación) (Págs. 10-11)
- **Tema 3: Particionamiento y Creación de Grupos**
  - Módulo 13: Creación de Grupos de Datos: Cláusula GROUP BY (Págs. 12-14)
  - Módulo 14: Agrupamiento por Múltiples Columnas (Págs. 15-16)
- **Tema 4: Filtrado Avanzado de Agrupaciones**
  - Módulo 15: Restricción de Resultados de Grupo: Cláusula HAVING (Págs. 19-21)
  - Módulo 16: Combinación WHERE, GROUP BY, HAVING y ORDER BY (Págs. 22)
- **Tema 5: Anidamiento y Diagnóstico de Errores Oracle**
  - Módulo 17: Anidamiento de Funciones de Grupo (Págs. 23)
  - Módulo 18: Diagnóstico de Errores Comunes: ORA-00937 y ORA-00934 (Págs. 17-18)

## Herramientas y Modos de la Plataforma
1. **Curso Interactivo**: Selector de Clases (Pills interactivos), Sidebar dinámico agrupado por Temas y Módulos con badges numéricos, páginas del PDF, visualizadores de código, diagramas ASCII y botón "Probar en SQL Studio".
2. **Laboratorio Visual (7 Herramientas Interactivas)**:
   - *String Slicer & Indexes*: Manipulación visual de índices 1-based y negativos en `SUBSTR`, `INSTR`, `LPAD`, `RPAD`.
   - *Number Precision*: Recta numérica animada de `ROUND` vs `TRUNC` con precisión positiva, cero y negativa.
   - *Date Machine*: Aritmética de fechas en vivo con regla del día 16 y 1 de julio para redondeo mensual y anual.
   - *Matriz de Siglo RR vs YY*: Simulador de cálculo de siglo según el año actual (0-49 vs 50-99).
   - *Nulos & Flowcharts*: Diagramas de flujo interactivos para `NVL`, `NVL2`, `NULLIF`, `COALESCE`, `CASE`, `DECODE`.
   - *Pipeline de Anidamiento*: Visualizador en niveles (L1 -> L2 -> L3) de evaluación de funciones anidadas.
   - *Group Engine (GROUP BY & HAVING)*: Visualizador 3D/tarjetas de partición en "Buckets", cálculo de agregados, filtrado previo en WHERE, filtrado posterior en HAVING, y simulador de errores ORA en vivo.
3. **SQL Studio**: Consola SQL en el navegador con dataset canónico `EMPLOYEES` (22 registros del esquema HR) y tabla `DUAL`. Menú desplegable con consultas canónicas agrupadas por Clase 1 y Clase 2.
4. **Prácticas & Quizzes**:
   - Retos de código guiados para Práctica 3 (Single-Row) y Práctica 4 (Group Functions).
   - Banco de 20 preguntas de autoevaluación y certificación Oracle con selector de filtro por Clase.
5. **Cheatsheet**: Buscador instantáneo con categorización por Carácter, Número, Fecha, Conversión, Nulos/Lógica y Grupo/Agregación.
6. **Esquema BD**: Visualizador de metadatos de las tablas `EMPLOYEES` y `DUAL`.
