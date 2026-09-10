/**
 * Interactive Exercises, Practice 3 and Quizzes
 * Directly aligns with "Practice 3: Overview of Part 1" (Slide 22) and topics throughout the PDF.
 */

export const PRACTICE_EXERCISES = [
  {
    id: 'p3-1',
    title: 'Práctica 3 - Reto 1: Visualizar la Fecha Actual del Sistema',
    category: 'Fechas',
    difficulty: 'Fácil',
    description: 'Escribe una consulta que muestre la fecha actual del sistema utilizando la función SYSDATE con el alias "Date". Ejecútala contra la tabla DUAL.',
    starterSql: 'SELECT SYSDATE AS "Date" FROM dual',
    solutionSql: 'SELECT SYSDATE AS "Date" FROM dual',
    expectedCols: ['DATE'],
    hint: 'Recuerda que la tabla DUAL es la tabla ficticia de una sola fila de Oracle que se utiliza para evaluar expresiones y funciones del sistema.'
  },
  {
    id: 'p3-2',
    title: 'Práctica 3 - Reto 2: Cálculo de Meses y Años de Servicio',
    category: 'Aritmética de Fechas',
    difficulty: 'Intermedio',
    description: 'Para cada empleado del departamento 90, muestra su apellido (LAST_NAME), fecha de contratación (HIRE_DATE), el número de meses trabajados (MONTHS_WORKED) redondeado al entero más cercano con ROUND, y los años completos de servicio (YEARS_WORKED) truncados con TRUNC.',
    starterSql: `SELECT last_name, hire_date, 
       ROUND(MONTHS_BETWEEN(SYSDATE, hire_date)) AS MONTHS_WORKED,
       TRUNC(MONTHS_BETWEEN(SYSDATE, hire_date) / 12) AS YEARS_WORKED
FROM employees
WHERE department_id = 90`,
    solutionSql: `SELECT last_name, hire_date, 
       ROUND(MONTHS_BETWEEN(SYSDATE, hire_date)) AS MONTHS_WORKED,
       TRUNC(MONTHS_BETWEEN(SYSDATE, hire_date) / 12) AS YEARS_WORKED
FROM employees
WHERE department_id = 90`,
    expectedCols: ['LAST_NAME', 'HIRE_DATE', 'MONTHS_WORKED', 'YEARS_WORKED'],
    hint: 'Utiliza MONTHS_BETWEEN(SYSDATE, hire_date). Para calcular años completos, divide el resultado entre 12 y usa TRUNC.'
  },
  {
    id: 'p3-3',
    title: 'Práctica 3 - Reto 3: Búsqueda con Case Insensitive y Longitud',
    category: 'Caracteres',
    difficulty: 'Intermedio',
    description: 'Genera un reporte que muestre el EMPLOYEE_ID, el nombre y apellido concatenados en una sola columna con CONCAT y separados por un espacio, y la longitud del apellido (LENGTH) para todos los empleados cuyo apellido comience con \'H\' o \'h\' (usa LOWER o UPPER).',
    starterSql: `SELECT employee_id, CONCAT(CONCAT(first_name, ' '), last_name) AS FULL_NAME, LENGTH(last_name) AS NAME_LEN
FROM employees
WHERE LOWER(SUBSTR(last_name, 1, 1)) = 'h'`,
    solutionSql: `SELECT employee_id, CONCAT(CONCAT(first_name, ' '), last_name) AS FULL_NAME, LENGTH(last_name) AS NAME_LEN
FROM employees
WHERE LOWER(SUBSTR(last_name, 1, 1)) = 'h'`,
    expectedCols: ['EMPLOYEE_ID', 'FULL_NAME', 'NAME_LEN'],
    hint: 'Puedes anidar CONCAT(CONCAT(first_name, " "), last_name) o filtrar con LOWER(SUBSTR(last_name, 1, 1)) = "h".'
  },
  {
    id: 'p3-4',
    title: 'Práctica 3 - Reto 4: Formato Monetario y Relleno con Asteriscos',
    category: 'Conversión y Formato',
    difficulty: 'Avanzado',
    description: 'Muestra el LAST_NAME y el SALARY formateado a 15 caracteres de ancho total, rellenado a la izquierda con el símbolo de asterisco (*) mediante la función LPAD.',
    starterSql: `SELECT last_name, LPAD(salary, 15, '*') AS SALARY_PAD
FROM employees`,
    solutionSql: `SELECT last_name, LPAD(salary, 15, '*') AS SALARY_PAD
FROM employees`,
    expectedCols: ['LAST_NAME', 'SALARY_PAD'],
    hint: 'LPAD(columna, ancho_total, caracter_relleno). Por ejemplo: LPAD(salary, 15, "*").'
  },
  {
    id: 'p3-5',
    title: 'Práctica 3 - Reto 5: Compensación Total con NVL y Comisiones',
    category: 'Manejo de Nulos',
    difficulty: 'Intermedio',
    description: 'Muestra el apellido (LAST_NAME), el salario mensual (SALARY), el porcentaje de comisión reemplazando nulos por 0 con NVL, y la compensación anual total calculada como (salary * 12) + (salary * 12 * commission_pct).',
    starterSql: `SELECT last_name, salary, NVL(commission_pct, 0) AS COMM_PCT,
       (salary * 12) + (salary * 12 * NVL(commission_pct, 0)) AS TOTAL_ANNUAL
FROM employees`,
    solutionSql: `SELECT last_name, salary, NVL(commission_pct, 0) AS COMM_PCT,
       (salary * 12) + (salary * 12 * NVL(commission_pct, 0)) AS TOTAL_ANNUAL
FROM employees`,
    expectedCols: ['LAST_NAME', 'SALARY', 'COMM_PCT', 'TOTAL_ANNUAL'],
    hint: 'Si multiplicas salary por NULL el resultado es NULL. Por eso debes envolver commission_pct en NVL(commission_pct, 0).'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    category: 'Fundamentos',
    question: '¿Cuál de las siguientes es una característica VERDADERA de las funciones de fila única (Single-Row Functions)?',
    options: [
      'Devuelven un único resultado para un conjunto entero de filas.',
      'Operan sobre cada fila devuelta y retornan exactamente un resultado por fila.',
      'No pueden aceptar argumentos ni constantes.',
      'No pueden anidarse dentro de otras funciones.'
    ],
    answer: 1,
    explanation: 'Las funciones de fila única operan en cada fila individual devuelta por la consulta y devuelven exactamente un valor de resultado por cada fila procesada.'
  },
  {
    id: 'q2',
    category: 'Caracteres',
    question: '¿Cuál es el resultado de evaluar SUBSTR(\'OracleSQL\', -3)?',
    options: [
      '\'Ora\'',
      '\'SQL\'',
      '\'cle\'',
      'Devuelve error de sintaxis porque el índice es negativo.'
    ],
    answer: 1,
    explanation: 'En Oracle SQL, un índice inicial negativo en SUBSTR cuenta hacia atrás desde el final de la cadena. Para \'OracleSQL\', los últimos 3 caracteres son \'SQL\'.'
  },
  {
    id: 'q3',
    category: 'Caracteres',
    question: '¿Qué valor retorna INSTR(\'Database Administrator\', \'a\', 3, 2)?',
    options: [
      '2',
      '4',
      '12',
      '17'
    ],
    answer: 2,
    explanation: 'La búsqueda empieza en la posición 3 (\'tabase Administrator\'). La primera \'a\' tras la pos 3 está en la posición 4 (\'Dat[a]base\'). La segunda ocurrencia tras la pos 3 está en la posición 12 (\'Administr[a]tor\').'
  },
  {
    id: 'q4',
    category: 'Números',
    question: '¿Cuál es el resultado de ejecutar SELECT ROUND(45.923, -1) FROM DUAL?',
    options: [
      '45.9',
      '46',
      '50',
      '40'
    ],
    answer: 2,
    explanation: 'Un segundo argumento negativo en ROUND redondea a la izquierda del punto decimal. -1 redondea al múltiplo de 10 (decena) más cercano. Como 45.923 tiene 5 en unidades, redondea hacia arriba a 50.'
  },
  {
    id: 'q5',
    category: 'Números',
    question: '¿Cuál es la diferencia principal entre ROUND(45.923) y TRUNC(45.923)?',
    options: [
      'ROUND devuelve 46 y TRUNC devuelve 45.',
      'ROUND devuelve 45.92 y TRUNC devuelve 45.',
      'Ambos devuelven 46.',
      'TRUNC da error si no se especifica el segundo parámetro.'
    ],
    answer: 0,
    explanation: 'Al omitir el segundo parámetro, ambos operan al entero (0 decimales). ROUND(45.923) redondea a 46 porque la primera cifra decimal es 9 (>= 5), mientras que TRUNC(45.923) simplemente desecha los decimales y devuelve 45.'
  },
  {
    id: 'q6',
    category: 'Fechas',
    question: 'Si la fecha actual del sistema es \'25-JUL-03\', ¿cuál es el resultado de ROUND(SYSDATE, \'MONTH\')?',
    options: [
      '\'01-JUL-03\'',
      '\'01-AUG-03\'',
      '\'31-JUL-03\'',
      '\'25-JUL-03\''
    ],
    answer: 1,
    explanation: 'El punto de corte de redondeo mensual para fechas en Oracle es el día 16. Dado que el día 25 es mayor o igual a 16, la fecha se redondea al primer día del mes siguiente: \'01-AUG-03\'.'
  },
  {
    id: 'q7',
    category: 'Fechas',
    question: '¿Qué operación aritmética de fechas devuelve el NÚMERO DE DÍAS transcurridos entre dos fechas?',
    options: [
      'fecha1 + fecha2',
      'fecha1 - fecha2',
      'fecha1 * fecha2',
      '(fecha1 + fecha2) / 24'
    ],
    answer: 1,
    explanation: 'En Oracle SQL, restar una fecha de otra (fecha1 - fecha2) produce un valor numérico que representa el número exacto de días entre ambas.'
  },
  {
    id: 'q8',
    category: 'Formato RR',
    question: 'Bajo el formato de siglo RR, si el año actual del sistema es 1995 (rango 50-99) y en una consulta se inserta \'15-MAY-17\', ¿qué año interpreta Oracle?',
    options: [
      '1917',
      '2017',
      '1995',
      '1817'
    ],
    answer: 1,
    explanation: 'Si el año actual está entre 50 y 99 (1995) y el año especificado está entre 0 y 49 (17), la regla de la matriz RR asigna el siglo siguiente (siglo 21), resultando en 2017.'
  },
  {
    id: 'q9',
    category: 'Conversión',
    question: '¿Qué efecto tiene el prefijo "fm" en el formato TO_CHAR(hire_date, \'fmDD Month YYYY\')?',
    options: [
      'Convierte el texto a formato militar (Fill Military).',
      'Suprime los espacios de relleno en el nombre del mes y los ceros iniciales en el día.',
      'Fuerza a que el mes se muestre en mayúsculas fijas.',
      'Multiplica la fecha por el factor de mes.'
    ],
    answer: 1,
    explanation: 'El elemento "fm" (Fill Mode) elimina los espacios adicionales que Oracle inserta para rellenar los nombres de mes a 9 caracteres y elimina los ceros a la izquierda en los días.'
  },
  {
    id: 'q10',
    category: 'Nulos',
    question: '¿Qué devuelve NVL2(commission_pct, \'Con Comisión\', \'Sin Comisión\') cuando commission_pct es NULL?',
    options: [
      '\'Con Comisión\'',
      '\'Sin Comisión\'',
      'NULL',
      '0'
    ],
    answer: 1,
    explanation: 'NVL2(expr1, expr2, expr3) evalúa expr1. Si NO es nulo retorna expr2; si ES nulo retorna expr3 (\'Sin Comisión\').'
  },
  {
    id: 'q11',
    category: 'Nulos',
    question: '¿Cuál es el resultado de NULLIF(\'Oracle\', \'Oracle\')?',
    options: [
      '\'Oracle\'',
      'NULL',
      '0',
      'TRUE'
    ],
    answer: 1,
    explanation: 'NULLIF(expr1, expr2) compara ambas expresiones. Si son idénticas retorna NULL; si son diferentes retorna expr1.'
  },
  {
    id: 'q12',
    category: 'Condicionales',
    question: '¿Cuál es la función propietaria de Oracle que equivale a la expresión CASE de ANSI SQL?',
    options: [
      'IFTHEN',
      'DECODE',
      'SWITCH',
      'NVL'
    ],
    answer: 1,
    explanation: 'DECODE es la función tradicional y exclusiva de Oracle que permite realizar bifurcaciones condicionales tipo IF-THEN-ELSE dentro de sentencias SQL.'
  }
];
