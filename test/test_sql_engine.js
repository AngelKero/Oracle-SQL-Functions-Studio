import { SQLEngine } from '../js/engine/sqlEngine.js';

const engine = new SQLEngine();

const PDF_QUERIES = [
  // Page 8
  { name: 'Page 8 (LOWER in WHERE)', sql: "SELECT employee_id, last_name, department_id FROM employees WHERE LOWER(last_name) = 'higgins'" },
  // Page 10
  { name: 'Page 10 (CONCAT, LENGTH, INSTR, SUBSTR)', sql: "SELECT employee_id, CONCAT(first_name, last_name) NAME, job_id, LENGTH(last_name), INSTR(last_name, 'a') \"Contains 'a'?\" FROM employees WHERE SUBSTR(job_id, 4) = 'REP'" },
  // Page 12
  { name: 'Page 12 (ROUND on DUAL)', sql: "SELECT ROUND(45.923, 2), ROUND(45.923, 0), ROUND(45.923, -1) FROM dual" },
  // Page 13
  { name: 'Page 13 (TRUNC on DUAL)', sql: "SELECT TRUNC(45.923, 2), TRUNC(45.923), TRUNC(45.923, -1) FROM dual" },
  // Page 14
  { name: 'Page 14 (MOD)', sql: "SELECT last_name, salary, MOD(salary, 5000) FROM employees WHERE job_id = 'SA_REP'" },
  // Page 15
  { name: 'Page 15 (hire_date < 01-FEB-88)', sql: "SELECT last_name, hire_date FROM employees WHERE hire_date < '01-FEB-88'" },
  // Page 18
  { name: 'Page 18 (Date Arithmetic Weeks)', sql: "SELECT last_name, (SYSDATE-hire_date)/7 AS WEEKS FROM employees WHERE department_id = 90" },
  // Page 31
  { name: 'Page 31 (TO_CHAR with fmDD Month YYYY)', sql: "SELECT last_name, TO_CHAR(hire_date, 'fmDD Month YYYY') AS HIREDATE FROM employees" },
  // Page 33
  { name: 'Page 33 (TO_CHAR salary format)', sql: "SELECT TO_CHAR(salary, '$99,999.00') SALARY FROM employees WHERE last_name = 'Ernst'" },
  // Page 38
  { name: 'Page 38 (Nesting UPPER CONCAT SUBSTR)', sql: "SELECT last_name, UPPER(CONCAT(SUBSTR(last_name, 1, 8), '_US')) FROM employees WHERE department_id = 60" },
  // Page 41
  { name: 'Page 41 (NVL with commission_pct)', sql: "SELECT last_name, salary, NVL(commission_pct, 0), (salary*12) + (salary*12*NVL(commission_pct, 0)) AN_SAL FROM employees" },
  // Page 42
  { name: 'Page 42 (NVL2)', sql: "SELECT last_name, salary, commission_pct, NVL2(commission_pct, 'SAL+COMM', 'SAL') income FROM employees" },
  // Page 43
  { name: 'Page 43 (NULLIF)', sql: "SELECT first_name, LENGTH(first_name) \"expr1\", last_name, LENGTH(last_name) \"expr2\", NULLIF(LENGTH(first_name), LENGTH(last_name)) result FROM employees" },
  // Page 45
  { name: 'Page 45 (COALESCE)', sql: "SELECT last_name, COALESCE(manager_id, commission_pct, -1) comm FROM employees ORDER BY commission_pct" },
  // Page 48
  { name: 'Page 48 (CASE Expression)', sql: "SELECT last_name, job_id, salary, CASE job_id WHEN 'IT_PROG' THEN 1.10*salary WHEN 'ST_CLERK' THEN 1.15*salary WHEN 'SA_REP' THEN 1.20*salary ELSE salary END \"REVISED_SALARY\" FROM employees" },
  // Page 50
  { name: 'Page 50 (DECODE Job)', sql: "SELECT last_name, job_id, salary, DECODE(job_id, 'IT_PROG', 1.10*salary, 'ST_CLERK', 1.15*salary, 'SA_REP', 1.20*salary, salary) REVISED_SALARY FROM employees" },
  // Page 51
  { name: 'Page 51 (DECODE TRUNC Salary Tax)', sql: "SELECT last_name, salary, DECODE(TRUNC(salary/2000, 0), 0, 0.00, 1, 0.09, 2, 0.20, 3, 0.30, 4, 0.40, 5, 0.42, 6, 0.44, 0.45) TAX_RATE FROM employees WHERE department_id = 80" }
];

console.log('--- Testing SQLEngine with PDF queries ---');
let passed = 0;
for (const q of PDF_QUERIES) {
  try {
    const res = engine.execute(q.sql);
    console.log(`✓ ${q.name} -> Rows: ${res.rowCount}, Cols: [${res.headers.join(', ')}] in ${res.executionTime}ms`);
    passed++;
  } catch (err) {
    console.error(`✗ ${q.name} failed:`, err.message);
  }
}

console.log(`\nResults: ${passed}/${PDF_QUERIES.length} queries passed.`);
if (passed === PDF_QUERIES.length) {
  console.log('🎉 ALL PDF QUERIES EXECUTED PERFECTLY!');
} else {
  process.exit(1);
}
