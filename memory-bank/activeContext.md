# Active Context: Oracle SQL Single-Row Functions Learning Platform

## Estado Actual
- **Fase**: Corrección de bug visual (Renderizado de texto y tablas markdown en el curso).
- **Acción Reciente**:
  - Detección de que las tablas en markdown dentro de `curriculum.js` se muestran como texto plano sin procesar con pipes (`|`) en lugar de tablas HTML con filas y columnas formateadas.
  - Corrección del formateador markdown en `js/app.js` para renderizar correctamente tablas HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`), listas, párrafos y negritas.
- **Siguiente Paso**:
  - Actualizar `js/app.js` con un parser markdown ligero y robusto.
  - Verificar en el navegador con captura de pantalla que las tablas y textos se ven impecables.
  - Sincronizar memoria del proyecto.

## Focos Activos
- Corregir el renderizado de texto y tablas en el Módulo 2 y demás módulos del curso.
