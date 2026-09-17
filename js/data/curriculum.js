/**
 * Oracle SQL Educational Curriculum: Hierarchical Structure
 * Clases -> Temas -> Módulos
 * 
 * Clase 1: Using Single-Row Functions to Customize Output (51 Páginas)
 * Clase 2: Reporting Aggregated Data Using the Group Functions (25 Páginas)
 */

export const CURRICULUM_CLASSES = [
  {
    id: 'clase-1',
    number: 1,
    title: 'Funciones de Fila Única (Single-Row Functions)',
    subtitle: 'Using Single-Row Functions to Customize Output',
    pdfPages: '51 Páginas (Lección 3)',
    icon: 'zap',
    description: 'Aprende a transformar valores individuales fila por fila: manipulación de texto, cálculos numéricos, aritmética de fechas, conversiones, nulos y expresiones condicionales.',
    temas: [
      {
        id: 'tema-1-1',
        number: 1,
        title: 'Fundamentos de Funciones SQL',
        summary: 'Conceptos, argumentos, retorno y diferencias entre funciones de fila única y funciones de grupo.',
        modules: [
          {
            id: 'mod-1',
            classId: 'clase-1',
            temaId: 'tema-1-1',
            number: 1,
            title: 'Fundamentos de Funciones SQL',
            subtitle: 'Single-Row vs. Multiple-Row Functions',
            pdfPages: 'Págs. 1 - 5',
            icon: 'zap',
            summary: 'Comprende el rol fundamental de las funciones en SQL, los dos grandes tipos de funciones y las características esenciales de las funciones de fila única.',
            sections: [
              {
                title: '1. ¿Qué es una Función SQL?',
                content: `
En Oracle SQL, una **función** es un programa almacenado que toma cero o más argumentos de entrada, realiza un cálculo o manipulación predefinida y devuelve un resultado.

- **Entrada (Input):** Argumentos (\`arg 1\`, \`arg 2\`, literales, expresiones o nombres de columnas).
- **Proceso (Function):** Realiza operaciones matemáticas, de texto, fechas o conversión de tipos de datos.
- **Salida (Output):** Un valor resultante.
                `,
                diagram: `
[ Argumento 1, Argumento 2 ] ──> ┌────────────────────────┐ ──> [ Valor Resultante ]
                                  │  FUNCIÓN DE FILA ÚNICA │
[   Fila de la Tabla     ] ──> └────────────────────────┘
                `
              },
              {
                title: '2. Dos Grandes Tipos de Funciones SQL',
                content: `
Oracle clasifica las funciones en dos categorías fundamentales:

1. **Funciones de Fila Única (Single-Row Functions):**
   - Operan sobre **cada fila individual** devuelta por la consulta.
   - Devuelven **exactamente un resultado por cada fila**.
   - Pueden modificar el tipo de dato devuelto.
   - Pueden anidarse a cualquier nivel de profundidad.
   - Aceptan columnas, expresiones o valores constantes como argumentos.

2. **Funciones de Múltiples Filas (Multiple-Row / Group Functions):**
   - Toman un conjunto de filas como entrada (un grupo) y devuelven **un único resultado acumulado** para todo el grupo (ejemplo: \`AVG\`, \`COUNT\`, \`MAX\`, \`MIN\`, \`SUM\`).
                `,
                highlightBox: {
                  type: 'tip',
                  title: 'Regla de Oro del Examen Oracle',
                  text: 'Una función de fila única SIEMPRE retorna un valor por cada fila procesada por la consulta. Si la consulta procesa 100 filas, la función se ejecuta 100 veces y produce 100 resultados.'
                }
              }
            ],
            sampleQuery: `SELECT employee_id, last_name, salary, ROUND(salary * 1.15, 2) AS "NEW_SALARY"
FROM employees
WHERE department_id = 90;`
          }
        ]
      },

      {
        id: 'tema-1-2',
        number: 2,
        title: 'Manipulación de Caracteres y Cadenas',
        summary: 'Funciones de conversión de mayúsculas/minúsculas y herramientas para cortar, concatenar, rellenar y medir texto.',
        modules: [
          {
            id: 'mod-2',
            classId: 'clase-1',
            temaId: 'tema-1-2',
            number: 2,
            title: 'Funciones de Carácter: Case y Manipulación',
            subtitle: 'LOWER, UPPER, INITCAP, CONCAT, SUBSTR, LENGTH, INSTR, LPAD, RPAD, TRIM, REPLACE',
            pdfPages: 'Págs. 6 - 10',
            icon: 'type',
            summary: 'Aprende a transformar y extraer texto con LOWER, UPPER, INITCAP, CONCAT, SUBSTR, LENGTH, INSTR, LPAD, RPAD, TRIM y REPLACE.',
            sections: [
              {
                title: '1. Conversión de Mayúsculas / Minúsculas (Case Conversion)',
                content: `
Estas funciones transforman el case de las cadenas de caracteres:

| Función | Propósito | Ejemplo | Resultado |
| :--- | :--- | :--- | :--- |
| \`LOWER(str)\` | Convierte todo a minúsculas | \`LOWER('SQL Course')\` | \`'sql course'\` |
| \`UPPER(str)\` | Convierte todo a mayúsculas | \`UPPER('SQL Course')\` | \`'SQL COURSE'\` |
| \`INITCAP(str)\` | Primera letra de cada palabra en mayúscula | \`INITCAP('SQL Course')\` | \`'Sql Course'\` |

**Caso de Uso Crítico:** Búsquedas case-insensitive en la cláusula \`WHERE\`. Como los datos en bases de datos pueden guardarse con mayúsculas y minúsculas mixtas, comparar directamente con \`WHERE last_name = 'higgins'\` no devolvería filas si el registro dice \`'Higgins'\`.
                `,
                sampleCode: `SELECT employee_id, last_name, department_id
FROM   employees
WHERE  LOWER(last_name) = 'higgins';`
              },
              {
                title: '2. Manipulación de Cadenas (Character Manipulation)',
                content: `
Permiten extraer subcadenas, medir longitudes, rellenar y reemplazar texto:

| Función | Sintaxis | Propósito | Ejemplo | Resultado |
| :--- | :--- | :--- | :--- | :--- |
| \`CONCAT\` | \`CONCAT(s1, s2)\` | Concatena dos cadenas | \`CONCAT('Hello', 'World')\` | \`'HelloWorld'\` |
| \`SUBSTR\` | \`SUBSTR(s, m, [n])\` | Extrae caracteres desde la posición \`m\` (1-based) con longitud \`n\` | \`SUBSTR('HelloWorld', 1, 5)\` | \`'Hello'\` |
| \`LENGTH\` | \`LENGTH(s)\` | Retorna el conteo total de caracteres | \`LENGTH('HelloWorld')\` | \`10\` |
| \`INSTR\` | \`INSTR(s, target, [m], [n])\` | Encuentra la posición numérica de la ocurrencia \`n\` | \`INSTR('HelloWorld', 'W')\` | \`6\` |
| \`LPAD\` | \`LPAD(s, n, char)\` | Rellena por la izquierda hasta completar longitud \`n\` | \`LPAD(salary, 10, '*')\` | \`'*****24000'\` |
| \`RPAD\` | \`RPAD(s, n, char)\` | Rellena por la derecha hasta completar longitud \`n\` | \`RPAD(salary, 10, '*')\` | \`'24000*****'\` |
| \`TRIM\` | \`TRIM(char FROM s)\` | Elimina caracteres iniciales o finales (por defecto espacios) | \`TRIM('H' FROM 'HelloWorld')\` | \`'elloWorld'\` |
| \`REPLACE\`| \`REPLACE(s, search, replace)\` | Reemplaza ocurrencias de una subcadena | \`REPLACE('JACK and JUE', 'J', 'BL')\` | \`'BLACK and BLUE'\` |
                `,
                highlightBox: {
                  type: 'tip',
                  title: 'Índices Negativos en SUBSTR (Pág. 9)',
                  text: 'Si el segundo argumento m en SUBSTR es negativo, Oracle cuenta hacia atrás desde el final de la cadena. Por ejemplo, SUBSTR(\'HelloWorld\', -5) devuelve \'World\'.'
                }
              }
            ],
            sampleQuery: `SELECT employee_id, CONCAT(first_name, last_name) NAME, 
       job_id, LENGTH(last_name), 
       INSTR(last_name, 'a') "Contains 'a'?"
FROM   employees
WHERE  SUBSTR(job_id, 4) = 'REP';`
          }
        ]
      },

      {
        id: 'tema-1-3',
        number: 3,
        title: 'Funciones Numéricas',
        summary: 'Precisión matemática en base de datos con ROUND, TRUNC y el operador de módulo MOD.',
        modules: [
          {
            id: 'mod-3',
            classId: 'clase-1',
            temaId: 'tema-1-3',
            number: 3,
            title: 'Funciones Numéricas: ROUND, TRUNC y MOD',
            subtitle: 'Control de Precisión y Residuos Matemáticos',
            pdfPages: 'Págs. 11 - 14',
            icon: 'hash',
            summary: 'Domina el redondeo (ROUND), truncamiento (TRUNC) a decimales positivos, cero o negativos (decenas/centenas), y el cálculo de residuos con MOD.',
            sections: [
              {
                title: '1. Comparativa ROUND vs. TRUNC',
                content: `
- **\`ROUND(n, [m])\`**: Redondea el número \`n\` a \`m\` posiciones decimales. Si \`m\` es omitido, redondea al entero más cercano (\`m = 0\`).
- **\`TRUNC(n, [m])\`**: Trunca el número \`n\` a \`m\` posiciones decimales sin redondear. Si \`m\` es omitido, trunca a cero decimales.

### Comportamiento según el valor de \`m\`:
- **\`m > 0\` (Decimales):** Trabaja a la derecha del punto decimal.
- **\`m = 0\` (Enteros):** Redondea o trunca al número entero.
- **\`m < 0\` (Decenas, Centenas, Miles):** Trabaja a la izquierda del punto decimal.
                `,
                sampleCode: `-- Comparación directa en tabla DUAL
SELECT ROUND(45.923, 2) R2, ROUND(45.923, 0) R0, ROUND(45.923, -1) R_NEG,
       TRUNC(45.923, 2) T2, TRUNC(45.923, 0) T0, TRUNC(45.923, -1) T_NEG
FROM   DUAL;`
              },
              {
                title: '2. La Función MOD (Residuo de División)',
                content: `
\`MOD(m, n)\` retorna el residuo de dividir \`m\` entre \`n\`. Es comúnmente utilizada para identificar si un número es par o impar (\`MOD(valor, 2) = 0\`) o para cálculos cíclicos.
                `,
                sampleCode: `SELECT last_name, salary, MOD(salary, 5000)
FROM   employees
WHERE  job_id = 'SA_REP';`
              }
            ],
            sampleQuery: `SELECT last_name, salary, 
       ROUND(salary / 3, 2) AS "ROUND_DIV3",
       TRUNC(salary / 3, 2) AS "TRUNC_DIV3",
       MOD(salary, 5000) AS "RESIDUO_5000"
FROM   employees
WHERE  department_id = 60;`
          }
        ]
      },

      {
        id: 'tema-1-4',
        number: 4,
        title: 'Fechas y Aritmética Temporal',
        summary: 'Formato interno de Oracle, función SYSDATE, sumas/restas de días y funciones especializadas de calendario.',
        modules: [
          {
            id: 'mod-4',
            classId: 'clase-1',
            temaId: 'tema-1-4',
            number: 4,
            title: 'Fechas y Aritmética de Fechas',
            subtitle: 'Estructura Interna, SYSDATE y Operaciones Aritméticas',
            pdfPages: 'Págs. 15 - 19',
            icon: 'calendar',
            summary: 'Conoce cómo almacena Oracle las fechas internamente (siglo, año, mes, día, hora, minutos, segundos) y cómo realizar cálculos aritméticos temporales.',
            sections: [
              {
                title: '1. El Tipo de Dato DATE en Oracle',
                content: `
Oracle almacena fechas en un formato numérico interno especial de 7 bytes:
1. Siglo (Century)
2. Año (Year)
3. Mes (Month)
4. Día (Day)
5. Horas (Hours)
6. Minutos (Minutes)
7. Segundos (Seconds)

El formato de visualización por defecto es \`DD-MON-RR\` (ejemplo: \`17-JUN-87\`).
                `
              },
              {
                title: '2. Reglas de Aritmética de Fechas',
                content: `
| Operación | Resultado | Descripción |
| :--- | :--- | :--- |
| \`date + number\` | \`DATE\` | Suma un número de días a una fecha |
| \`date - number\` | \`DATE\` | Resta un número de días a una fecha |
| \`date - date\` | \`NUMBER\` | Retorna el **número exacto de días** transcurridos |
| \`date + (number / 24)\`| \`DATE\` | Suma una fracción de horas a la fecha |
                `,
                sampleCode: `SELECT last_name, (SYSDATE-hire_date)/7 AS WEEKS
FROM   employees
WHERE  department_id = 90;`
              }
            ],
            sampleQuery: `SELECT last_name, hire_date,
       ROUND((SYSDATE - hire_date) / 7) AS "WEEKS_WORKED",
       ROUND(SYSDATE - hire_date) AS "DAYS_WORKED"
FROM   employees
WHERE  department_id = 90;`
          },
          {
            id: 'mod-5',
            classId: 'clase-1',
            temaId: 'tema-1-4',
            number: 5,
            title: 'Funciones de Manipulación de Fechas',
            subtitle: 'MONTHS_BETWEEN, ADD_MONTHS, NEXT_DAY, LAST_DAY, ROUND y TRUNC',
            pdfPages: 'Págs. 20 - 24',
            icon: 'clock',
            summary: 'Aprende a calcular meses transcurridos, proyectar fechas futuras, encontrar el último día del mes y redondear fechas por mes o año.',
            sections: [
              {
                title: '1. Catálogo de Funciones de Fechas',
                content: `
| Función | Propósito | Ejemplo |
| :--- | :--- | :--- |
| \`MONTHS_BETWEEN(d1, d2)\` | Retorna los meses entre dos fechas (fraccional si difieren los días) | \`MONTHS_BETWEEN('01-SEP-95', '11-JAN-94')\` |
| \`ADD_MONTHS(d, n)\` | Añade \`n\` meses a la fecha | \`ADD_MONTHS('11-JAN-94', 6)\` |
| \`NEXT_DAY(d, 'day')\` | Próximo día de la semana especificado | \`NEXT_DAY('01-SEP-95', 'FRIDAY')\` |
| \`LAST_DAY(d)\` | Último día del mes de la fecha indicada | \`LAST_DAY('01-FEB-95')\` |
                `
              },
              {
                title: '2. Regla de Redondeo de Fechas: ROUND vs. TRUNC',
                content: `
Al redondear (\`ROUND\`) o truncar (\`TRUNC\`) una fecha con respecto a un modelo de formato:
- **Modelo \`'MONTH'\`**: El punto de inflexión es el **día 16 del mes**. Del 1 al 15 se redondea al primer día del mes actual. Del 16 en adelante se redondea al primer día del mes siguiente.
- **Modelo \`'YEAR'\`**: El punto de inflexión es el **1 de julio**. Del 1 de enero al 30 de junio se redondea al 1 de enero del año actual. Del 1 de julio en adelante al 1 de enero del año siguiente.
                `
              }
            ],
            sampleQuery: `SELECT employee_id, hire_date,
       ROUND(MONTHS_BETWEEN(SYSDATE, hire_date)) TENURE_MONTHS,
       ADD_MONTHS(hire_date, 6) REVIEW_DATE,
       NEXT_DAY(hire_date, 'FRIDAY') NEXT_FRI,
       LAST_DAY(hire_date) END_OF_MONTH
FROM   employees
WHERE  months_between(SYSDATE, hire_date) > 300;`
          }
        ]
      },

      {
        id: 'tema-1-5',
        number: 5,
        title: 'Conversiones, Nulos y Condicionales',
        summary: 'Funciones TO_CHAR, TO_DATE, TO_NUMBER, matriz de siglos RR, NVL/COALESCE y expresiones CASE/DECODE.',
        modules: [
          {
            id: 'mod-6',
            classId: 'clase-1',
            temaId: 'tema-1-5',
            number: 6,
            title: 'Funciones de Conversión y Formato RR',
            subtitle: 'TO_CHAR, TO_NUMBER, TO_DATE y la Matriz de Siglos RR vs YY',
            pdfPages: 'Págs. 25 - 37',
            icon: 'refresh-cw',
            summary: 'Domina la conversión explícita entre tipos de datos, máscaras de formato de fecha y número, y la matriz de resolución de siglos para años de dos dígitos.',
            sections: [
              {
                title: '1. Conversión de Tipos de Datos en Oracle',
                content: `
Oracle permite conversiones **implícitas** automáticas, pero la recomendación oficial de Oracle es usar **conversión explícita** para garantizar confiabilidad y rendimiento:

\`\`\`
          TO_CHAR                TO_DATE
NUMBER ────────────> VARCHAR2 <──────────── DATE
       <────────────          ────────────>
         TO_NUMBER               TO_CHAR
\`\`\`
                `
              },
              {
                title: '2. Máscaras de Formato con TO_CHAR (Fechas y Moneda)',
                content: `
### Elementos de Formato para Fechas:
- \`YYYY\`: Año en 4 dígitos.
- \`YEAR\`: Año en palabras (\`NINETEEN NINETY-FOUR\`).
- \`MM\`: Número de mes (\`01\` a \`12\`).
- \`MONTH\`: Nombre completo del mes (\`JANUARY\`).
- \`DY\`: Nombre abreviado de tres letras del día (\`MON\`).
- \`DAY\`: Nombre completo del día (\`MONDAY\`).
- \`fm\`: Prefijo supresor de espacios en blanco y ceros no significativos (\`fmDD Month YYYY\`).

### Elementos de Formato para Números:
- \`9\`: Representa un dígito.
- \`0\`: Fuerza la visualización de ceros iniciales.
- \`$\`: Coloca el símbolo de dólar flotante.
- \`,\`: Separador de miles.
- \`.\`: Separador de decimales.
                `,
                sampleCode: `SELECT last_name, TO_CHAR(hire_date, 'fmDD Month YYYY') AS HIREDATE
FROM   employees;`
              },
              {
                title: '3. El Formato de Siglo RR vs. YY',
                content: `
El formato \`RR\` resuelve años de dos dígitos determinando automáticamente el siglo adecuado según el año actual del sistema:

| Año Actual (Últimos 2 dígitos) | Año Especificado (Últimos 2 dígitos) | Siglo Resultante con Formato RR | Siglo Resultante con Formato YY |
| :---: | :---: | :---: | :---: |
| \`0 - 49\` (Ej: 1995 -> 95 actual) | \`0 - 49\` (Ej: 04) | Siglo actual (2004) | Siglo actual |
| \`0 - 49\` | \`50 - 99\` (Ej: 95) | Siglo previo (1995) | Siglo actual |
| \`50 - 99\` (Ej: 1995 actual) | \`0 - 49\` (Ej: 04) | Siglo siguiente (2004) | Siglo actual |
| \`50 - 99\` | \`50 - 99\` (Ej: 95) | Siglo actual (1995) | Siglo actual |
                `
              }
            ],
            sampleQuery: `SELECT last_name, TO_CHAR(hire_date, 'DD-Mon-YYYY') AS FORMAT_DATE
FROM   employees
WHERE  hire_date < TO_DATE('01-JAN-90', 'DD-MON-RR');`
          },
          {
            id: 'mod-7',
            classId: 'clase-1',
            temaId: 'tema-1-5',
            number: 7,
            title: 'Anidamiento de Funciones',
            subtitle: 'Evaluación desde el Nivel Más Interno hacia Afuera',
            pdfPages: 'Págs. 38',
            icon: 'layers',
            summary: 'Aprende cómo resuelve Oracle el anidamiento de funciones evaluando de adentro hacia afuera.',
            sections: [
              {
                title: '1. Mecánica de Anidamiento de Funciones',
                content: `
Las funciones de fila única pueden anidarse a cualquier nivel de profundidad:
\`\`\`sql
F3( F2( F1(col, arg1), arg2 ), arg3 )
\`\`\`
1. Se evalúa la función más interna \`F1\`.
2. El resultado de \`F1\` se pasa como argumento a \`F2\`.
3. El resultado de \`F2\` se pasa a la función externa \`F3\`.
                `,
                sampleCode: `SELECT last_name,
       UPPER(CONCAT(SUBSTR(last_name, 1, 8), '_US')) AS "CODE"
FROM   employees
WHERE  department_id = 60;`
              }
            ],
            sampleQuery: `SELECT last_name,
       UPPER(CONCAT(SUBSTR(last_name, 1, 8), '_US')) AS "USER_TAG",
       LENGTH(CONCAT(SUBSTR(last_name, 1, 8), '_US')) AS "TAG_LEN"
FROM   employees
WHERE  department_id = 60;`
          },
          {
            id: 'mod-8',
            classId: 'clase-1',
            temaId: 'tema-1-5',
            number: 8,
            title: 'Funciones Generales y Condicionales',
            subtitle: 'Manejo de Nulos (NVL, NVL2, NULLIF, COALESCE) y Expresiones CASE / DECODE',
            pdfPages: 'Págs. 39 - 51',
            icon: 'scale',
            summary: 'Aprende a controlar valores nulos con NVL/NVL2/COALESCE e implementar bifurcaciones lógicas IF-THEN-ELSE con CASE y DECODE.',
            sections: [
              {
                title: '1. Funciones Generales para Nulos',
                content: `
En bases de datos relacionales, \`NULL\` representa un valor desconocido o ausente. Cualquier cálculo matemático con \`NULL\` devuelve \`NULL\` (\`salary * commission_pct = NULL\`). Para evitar esto, Oracle provee:

| Función | Definición | Regla |
| :--- | :--- | :--- |
| \`NVL(expr1, expr2)\` | Sustituto simple | Si \`expr1\` es nulo, retorna \`expr2\`. Ambos deben tener el mismo tipo de dato. |
| \`NVL2(expr1, expr2, expr3)\` | Ternario de nulos | Si \`expr1\` **NO** es nulo, retorna \`expr2\`; si **SÍ** es nulo, retorna \`expr3\`. |
| \`NULLIF(expr1, expr2)\` | Comparador | Compara dos expresiones; si son iguales retorna \`NULL\`; si son diferentes retorna \`expr1\`. |
| \`COALESCE(e1, e2, ... en)\` | Primer no nulo | Devuelve la **primera expresión no nula** de la lista. |
                `,
                sampleCode: `SELECT last_name, salary, NVL(commission_pct, 0),
       (salary*12) + (salary*12*NVL(commission_pct, 0)) AS AN_SAL
FROM   employees;`
              },
              {
                title: '2. Expresiones Condicionales: CASE vs. DECODE',
                content: `
Permiten usar lógica \`IF-THEN-ELSE\` dentro de una sentencia SQL.

### La Expresión CASE (Estándar ANSI SQL):
\`\`\`sql
CASE job_id WHEN 'IT_PROG'  THEN 1.10*salary
            WHEN 'ST_CLERK' THEN 1.15*salary
            WHEN 'SA_REP'   THEN 1.20*salary
ELSE salary END AS "REVISED_SALARY"
\`\`\`

### La Función DECODE (Exclusiva y clásica de Oracle):
\`\`\`sql
DECODE(job_id, 'IT_PROG',  1.10*salary,
               'ST_CLERK', 1.15*salary,
               'SA_REP',   1.20*salary,
       salary) AS REVISED_SALARY
\`\`\`
                `,
                highlightBox: {
                  type: 'tip',
                  title: 'DECODE con Rangos Numéricos (Pág. 51)',
                  text: 'Para calcular tasas de impuestos por tramos salariales usando DECODE, el PDF utiliza TRUNC(salary/2000, 0): si el sueldo está entre 0-1999 el resultado es 0; entre 2000-3999 es 1; entre 4000-5999 es 2, etc.'
                }
              }
            ],
            sampleQuery: `SELECT last_name, salary,
       DECODE(TRUNC(salary/2000, 0),
              0, 0.00,
              1, 0.09,
              2, 0.20,
              3, 0.30,
              4, 0.40,
              5, 0.42,
              6, 0.44,
                 0.45) AS TAX_RATE
FROM   employees
WHERE  department_id = 80;`
          }
        ]
      }
    ]
  },

  {
    id: 'clase-2',
    number: 2,
    title: 'Funciones de Grupo y Agregación (Group Functions)',
    subtitle: 'Reporting Aggregated Data Using the Group Functions',
    pdfPages: '25 Páginas (Lección 4)',
    icon: 'bar-chart-2',
    description: 'Aprende a sintetizar y agrupar grandes volúmenes de datos: funciones de grupo (AVG, COUNT, MAX, MIN, SUM, STDDEV, VARIANCE), GROUP BY, HAVING, diagnóstico de errores ORA y anidamiento de agregados.',
    temas: [
      {
        id: 'tema-2-1',
        number: 1,
        title: 'Introducción y Catálogo de Funciones de Grupo',
        summary: 'Qué son las funciones de grupo, sintaxis general y catálogo completo de agregados disponibles en Oracle.',
        modules: [
          {
            id: 'mod-9',
            classId: 'clase-2',
            temaId: 'tema-2-1',
            number: 9,
            title: '¿Qué son las Funciones de Grupo? y Sintaxis',
            subtitle: 'Reducción de Conjuntos de Filas a un Solo Resultado por Grupo',
            pdfPages: 'Págs. 1 - 5',
            icon: 'bar-chart-2',
            summary: 'Descubre cómo las funciones de grupo operan sobre conjuntos de filas para devolver un único resultado acumulado por grupo.',
            sections: [
              {
                title: '1. ¿Qué son las Funciones de Grupo?',
                content: `
A diferencia de las funciones de fila única que operan sobre cada fila de manera independiente, las **funciones de grupo (Group Functions o Aggregate Functions)** operan sobre **conjuntos de filas** para producir **un único resultado por cada grupo**.

\`\`\`
[ Fila 1: Salario 24000 ] ──┐
[ Fila 2: Salario 17000 ] ──┼──> ┌───────────────────┐ ──> [ MAX(SALARY) = 24000 ]
[ Fila 3: Salario 17000 ] ──┘    │ FUNCIÓN DE GRUPO  │
                                 └───────────────────┘
\`\`\`

- Si no se utiliza la cláusula \`GROUP BY\`, la tabla entera (o el conjunto filtrado por \`WHERE\`) es tratada como un **único gran grupo**.
                `
              },
              {
                title: '2. Sintaxis General de Consultas con Agregación',
                content: `
La estructura estándar de una consulta que utiliza funciones de grupo en Oracle es:

\`\`\`sql
SELECT   [column,] group_function(column), ...
FROM     table
[WHERE   condition]
[GROUP BY group_by_expression]
[HAVING   group_condition]
[ORDER BY column];
\`\`\`

### Orden Lógico de Evaluación de Oracle:
1. \`FROM\`: Identifica la tabla origen.
2. \`WHERE\`: Filtra filas individuales antes de agrupar.
3. \`GROUP BY\`: Particiona las filas restantes en grupos.
4. \`HAVING\`: Descarta grupos que no cumplan la condición de grupo.
5. \`SELECT\`: Calcula las funciones de grupo y proyecta columnas.
6. \`ORDER BY\`: Ordena el conjunto final de grupos.
                `
              }
            ],
            sampleQuery: `SELECT MAX(salary), MIN(salary), AVG(salary), SUM(salary)
FROM employees;`
          },
          {
            id: 'mod-10',
            classId: 'clase-2',
            temaId: 'tema-2-1',
            number: 10,
            title: 'Catálogo de Funciones de Grupo',
            subtitle: 'AVG, COUNT, MAX, MIN, STDDEV, SUM, VARIANCE',
            pdfPages: 'Págs. 4 - 7',
            icon: 'database',
            summary: 'Explora los tipos de datos compatibles con cada función de grupo: numéricos, caracteres y fechas.',
            sections: [
              {
                title: '1. Funciones Numéricas vs. Polimórficas',
                content: `
Oracle clasifica las funciones de grupo según los tipos de datos que aceptan como entrada:

| Función | Tipos Admitidos | Descripción |
| :--- | :--- | :--- |
| \`AVG([DISTINCT\|ALL] n)\` | Solo \`NUMBER\` | Promedio aritmético de los valores |
| \`SUM([DISTINCT\|ALL] n)\` | Solo \`NUMBER\` | Suma total acumulada |
| \`MIN([DISTINCT\|ALL] expr)\` | \`NUMBER\`, \`VARCHAR2\`, \`DATE\` | Valor mínimo del grupo |
| \`MAX([DISTINCT\|ALL] expr)\` | \`NUMBER\`, \`VARCHAR2\`, \`DATE\` | Valor máximo del grupo |
| \`COUNT([DISTINCT\|ALL] expr \| *)\` | Cualquier tipo | Conteo de filas o valores no nulos |
| \`STDDEV([DISTINCT\|ALL] n)\`| Solo \`NUMBER\` | Desviación estándar de los valores |
| \`VARIANCE([DISTINCT\|ALL] n)\`| Solo \`NUMBER\` | Varianza matemática de la muestra |
                `
              },
              {
                title: '2. Ejemplos Reales del PDF (Págs. 6 y 7)',
                content: `
### Uso de AVG, SUM, MIN y MAX con Filtro WHERE:
\`\`\`sql
SELECT AVG(salary), MAX(salary),
       MIN(salary), SUM(salary)
FROM   employees
WHERE  job_id LIKE '%REP%';
\`\`\`

### MIN y MAX aplicados a Fechas (Pág. 7):
\`\`\`sql
SELECT MIN(hire_date), MAX(hire_date)
FROM   employees;
\`\`\`
En este caso, \`MIN(hire_date)\` devuelve la fecha más antigua (\`17-JUN-87\`) y \`MAX(hire_date)\` devuelve la fecha más reciente contratada (\`29-JAN-00\`).
                `,
                sampleCode: `SELECT MIN(hire_date), MAX(hire_date)
FROM   employees;`
              }
            ],
            sampleQuery: `SELECT AVG(salary), MAX(salary), MIN(salary), SUM(salary)
FROM   employees
WHERE  job_id LIKE '%REP%';`
          }
        ]
      },

      {
        id: 'tema-2-2',
        number: 2,
        title: 'Tratamiento de Nulos y Cláusula DISTINCT',
        summary: 'Comportamiento de las tres formas de COUNT y uso de NVL para obligar a considerar valores nulos en promedios.',
        modules: [
          {
            id: 'mod-11',
            classId: 'clase-2',
            temaId: 'tema-2-2',
            number: 11,
            title: 'La Función COUNT y la Cláusula DISTINCT',
            subtitle: 'COUNT(*), COUNT(expr) y COUNT(DISTINCT expr)',
            pdfPages: 'Págs. 8 - 9',
            icon: 'check-circle',
            summary: 'Aprende las diferencias cruciales entre contar filas totales, contar valores no nulos y contar valores únicos.',
            sections: [
              {
                title: '1. Las Tres Variantes de COUNT',
                content: `
Oracle ofrece tres formas de invocar la función \`COUNT\`:

1. **\`COUNT(*)\`:**
   - Retorna el número total de filas en la tabla o grupo.
   - **Incluye** filas duplicadas y filas con valores nulos en cualquier columna.

2. **\`COUNT(expr)\`:**
   - Retorna el número de filas donde \`expr\` **NO es NULL**.
   - Si la columna tiene nulos, esas filas son ignoradas del conteo.

3. **\`COUNT(DISTINCT expr)\`:**
   - Retorna el número de valores **únicos y no nulos** de \`expr\`.
                `,
                sampleCode: `-- Conteo total vs conteo no nulo
SELECT COUNT(*) AS TOTAL_DEPT50
FROM   employees
WHERE  department_id = 50;

SELECT COUNT(commission_pct) AS COMM_DEPT80
FROM   employees
WHERE  department_id = 80;`
              },
              {
                title: '2. Uso de DISTINCT (Pág. 9)',
                content: `
Para conocer cuántos departamentos distintos tienen empleados asignados en la empresa:
\`\`\`sql
SELECT COUNT(DISTINCT department_id)
FROM   employees;
\`\`\`
Esta consulta devuelve \`7\`, descartando los departamentos repetidos y descartando cualquier empleado que tenga \`department_id\` nulo (como Kimberely Grant).
                `
              }
            ],
            sampleQuery: `SELECT COUNT(*) AS "TOTAL_EMPS",
       COUNT(commission_pct) AS "CON_COMISION",
       COUNT(DISTINCT department_id) AS "DEPTS_UNICOS"
FROM   employees;`
          },
          {
            id: 'mod-12',
            classId: 'clase-2',
            temaId: 'tema-2-2',
            number: 12,
            title: 'Funciones de Grupo y Valores NULL',
            subtitle: 'Ignorancia de Nulos por Defecto e Inclusión Forzada con NVL',
            pdfPages: 'Pág. 10',
            icon: 'alert-triangle',
            summary: 'Descubre por qué las funciones de grupo ignoran los nulos y cómo utilizar NVL para calcular métricas realistas sobre toda la población.',
            sections: [
              {
                title: '1. Comportamiento por Defecto: Nulos Ignorados',
                content: `
Todas las funciones de grupo (excepto \`COUNT(*)\`) **ignoran automáticamente los valores nulos** en la columna evaluada.

Por ejemplo, al calcular el promedio de comisiones:
\`\`\`sql
SELECT AVG(commission_pct)
FROM   employees;
\`\`\`
**Resultado:** \`0.2125\` (.2125).
Oracle solo sumó los 4 empleados que reciben comisión y dividió la suma entre 4.

\`\`\`
Suma = (0.20 + 0.30 + 0.20 + 0.15) = 0.85
Divisor = 4 empleados con comisión
Promedio = 0.85 / 4 = 0.2125
\`\`\`
                `
              },
              {
                title: '2. Forzar la Inclusión de Nulos con NVL',
                content: `
Si el departamento financiero desea conocer el promedio de comisión **repartido entre todos los empleados** (considerando que los que no tienen comisión ganan 0%):

\`\`\`sql
SELECT AVG(NVL(commission_pct, 0))
FROM   employees;
\`\`\`
**Resultado:** \`0.0425\` (.0425).
La función \`NVL\` convierte los valores nulos en \`0\`. Como el resultado ya no es nulo, la función \`AVG\` ahora divide entre las 20 filas de la tabla:

\`\`\`
Suma = 0.85 + (16 * 0) = 0.85
Divisor = 20 empleados totales
Promedio = 0.85 / 20 = 0.0425
\`\`\`
                `,
                highlightBox: {
                  type: 'tip',
                  title: 'Pregunta Clásica de Certificación Oracle',
                  text: '¿Produce AVG(commission_pct) el mismo resultado que AVG(NVL(commission_pct, 0))? ¡NO! AVG ignora los nulos disminuyendo el denominador; NVL convierte los nulos en ceros, manteniendo el denominador completo.'
                }
              }
            ],
            sampleQuery: `SELECT AVG(commission_pct) AS "AVG_IGNORANDO_NULOS",
       AVG(NVL(commission_pct, 0)) AS "AVG_CON_NVL_CEROS"
FROM   employees;`
          }
        ]
      },

      {
        id: 'tema-2-3',
        number: 3,
        title: 'Creación de Grupos con GROUP BY',
        summary: 'Partición de datos por columnas individuales y agregación multidimensional por múltiples columnas.',
        modules: [
          {
            id: 'mod-13',
            classId: 'clase-2',
            temaId: 'tema-2-3',
            number: 13,
            title: 'Partición de Filas con GROUP BY',
            subtitle: 'Sintaxis, Mecánica de Partición y Reglas Fundamentales',
            pdfPages: 'Págs. 11 - 14',
            icon: 'grid',
            summary: 'Aprende a dividir las filas de una tabla en subgrupos basados en valores de columnas comunes usando GROUP BY.',
            sections: [
              {
                title: '1. ¿Cómo funciona GROUP BY?',
                content: `
La cláusula \`GROUP BY\` divide las filas de una tabla en grupos más pequeños según los valores idénticos de una o más columnas especificadas:

\`\`\`
EMPLOYEES ──────────> [ GROUP BY department_id ]
├─ Dept 10: [ 4400 ]                   ──> AVG = 4400
├─ Dept 20: [ 13000, 6000 ]            ──> AVG = 9500
├─ Dept 50: [ 5800, 3500, 3100, ... ]  ──> AVG = 3500
├─ Dept 60: [ 9000, 6000, 4200 ]       ──> AVG = 6400
├─ Dept 80: [ 10500, 8600, 11000 ]     ──> AVG = 10033.3333
├─ Dept 90: [ 24000, 17000, 17000 ]    ──> AVG = 19333.3333
└─ Dept 110: [ 12000, 8300 ]           ──> AVG = 10150
\`\`\`
                `,
                sampleCode: `SELECT   department_id, AVG(salary)
FROM     employees
GROUP BY department_id;`
              },
              {
                title: '2. Regla Fundamental de Columnas en GROUP BY',
                content: `
> **Regla de Oro:** Todas las columnas o expresiones en la lista del \`SELECT\` que **NO** estén dentro de una función de grupo **DEBEN** estar presentes en la cláusula \`GROUP BY\`.

### ¿Debe estar la columna del GROUP BY en el SELECT?
**No obligatoriamente (Pág. 14):** La columna por la que agrupas no tiene que figurar en la lista del \`SELECT\`. La siguiente consulta es completamente válida en Oracle:

\`\`\`sql
SELECT   AVG(salary)
FROM     employees
GROUP BY department_id;
\`\`\`
Aunque es válida, suele ser menos informativa porque el usuario ve los promedios sin saber a qué departamento corresponde cada uno.
                `
              }
            ],
            sampleQuery: `SELECT   department_id, 
         COUNT(*) AS "NUM_EMPLEADOS",
         ROUND(AVG(salary), 2) AS "SALARIO_PROMEDIO"
FROM     employees
GROUP BY department_id
ORDER BY department_id;`
          },
          {
            id: 'mod-14',
            classId: 'clase-2',
            temaId: 'tema-2-3',
            number: 14,
            title: 'Agrupación por Múltiples Columnas',
            subtitle: 'GROUP BY Multidimensional (department_id, job_id)',
            pdfPages: 'Págs. 15 - 16',
            icon: 'layers',
            summary: 'Domina la agrupación jerárquica sumando o promediando datos por combinaciones de dos o más columnas.',
            sections: [
              {
                title: '1. Agrupación Jerárquica Multicolumna',
                content: `
A veces necesitas calcular subtotales basados en una combinación de criterios. Por ejemplo: calcular la masa salarial (\`SUM(salary)\`) de **cada puesto de trabajo dentro de cada departamento**:

\`\`\`sql
SELECT   department_id dept_id, job_id, SUM(salary)
FROM     employees
GROUP BY department_id, job_id;
\`\`\`

Oracle agrupa primero por \`department_id\`, y dentro de cada departamento, subdivide por \`job_id\`.
                `
              },
              {
                title: '2. Desglose del Resultado (13 Filas Seleccionadas)',
                content: `
| DEPT_ID | JOB_ID | SUM(SALARY) |
| :---: | :--- | :---: |
| 10 | \`AD_ASST\` | 4,400 |
| 20 | \`MK_MAN\` | 13,000 |
| 20 | \`MK_REP\` | 6,000 |
| 50 | \`ST_CLERK\` | 11,700 |
| 50 | \`ST_MAN\` | 5,800 |
| 60 | \`IT_PROG\` | 19,200 |
| 80 | \`SA_MAN\` | 10,500 |
| 80 | \`SA_REP\` | 19,600 |
| 90 | \`AD_PRES\` | 24,000 |
| 90 | \`AD_VP\` | 34,000 |
| 110 | \`AC_ACCOUNT\` | 8,300 |
| 110 | \`AC_MGR\` | 12,000 |
| *(null)* | \`SA_REP\` | 7,000 |
                `
              }
            ],
            sampleQuery: `SELECT   department_id dept_id, job_id, 
         COUNT(*) AS "CANTIDAD", 
         SUM(salary) AS "NOMINA_TOTAL"
FROM     employees
GROUP BY department_id, job_id
ORDER BY department_id, job_id;`
          }
        ]
      },

      {
        id: 'tema-2-4',
        number: 4,
        title: 'Consultas Inválidas y Errores Oracle (ORA)',
        summary: 'Aprende a diagnosticar y prevenir los errores más frecuentes en exámenes y entornos reales: ORA-00937 y ORA-00934.',
        modules: [
          {
            id: 'mod-15',
            classId: 'clase-2',
            temaId: 'tema-2-4',
            number: 15,
            title: 'Consultas Inválidas: ORA-00937 y ORA-00934',
            subtitle: 'Diagnóstico de Columna Faltante y Función en Cláusula WHERE',
            pdfPages: 'Págs. 17 - 18',
            icon: 'alert-octagon',
            summary: 'Conoce con precisión por qué fallan las consultas mal formuladas en Oracle y cómo corregirlas.',
            sections: [
              {
                title: '1. Error ORA-00937: not a single-group group function',
                content: `
Este error ocurre cuando se incluye una columna individual en el \`SELECT\` junto a una función de grupo, pero **se olvida agregarla al GROUP BY**:

\`\`\`sql
SELECT department_id, COUNT(last_name)
FROM   employees;
\`\`\`
\`\`\`text
ERROR at line 1:
ORA-00937: not a single-group group function
\`\`\`

### Causa:
\`COUNT(last_name)\` produce **un solo valor** para toda la tabla, mientras que \`department_id\` produce **múltiples filas**. Como Oracle no puede poner una tabla de 20 filas en una celda y un escalar en otra sin saber cómo agruparlas, la consulta es rechazada.

**Solución:** Agregar \`GROUP BY department_id\`.
                `
              },
              {
                title: '2. Error ORA-00934: group function is not allowed here',
                content: `
Este error ocurre cuando se intenta filtrar o restringir grupos utilizando una función de grupo dentro de la cláusula \`WHERE\`:

\`\`\`sql
SELECT   department_id, AVG(salary)
FROM     employees
WHERE    AVG(salary) > 8000
GROUP BY department_id;
\`\`\`
\`\`\`text
ERROR at line 3:
ORA-00934: group function is not allowed here
\`\`\`

### Causa:
La cláusula \`WHERE\` se ejecuta **antes** de que los grupos sean creados. En el momento en que se evalúa el \`WHERE\`, el promedio \`AVG(salary)\` del departamento todavía no existe.

**Solución:** Mover la condición a la cláusula \`HAVING\`: \`HAVING AVG(salary) > 8000\`.
                `,
                highlightBox: {
                  type: 'tip',
                  title: 'Regla Mnemotécnica para Exámenes',
                  text: 'WHERE filtra filas individuales (antes de agrupar). HAVING filtra grupos agregados (después de agrupar). ¡Las funciones de grupo NUNCA van en el WHERE!'
                }
              }
            ],
            sampleQuery: `-- Consulta corregida con HAVING:
SELECT   department_id, AVG(salary)
FROM     employees
GROUP BY department_id
HAVING   AVG(salary) > 8000;`
          }
        ]
      },

      {
        id: 'tema-2-5',
        number: 5,
        title: 'Restricción con HAVING y Anidamiento de Agregados',
        summary: 'Filtrado de grupos con HAVING, ciclo de 3 pasos de Oracle, anidamiento a dos niveles y Práctica 4.',
        modules: [
          {
            id: 'mod-16',
            classId: 'clase-2',
            temaId: 'tema-2-5',
            number: 16,
            title: 'Restricción de Grupos con la Cláusula HAVING',
            subtitle: 'El Proceso de 3 Pasos del Servidor Oracle',
            pdfPages: 'Págs. 19 - 22',
            icon: 'filter',
            summary: 'Aprende a condicionar qué grupos deben mostrarse utilizando HAVING en combinación con WHERE, GROUP BY y ORDER BY.',
            sections: [
              {
                title: '1. Los 3 Pasos de Ejecución con HAVING',
                content: `
Cuando utilizas la cláusula \`HAVING\`, el motor de Oracle procesa la consulta en 3 etapas secuenciales:
1. **Las filas son agrupadas** (\`Rows are grouped\`).
2. **Se aplica la función de grupo** sobre cada grupo (\`The group function is applied\`).
3. **Se muestran únicamente los grupos que cumplen la condición de HAVING** (\`Groups matching the HAVING clause are displayed\`).
                `
              },
              {
                title: '2. Ejemplo con Máximo Salario > 10,000 (Pág. 21)',
                content: `
\`\`\`sql
SELECT   department_id, MAX(salary)
FROM     employees
GROUP BY department_id
HAVING   MAX(salary) > 10000;
\`\`\`

**Departamentos que cumplen la condición:**
- Dept 20: Max 13,000
- Dept 80: Max 11,000
- Dept 90: Max 24,000
- Dept 110: Max 12,000
                `,
                sampleCode: `SELECT   department_id, MAX(salary)
FROM     employees
GROUP BY department_id
HAVING   MAX(salary) > 10000;`
              },
              {
                title: '3. Combinando WHERE, GROUP BY, HAVING y ORDER BY (Pág. 22)',
                content: `
Se puede combinar filtrado previo de filas, agrupación, filtrado de grupos y ordenamiento:
\`\`\`sql
SELECT   job_id, SUM(salary) PAYROLL
FROM     employees
WHERE    job_id NOT LIKE '%REP%'
GROUP BY job_id
HAVING   SUM(salary) > 13000
ORDER BY SUM(salary);
\`\`\`
- \`WHERE\`: Descarta cualquier puesto de representantes (\`%REP%\`).
- \`GROUP BY\`: Agrupa las filas restantes por código de cargo (\`job_id\`).
- \`HAVING\`: Conserva únicamente aquellos puestos cuya masa salarial supere los $13,000.
- \`ORDER BY\`: Ordena el resultado de menor a mayor nómina total.
                `
              }
            ],
            sampleQuery: `SELECT   job_id, SUM(salary) PAYROLL
FROM     employees
WHERE    job_id NOT LIKE '%REP%'
GROUP BY job_id
HAVING   SUM(salary) > 13000
ORDER BY SUM(salary);`
          },
          {
            id: 'mod-17',
            classId: 'clase-2',
            temaId: 'tema-2-5',
            number: 17,
            title: 'Anidamiento de Funciones de Grupo',
            subtitle: 'MAX(AVG(salary)) y Límites de Profundidad en Oracle',
            pdfPages: 'Pág. 23',
            icon: 'layers',
            summary: 'Conoce cómo anidar dos funciones de grupo para encontrar el valor extremo de un agregado entre todos los departamentos.',
            sections: [
              {
                title: '1. Anidamiento de Funciones de Grupo',
                content: `
A diferencia de las funciones de fila única (que pueden anidarse sin límite estricto), Oracle permite anidar funciones de grupo a una **profundidad máxima de dos niveles**:

\`\`\`sql
SELECT   MAX(AVG(salary))
FROM     employees
GROUP BY department_id;
\`\`\`
**Resultado:** \`19333.3333\`.

### Reglas Críticas del Anidamiento de Agregados:
1. **Obligatoriedad de GROUP BY:** Al anidar funciones de grupo, la cláusula \`GROUP BY\` es **estrictamente obligatoria**.
2. **Exclusividad del SELECT:** Cuando se anida una función de grupo, la lista del \`SELECT\` **no puede** incluir columnas individuales del \`GROUP BY\` (\`SELECT department_id, MAX(AVG(salary))\` produciría un error en Oracle).
3. La consulta retorna un **único valor escalar** para toda la consulta (el promedio más alto entre todos los grupos).
                `
              }
            ],
            sampleQuery: `SELECT MAX(AVG(salary)) AS "MAX_AVG_SALARY"
FROM   employees
GROUP BY department_id;`
          },
          {
            id: 'mod-18',
            classId: 'clase-2',
            temaId: 'tema-2-5',
            number: 18,
            title: 'Resumen y Práctica 4 (Practice 4)',
            subtitle: 'Síntesis de Conceptos y Objetivos Prácticos',
            pdfPages: 'Págs. 24 - 25',
            icon: 'award',
            summary: 'Repaso sintético de la lección y preparación para los retos guiados de la Práctica 4.',
            sections: [
              {
                title: '1. Síntesis de Objetivos Alcanzados',
                content: `
Al concluir esta lección, eres capaz de:
- Identificar y utilizar las funciones de grupo: \`AVG\`, \`COUNT\`, \`MAX\`, \`MIN\`, \`SUM\`, \`STDDEV\` y \`VARIANCE\`.
- Reconocer cómo se comportan los valores \`NULL\` en agregación y cuándo emplear \`NVL\`.
- Escribir sentencias SQL que utilicen la cláusula \`GROUP BY\` por una o más columnas.
- Restringir la visualización de grupos mediante la cláusula \`HAVING\`.
- Comprender la diferencia operativa entre \`WHERE\` y \`HAVING\`.
- Evitar y corregir los errores clásicos \`ORA-00937\` y \`ORA-00934\`.
                `
              }
            ],
            sampleQuery: `SELECT   department_id, 
         COUNT(*) EMP_COUNT,
         MIN(salary) SAL_MIN,
         MAX(salary) SAL_MAX,
         ROUND(AVG(salary), 2) SAL_AVG
FROM     employees
GROUP BY department_id
HAVING   COUNT(*) > 2
ORDER BY SAL_AVG DESC;`
          }
        ]
      }
    ]
  }
];

// Flat export of all modules for backward compatibility
export const CURRICULUM_MODULES = CURRICULUM_CLASSES.flatMap(c => c.temas.flatMap(t => t.modules));
