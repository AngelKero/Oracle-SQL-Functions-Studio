/**
 * Oracle SQL Single-Row Functions Engine
 * Full implementation matching Oracle Database semantics from the PDF:
 * "Using Single-Row Functions to Customize Output"
 */

export const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

export const MONTH_ABBR = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const DAY_NAMES = [
  'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'
];

export const DAY_ABBR = [
  'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
];

// Configurable global simulation state
export const SimulationConfig = {
  // Reference date for SYSDATE: defaults to current date, but can be set to PDF demo date ('2003-07-25')
  referenceSysdate: new Date('2003-07-25T14:32:45'),
  useFixedReferenceDate: true, // Defaults to PDF reference date for perfect textbook reproducibility
  getSysdate() {
    return this.useFixedReferenceDate
      ? new Date(this.referenceSysdate.getTime())
      : new Date();
  }
};

/* ==========================================================================
   1. CHARACTER FUNCTIONS
   ========================================================================== */

/** LOWER(str): Converts alpha character values to lowercase */
export function LOWER(str) {
  if (str === null || str === undefined) return null;
  return String(str).toLowerCase();
}

/** UPPER(str): Converts alpha character values to uppercase */
export function UPPER(str) {
  if (str === null || str === undefined) return null;
  return String(str).toUpperCase();
}

/** INITCAP(str): Converts the first letter of each word to uppercase and the rest to lowercase */
export function INITCAP(str) {
  if (str === null || str === undefined) return null;
  return String(str).replace(/(?:^|\s|\W)\w/g, match => match.toUpperCase()).replace(/(\w)(\w+)/g, (_, a, b) => a + b.toLowerCase());
}

/** CONCAT(str1, str2): Concatenates the first character value to the second character value */
export function CONCAT(str1, str2) {
  const s1 = str1 === null || str1 === undefined ? '' : String(str1);
  const s2 = str2 === null || str2 === undefined ? '' : String(str2);
  if (str1 === null && str2 === null) return null;
  return s1 + s2;
}

/**
 * SUBSTR(str, m, [n]): Returns specified characters from character value starting at character position m, n characters long
 * Note: Oracle 1-based indexing. If m is negative, counts backward from the end. If m is 0, treated as 1.
 */
export function SUBSTR(str, m, n) {
  if (str === null || str === undefined) return null;
  const s = String(str);
  let pos = parseInt(m, 10);
  if (isNaN(pos) || pos === 0) pos = 1;

  let startIndex;
  if (pos > 0) {
    startIndex = pos - 1; // 1-based to 0-based
  } else {
    startIndex = s.length + pos; // e.g., -5 from length 10 -> index 5
    if (startIndex < 0) startIndex = 0;
  }

  if (startIndex >= s.length) return '';

  if (n === undefined || n === null) {
    return s.substring(startIndex);
  }

  const len = parseInt(n, 10);
  if (isNaN(len) || len <= 0) return '';
  return s.substring(startIndex, startIndex + len);
}

/** LENGTH(str): Returns the number of characters in the expression */
export function LENGTH(str) {
  if (str === null || str === undefined) return null;
  return String(str).length;
}

/**
 * INSTR(str, substr, [m], [n]): Returns the numeric position of a named string
 * m: start position (default 1). If m < 0, search backwards.
 * n: occurrence number (default 1).
 */
export function INSTR(str, substr, m = 1, n = 1) {
  if (str === null || substr === null || str === undefined || substr === undefined) return null;
  const s = String(str);
  const sub = String(substr);
  let start = parseInt(m, 10);
  if (isNaN(start) || start === 0) start = 1;
  const occurrence = parseInt(n, 10) || 1;

  if (sub.length === 0) return 0;

  let foundCount = 0;

  if (start > 0) {
    let currIdx = start - 1;
    while (currIdx <= s.length) {
      const found = s.indexOf(sub, currIdx);
      if (found === -1) return 0;
      foundCount++;
      if (foundCount === occurrence) return found + 1; // 1-based
      currIdx = found + 1;
    }
  } else {
    // Negative start: search backward starting from length + start
    let maxIdx = s.length + start;
    if (maxIdx < 0) return 0;
    for (let i = maxIdx; i >= 0; i--) {
      if (s.substr(i, sub.length) === sub) {
        foundCount++;
        if (foundCount === occurrence) return i + 1;
      }
    }
  }
  return 0;
}

/** LPAD(str, n, [padChar]): Pads character value left-aligned to total width n */
export function LPAD(str, n, padChar = ' ') {
  if (str === null || str === undefined) return null;
  const s = String(str);
  const targetLen = parseInt(n, 10);
  if (isNaN(targetLen) || targetLen <= 0) return '';
  if (s.length >= targetLen) return s.substring(0, targetLen);

  const padStr = String(padChar) || ' ';
  const needed = targetLen - s.length;
  const repeated = padStr.repeat(Math.ceil(needed / padStr.length)).substring(0, needed);
  return repeated + s;
}

/** RPAD(str, n, [padChar]): Pads character value right-aligned to total width n */
export function RPAD(str, n, padChar = ' ') {
  if (str === null || str === undefined) return null;
  const s = String(str);
  const targetLen = parseInt(n, 10);
  if (isNaN(targetLen) || targetLen <= 0) return '';
  if (s.length >= targetLen) return s.substring(0, targetLen);

  const padStr = String(padChar) || ' ';
  const needed = targetLen - s.length;
  const repeated = padStr.repeat(Math.ceil(needed / padStr.length)).substring(0, needed);
  return s + repeated;
}

/**
 * TRIM([ [LEADING|TRAILING|BOTH] trim_char FROM ] str):
 * Trims leading or trailing characters (or both) from a character string.
 */
export function TRIM(str, trimChar = ' ', mode = 'BOTH') {
  if (str === null || str === undefined) return null;
  let s = String(str);
  const tc = String(trimChar || ' ')[0]; // Single character
  const escaped = tc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  if (mode === 'LEADING') {
    return s.replace(new RegExp(`^${escaped}+`), '');
  } else if (mode === 'TRAILING') {
    return s.replace(new RegExp(`${escaped}+$`), '');
  } else {
    return s.replace(new RegExp(`^${escaped}+|${escaped}+$`, 'g'), '');
  }
}

/** REPLACE(str, search_item, [replace_item]): Replaces a sequence of characters */
export function REPLACE(str, searchItem, replaceItem = '') {
  if (str === null || str === undefined) return null;
  if (searchItem === null || searchItem === undefined) return String(str);
  const s = String(str);
  const sItem = String(searchItem);
  const rItem = replaceItem === null || replaceItem === undefined ? '' : String(replaceItem);
  return s.split(sItem).join(rItem);
}


/* ==========================================================================
   2. NUMBER FUNCTIONS
   ========================================================================== */

/**
 * ROUND(num, [n]): Rounds value to specified decimal
 * If n is positive: round to n decimals
 * If n is 0 or omitted: round to nearest integer
 * If n is negative: round to tens (-1), hundreds (-2), etc.
 */
export function ROUND(num, n = 0) {
  if (num === null || num === undefined) return null;
  const val = Number(num);
  if (isNaN(val)) return null;
  const decimals = parseInt(n, 10) || 0;

  if (decimals >= 0) {
    const factor = Math.pow(10, decimals);
    return Math.round((val + Number.EPSILON) * factor) / factor;
  } else {
    // Negative decimals: tens, hundreds, etc.
    const factor = Math.pow(10, Math.abs(decimals));
    return Math.round(val / factor) * factor;
  }
}

/**
 * TRUNC(num, [n]): Truncates value to specified decimal without rounding
 */
export function TRUNC(num, n = 0) {
  if (num === null || num === undefined) return null;
  const val = Number(num);
  if (isNaN(val)) return null;
  const decimals = parseInt(n, 10) || 0;

  if (decimals >= 0) {
    const factor = Math.pow(10, decimals);
    return Math.trunc(val * factor) / factor;
  } else {
    const factor = Math.pow(10, Math.abs(decimals));
    return Math.trunc(val / factor) * factor;
  }
}

/** MOD(m, n): Returns remainder of division */
export function MOD(m, n) {
  if (m === null || n === null || m === undefined || n === undefined) return null;
  const numM = Number(m);
  const numN = Number(n);
  if (isNaN(numM) || isNaN(numN) || numN === 0) return null;
  return numM % numN;
}


/* ==========================================================================
   3. DATE FUNCTIONS & DATE ARITHMETIC
   ========================================================================== */

/** SYSDATE: Returns current date and time */
export function SYSDATE() {
  return SimulationConfig.getSysdate();
}

/** Helper to ensure Date object from string, timestamp, or Date */
export function parseDate(val) {
  if (!val) return null;
  if (val instanceof Date) return new Date(val.getTime());
  
  // Try ISO YYYY-MM-DD
  if (typeof val === 'string') {
    const isoMatch = val.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}):(\d{2}))?/);
    if (isoMatch) {
      return new Date(
        parseInt(isoMatch[1], 10),
        parseInt(isoMatch[2], 10) - 1,
        parseInt(isoMatch[3], 10),
        parseInt(isoMatch[4] || '0', 10),
        parseInt(isoMatch[5] || '0', 10),
        parseInt(isoMatch[6] || '0', 10)
      );
    }

    // Try Oracle DD-MON-RR or DD-MON-YYYY (e.g. '01-FEB-88', '17-JUN-87')
    const oraMatch = val.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})/);
    if (oraMatch) {
      const day = parseInt(oraMatch[1], 10);
      const monStr = oraMatch[2].toUpperCase();
      let year = parseInt(oraMatch[3], 10);
      if (year < 100) {
        year = resolveRRYear(year, SimulationConfig.getSysdate().getFullYear());
      }
      const monthIdx = MONTH_ABBR.indexOf(monStr);
      if (monthIdx !== -1) {
        return new Date(year, monthIdx, day);
      }
    }
  }

  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * MONTHS_BETWEEN(date1, date2):
 * Number of months between two dates.
 * If dates have same day of month or both are last day of month, result is integer.
 * Otherwise fractional based on 31 days per month.
 */
export function MONTHS_BETWEEN(date1, date2) {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  if (!d1 || !d2) return null;

  const yearDiff = d1.getFullYear() - d2.getFullYear();
  const monthDiff = d1.getMonth() - d2.getMonth();
  const day1 = d1.getDate();
  const day2 = d2.getDate();

  const isD1LastDay = isLastDayOfMonth(d1);
  const isD2LastDay = isLastDayOfMonth(d2);

  if (day1 === day2 || (isD1LastDay && isD2LastDay)) {
    return yearDiff * 12 + monthDiff;
  }

  const dayDiff = (d1.getTime() - new Date(d1.getFullYear(), d1.getMonth(), day2).getTime()) / (1000 * 60 * 60 * 24);
  const totalMonths = (yearDiff * 12 + monthDiff) + (dayDiff / 31);
  return Number(totalMonths.toFixed(6));
}

function isLastDayOfMonth(date) {
  const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  return nextDay.getMonth() !== date.getMonth();
}

/** ADD_MONTHS(date, n): Add n calendar months to date */
export function ADD_MONTHS(date, n) {
  const d = parseDate(date);
  if (!d) return null;
  const numMonths = parseInt(n, 10);
  if (isNaN(numMonths)) return null;

  const targetDay = d.getDate();
  const wasLastDay = isLastDayOfMonth(d);

  const res = new Date(d.getFullYear(), d.getMonth() + numMonths, 1);
  const lastDayInTargetMonth = new Date(res.getFullYear(), res.getMonth() + 1, 0).getDate();

  if (wasLastDay || targetDay > lastDayInTargetMonth) {
    res.setDate(lastDayInTargetMonth);
  } else {
    res.setDate(targetDay);
  }
  return res;
}

/**
 * NEXT_DAY(date, 'day_name'):
 * Next day of the week named 'day_name' (e.g. 'FRIDAY') following date.
 */
export function NEXT_DAY(date, dayName) {
  const d = parseDate(date);
  if (!d || !dayName) return null;

  const query = String(dayName).trim().toUpperCase();
  let targetDayIdx = DAY_NAMES.findIndex(n => n.startsWith(query));
  if (targetDayIdx === -1) {
    targetDayIdx = DAY_ABBR.findIndex(n => n === query);
  }
  if (targetDayIdx === -1) return null;

  const currentDayIdx = d.getDay();
  let daysToAdd = targetDayIdx - currentDayIdx;
  if (daysToAdd <= 0) daysToAdd += 7;

  const res = new Date(d.getTime());
  res.setDate(res.getDate() + daysToAdd);
  return res;
}

/** LAST_DAY(date): Last day of the month containing date */
export function LAST_DAY(date) {
  const d = parseDate(date);
  if (!d) return null;
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/**
 * ROUND(date, fmt):
 * fmt = 'MONTH': Day 1-15 rounds to 1st of current month; Day 16+ rounds to 1st of next month.
 * fmt = 'YEAR': Month 1-6 (Jan-Jun) rounds to Jan 1 of current year; Month 7-12 (Jul-Dec) rounds to Jan 1 of next year.
 */
export function ROUND_DATE(date, fmt = 'MONTH') {
  const d = parseDate(date);
  if (!d) return null;
  const f = String(fmt).toUpperCase().trim();

  if (f === 'YEAR' || f === 'YYYY' || f === 'YY') {
    const month = d.getMonth(); // 0 to 11 (0=Jan, 6=Jul)
    if (month >= 6) {
      return new Date(d.getFullYear() + 1, 0, 1);
    } else {
      return new Date(d.getFullYear(), 0, 1);
    }
  } else {
    // Default: 'MONTH'
    const day = d.getDate();
    if (day >= 16) {
      return new Date(d.getFullYear(), d.getMonth() + 1, 1);
    } else {
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
  }
}

/**
 * TRUNC(date, fmt):
 * fmt = 'MONTH': Truncates to 1st of current month.
 * fmt = 'YEAR': Truncates to Jan 1 of current year.
 */
export function TRUNC_DATE(date, fmt = 'MONTH') {
  const d = parseDate(date);
  if (!d) return null;
  const f = String(fmt).toUpperCase().trim();

  if (f === 'YEAR' || f === 'YYYY' || f === 'YY') {
    return new Date(d.getFullYear(), 0, 1);
  } else {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }
}


/* ==========================================================================
   4. CONVERSION FUNCTIONS & RR FORMAT MATRIX
   ========================================================================== */

/**
 * RR Date Format Algorithm:
 * Slide 35-36: Resolves 2-digit year based on current year's century.
 * Range 0-49 vs 50-99.
 */
export function resolveRRYear(twoDigitYear, currentFullYear = 2026) {
  const yy = parseInt(twoDigitYear, 10) % 100;
  const currentCentury = Math.floor(currentFullYear / 100) * 100;
  const currentLastTwo = currentFullYear % 100;

  if (currentLastTwo <= 49) {
    if (yy <= 49) {
      return currentCentury + yy; // Current century
    } else {
      return currentCentury - 100 + yy; // Previous century
    }
  } else {
    if (yy <= 49) {
      return currentCentury + 100 + yy; // Next century
    } else {
      return currentCentury + yy; // Current century
    }
  }
}

/**
 * TO_CHAR(date, [format_model]):
 * Formats date to character string according to Oracle format models.
 * Handles 'fm' modifier (fill mode), YYYY, YEAR, MM, MONTH, MON, DD, DAY, DY, HH24, MI, SS, etc.
 */
export function TO_CHAR_DATE(date, format = 'DD-MON-RR') {
  const d = parseDate(date);
  if (!d) return null;

  let fmt = format;
  let isFillMode = false;
  if (fmt.startsWith('fm') || fmt.startsWith('FM')) {
    isFillMode = true;
    fmt = fmt.substring(2);
  }

  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const hours24 = d.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';

  // Replace literal quoted strings first: e.g. "of" or 'of'
  const literals = [];
  fmt = fmt.replace(/"([^"]*)"/g, (_, lit) => {
    literals.push(lit);
    return `###LIT${literals.length - 1}###`;
  });

  let res = fmt;

  // Year formats
  res = res.replace(/YYYY/g, String(year));
  res = res.replace(/YEAR/gi, numToWords(year).toUpperCase());
  res = res.replace(/RR/g, String(year % 100).padStart(2, '0'));
  res = res.replace(/YY/g, String(year % 100).padStart(2, '0'));

  // Month formats
  const fullMonth = MONTH_NAMES[month];
  const padMonth = isFillMode ? fullMonth : fullMonth.padEnd(9, ' ');
  res = res.replace(/MONTH/gi, padMonth);
  res = res.replace(/MON/gi, MONTH_ABBR[month]);
  res = res.replace(/MM/g, isFillMode ? String(month + 1) : String(month + 1).padStart(2, '0'));

  // Day formats
  const fullDay = DAY_NAMES[d.getDay()];
  const padDay = isFillMode ? fullDay : fullDay.padEnd(9, ' ');
  res = res.replace(/DAY/gi, padDay);
  res = res.replace(/DY/gi, DAY_ABBR[d.getDay()]);
  res = res.replace(/DD/g, isFillMode ? String(day) : String(day).padStart(2, '0'));

  // Time formats
  res = res.replace(/HH24/g, isFillMode ? String(hours24) : String(hours24).padStart(2, '0'));
  res = res.replace(/HH12|HH/g, isFillMode ? String(hours12) : String(hours12).padStart(2, '0'));
  res = res.replace(/MI/g, isFillMode ? String(minutes) : String(minutes).padStart(2, '0'));
  res = res.replace(/SS/g, isFillMode ? String(seconds) : String(seconds).padStart(2, '0'));
  res = res.replace(/AM|PM/g, ampm);

  // Restore literals
  res = res.replace(/###LIT(\d+)###/g, (_, idx) => literals[idx]);

  return res;
}

/** Simple English number to words helper for YEAR format */
function numToWords(year) {
  // Approximate for common Oracle display: e.g. 1994 -> NINETEEN NINETY-FOUR
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  const century = Math.floor(year / 100);
  const remainder = year % 100;

  function twoDigitWords(n) {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return tens[t] + (o ? '-' + ones[o] : '');
  }

  return `${twoDigitWords(century)} hundred ${twoDigitWords(remainder)}`.trim();
}

/**
 * TO_CHAR(num, [format_model]):
 * Formats number according to Oracle number format model elements:
 * 9, 0, $, L, ., ,, MI, PR, EEEE
 */
export function TO_CHAR_NUMBER(num, format = '999,999.99') {
  if (num === null || num === undefined) return null;
  const n = Number(num);
  if (isNaN(n)) return null;

  const fmt = format.trim();
  const hasCurrency = fmt.includes('$');
  const hasLocalCurrency = fmt.includes('L');
  const isPR = fmt.includes('PR'); // < > for negative
  const isMI = fmt.includes('MI'); // - at end

  // Determine decimal places from format
  const dotIndex = fmt.indexOf('.');
  let decimalPlaces = 0;
  if (dotIndex !== -1) {
    const afterDot = fmt.substring(dotIndex + 1).replace(/[^09]/g, '');
    decimalPlaces = afterDot.length;
  }

  const absVal = Math.abs(n);
  const fixedStr = absVal.toFixed(decimalPlaces);
  const parts = fixedStr.split('.');
  let intPart = parts[0];
  const decPart = parts[1] || '';

  // Add commas if format contains comma
  if (fmt.includes(',')) {
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let formatted = intPart;
  if (decimalPlaces > 0) {
    formatted += '.' + decPart;
  }

  // Prefix currency
  if (hasCurrency) formatted = '$' + formatted;
  if (hasLocalCurrency) formatted = 'USD' + formatted;

  // Handle negative representation
  if (n < 0) {
    if (isPR) {
      formatted = `<${formatted}>`;
    } else if (isMI) {
      formatted = `${formatted}-`;
    } else {
      formatted = `-${formatted}`;
    }
  }

  // Left pad space matching Oracle behavior
  return ' ' + formatted;
}

/** Generic TO_CHAR routing */
export function TO_CHAR(val, format) {
  if (val === null || val === undefined) return null;
  if (val instanceof Date || (typeof val === 'string' && (val.includes('-') || val.includes('/')) && isNaN(Number(val)))) {
    return TO_CHAR_DATE(val, format);
  }
  return TO_CHAR_NUMBER(val, format);
}

/** TO_NUMBER(char, [format]): Converts string to number */
export function TO_NUMBER(str) {
  if (str === null || str === undefined) return null;
  const cleaned = String(str).replace(/[$,\s]/g, '');
  const num = Number(cleaned);
  return isNaN(num) ? null : num;
}

/** TO_DATE(char, [format]): Converts string to Date */
export function TO_DATE(str, format = 'DD-MON-RR') {
  if (!str) return null;
  return parseDate(str);
}


/* ==========================================================================
   5. GENERAL FUNCTIONS (NULL HANDLING)
   ========================================================================== */

/** NVL(expr1, expr2): If expr1 is null, return expr2, else expr1 */
export function NVL(expr1, expr2) {
  return expr1 !== null && expr1 !== undefined ? expr1 : expr2;
}

/** NVL2(expr1, expr2, expr3): If expr1 is NOT null, return expr2; else expr3 */
export function NVL2(expr1, expr2, expr3) {
  return expr1 !== null && expr1 !== undefined ? expr2 : expr3;
}

/** NULLIF(expr1, expr2): Compares two expressions; if equal, returns null; else expr1 */
export function NULLIF(expr1, expr2) {
  return expr1 === expr2 ? null : expr1;
}

/** COALESCE(expr1, expr2, ...expr_n): Returns first non-null expression in list */
export function COALESCE(...args) {
  for (const arg of args) {
    if (arg !== null && arg !== undefined) return arg;
  }
  return null;
}


/* ==========================================================================
   6. CONDITIONAL EXPRESSIONS
   ========================================================================== */

/**
 * DECODE(col_or_expr, search1, result1, [search2, result2, ...], [default])
 * Emulates Oracle DECODE function
 */
export function DECODE(expr, ...args) {
  let i = 0;
  while (i < args.length - 1) {
    const search = args[i];
    const result = args[i + 1];
    if (expr === search) {
      return result;
    }
    i += 2;
  }
  // If odd number of args left, that's the default value
  if (i === args.length - 1) {
    return args[i];
  }
  return null;
}
