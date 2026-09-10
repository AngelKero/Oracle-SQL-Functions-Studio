/**
 * Oracle HR Canonical Schema: EMPLOYEES & DUAL
 * Reflects standard Oracle Sample Schemas and PDF slide examples.
 */

export const DUAL_TABLE = [
  { DUMMY: 'X' }
];

export const EMPLOYEES_TABLE = [
  {
    employee_id: 100,
    first_name: 'Steven',
    last_name: 'King',
    email: 'SKING',
    phone_number: '515.123.4567',
    hire_date: '1987-06-17', // '17-JUN-87'
    job_id: 'AD_PRES',
    salary: 24000,
    commission_pct: null,
    manager_id: null,
    department_id: 90
  },
  {
    employee_id: 101,
    first_name: 'Neena',
    last_name: 'Kochhar',
    email: 'NKOCHHAR',
    phone_number: '515.123.4568',
    hire_date: '1989-09-21', // '21-SEP-89'
    job_id: 'AD_VP',
    salary: 17000,
    commission_pct: null,
    manager_id: 100,
    department_id: 90
  },
  {
    employee_id: 102,
    first_name: 'Lex',
    last_name: 'De Haan',
    email: 'LDEHAAN',
    phone_number: '515.123.4569',
    hire_date: '1993-01-13', // '13-JAN-93'
    job_id: 'AD_VP',
    salary: 17000,
    commission_pct: null,
    manager_id: 100,
    department_id: 90
  },
  {
    employee_id: 103,
    first_name: 'Alexander',
    last_name: 'Hunold',
    email: 'AHUNOLD',
    phone_number: '590.423.4567',
    hire_date: '1990-01-03', // '03-JAN-90'
    job_id: 'IT_PROG',
    salary: 9000,
    commission_pct: null,
    manager_id: 102,
    department_id: 60
  },
  {
    employee_id: 104,
    first_name: 'Bruce',
    last_name: 'Ernst',
    email: 'BERNST',
    phone_number: '590.423.4568',
    hire_date: '1991-05-21', // '21-MAY-91'
    job_id: 'IT_PROG',
    salary: 6000,
    commission_pct: null,
    manager_id: 103,
    department_id: 60
  },
  {
    employee_id: 105,
    first_name: 'David',
    last_name: 'Austin',
    email: 'DAUSTIN',
    phone_number: '590.423.4569',
    hire_date: '1997-06-25', // '25-JUN-97'
    job_id: 'IT_PROG',
    salary: 4800,
    commission_pct: null,
    manager_id: 103,
    department_id: 60
  },
  {
    employee_id: 106,
    first_name: 'Valli',
    last_name: 'Pataballa',
    email: 'VPATABAL',
    phone_number: '590.423.4560',
    hire_date: '1998-02-05', // '05-FEB-98'
    job_id: 'IT_PROG',
    salary: 4800,
    commission_pct: null,
    manager_id: 103,
    department_id: 60
  },
  {
    employee_id: 107,
    first_name: 'Diana',
    last_name: 'Lorentz',
    email: 'DLORENTZ',
    phone_number: '590.423.5567',
    hire_date: '1999-02-07', // '07-FEB-99'
    job_id: 'IT_PROG',
    salary: 4200,
    commission_pct: null,
    manager_id: 103,
    department_id: 60
  },
  {
    employee_id: 124,
    first_name: 'Kevin',
    last_name: 'Mourgos',
    email: 'KMOURGOS',
    phone_number: '650.123.5234',
    hire_date: '1999-11-16', // '16-NOV-99'
    job_id: 'ST_MAN',
    salary: 5800,
    commission_pct: null,
    manager_id: 100,
    department_id: 50
  },
  {
    employee_id: 141,
    first_name: 'Trenna',
    last_name: 'Rajs',
    email: 'TRAJS',
    phone_number: '650.121.8009',
    hire_date: '1995-10-17', // '17-OCT-95'
    job_id: 'ST_CLERK',
    salary: 3500,
    commission_pct: null,
    manager_id: 124,
    department_id: 50
  },
  {
    employee_id: 142,
    first_name: 'Curtis',
    last_name: 'Davies',
    email: 'CDAVIES',
    phone_number: '650.121.2994',
    hire_date: '1997-01-29', // '29-JAN-97'
    job_id: 'ST_CLERK',
    salary: 3100,
    commission_pct: null,
    manager_id: 124,
    department_id: 50
  },
  {
    employee_id: 143,
    first_name: 'Randall',
    last_name: 'Matos',
    email: 'RMATOS',
    phone_number: '650.121.2874',
    hire_date: '1998-03-15', // '15-MAR-98'
    job_id: 'ST_CLERK',
    salary: 2600,
    commission_pct: null,
    manager_id: 124,
    department_id: 50
  },
  {
    employee_id: 144,
    first_name: 'Peter',
    last_name: 'Vargas',
    email: 'PVARGAS',
    phone_number: '650.121.2004',
    hire_date: '1998-07-09', // '09-JUL-98'
    job_id: 'ST_CLERK',
    salary: 2500,
    commission_pct: null,
    manager_id: 124,
    department_id: 50
  },
  {
    employee_id: 149,
    first_name: 'Eleni',
    last_name: 'Zlotkey',
    email: 'EZLOTKEY',
    phone_number: '011.44.1344.429018',
    hire_date: '2000-01-29', // '29-JAN-00'
    job_id: 'SA_MAN',
    salary: 10500,
    commission_pct: 0.20,
    manager_id: 100,
    department_id: 80
  },
  {
    employee_id: 174,
    first_name: 'Ellen',
    last_name: 'Abel',
    email: 'EABEL',
    phone_number: '011.44.1644.429267',
    hire_date: '1996-05-11', // '11-MAY-96'
    job_id: 'SA_REP',
    salary: 11000,
    commission_pct: 0.30,
    manager_id: 149,
    department_id: 80
  },
  {
    employee_id: 176,
    first_name: 'Jonathon',
    last_name: 'Taylor',
    email: 'JTAYLOR',
    phone_number: '011.44.1644.429265',
    hire_date: '1998-03-24', // '24-MAR-98'
    job_id: 'SA_REP',
    salary: 8600,
    commission_pct: 0.20,
    manager_id: 149,
    department_id: 80
  },
  {
    employee_id: 178,
    first_name: 'Kimberely',
    last_name: 'Grant',
    email: 'KGRANT',
    phone_number: '011.44.1644.429263',
    hire_date: '1999-05-24', // '24-MAY-99'
    job_id: 'SA_REP',
    salary: 7000,
    commission_pct: 0.15,
    manager_id: null,
    department_id: null
  },
  {
    employee_id: 200,
    first_name: 'Jennifer',
    last_name: 'Whalen',
    email: 'JWHALEN',
    phone_number: '515.123.4444',
    hire_date: '1987-09-17', // '17-SEP-87'
    job_id: 'AD_ASST',
    salary: 4400,
    commission_pct: null,
    manager_id: 101,
    department_id: 10
  },
  {
    employee_id: 201,
    first_name: 'Michael',
    last_name: 'Hartstein',
    email: 'MHARTSTE',
    phone_number: '515.123.5555',
    hire_date: '1996-02-17', // '17-FEB-96'
    job_id: 'MK_MAN',
    salary: 13000,
    commission_pct: null,
    manager_id: 100,
    department_id: 20
  },
  {
    employee_id: 202,
    first_name: 'Pat',
    last_name: 'Fay',
    email: 'PFAY',
    phone_number: '603.123.6666',
    hire_date: '1997-08-17', // '17-AUG-97'
    job_id: 'MK_REP',
    salary: 6000,
    commission_pct: null,
    manager_id: 201,
    department_id: 20
  },
  {
    employee_id: 205,
    first_name: 'Shelley',
    last_name: 'Higgins',
    email: 'SHIGGINS',
    phone_number: '515.123.8080',
    hire_date: '1994-06-07', // '07-JUN-94'
    job_id: 'AC_MGR',
    salary: 12000,
    commission_pct: null,
    manager_id: 101,
    department_id: 110
  },
  {
    employee_id: 206,
    first_name: 'William',
    last_name: 'Gietz',
    email: 'WGIETZ',
    phone_number: '515.123.8181',
    hire_date: '1994-06-07', // '07-JUN-94'
    job_id: 'AC_ACCOUNT',
    salary: 8300,
    commission_pct: null,
    manager_id: 205,
    department_id: 110
  }
];

export const EMPLOYEES_SCHEMA = [
  { name: 'EMPLOYEE_ID', type: 'NUMBER(6)', nullable: 'NO', pk: true, desc: 'Identificador único del empleado' },
  { name: 'FIRST_NAME', type: 'VARCHAR2(20)', nullable: 'YES', pk: false, desc: 'Primer nombre del empleado' },
  { name: 'LAST_NAME', type: 'VARCHAR2(25)', nullable: 'NO', pk: false, desc: 'Apellido del empleado' },
  { name: 'EMAIL', type: 'VARCHAR2(25)', nullable: 'NO', pk: false, desc: 'Correo corporativo' },
  { name: 'PHONE_NUMBER', type: 'VARCHAR2(20)', nullable: 'YES', pk: false, desc: 'Número telefónico' },
  { name: 'HIRE_DATE', type: 'DATE', nullable: 'NO', pk: false, desc: 'Fecha de contratación' },
  { name: 'JOB_ID', type: 'VARCHAR2(10)', nullable: 'NO', pk: false, desc: 'Código del puesto ocupado' },
  { name: 'SALARY', type: 'NUMBER(8,2)', nullable: 'YES', pk: false, desc: 'Salario mensual en USD' },
  { name: 'COMMISSION_PCT', type: 'NUMBER(2,2)', nullable: 'YES', pk: false, desc: 'Porcentaje de comisión (0.00 a 1.00)' },
  { name: 'MANAGER_ID', type: 'NUMBER(6)', nullable: 'YES', pk: false, desc: 'ID del gerente directo' },
  { name: 'DEPARTMENT_ID', type: 'NUMBER(4)', nullable: 'YES', pk: false, desc: 'ID del departamento asignado' }
];
