# System Patterns: Oracle SQL Functions Studio

## Arquitectura de la Aplicación
La aplicación se diseña como una Single-Page Application (SPA) moderna, de alto rendimiento, modular y sin dependencias externas pesadas:

```
[index.html]
    │
    ├── [css/sql-studio.css] (Design System, Tokens, Glassmorphism, Dark Mode)
    │
    └── [js/app.js] (Orquestador principal y Router hash)
            │
            ├── [js/engine/sqlEngine.js] (Motor SQL en memoria)
            │      ├── [js/engine/functions.js] (Implementación semántica de funciones)
            │      └── [js/data/employees.js] (Tablas EMPLOYEES y DUAL)
            │
            ├── [js/data/curriculum.js] (Jerarquía: Clases -> Temas -> Módulos)
            ├── [js/data/exercises.js] (Práctica 3, Práctica 4, Quizzes Clase 1 & 2)
            ├── [js/data/cheatsheet.js] (Referencia rápida completa)
            ├── [js/data/icons.js] (SVGs Feather incrustados)
            │
            └── [js/visualizers/] (7 herramientas interactivas)
                   ├── stringVisualizer.js
                   ├── numberVisualizer.js
                   ├── dateVisualizer.js
                   ├── rrFormatVisualizer.js
                   ├── nullLogicVisualizer.js
                   ├── nestingVisualizer.js
                   └── groupVisualizer.js (Partición en Buckets, HAVING y ORA Simulator)
```

## Patrones del Motor SQL (`sqlEngine.js`)
1. **Pipeline de Ejecución Estilo Oracle**:
   - **Paso 1: FROM**: Selección de la fuente (`employees` o `dual`).
   - **Paso 2: WHERE**: Filtrado de filas individuales antes de agrupar.
     - *Validación*: Si se detecta una función de grupo en `WHERE`, se lanza de inmediato:
       `ORA-00934: group function is not allowed here`.
   - **Paso 3: GROUP BY**: Partición de filas en buckets basados en la clave compuesta de agrupación.
     - Si hay funciones de grupo pero no hay cláusula `GROUP BY`, se genera un grupo global único.
     - *Validación ORA-00937*: Si una columna individual no agregada aparece en el `SELECT` y no está en la cláusula `GROUP BY`, se lanza:
       `ORA-00937: not a single-group group function`.
   - **Paso 4: Evaluación de Agregaciones**:
     - Cálculo de `AVG`, `SUM`, `MIN`, `MAX`, `COUNT(*)`, `COUNT(col)`, `COUNT(DISTINCT col)`, `STDDEV`, `VARIANCE`.
     - Soporte para agregaciones anidadas (`MAX(AVG(salary))`): Calcula la agregación interna para cada grupo y luego la externa a través de todos los grupos.
   - **Paso 5: HAVING**: Filtrado de los grupos generados comparando el resultado de las funciones de grupo o columnas agrupadas contra constantes o expresiones.
   - **Paso 6: SELECT & ORDER BY**: Proyección final de columnas, alias y ordenamiento (`ASC` / `DESC`).

2. **Manejo de Nulos en Agregación**:
   - `COUNT(*)` cuenta todas las filas del grupo, incluyendo aquellas con valores nulos.
   - `COUNT(col)`, `AVG(col)`, `SUM(col)`, `MIN(col)`, `MAX(col)` ignoran explícitamente los valores `NULL`.
   - Si se requiere incluir los valores nulos en el cálculo del promedio, se combina con `NVL`: `AVG(NVL(commission_pct, 0))`.

## Patrones de UI y Routing
1. **Routing por Hash Amigable**:
   - `switchTab(tab, updateHash)` y `navigateToTab(tab, updateHash)` para vistas principales (`#curso`, `#visualizers`, `#studio`, `#practicas`, `#cheatsheet`, `#esquema`).
   - Sub-enrutamiento para herramientas del laboratorio: `#viz-group`, `#viz-string`, etc.
   - Sub-enrutamiento para módulos curriculares: `#mod-1` a `#mod-18`.
   - Inicialización idempotente que previene la sobreescritura del hash al cargar la página directamente con un enlace profundo.
2. **Jerarquía Curricular Dinámica**:
   - `CURRICULUM_CLASSES` exporta las clases principales.
   - `CURRICULUM_MODULES` mantiene compatibilidad con búsquedas planas y utilidades globales.
   - Selector de clases con barra de navegación segmentada (`.class-selector-bar`).
3. **Manejo de Desbordamiento y Responsividad**:
   - Estructura `.curriculum-layout` basada en `grid-template-columns: 320px minmax(0, 1fr)`.
   - Contenedores con `min-width: 0; max-width: 100%; overflow: hidden;` para prevenir fugas horizontales por tablas anchas.
   - `.table-responsive-wrapper` con scrollbar personalizado para visualización limpia en móviles y escritorios.
