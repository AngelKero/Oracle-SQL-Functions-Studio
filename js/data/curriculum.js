/**
 * Oracle SQL Single-Row Functions Curriculum Data
 * Direct pedagogical map of all 51 slides in "usingsingle-rowfunctionstocustomizeoutput-170503103323.pdf"
 */

export const CURRICULUM_MODULES = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Fundamentos de Funciones SQL',
    subtitle: 'Funciones de Fila Única (Single-Row) vs. Funciones Múltiples (Multiple-Row)',
    pdfPages: 'Págs. 1 - 5',
    icon: '⚡',
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
[ Argumento 1, Argumento 2 ] ──▶ ┌────────────────────────┐ ──▶ [ Valor Resultante ]
                                  │  FUNCIÓN DE FILA ÚNICA │
[   Fila de la Tabla     ] ──▶ └────────────────────────┘
        `
      },
      {
        title: '2. Dos Tipos de Funciones SQL',
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
      },
      {
        title: '3. Clasificación de Funciones de Fila Única',
        content: `
En este curso analizamos las cinco familias principales de funciones de fila única descritas en el estándar de Oracle:

- 🔤 **Funciones de Carácter:** Aceptan caracteres como entrada y pueden devolver valores de caracteres o números.
- 🔢 **Funciones Numéricas:** Aceptan entradas numéricas y devuelven valores numéricos.
- 📅 **Funciones de Fecha:** Operan sobre valores de tipo \`DATE\` de Oracle.
- 🔄 **Funciones de Conversión:** Convierten valores de un tipo de dato a otro (ej. fecha a texto, número a texto).
- ⚙️ **Funciones Generales y Condicionales:** Manejo avanzado de valores nulos (\`NVL\`, \`COALESCE\`) y ramificación lógica (\`CASE\`, \`DECODE\`).
        `
      }
    ],
    sampleQuery: `SELECT employee_id, last_name, salary, ROUND(salary * 1.15, 2) AS "NEW_SALARY"
FROM employees
WHERE department_id = 90;`
  },

  {
    id: 'mod-2',
    number: 2,
    title: 'Funciones de Carácter',
    subtitle: 'Manipulación de Mayúsculas/Minúsculas y Manipulación de Cadenas',
    pdfPages: 'Págs. 6 - 10',
    icon: '🔤',
    summary: 'Aprende a transformar y extraer texto con LOWER, UPPER, INITCAP, CONCAT, SUBSTR, LENGTH, INSTR, LPAD, RPAD, TRIM y REPLACE.',
    sections: [
      {
        title: '1. Funciones de Conversión de Mayúsculas/Minúsculas',
        content: `
Estas funciones transforman el case de las cadenas de caracteres:

| Función | Propósito | Ejemplo | Resultado |
| :--- | :--- | :--- | :--- |
| \`LOWER(str)\` | Convierte todo a minúsculas | \`LOWER('SQL Course')\` | \`'sql course'\` |
| \`UPPER(str)\` | Convierte todo a mayúsculas | \`UPPER('SQL Course')\` | \`'SQL COURSE'\` |
| \`INITCAP(str)\` | Primera letra de cada palabra en mayúscula, resto en minúscula | \`INITCAP('SQL Course')\` | \`'Sql Course'\` |

**Caso de Uso Crítico:** Búsquedas case-insensitive en la cláusula \`WHERE\`. Como los datos en bases de datos pueden guardarse con mayúsculas y minúsculas mixtas, comparar directamente con \`WHERE last_name = 'higgins'\` no devolvería filas si el registro dice \`'Higgins'\`.
        `,
        sampleCode: `SELECT employee_id, last_name, department_id
FROM   employees
WHERE  LOWER(last_name) = 'higgins';`
      },
      {
        title: '2. Funciones de Manipulación de Cadenas',
        content: `
Permiten extraer partes, medir longitudes, rellenar y reemplazar texto:

| Función | Propósito | Ejemplo | Resultado |
| :--- | :--- | :--- | :--- |
| \`CONCAT(s1, s2)\` | Une dos cadenas | \`CONCAT('Hello', 'World')\` | \`'HelloWorld'\` |
| \`SUBSTR(s, m, [n])\` | Extrae subcadena desde posición \`m\` de longitud \`n\` | \`SUBSTR('HelloWorld', 1, 5)\` | \`'Hello'\` |
| \`LENGTH(s)\` | Cuenta el número de caracteres | \`LENGTH('HelloWorld')\` | \`10\` |
| \`INSTR(s, target, [m], [n])\` | Posición numérica de la subcadena | \`INSTR('HelloWorld', 'W')\` | \`6\` |
| \`LPAD(s, n, pad)\` | Rellena por la izquierda hasta longitud \`n\` | \`LPAD(salary, 10, '*')\` | \`'*****24000'\` |
| \`RPAD(s, n, pad)\` | Rellena por la derecha hasta longitud \`n\` | \`RPAD(salary, 10, '*')\` | \`'24000*****'\` |
| \`TRIM(char FROM s)\` | Elimina caracteres iniciales/finales | \`TRIM('H' FROM 'HelloWorld')\` | \`'elloWorld'\` |
| \`REPLACE(s, search, rep)\` | Reemplaza ocurrencias de un texto | \`REPLACE('JACK and JUE', 'J', 'BL')\` | \`'BLACK and BLUE'\` |
        `,
        highlightBox: {
          type: 'warning',
          title: '¡Ojo con SUBSTR e INSTR en Oracle!',
          text: '1. En Oracle SQL, los índices comienzan en 1 (NO en 0).\n2. Si SUBSTR recibe una posición negativa (-m), ¡cuenta hacia atrás desde el final de la cadena! Por ejemplo: SUBSTR(\'HelloWorld\', -5) produce \'World\'.'
        }
      }
    ],
    sampleQuery: `SELECT employee_id, CONCAT(first_name, last_name) NAME, 
       job_id, LENGTH(last_name), 
       INSTR(last_name, 'a') "Contains 'a'?"
FROM   employees
WHERE  SUBSTR(job_id, 4) = 'REP';`
  },

  {
    id: 'mod-3',
    number: 3,
    title: 'Funciones Numéricas',
    subtitle: 'Redondeo, Truncado y Módulo Matemático (ROUND, TRUNC, MOD)',
    pdfPages: 'Págs. 11 - 14',
    icon: '🔢',
    summary: 'Domina cómo controlar la precisión numérica: redondeo hacia arriba/abajo con ROUND, descarte directo con TRUNC y cálculo de residuos con MOD.',
    sections: [
      {
        title: '1. Función ROUND (Redondeo)',
        content: `
La función \`ROUND(column | expression, [n])\` redondea el valor numérico a \`n\` posiciones decimales:

- Si \`n\` es **positivo**, redondea al número de decimales especificado.
- Si \`n\` es **cero (0)** o se omite, redondea al entero más próximo.
- Si \`n\` es **negativo**, ¡redondea a la izquierda del punto decimal (decenas, centenas, etc.)!
        `,
        sampleCode: `SELECT ROUND(45.923, 2),  -- 45.92 (2 decimales)
       ROUND(45.923, 0),  -- 46    (entero más cercano)
       ROUND(45.923, -1)  -- 50    (a la decena más cercana)
FROM   DUAL;`
      },
      {
        title: '2. Función TRUNC (Truncado)',
        content: `
A diferencia de \`ROUND\`, la función \`TRUNC(column | expression, [n])\` **no redondea**, sino que **corta y descarta** los dígitos más allá de la posición especificada:

- Si \`n\` es **positivo**, trunca a \`n\` decimales sin redondear.
- Si \`n\` es **cero (0)** o se omite, descarta todos los decimales y devuelve la parte entera.
- Si \`n\` es **negativo**, reemplaza con ceros las posiciones a la izquierda del punto decimal.
        `,
        sampleCode: `SELECT TRUNC(45.923, 2),  -- 45.92
       TRUNC(45.923),     -- 45 (sin redondeo hacia 46)
       TRUNC(45.923, -1)  -- 40 (en lugar de 50)
FROM   DUAL;`
      },
      {
        title: '3. Función MOD (Residuo de División)',
        content: `
La función \`MOD(m, n)\` devuelve el **residuo o resto** de la división de \`m\` entre \`n\`. Es sumamente útil para determinar si un número es par/impar o para calcular tramos de sueldo.
        `,
        sampleCode: `SELECT last_name, salary, MOD(salary, 5000)
FROM   employees
WHERE  job_id = 'SA_REP';`
      }
    ],
    sampleQuery: `SELECT last_name, salary, 
       ROUND(salary / 3, 2) AS "ROUND_DIV3",
       TRUNC(salary / 3, 2) AS "TRUNC_DIV3",
       MOD(salary, 5000) AS "MOD_5000"
FROM   employees
WHERE  job_id = 'SA_REP';`
  },

  {
    id: 'mod-4',
    number: 4,
    title: 'Fechas y Aritmética de Fechas',
    subtitle: 'El Formato Interno de Oracle, SYSDATE y Operaciones Temporales',
    pdfPages: 'Págs. 15 - 18',
    icon: '📅',
    summary: 'Aprende cómo almacena Oracle internamente las fechas (7 bytes), la función del sistema SYSDATE y cómo sumar, restar y calcular semanas o días.',
    sections: [
      {
        title: '1. Formato Interno de Fecha en Oracle',
        content: `
Oracle almacena las fechas en un formato numérico interno especial de **7 bytes**:
- **Siglo (Century)**
- **Año (Year)**
- **Mes (Month)**
- **Día (Day)**
- **Horas (Hours)**
- **Minutos (Minutes)**
- **Segundos (Seconds)**

El formato de visualización predeterminado es \`DD-MON-RR\` (por ejemplo: \`'17-JUN-87'\` o \`'25-JUL-03'\`).
        `
      },
      {
        title: '2. La Función SYSDATE',
        content: `
\`SYSDATE\` es una función del sistema que no requiere argumentos y devuelve la **fecha y hora actual** del servidor de base de datos.
        `,
        sampleCode: `SELECT SYSDATE FROM DUAL;`
      },
      {
        title: '3. Aritmética con Fechas',
        content: `
Oracle permite realizar operaciones matemáticas directamente sobre columnas de tipo fecha:

| Operación | Expresión | Resultado |
| :--- | :--- | :--- |
| **Fecha + Número** | \`hire_date + 7\` | Suma un número de días a la fecha. |
| **Fecha - Número** | \`hire_date - 7\` | Resta un número de días a la fecha. |
| **Fecha - Fecha** | \`SYSDATE - hire_date\` | **Número de días** transcurridos entre ambas fechas. |
| **Fecha + Horas** | \`hire_date + 5/24\` | Suma 5 horas a la fecha (1 día = 24 horas). |
        `,
        sampleCode: `SELECT last_name, (SYSDATE - hire_date) / 7 AS WEEKS
FROM   employees
WHERE  department_id = 90;`
      }
    ],
    sampleQuery: `SELECT last_name, hire_date, 
       ROUND(SYSDATE - hire_date) AS "DAYS_EMPLOYED",
       ROUND((SYSDATE - hire_date) / 7, 1) AS "WEEKS_EMPLOYED"
FROM   employees
WHERE  department_id = 90;`
  },

  {
    id: 'mod-5',
    number: 5,
    title: 'Funciones de Fecha Especializadas',
    subtitle: 'MONTHS_BETWEEN, ADD_MONTHS, NEXT_DAY, LAST_DAY, ROUND y TRUNC',
    pdfPages: 'Págs. 19 - 22',
    icon: '🗓️',
    summary: 'Aprende a calcular intervalos exactos entre meses, sumar meses a calendarios, obtener el último día de un mes y redondear/truncar fechas.',
    sections: [
      {
        title: '1. Catálogo de Funciones de Fecha',
        content: `
| Función | Propósito | Ejemplo | Resultado |
| :--- | :--- | :--- | :--- |
| \`MONTHS_BETWEEN(d1, d2)\` | Número de meses entre \`d1\` y \`d2\` (positivo si d1 > d2) | \`MONTHS_BETWEEN('01-SEP-95', '11-JAN-94')\` | \`19.677419\` |
| \`ADD_MONTHS(date, n)\` | Agrega \`n\` meses calendario a la fecha | \`ADD_MONTHS('11-JAN-96', 6)\` | \`'11-JUL-96'\` |
| \`NEXT_DAY(date, 'day')\` | Próximo día de la semana nombrado | \`NEXT_DAY('01-SEP-95', 'FRIDAY')\` | \`'08-SEP-95'\` |
| \`LAST_DAY(date)\` | Último día del mes de la fecha indicada | \`LAST_DAY('01-FEB-95')\` | \`'28-FEB-95'\` |
        `
      },
      {
        title: '2. ROUND y TRUNC Aplicados a Fechas',
        content: `
Tanto \`ROUND\` como \`TRUNC\` pueden operar sobre fechas utilizando un formato modelo de unidad:

### \`ROUND(date, 'MONTH')\` vs \`TRUNC(date, 'MONTH')\`:
- El punto de corte es el **día 16 del mes**.
- Si el día está entre **1 y 15**, \`ROUND(..., 'MONTH')\` redondea al **día 1 del mes actual**.
- Si el día está entre **16 y 31**, ¡redondea al **día 1 del mes siguiente**!
- En cambio, \`TRUNC(..., 'MONTH')\` SIEMPRE corta al **día 1 del mes actual**.

### \`ROUND(date, 'YEAR')\` vs \`TRUNC(date, 'YEAR')\`:
- El punto de corte es el **1 de Julio**.
- Meses de Enero a Junio (1-6) redondean al 1 de Enero del año actual.
- Meses de Julio a Diciembre (7-12) redondean al 1 de Enero del **año siguiente**.
        `,
        sampleCode: `-- Asumiendo SYSDATE = '25-JUL-03':
SELECT ROUND(SYSDATE, 'MONTH'), -- '01-AUG-03' (porque 25 >= 16)
       ROUND(SYSDATE, 'YEAR'),  -- '01-JAN-04' (porque Julio >= 7)
       TRUNC(SYSDATE, 'MONTH'), -- '01-JUL-03'
       TRUNC(SYSDATE, 'YEAR')   -- '01-JAN-03'
FROM   DUAL;`
      }
    ],
    sampleQuery: `SELECT last_name, hire_date,
       ROUND(MONTHS_BETWEEN(SYSDATE, hire_date)) AS "MONTHS_WORKED",
       ADD_MONTHS(hire_date, 6) AS "SIX_MONTH_REVIEW",
       LAST_DAY(hire_date) AS "FIRST_MONTH_END"
FROM   employees
WHERE  department_id = 60;`
  },

  {
    id: 'mod-6',
    number: 6,
    title: 'Funciones de Conversión y Formato RR',
    subtitle: 'Conversión Implícita, Explícita, TO_CHAR, TO_DATE y la Matriz del Siglo RR',
    pdfPages: 'Págs. 23 - 36',
    icon: '🔄',
    summary: 'Descubre cómo convertir de forma segura entre NUMBER, CHARACTER y DATE con modelos de formato avanzados y comprende a fondo el formato de año RR.',
    sections: [
      {
        title: '1. Conversión Implícita vs. Explícita',
        content: `
- **Conversión Implícita:** Oracle intenta convertir tipos automáticamente cuando se evalúan expresiones (ejemplo: asignar una cadena que contiene números a un campo numérico). **No recomendada** porque depende de la configuración regional y puede degradar el rendimiento o fallar.
- **Conversión Explícita:** Uso directo de las funciones de conversión de Oracle:
  - \`TO_CHAR(date | number, [format])\`
  - \`TO_NUMBER(char, [format])\`
  - \`TO_DATE(char, [format])\`
        `
      },
      {
        title: '2. TO_CHAR con Fechas y el Elemento "fm"',
        content: `
Modelos de formato comunes para fechas:
- \`YYYY\`: Año completo en 4 dígitos (\`1994\`).
- \`YEAR\`: Año en palabras en inglés (\`NINETEEN NINETY-FOUR\`).
- \`MM\`: Mes en número a dos dígitos (\`01-12\`).
- \`MONTH\`: Nombre completo del mes (\`JANUARY\`).
- \`MON\`: Abreviatura de tres letras (\`JAN\`).
- \`DD\`: Día numérico del mes (\`07\`).
- \`DAY\`: Nombre completo del día de la semana (\`TUESDAY\`).
- \`HH24:MI:SS AM\`: Hora en formato 24 horas con minutos y segundos.
- Texto literal: Encomillar entre comillas dobles: \`DD "de" Month YYYY\`.

**El modificador "fm" (Fill Mode):** Por defecto, Oracle rellena los nombres de los meses con espacios hasta completar 9 caracteres y añade un cero a la izquierda en los días (\`07\`). Añadir \`fm\` suprime los espacios sobrantes y los ceros iniciales: \`fmDD Month YYYY\`.
        `,
        sampleCode: `SELECT last_name,
       TO_CHAR(hire_date, 'fmDD Month YYYY') AS HIREDATE
FROM   employees;`
      },
      {
        title: '3. TO_CHAR con Números',
        content: `
Permite transformar números a formato monetario y legible:
- \`9\`: Representa un dígito.
- \`0\`: Fuerza la visualización de ceros iniciales.
- \`$\`: Coloca un signo de dólar.
- \`L\`: Símbolo de moneda local flotante.
- \`.\`: Punto decimal especificado.
- \`,\`: Separador de miles.
- \`MI\`: Signo negativo a la derecha (\`1234-\`).
- \`PR\`: Encierra números negativos entre corchetes angulares (\`<1234>\`).
        `,
        sampleCode: `SELECT TO_CHAR(salary, '$99,999.00') AS SALARY
FROM   employees
WHERE  last_name = 'Ernst';`
      },
      {
        title: '4. El Enigma del Formato de Año RR vs YY',
        content: `
El formato \`RR\` fue creado por Oracle para solucionar el problema del cambio de milenio (año 2000):

| Año Actual (2 últimos dígitos) | Año Especificado en Consulta | Siglo Resultante |
| :---: | :---: | :---: |
| **0 - 49** | **0 - 49** | **Siglo actual** (2000s) |
| **0 - 49** | **50 - 99** | **Siglo anterior** (1900s) |
| **50 - 99** | **0 - 49** | **Siglo siguiente** (2000s) |
| **50 - 99** | **50 - 99** | **Siglo actual** (1900s) |

*Ejemplo:* Si el año actual es 1995 y escribes \`'27-OCT-95'\`, el año es 1995. Si escribes \`'27-OCT-17'\`, ¡Oracle interpreta 2017!
        `
      }
    ],
    sampleQuery: `SELECT last_name, 
       TO_CHAR(hire_date, 'DD-Mon-YYYY') AS "EXP_DATE",
       TO_CHAR(salary, '$99,999.00') AS "FORMATTED_SAL"
FROM   employees
WHERE  hire_date < TO_DATE('01-JAN-90', 'DD-MON-RR');`
  },

  {
    id: 'mod-7',
    number: 7,
    title: 'Anidamiento de Funciones',
    subtitle: 'Evaluación de Adentro hacia Afuera (Inside-Out Pipeline)',
    pdfPages: 'Págs. 37 - 38',
    icon: '🪆',
    summary: 'Comprende cómo se procesan las funciones anidadas en cascada y cómo componer múltiples transformaciones en una sola consulta.',
    sections: [
      {
        title: '1. Regla de Evaluación de Funciones Anidadas',
        content: `
- Las funciones de fila única pueden anidarse a **cualquier nivel de profundidad**.
- Las funciones anidadas se evalúan **desde el nivel más interno hacia el más externo (Inside to Outside)**.
- El resultado de la función interior se convierte en el argumento de entrada de la función exterior.
        `,
        diagram: `
Nivel 3:   UPPER (
Nivel 2:       CONCAT (
Nivel 1:           SUBSTR(LAST_NAME, 1, 8),
                   '_US'
               )
           )
        `
      },
      {
        title: '2. Desglose Paso a Paso del Ejemplo del PDF',
        content: `
Para el empleado con \`LAST_NAME = 'Lorentz'\`:

1. **Paso 1 (SUBSTR más interno):** \`SUBSTR('Lorentz', 1, 8)\` extrae hasta 8 caracteres ➔ \`'Lorentz'\`.
2. **Paso 2 (CONCAT intermedio):** Concatena el resultado con \`'_US'\` ➔ \`'Lorentz_US'\`.
3. **Paso 3 (UPPER exterior):** Convierte la cadena resultante a mayúsculas ➔ \`'LORENTZ_US'\`.
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
    number: 8,
    title: 'Funciones Generales y Condicionales',
    subtitle: 'Manejo de Nulos (NVL, NVL2, NULLIF, COALESCE) y Expresiones CASE / DECODE',
    pdfPages: 'Págs. 39 - 51',
    icon: '⚖️',
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
        sampleCode: `-- NVL: Salario anual sumando comisión si existe
SELECT last_name, salary, NVL(commission_pct, 0),
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
];
