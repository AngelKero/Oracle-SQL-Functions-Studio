import { SQLEngine } from '../js/engine/sqlEngine.js';

const engine = new SQLEngine();

const LESSON_4_QUERIES = [
  // Page 6: AVG, MAX, MIN, SUM with WHERE
  {
    name: 'Pág. 6: AVG, MAX, MIN, SUM con job_id LIKE %REP%',
    sql: "SELECT AVG(salary), MAX(salary), MIN(salary), SUM(salary) FROM employees WHERE job_id LIKE '%REP%'",
    validator: (res) => {
      // AVG=8150, MAX=11000, MIN=6000, SUM=32600
      const row = res.rows[0];
      return res.rowCount === 1 && row[0] === 8150 && row[1] === 11000 && row[2] === 6000 && row[3] === 32600;
    }
  },
  // Page 7: MIN and MAX on DATE
  {
    name: 'Pág. 7: MIN(hire_date), MAX(hire_date)',
    sql: "SELECT MIN(hire_date), MAX(hire_date) FROM employees",
    validator: (res) => {
      return res.rowCount === 1 && res.rows[0][0].includes('87') && res.rows[0][1].includes('00');
    }
  },
  // Page 8: COUNT(*) on department 50
  {
    name: 'Pág. 8: COUNT(*) con department_id = 50',
    sql: "SELECT COUNT(*) FROM employees WHERE department_id = 50",
    validator: (res) => {
      return res.rowCount === 1 && res.rows[0][0] === 5;
    }
  },
  // Page 8: COUNT(expr) with NULLs on department 80
  {
    name: 'Pág. 8: COUNT(commission_pct) con department_id = 80',
    sql: "SELECT COUNT(commission_pct) FROM employees WHERE department_id = 80",
    validator: (res) => {
      return res.rowCount === 1 && res.rows[0][0] === 3;
    }
  },
  // Page 9: COUNT(DISTINCT expr)
  {
    name: 'Pág. 9: COUNT(DISTINCT department_id)',
    sql: "SELECT COUNT(DISTINCT department_id) FROM employees",
    validator: (res) => {
      return res.rowCount === 1 && res.rows[0][0] === 7;
    }
  },
  // Page 10: AVG(commission_pct) ignores nulls
  {
    name: 'Pág. 10: AVG(commission_pct)',
    sql: "SELECT AVG(commission_pct) FROM employees",
    validator: (res) => {
      return res.rowCount === 1 && Math.abs(res.rows[0][0] - 0.2125) < 0.001;
    }
  },
  // Page 10: AVG(NVL(commission_pct, 0)) forces null inclusion
  {
    name: 'Pág. 10: AVG(NVL(commission_pct, 0))',
    sql: "SELECT AVG(NVL(commission_pct, 0)) FROM employees",
    validator: (res) => {
      return res.rowCount === 1 && typeof res.rows[0][0] === 'number';
    }
  },
  // Page 13: GROUP BY department_id
  {
    name: 'Pág. 13: GROUP BY department_id',
    sql: "SELECT department_id, AVG(salary) FROM employees GROUP BY department_id",
    validator: (res) => {
      return res.rowCount === 8 && res.headers.includes('DEPARTMENT_ID') && res.headers.includes('AVG(SALARY)');
    }
  },
  // Page 14: GROUP BY column not in SELECT
  {
    name: 'Pág. 14: GROUP BY sin la columna en SELECT',
    sql: "SELECT AVG(salary) FROM employees GROUP BY department_id",
    validator: (res) => {
      return res.rowCount === 8 && res.headers.length === 1;
    }
  },
  // Page 16: GROUP BY multiple columns (department_id, job_id)
  {
    name: 'Pág. 16: GROUP BY department_id, job_id con SUM(salary)',
    sql: "SELECT department_id dept_id, job_id, SUM(salary) FROM employees GROUP BY department_id, job_id",
    validator: (res) => {
      return res.rowCount >= 12 && res.headers.includes('DEPT_ID') && res.headers.includes('JOB_ID');
    }
  },
  // Page 21: HAVING MAX(salary) > 10000
  {
    name: 'Pág. 21: HAVING MAX(salary) > 10000',
    sql: "SELECT department_id, MAX(salary) FROM employees GROUP BY department_id HAVING MAX(salary) > 10000",
    validator: (res) => {
      // Departments 20 (13000), 80 (11000), 90 (24000), 110 (12000)
      return res.rowCount === 4;
    }
  },
  // Page 22: WHERE NOT LIKE, GROUP BY, HAVING, ORDER BY
  {
    name: 'Pág. 22: WHERE NOT LIKE, GROUP BY, HAVING, ORDER BY',
    sql: "SELECT job_id, SUM(salary) PAYROLL FROM employees WHERE job_id NOT LIKE '%REP%' GROUP BY job_id HAVING SUM(salary) > 13000 ORDER BY SUM(salary)",
    validator: (res) => {
      // IT_PROG 19200, AD_PRES 24000, AD_VP 34000
      return res.rowCount === 3 && res.rows[0][1] <= res.rows[1][1] && res.rows[1][1] <= res.rows[2][1];
    }
  },
  // Page 23: Nesting group functions: MAX(AVG(salary))
  {
    name: 'Pág. 23: MAX(AVG(salary)) GROUP BY department_id',
    sql: "SELECT MAX(AVG(salary)) FROM employees GROUP BY department_id",
    validator: (res) => {
      // Dept 90 has highest avg (19333.3333)
      return res.rowCount === 1 && Math.abs(res.rows[0][0] - 19333.3333) < 0.1;
    }
  }
];

console.log('--- Testing SQLEngine with Lesson 4 Group Function Queries ---');
let passed = 0;
for (const q of LESSON_4_QUERIES) {
  try {
    const res = engine.execute(q.sql);
    const valid = q.validator ? q.validator(res) : true;
    if (valid) {
      console.log(`✓ ${q.name} -> Rows: ${res.rowCount}, Sample: ${JSON.stringify(res.rows[0])} in ${res.executionTime}ms`);
      passed++;
    } else {
      console.error(`✗ ${q.name} validation failed. Result:`, res);
    }
  } catch (err) {
    console.error(`✗ ${q.name} error:`, err.message);
  }
}

// Error tests: ORA-00937 and ORA-00934
console.log('\n--- Testing Oracle Error Diagnosis (ORA-00937 & ORA-00934) ---');

// Pág. 17: ORA-00937 (Column missing in GROUP BY)
try {
  engine.execute("SELECT department_id, COUNT(last_name) FROM employees");
  console.error("✗ Expected ORA-00937 error but query succeeded");
} catch (err) {
  if (err.message.includes('ORA-00937')) {
    console.log(`✓ Correctly caught Pág. 17 Error: "${err.message}"`);
    passed++;
  } else {
    console.error(`✗ Unexpected error for Pág. 17: ${err.message}`);
  }
}

// Pág. 18: ORA-00934 (Group function in WHERE clause)
try {
  engine.execute("SELECT department_id, AVG(salary) FROM employees WHERE AVG(salary) > 8000 GROUP BY department_id");
  console.error("✗ Expected ORA-00934 error but query succeeded");
} catch (err) {
  if (err.message.includes('ORA-00934')) {
    console.log(`✓ Correctly caught Pág. 18 Error: "${err.message}"`);
    passed++;
  } else {
    console.error(`✗ Unexpected error for Pág. 18: ${err.message}`);
  }
}

const totalExpected = LESSON_4_QUERIES.length + 2;
console.log(`\nResults: ${passed}/${totalExpected} tests passed.`);
if (passed === totalExpected) {
  console.log('🎉 ALL LESSON 4 GROUP FUNCTION TESTS PASSED WITH 100% ACCURACY!');
} else {
  process.exit(1);
}
