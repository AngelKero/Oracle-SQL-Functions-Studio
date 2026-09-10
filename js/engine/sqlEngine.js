/**
 * In-Browser Oracle SQL Engine
 * Simulates SQL execution for Single-Row Functions queries.
 */

import { EMPLOYEES_TABLE, DUAL_TABLE } from '../data/employees.js';
import * as OraFuncs from './functions.js';

export class SQLEngine {
  constructor() {
    this.tables = {
      employees: EMPLOYEES_TABLE,
      dual: DUAL_TABLE
    };
  }

  /**
   * Executes a SQL query against the in-memory database
   */
  execute(sql) {
    const startTime = performance.now();
    const cleanSql = sql.trim().replace(/;$/, '');

    // Match SELECT ... FROM ... [WHERE ...] [ORDER BY ...]
    const selectMatch = cleanSql.match(/^SELECT\s+([\s\S]+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([\s\S]+?))?$/i);

    if (!selectMatch) {
      throw new Error("Sintaxis no reconocida. Asegúrate de usar la estructura: SELECT ... FROM employees|dual [WHERE ...] [ORDER BY ...]");
    }

    const selectClause = selectMatch[1].trim();
    const tableName = selectMatch[2].trim().toLowerCase();
    const whereClause = selectMatch[3] ? selectMatch[3].trim() : null;
    const orderByClause = selectMatch[4] ? selectMatch[4].trim() : null;

    if (!this.tables[tableName]) {
      throw new Error(`Tabla '${tableName.toUpperCase()}' no encontrada. Tablas disponibles: EMPLOYEES, DUAL`);
    }

    const sourceData = this.tables[tableName];

    // Filter rows with WHERE clause
    const filteredRows = sourceData.filter(row => {
      if (!whereClause) return true;
      return this.evaluateCondition(whereClause, row);
    });

    // Parse column expressions in SELECT
    const columnSpecs = this.parseSelectColumns(selectClause);

    // Project each row
    const projectedRows = filteredRows.map(row => {
      return columnSpecs.map(col => {
        return this.evaluateExpression(col.expression, row);
      });
    });

    // Handle ORDER BY
    if (orderByClause) {
      const orderCol = orderByClause.trim().toLowerCase();
      // find index
      const colIdx = columnSpecs.findIndex(c => c.alias.toLowerCase() === orderCol || c.expression.toLowerCase() === orderCol);
      const sortIdx = colIdx !== -1 ? colIdx : 0;
      projectedRows.sort((a, b) => {
        const valA = a[sortIdx];
        const valB = b[sortIdx];
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
    }

    const endTime = performance.now();

    return {
      headers: columnSpecs.map(c => c.alias.toUpperCase()),
      rows: projectedRows,
      rowCount: projectedRows.length,
      executionTime: (endTime - startTime).toFixed(2)
    };
  }

  /**
   * Splits SELECT clause by commas, respecting parentheses and quotes
   */
  parseSelectColumns(selectStr) {
    const rawCols = this.splitTopLevel(selectStr, ',');
    return rawCols.map((colStr, idx) => {
      let trimmed = colStr.trim();
      let alias = `COL_${idx + 1}`;

      // Check for CASE ... END AS Alias
      const caseMatch = trimmed.match(/^(CASE[\s\S]+?END)(?:\s+(?:AS\s+)?([a-zA-Z0-9_"]+))?$/i);
      if (caseMatch) {
        return {
          expression: caseMatch[1].trim(),
          alias: (caseMatch[2] || 'CASE_EXPR').replace(/"/g, '')
        };
      }

      // Check for Alias: e.g., expr AS alias OR expr alias OR expr "Alias"
      // Split by whitespace outside parentheses/quotes
      const parts = this.splitTopLevel(trimmed, ' ');
      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1].trim();
        const prevPart = parts[parts.length - 2].trim().toUpperCase();

        if (prevPart === 'AS') {
          alias = lastPart.replace(/"/g, '');
          const expr = parts.slice(0, parts.length - 2).join(' ').trim();
          return { expression: expr, alias };
        } else if (!lastPart.includes('(') && !lastPart.includes(')')) {
          alias = lastPart.replace(/"/g, '');
          const expr = parts.slice(0, parts.length - 1).join(' ').trim();
          return { expression: expr, alias };
        }
      }

      // Default: alias is the expression itself or clean column name
      alias = trimmed.replace(/"/g, '');
      return { expression: trimmed, alias };
    });
  }

  /**
   * Splits a string by delimiter only when not enclosed in parentheses or quotes
   */
  splitTopLevel(str, delimiter) {
    const tokens = [];
    let current = '';
    let parenDepth = 0;
    let inQuote = false;
    let quoteChar = '';

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];

      if ((ch === "'" || ch === '"') && !inQuote) {
        inQuote = true;
        quoteChar = ch;
        current += ch;
      } else if (ch === quoteChar && inQuote) {
        inQuote = false;
        quoteChar = '';
        current += ch;
      } else if (!inQuote && ch === '(') {
        parenDepth++;
        current += ch;
      } else if (!inQuote && ch === ')') {
        parenDepth--;
        current += ch;
      } else if (!inQuote && parenDepth === 0 && str.substr(i, delimiter.length) === delimiter) {
        tokens.push(current);
        current = '';
        i += delimiter.length - 1;
      } else {
        current += ch;
      }
    }
    if (current.trim().length > 0) {
      tokens.push(current);
    }
    return tokens;
  }

  /**
   * Evaluates expressions against row context
   */
  evaluateExpression(expr, row) {
    const trimmed = expr.trim();

    // 1. Literal number
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return parseFloat(trimmed);
    }

    // 2. Literal string: '...'
    if (/^'([\s\S]*)'$/.test(trimmed)) {
      return trimmed.slice(1, -1);
    }

    // 3. CASE Expression
    if (/^CASE/i.test(trimmed)) {
      return this.evaluateCase(trimmed, row);
    }

    // 4. Arithmetic with parens: e.g. (salary*12) + (salary*12*NVL(commission_pct, 0)) or (SYSDATE-hire_date)/7
    if (/[\+\-\*\/]/.test(trimmed) && !trimmed.startsWith("'") && !trimmed.startsWith('"')) {
      const evaled = this.evaluateArithmetic(trimmed, row);
      if (evaled !== undefined) return evaled;
    }

    // 5. Column name directly: e.g. last_name, salary
    const lowerKey = trimmed.toLowerCase();
    if (row && Object.prototype.hasOwnProperty.call(row, lowerKey)) {
      return row[lowerKey];
    }
    if (lowerKey === 'sysdate') {
      return OraFuncs.SYSDATE();
    }

    // 6. Function call: e.g. FUNC(arg1, arg2, ...)
    const funcMatch = trimmed.match(/^([a-zA-Z0-9_]+)\s*\(([\s\S]*)\)$/);
    if (funcMatch) {
      const funcName = funcMatch[1].toUpperCase();
      const rawArgsStr = funcMatch[2];
      const rawArgs = this.splitTopLevel(rawArgsStr, ',');
      const evaluatedArgs = rawArgs.map(arg => this.evaluateExpression(arg, row));

      return this.executeFunction(funcName, evaluatedArgs);
    }

    return trimmed;
  }

  /**
   * Executes known Oracle functions
   */
  executeFunction(funcName, args) {
    switch (funcName) {
      case 'LOWER': return OraFuncs.LOWER(args[0]);
      case 'UPPER': return OraFuncs.UPPER(args[0]);
      case 'INITCAP': return OraFuncs.INITCAP(args[0]);
      case 'CONCAT': return OraFuncs.CONCAT(args[0], args[1]);
      case 'SUBSTR': return OraFuncs.SUBSTR(args[0], args[1], args[2]);
      case 'LENGTH': return OraFuncs.LENGTH(args[0]);
      case 'INSTR': return OraFuncs.INSTR(args[0], args[1], args[2], args[3]);
      case 'LPAD': return OraFuncs.LPAD(args[0], args[1], args[2]);
      case 'RPAD': return OraFuncs.RPAD(args[0], args[1], args[2]);
      case 'TRIM': return OraFuncs.TRIM(args[0], args[1], args[2]);
      case 'REPLACE': return OraFuncs.REPLACE(args[0], args[1], args[2]);
      case 'ROUND':
        if (args[0] instanceof Date || (typeof args[0] === 'string' && (args[0].includes('-') || args[0].includes('/')) && isNaN(Number(args[0])))) {
          return OraFuncs.ROUND_DATE(args[0], args[1]);
        }
        return OraFuncs.ROUND(args[0], args[1]);
      case 'TRUNC':
        if (args[0] instanceof Date || (typeof args[0] === 'string' && (args[0].includes('-') || args[0].includes('/')) && isNaN(Number(args[0])))) {
          return OraFuncs.TRUNC_DATE(args[0], args[1]);
        }
        return OraFuncs.TRUNC(args[0], args[1]);
      case 'MOD': return OraFuncs.MOD(args[0], args[1]);
      case 'MONTHS_BETWEEN': return OraFuncs.MONTHS_BETWEEN(args[0], args[1]);
      case 'ADD_MONTHS': return OraFuncs.ADD_MONTHS(args[0], args[1]);
      case 'NEXT_DAY': return OraFuncs.NEXT_DAY(args[0], args[1]);
      case 'LAST_DAY': return OraFuncs.LAST_DAY(args[0]);
      case 'TO_CHAR': return OraFuncs.TO_CHAR(args[0], args[1]);
      case 'TO_NUMBER': return OraFuncs.TO_NUMBER(args[0]);
      case 'TO_DATE': return OraFuncs.TO_DATE(args[0], args[1]);
      case 'NVL': return OraFuncs.NVL(args[0], args[1]);
      case 'NVL2': return OraFuncs.NVL2(args[0], args[1], args[2]);
      case 'NULLIF': return OraFuncs.NULLIF(args[0], args[1]);
      case 'COALESCE': return OraFuncs.COALESCE(...args);
      case 'DECODE': return OraFuncs.DECODE(args[0], ...args.slice(1));
      default:
        return `[UNKNOWN_FUNC: ${funcName}]`;
    }
  }

  /**
   * Evaluates CASE expression:
   * CASE expr WHEN v1 THEN r1 WHEN v2 THEN r2 ELSE def END
   */
  evaluateCase(caseStr, row) {
    const simpleMatch = caseStr.match(/^CASE\s+([a-zA-Z0-9_]+)\s+([\s\S]+?)\s+END$/i);
    if (simpleMatch) {
      const targetVal = this.evaluateExpression(simpleMatch[1], row);
      const body = simpleMatch[2];

      const whenRegex = /WHEN\s+([\s\S]+?)\s+THEN\s+([\s\S]+?)(?=(?:WHEN|ELSE|$))/gi;
      let m;
      while ((m = whenRegex.exec(body)) !== null) {
        const whenVal = this.evaluateExpression(m[1].trim(), row);
        if (targetVal === whenVal) {
          return this.evaluateExpression(m[2].trim(), row);
        }
      }

      const elseMatch = body.match(/ELSE\s+([\s\S]+?)$/i);
      if (elseMatch) {
        return this.evaluateExpression(elseMatch[1].trim(), row);
      }
    }
    return null;
  }

  /**
   * Basic arithmetic expression resolver
   */
  evaluateArithmetic(expr, row) {
    try {
      // Tokenize identifiers and replace with evaluated values
      const replaced = expr.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([\s\S]*?)\)|\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match, fn, fnArgs, id) => {
        if (fn) {
          const val = this.evaluateExpression(match, row);
          return typeof val === 'number' ? val : (val instanceof Date ? val.getTime() : `'${val}'`);
        }
        if (id) {
          const lower = id.toLowerCase();
          if (lower === 'sysdate') {
            return OraFuncs.SYSDATE().getTime();
          }
          if (row && Object.prototype.hasOwnProperty.call(row, lower)) {
            const v = row[lower];
            if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) {
              return new Date(v).getTime();
            }
            return v === null ? 0 : v;
          }
        }
        return match;
      });

      // If subtracting dates: (SYSDATE-hire_date)/7 -> milliseconds diff to days: / (1000*60*60*24)
      if (expr.toLowerCase().includes('sysdate') && expr.toLowerCase().includes('hire_date')) {
        const sysTime = OraFuncs.SYSDATE().getTime();
        const hireTime = new Date(row.hire_date).getTime();
        const daysDiff = (sysTime - hireTime) / (1000 * 60 * 60 * 24);
        if (expr.includes('/7') || expr.includes('/ 7')) {
          return Math.trunc(daysDiff / 7);
        }
        return Math.trunc(daysDiff);
      }

      // Safe arithmetic evaluation
      const sanitized = replaced.replace(/[^0-9+\-*/().\s]/g, '');
      if (sanitized.trim()) {
        const result = Function(`"use strict"; return (${sanitized})`)();
        return typeof result === 'number' ? Math.round(result * 100) / 100 : result;
      }
    } catch {
      // Fallback
    }
    return undefined;
  }

  /**
   * Evaluates WHERE condition: handles =, <, >, <=, >=, !=, LIKE, IS NULL, IS NOT NULL, AND, OR
   */
  evaluateCondition(conditionStr, row) {
    const cond = conditionStr.trim();

    // Check for AND
    const andParts = this.splitTopLevel(cond, ' AND ');
    if (andParts.length > 1) {
      return andParts.every(part => this.evaluateCondition(part, row));
    }

    // Check for OR
    const orParts = this.splitTopLevel(cond, ' OR ');
    if (orParts.length > 1) {
      return orParts.some(part => this.evaluateCondition(part, row));
    }

    // Operators
    const opRegex = /^(.*?)\s*(=|!=|<>|<=|>=|<|>|LIKE|IS NOT NULL|IS NULL)\s*(.*)$/i;
    const match = cond.match(opRegex);
    if (!match) return true;

    const leftExpr = match[1].trim();
    const op = match[2].trim().toUpperCase();
    const rightExpr = match[3] ? match[3].trim() : '';

    const leftVal = this.evaluateExpression(leftExpr, row);

    if (op === 'IS NULL') {
      return leftVal === null || leftVal === undefined;
    }
    if (op === 'IS NOT NULL') {
      return leftVal !== null && leftVal !== undefined;
    }

    let rightVal = this.evaluateExpression(rightExpr, row);

    // Special handling for date comparisons
    if ((leftVal instanceof Date || (typeof leftVal === 'string' && leftVal.includes('-'))) &&
        (rightVal instanceof Date || (typeof rightVal === 'string' && (rightVal.includes('-') || rightVal.includes('/'))))) {
      const dLeft = OraFuncs.parseDate(leftVal);
      const dRight = OraFuncs.parseDate(rightVal);
      if (dLeft && dRight) {
        if (op === '<') return dLeft < dRight;
        if (op === '<=') return dLeft <= dRight;
        if (op === '>') return dLeft > dRight;
        if (op === '>=') return dLeft >= dRight;
        if (op === '=') return dLeft.getTime() === dRight.getTime();
      }
    }

    if (op === '=') return String(leftVal).toLowerCase() === String(rightVal).toLowerCase();
    if (op === '!=' || op === '<>') return String(leftVal).toLowerCase() !== String(rightVal).toLowerCase();
    if (op === '<') return Number(leftVal) < Number(rightVal);
    if (op === '<=') return Number(leftVal) <= Number(rightVal);
    if (op === '>') return Number(leftVal) > Number(rightVal);
    if (op === '>=') return Number(leftVal) >= Number(rightVal);
    if (op === 'LIKE') {
      const pattern = String(rightVal).replace(/%/g, '.*').replace(/_/g, '.');
      return new RegExp(`^${pattern}$`, 'i').test(String(leftVal));
    }

    return true;
  }
}
