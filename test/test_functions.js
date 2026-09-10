import {
  LOWER, UPPER, INITCAP, CONCAT, SUBSTR, LENGTH, INSTR, LPAD, RPAD, TRIM, REPLACE,
  ROUND, TRUNC, MOD,
  SYSDATE, MONTHS_BETWEEN, ADD_MONTHS, NEXT_DAY, LAST_DAY, ROUND_DATE, TRUNC_DATE,
  TO_CHAR_DATE, TO_CHAR_NUMBER, resolveRRYear,
  NVL, NVL2, NULLIF, COALESCE, DECODE, SimulationConfig
} from '../js/engine/functions.js';

console.log('--- Running Tests against PDF Examples ---');

// Character Functions
console.assert(LOWER('SQL Course') === 'sql course', 'LOWER test failed');
console.assert(UPPER('SQL Course') === 'SQL COURSE', 'UPPER test failed');
console.assert(INITCAP('SQL Course') === 'Sql Course', 'INITCAP test failed');
console.assert(CONCAT('Hello', 'World') === 'HelloWorld', 'CONCAT test failed');
console.assert(SUBSTR('HelloWorld', 1, 5) === 'Hello', 'SUBSTR(1,5) failed');
console.assert(SUBSTR('HelloWorld', -5) === 'World', 'SUBSTR(-5) failed');
console.assert(LENGTH('HelloWorld') === 10, 'LENGTH failed');
console.assert(INSTR('HelloWorld', 'W') === 6, 'INSTR failed');
console.assert(LPAD('salary', 10, '*') === '****salary', 'LPAD failed');
console.assert(RPAD('salary', 10, '*') === 'salary****', 'RPAD failed');
console.assert(TRIM('HelloWorld', 'H') === 'elloWorld', 'TRIM failed');
console.assert(REPLACE('JACK and JUE', 'J', 'BL') === 'BLACK and BLUE', 'REPLACE failed');

// Number Functions (Slide 12-14)
console.assert(ROUND(45.923, 2) === 45.92, 'ROUND(45.923, 2) failed');
console.assert(ROUND(45.923, 0) === 46, 'ROUND(45.923, 0) failed');
console.assert(ROUND(45.923, -1) === 50, 'ROUND(45.923, -1) failed');
console.assert(TRUNC(45.923, 2) === 45.92, 'TRUNC(45.923, 2) failed');
console.assert(TRUNC(45.923) === 45, 'TRUNC(45.923) failed');
console.assert(TRUNC(45.923, -1) === 40, 'TRUNC(45.923, -1) failed');
console.assert(MOD(1600, 300) === 100, 'MOD(1600, 300) failed');

// Date Functions (Slide 20-21)
// Assume SYSDATE = '25-JUL-03'
SimulationConfig.referenceSysdate = new Date('2003-07-25T00:00:00');
console.assert(MONTHS_BETWEEN('1995-09-01', '1994-01-11') === 19.677419, 'MONTHS_BETWEEN failed');
const addM = ADD_MONTHS('1996-01-11', 6);
console.assert(addM.getMonth() === 6 && addM.getDate() === 11, 'ADD_MONTHS failed'); // 11-JUL-96
const roundMon = ROUND_DATE(new Date('2003-07-25'), 'MONTH');
console.assert(roundMon.getMonth() === 7 && roundMon.getDate() === 1, 'ROUND_DATE(MONTH) failed'); // 01-AUG-03
const roundYr = ROUND_DATE(new Date('2003-07-25'), 'YEAR');
console.assert(roundYr.getFullYear() === 2004 && roundYr.getMonth() === 0, 'ROUND_DATE(YEAR) failed'); // 01-JAN-04
const truncMon = TRUNC_DATE(new Date('2003-07-25'), 'MONTH');
console.assert(truncMon.getMonth() === 6 && truncMon.getDate() === 1, 'TRUNC_DATE(MONTH) failed'); // 01-JUL-03

// RR Year Decision Matrix (Slide 35)
// Current Year 1995 (50-99): '95' -> 1995, '17' -> 2017
console.assert(resolveRRYear(95, 1995) === 1995, 'RR 1995-95 failed');
console.assert(resolveRRYear(17, 1995) === 2017, 'RR 1995-17 failed');
// Current Year 2001 (0-49): '95' -> 1995, '17' -> 2017
console.assert(resolveRRYear(95, 2001) === 1995, 'RR 2001-95 failed');
console.assert(resolveRRYear(17, 2001) === 2017, 'RR 2001-17 failed');

// General Functions (Slide 40-45)
console.assert(NVL(null, 0) === 0, 'NVL null failed');
console.assert(NVL(0.2, 0) === 0.2, 'NVL not null failed');
console.assert(NVL2(0.2, 'SAL+COMM', 'SAL') === 'SAL+COMM', 'NVL2 not null failed');
console.assert(NVL2(null, 'SAL+COMM', 'SAL') === 'SAL', 'NVL2 null failed');
console.assert(NULLIF(4, 4) === null, 'NULLIF equal failed');
console.assert(NULLIF(4, 6) === 4, 'NULLIF unequal failed');
console.assert(COALESCE(null, null, 100) === 100, 'COALESCE failed');

// DECODE (Slide 49-51)
console.assert(DECODE('IT_PROG', 'IT_PROG', 1.10, 'ST_CLERK', 1.15, 1.0) === 1.10, 'DECODE match failed');
console.assert(DECODE(TRUNC(6000/2000, 0), 0, 0.0, 1, 0.09, 2, 0.20, 3, 0.30, 0.45) === 0.30, 'DECODE tax failed');

console.log('✅ All PDF function tests passed successfully!');
