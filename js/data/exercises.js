/**
 * Interactive Exercises, Practices (Practice 3 & Practice 4) and Quizzes
 * Aligns with Lesson 3 (Single-Row Functions) and Lesson 4 (Group Functions).
 */

export const PRACTICE_EXERCISES = [
  // ==========================================
  // CLASE 1: SINGLE-ROW FUNCTIONS (PRACTICE 3)
  // ==========================================
  {
    id: 'p3-1',
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
  },

  // ==========================================
  // CLASE 2: GROUP FUNCTIONS (PRACTICE 4)
  // ==========================================
  {
    id: 'p4-1',
    classId: 'clase-2',
    title: 'Práctica 4 - Reto 1: Resumen Salarial de Representantes',
    category: 'Funciones de Grupo',
    difficulty: 'Fácil',
    description: 'Escribe una consulta que muestre el salario promedio (AVG), el salario máximo (MAX), el salario mínimo (MIN) y la suma total (SUM) de todos los empleados cuyo puesto de trabajo contenga las letras \'REP\' (job_id LIKE \'%REP%\').',
    starterSql: `SELECT AVG(salary), MAX(salary), MIN(salary), SUM(salary)
FROM employees
WHERE job_id LIKE '%REP%'`,
    solutionSql: `SELECT AVG(salary), MAX(salary), MIN(salary), SUM(salary)
FROM employees
WHERE job_id LIKE '%REP%'`,
    expectedCols: ['AVG(SALARY)', 'MAX(SALARY)', 'MIN(SALARY)', 'SUM(SALARY)'],
    hint: 'Aplica las cuatro funciones de grupo en el SELECT filtrando con WHERE job_id LIKE "%REP%".'
  },
  {
    id: 'p4-2',
    classId: 'clase-2',
    title: 'Práctica 4 - Reto 2: Total de Empleados vs Empleados con Comisión',
    category: 'Manejo de Nulos y Conteo',
    difficulty: 'Fácil',
    description: 'Genera un reporte para el departamento 80 que muestre el conteo total de empleados mediante COUNT(*) y el número de empleados que reciben comisión mediante COUNT(commission_pct).',
    starterSql: `SELECT COUNT(*) AS TOTAL_EMPS, COUNT(commission_pct) AS COMM_EMPS
FROM employees
WHERE department_id = 80`,
    solutionSql: `SELECT COUNT(*) AS TOTAL_EMPS, COUNT(commission_pct) AS COMM_EMPS
FROM employees
WHERE department_id = 80`,
    expectedCols: ['TOTAL_EMPS', 'COMM_EMPS'],
    hint: 'Recuerda que COUNT(*) cuenta todas las filas, mientras que COUNT(expr) únicamente cuenta filas donde expr no es NULL.'
  },
  {
    id: 'p4-3',
    classId: 'clase-2',
    title: 'Práctica 4 - Reto 3: Conteo de Departamentos Únicos Activos',
    category: 'Cláusula DISTINCT',
    difficulty: 'Intermedio',
    description: 'Escribe una consulta que calcule cuántos departamentos distintos (no nulos) tienen empleados asignados en la tabla EMPLOYEES utilizando COUNT y DISTINCT.',
    starterSql: `SELECT COUNT(DISTINCT department_id) AS NUM_DEPTS
FROM employees`,
    solutionSql: `SELECT COUNT(DISTINCT department_id) AS NUM_DEPTS
FROM employees`,
    expectedCols: ['NUM_DEPTS'],
    hint: 'La sintaxis es COUNT(DISTINCT columna). Oracle ignorará duplicados y valores NULL.'
  },
  {
    id: 'p4-4',
    classId: 'clase-2',
    title: 'Práctica 4 - Reto 4: Masa Salarial por Departamento y Puesto',
    category: 'GROUP BY Multicolumna',
    difficulty: 'Intermedio',
    description: 'Muestra el código del departamento (DEPARTMENT_ID), el puesto de trabajo (JOB_ID) y la suma total de salarios (SUM(salary)) para cada combinación de departamento y puesto.',
    starterSql: `SELECT department_id, job_id, SUM(salary) AS TOTAL_SALARY
FROM employees
GROUP BY department_id, job_id`,
    solutionSql: `SELECT department_id, job_id, SUM(salary) AS TOTAL_SALARY
FROM employees
GROUP BY department_id, job_id`,
    expectedCols: ['DEPARTMENT_ID', 'JOB_ID', 'TOTAL_SALARY'],
    hint: 'En la cláusula GROUP BY separa las columnas por coma: GROUP BY department_id, job_id.'
  },
  {
    id: 'p4-5',
    classId: 'clase-2',
    title: 'Práctica 4 - Reto 5: Puestos con Nómina Mayor a $13,000 (HAVING)',
    category: 'Restricción con HAVING',
    difficulty: 'Avanzado',
    description: 'Muestra el JOB_ID y la suma de salarios con el alias PAYROLL para todos los puestos que NO contengan \'REP\' (job_id NOT LIKE \'%REP%\'), agrupados por JOB_ID, conservando únicamente aquellos puestos cuya suma salarial sea mayor a $13,000 (HAVING) y ordenados por dicha suma de forma ascendente.',
    starterSql: `SELECT job_id, SUM(salary) PAYROLL
FROM employees
WHERE job_id NOT LIKE '%REP%'
GROUP BY job_id
HAVING SUM(salary) > 13000
ORDER BY SUM(salary)`,
    solutionSql: `SELECT job_id, SUM(salary) PAYROLL
FROM employees
WHERE job_id NOT LIKE '%REP%'
GROUP BY job_id
HAVING SUM(salary) > 13000
ORDER BY SUM(salary)`,
    expectedCols: ['JOB_ID', 'PAYROLL'],
    hint: 'Recuerda el orden lógico: SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ...'
  }
];

export const QUIZ_QUESTIONS = [
  // ==========================================
  // CLASE 1: SINGLE-ROW FUNCTIONS (QUIZZES)
  // ==========================================
  {
    id: 'q1',
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
    classId: 'clase-1',
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
  },

  // ==========================================
  // CLASE 2: GROUP FUNCTIONS (QUIZZES)
  // ==========================================
  {
    id: 'q13',
    classId: 'clase-2',
    category: 'Errores Oracle',
    question: '¿Qué error genera Oracle al ejecutar: SELECT department_id, COUNT(last_name) FROM employees;',
    options: [
      'ORA-00934: group function is not allowed here',
      'ORA-00937: not a single-group group function',
      'ORA-00904: invalid identifier',
      'La consulta se ejecuta correctamente sin errores.'
    ],
    answer: 1,
    explanation: 'ORA-00937 ocurre porque department_id es una columna individual que devuelve múltiples filas, mientras que COUNT(last_name) produce un único escalar de grupo, y no existe una cláusula GROUP BY para alinearlas.'
  },
  {
    id: 'q14',
    classId: 'clase-2',
    category: 'Errores Oracle',
    question: '¿Qué error arroja Oracle si intentas ejecutar: SELECT department_id, AVG(salary) FROM employees WHERE AVG(salary) > 8000 GROUP BY department_id;',
    options: [
      'ORA-00934: group function is not allowed here',
      'ORA-00937: not a single-group group function',
      'ORA-00923: FROM keyword not found where expected',
      'ORA-01476: divisor is equal to zero'
    ],
    answer: 0,
    explanation: 'ORA-00934 se produce porque no está permitido usar funciones de grupo dentro de la cláusula WHERE. WHERE filtra filas antes de agrupar. Para restringir grupos calculados debe emplearse la cláusula HAVING.'
  },
  {
    id: 'q15',
    classId: 'clase-2',
    category: 'Manejo de Nulos',
    question: '¿Por qué AVG(commission_pct) produce 0.2125 mientras que AVG(NVL(commission_pct, 0)) produce 0.0425 en una tabla de 20 empleados donde solo 4 tienen comisión?',
    options: [
      'Porque AVG ignora las filas con NULL dividiendo solo entre 4, mientras que NVL las convierte a 0 dividiendo entre las 20 filas.',
      'Porque NVL multiplica la comisión por cero.',
      'Porque AVG solo funciona si se acompaña de NVL.',
      'Es un error de redondeo de la base de datos.'
    ],
    answer: 0,
    explanation: 'Por defecto las funciones de grupo ignoran valores nulos (disminuyendo el denominador a 4). NVL sustituye los nulos por 0.00, obligando a AVG a considerar las 20 filas en el denominador.'
  },
  {
    id: 'q16',
    classId: 'clase-2',
    category: 'GROUP BY',
    question: 'En Oracle SQL, ¿es estrictamente obligatorio que la columna especificada en la cláusula GROUP BY aparezca en la lista del SELECT?',
    options: [
      'Sí, de lo contrario Oracle lanza el error ORA-00979.',
      'No. Una consulta puede agrupar por una columna sin incluirla en el SELECT (Pág. 14 del PDF).',
      'Solo si la consulta incluye la cláusula HAVING.',
      'Solo si se agrupa por más de una columna.'
    ],
    answer: 1,
    explanation: 'De acuerdo con la diapositiva 14 del PDF oficial de Oracle: "The GROUP BY column does not have to be in the SELECT list". Por ejemplo: SELECT AVG(salary) FROM employees GROUP BY department_id es perfectamente legal.'
  },
  {
    id: 'q17',
    classId: 'clase-2',
    category: 'Anidamiento',
    question: '¿A qué profundidad máxima permite Oracle anidar funciones de grupo (por ejemplo: MAX(AVG(salary)))?',
    options: [
      'Sin límite, al igual que las funciones de fila única.',
      'A una profundidad máxima de dos niveles.',
      'A un máximo de tres niveles.',
      'Las funciones de grupo nunca se pueden anidar en Oracle.'
    ],
    answer: 1,
    explanation: 'En Oracle SQL, las funciones de grupo solo pueden anidarse a una profundidad máxima de dos niveles (ej. MAX(AVG(salary))). Además, cuando se anidan, la cláusula GROUP BY es obligatoria.'
  },
  {
    id: 'q18',
    classId: 'clase-2',
    category: 'HAVING',
    question: '¿Cuál es la secuencia exacta de 3 pasos que realiza el servidor Oracle cuando se utiliza la cláusula HAVING (Pág. 20)?',
    options: [
      '1. Se aplica HAVING, 2. Se agrupan filas, 3. Se calcula el agregado.',
      '1. Rows are grouped, 2. The group function is applied, 3. Groups matching the HAVING clause are displayed.',
      '1. Se calcula el SELECT, 2. Se ordenan filas, 3. Se agrupan.',
      '1. Se eliminan nulos, 2. Se calcula HAVING, 3. Se agrupa.'
    ],
    answer: 1,
    explanation: 'Según la diapositiva 20 del PDF de Oracle: 1. Rows are grouped (se forman los grupos), 2. The group function is applied (se calcula el agregado del grupo), 3. Groups matching HAVING are displayed (se filtran los grupos).'
  },
  {
    id: 'q19',
    classId: 'clase-2',
    category: 'Polimorfismo',
    question: '¿Qué tipos de datos son admitidos por las funciones de grupo MIN y MAX en Oracle SQL?',
    options: [
      'Únicamente tipo NUMBER.',
      'Tipos NUMBER, VARCHAR2 y DATE.',
      'Solo tipo DATE y TIMESTAMP.',
      'Únicamente cadenas de texto VARCHAR2.'
    ],
    answer: 1,
    explanation: 'A diferencia de AVG y SUM (que solo aceptan tipos numéricos), MIN y MAX son polimórficas y operan sobre números, cadenas de caracteres (orden alfabético) y fechas (cronología).'
  },
  {
    id: 'q20',
    classId: 'clase-2',
    category: 'DISTINCT',
    question: 'Si la tabla EMPLOYEES tiene 20 empleados asignados a 7 departamentos distintos y 1 empleado sin departamento (NULL), ¿cuánto devuelve SELECT COUNT(DISTINCT department_id) FROM employees?',
    options: [
      '8 (cuenta el valor NULL como un departamento distinto)',
      '7 (cuenta solo los valores distintos no nulos)',
      '20 (cuenta todas las filas)',
      '19 (descarta la fila con NULL)'
    ],
    answer: 1,
    explanation: 'COUNT(DISTINCT expr) devuelve el número de valores distintos y no nulos de expr. Como el valor NULL es ignorado, retorna exactamente 7.'
  }
];
