/**
 * Oracle SQL Single-Row Functions Cheatsheet
 * Comprehensive reference with syntax, description, return types and runnable examples.
 */

export const CHEATSHEET_DATA = [
  // Character Functions - Case
  {
    name: 'LOWER',
    category: 'Carácter (Case)',
    syntax: 'LOWER(column | expression)',
    description: 'Convierte todos los caracteres de la cadena a minúsculas.',
    returnType: 'VARCHAR2',
    example: "LOWER('SQL Course')",
    output: "'sql course'",
    sqlExample: "SELECT LOWER(last_name) FROM employees WHERE LOWER(last_name) = 'higgins';"
  },
  {
    name: 'UPPER',
    category: 'Carácter (Case)',
    syntax: 'UPPER(column | expression)',
    description: 'Convierte todos los caracteres de la cadena a mayúsculas.',
    returnType: 'VARCHAR2',
    example: "UPPER('SQL Course')",
    output: "'SQL COURSE'",
    sqlExample: "SELECT UPPER(last_name) FROM employees;"
  },
  {
    name: 'INITCAP',
    category: 'Carácter (Case)',
    syntax: 'INITCAP(column | expression)',
    description: 'Convierte la primera letra de cada palabra a mayúscula y las restantes a minúscula.',
    returnType: 'VARCHAR2',
    example: "INITCAP('SQL course')",
    output: "'Sql Course'",
    sqlExample: "SELECT INITCAP(job_id) FROM employees;"
  },

  // Character Functions - Manipulation
  {
    name: 'CONCAT',
    category: 'Carácter (Manipulación)',
    syntax: 'CONCAT(str1, str2)',
    description: 'Concatena el primer valor con el segundo. Equivale al operador de concatenación ||.',
    returnType: 'VARCHAR2',
    example: "CONCAT('Hello', 'World')",
    output: "'HelloWorld'",
    sqlExample: "SELECT CONCAT(first_name, last_name) FROM employees;"
  },
  {
    name: 'SUBSTR',
    category: 'Carácter (Manipulación)',
    syntax: 'SUBSTR(column | expression, m, [n])',
    description: 'Extrae caracteres comenzando en la posición m (1-based) con una longitud de n caracteres. Si m es negativo, cuenta desde el final.',
    returnType: 'VARCHAR2',
    example: "SUBSTR('HelloWorld', 1, 5)",
    output: "'Hello'",
    sqlExample: "SELECT SUBSTR(job_id, 4) FROM employees;"
  },
  {
    name: 'LENGTH',
    category: 'Carácter (Manipulación)',
    syntax: 'LENGTH(column | expression)',
    description: 'Devuelve el número total de caracteres en la cadena.',
    returnType: 'NUMBER',
    example: "LENGTH('HelloWorld')",
    output: "10",
    sqlExample: "SELECT last_name, LENGTH(last_name) FROM employees;"
  },
  {
    name: 'INSTR',
    category: 'Carácter (Manipulación)',
    syntax: 'INSTR(column | expression, target, [m], [n])',
    description: 'Encuentra la posición numérica del texto buscado comenzando en m (default 1) en la ocurrencia n (default 1).',
    returnType: 'NUMBER',
    example: "INSTR('HelloWorld', 'W')",
    output: "6",
    sqlExample: "SELECT last_name, INSTR(last_name, 'a') FROM employees;"
  },
  {
    name: 'LPAD',
    category: 'Carácter (Manipulación)',
    syntax: "LPAD(column | expression, n, ['pad_char'])",
    description: 'Rellena la cadena por la izquierda hasta completar una longitud de n caracteres.',
    returnType: 'VARCHAR2',
    example: "LPAD(salary, 10, '*')",
    output: "'*****24000'",
    sqlExample: "SELECT LPAD(salary, 10, '*') FROM employees;"
  },
  {
    name: 'RPAD',
    category: 'Carácter (Manipulación)',
    syntax: "RPAD(column | expression, n, ['pad_char'])",
    description: 'Rellena la cadena por la derecha hasta completar una longitud de n caracteres.',
    returnType: 'VARCHAR2',
    example: "RPAD(salary, 10, '*')",
    output: "'24000*****'",
    sqlExample: "SELECT RPAD(salary, 10, '*') FROM employees;"
  },
  {
    name: 'TRIM',
    category: 'Carácter (Manipulación)',
    syntax: "TRIM([LEADING | TRAILING | BOTH] trim_char FROM str)",
    description: 'Elimina caracteres iniciales, finales o de ambos extremos de una cadena.',
    returnType: 'VARCHAR2',
    example: "TRIM('H' FROM 'HelloWorld')",
    output: "'elloWorld'",
    sqlExample: "SELECT TRIM(' ' FROM first_name) FROM employees;"
  },
  {
    name: 'REPLACE',
    category: 'Carácter (Manipulación)',
    syntax: "REPLACE(text, search_string, [replacement_string])",
    description: 'Reemplaza cada aparición del texto de búsqueda por el texto de reemplazo.',
    returnType: 'VARCHAR2',
    example: "REPLACE('JACK and JUE', 'J', 'BL')",
    output: "'BLACK and BLUE'",
    sqlExample: "SELECT REPLACE(job_id, 'REP', 'REPRESENTATIVE') FROM employees;"
  },

  // Number Functions
  {
    name: 'ROUND (Número)',
    category: 'Numéricas',
    syntax: 'ROUND(column | expression, [n])',
    description: 'Redondea el número a n decimales. Si n es negativo, redondea a la izquierda del punto decimal.',
    returnType: 'NUMBER',
    example: 'ROUND(45.923, 2)',
    output: '45.92',
    sqlExample: 'SELECT ROUND(45.923, 2), ROUND(45.923, 0), ROUND(45.923, -1) FROM DUAL;'
  },
  {
    name: 'TRUNC (Número)',
    category: 'Numéricas',
    syntax: 'TRUNC(column | expression, [n])',
    description: 'Trunca el número a n posiciones decimales sin redondear.',
    returnType: 'NUMBER',
    example: 'TRUNC(45.923, 2)',
    output: '45.92',
    sqlExample: 'SELECT TRUNC(45.923, 2), TRUNC(45.923), TRUNC(45.923, -1) FROM DUAL;'
  },
  {
    name: 'MOD',
    category: 'Numéricas',
    syntax: 'MOD(m, n)',
    description: 'Devuelve el resto o residuo de la división entera de m entre n.',
    returnType: 'NUMBER',
    example: 'MOD(1600, 300)',
    output: '100',
    sqlExample: 'SELECT last_name, salary, MOD(salary, 5000) FROM employees WHERE job_id = \'SA_REP\';'
  },

  // Date Functions
  {
    name: 'SYSDATE',
    category: 'Fechas',
    syntax: 'SYSDATE',
    description: 'Función sin argumentos que devuelve la fecha y hora actual del servidor de base de datos.',
    returnType: 'DATE',
    example: 'SYSDATE',
    output: 'Fecha actual (ej. 25-JUL-03)',
    sqlExample: 'SELECT SYSDATE FROM DUAL;'
  },
  {
    name: 'MONTHS_BETWEEN',
    category: 'Fechas',
    syntax: 'MONTHS_BETWEEN(date1, date2)',
    description: 'Calcula el número de meses entre dos fechas. Positivo si date1 > date2.',
    returnType: 'NUMBER',
    example: "MONTHS_BETWEEN('01-SEP-95', '11-JAN-94')",
    output: '19.677419',
    sqlExample: 'SELECT last_name, MONTHS_BETWEEN(SYSDATE, hire_date) FROM employees;'
  },
  {
    name: 'ADD_MONTHS',
    category: 'Fechas',
    syntax: 'ADD_MONTHS(date, n)',
    description: 'Suma n meses calendario a una fecha especificada.',
    returnType: 'DATE',
    example: "ADD_MONTHS('11-JAN-96', 6)",
    output: "'11-JUL-96'",
    sqlExample: 'SELECT last_name, ADD_MONTHS(hire_date, 6) FROM employees;'
  },
  {
    name: 'NEXT_DAY',
    category: 'Fechas',
    syntax: "NEXT_DAY(date, 'day_name')",
    description: 'Devuelve la fecha del siguiente día de la semana nombrado posterior a la fecha dada.',
    returnType: 'DATE',
    example: "NEXT_DAY('01-SEP-95', 'FRIDAY')",
    output: "'08-SEP-95'",
    sqlExample: "SELECT NEXT_DAY(SYSDATE, 'FRIDAY') FROM DUAL;"
  },
  {
    name: 'LAST_DAY',
    category: 'Fechas',
    syntax: 'LAST_DAY(date)',
    description: 'Devuelve la fecha del último día del mes que contiene a la fecha dada.',
    returnType: 'DATE',
    example: "LAST_DAY('01-FEB-95')",
    output: "'28-FEB-95'",
    sqlExample: 'SELECT last_name, LAST_DAY(hire_date) FROM employees;'
  },
  {
    name: 'ROUND (Fecha)',
    category: 'Fechas',
    syntax: "ROUND(date, ['MONTH' | 'YEAR'])",
    description: 'Redondea la fecha al primer día del mes (si día >= 16 siguiente mes) o del año (si mes >= 7 siguiente año).',
    returnType: 'DATE',
    example: "ROUND(SYSDATE, 'MONTH')",
    output: "'01-AUG-03'",
    sqlExample: "SELECT ROUND(hire_date, 'MONTH') FROM employees;"
  },
  {
    name: 'TRUNC (Fecha)',
    category: 'Fechas',
    syntax: "TRUNC(date, ['MONTH' | 'YEAR'])",
    description: 'Trunca la fecha al primer día del mes actual o al 1 de enero del año actual.',
    returnType: 'DATE',
    example: "TRUNC(SYSDATE, 'MONTH')",
    output: "'01-JUL-03'",
    sqlExample: "SELECT TRUNC(hire_date, 'MONTH') FROM employees;"
  },

  // Conversion Functions
  {
    name: 'TO_CHAR (Fecha)',
    category: 'Conversión',
    syntax: "TO_CHAR(date, ['format_model'])",
    description: 'Convierte un valor de fecha a una cadena de caracteres usando un modelo de formato (soporta fm).',
    returnType: 'VARCHAR2',
    example: "TO_CHAR(hire_date, 'fmDD Month YYYY')",
    output: "'17 June 1987'",
    sqlExample: "SELECT last_name, TO_CHAR(hire_date, 'fmDD Month YYYY') AS HIREDATE FROM employees;"
  },
  {
    name: 'TO_CHAR (Número)',
    category: 'Conversión',
    syntax: "TO_CHAR(number, ['format_model'])",
    description: 'Convierte un valor numérico a texto formateado con moneda, separador de miles y decimales.',
    returnType: 'VARCHAR2',
    example: "TO_CHAR(salary, '$99,999.00')",
    output: "'$24,000.00'",
    sqlExample: "SELECT TO_CHAR(salary, '$99,999.00') SALARY FROM employees WHERE last_name = 'Ernst';"
  },
  {
    name: 'TO_NUMBER',
    category: 'Conversión',
    syntax: "TO_NUMBER(char, ['format_model'])",
    description: 'Convierte una cadena de caracteres que contiene números a tipo numérico de Oracle.',
    returnType: 'NUMBER',
    example: "TO_NUMBER('1,234.56', '9,999.99')",
    output: '1234.56',
    sqlExample: "SELECT TO_NUMBER('5000') FROM DUAL;"
  },
  {
    name: 'TO_DATE',
    category: 'Conversión',
    syntax: "TO_DATE(char, ['format_model'])",
    description: 'Convierte una cadena de caracteres a formato DATE de Oracle.',
    returnType: 'DATE',
    example: "TO_DATE('01-JAN-90', 'DD-MON-RR')",
    output: 'Fecha Oracle',
    sqlExample: "SELECT last_name FROM employees WHERE hire_date < TO_DATE('01-JAN-90', 'DD-MON-RR');"
  },

  // General & Nulls
  {
    name: 'NVL',
    category: 'Generales (Nulos)',
    syntax: 'NVL(expr1, expr2)',
    description: 'Si expr1 es nulo, devuelve expr2; en caso contrario devuelve expr1. Ambos deben ser del mismo tipo.',
    returnType: 'Mismo que expr1',
    example: 'NVL(commission_pct, 0)',
    output: '0 (si es null)',
    sqlExample: 'SELECT last_name, salary, NVL(commission_pct, 0) FROM employees;'
  },
  {
    name: 'NVL2',
    category: 'Generales (Nulos)',
    syntax: 'NVL2(expr1, expr2, expr3)',
    description: 'Si expr1 NO es nulo retorna expr2; si expr1 ES nulo retorna expr3.',
    returnType: 'Mismo que expr2',
    example: "NVL2(commission_pct, 'SAL+COMM', 'SAL')",
    output: "'SAL' o 'SAL+COMM'",
    sqlExample: "SELECT last_name, NVL2(commission_pct, 'SAL+COMM', 'SAL') income FROM employees;"
  },
  {
    name: 'NULLIF',
    category: 'Generales (Nulos)',
    syntax: 'NULLIF(expr1, expr2)',
    description: 'Compara expr1 y expr2. Si son iguales devuelve NULL; si son diferentes devuelve expr1.',
    returnType: 'Mismo que expr1',
    example: 'NULLIF(LENGTH(first_name), LENGTH(last_name))',
    output: 'NULL si longitudes coinciden',
    sqlExample: 'SELECT first_name, last_name, NULLIF(LENGTH(first_name), LENGTH(last_name)) result FROM employees;'
  },
  {
    name: 'COALESCE',
    category: 'Generales (Nulos)',
    syntax: 'COALESCE(expr1, expr2, ... expr_n)',
    description: 'Devuelve la primera expresión no nula de la lista. Tiene la ventaja de aceptar múltiples alternativas.',
    returnType: 'Tipo compatible',
    example: 'COALESCE(manager_id, commission_pct, -1)',
    output: 'Primer valor no nulo',
    sqlExample: 'SELECT last_name, COALESCE(manager_id, commission_pct, -1) comm FROM employees;'
  },

  // Conditionals
  {
    name: 'CASE',
    category: 'Condicionales',
    syntax: 'CASE expr WHEN v1 THEN r1 [WHEN v2 THEN r2] [ELSE def] END',
    description: 'Expresión estándar ANSI SQL para lógica IF-THEN-ELSE en consultas.',
    returnType: 'Tipo del resultado',
    example: "CASE job_id WHEN 'IT_PROG' THEN 1.10*salary ELSE salary END",
    output: 'Salario revisado',
    sqlExample: "SELECT last_name, job_id, salary, CASE job_id WHEN 'IT_PROG' THEN 1.10*salary ELSE salary END \"REVISED_SALARY\" FROM employees;"
  },
  {
    name: 'DECODE',
    category: 'Condicionales',
    syntax: 'DECODE(col_or_expr, search1, result1, [search2, result2, ...], [default])',
    description: 'Función propietaria de Oracle para implementar lógica condicional IF-THEN-ELSE.',
    returnType: 'Tipo del resultado',
    example: "DECODE(job_id, 'IT_PROG', 1.10*salary, salary)",
    output: 'Salario revisado',
    sqlExample: "SELECT last_name, job_id, salary, DECODE(job_id, 'IT_PROG', 1.10*salary, salary) REVISED_SALARY FROM employees;"
  }
];
