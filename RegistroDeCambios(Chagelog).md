---

### 📄 `RegistroDeCambios(Changelog).md` (Actualizado)


# Registro de Cambios - M.A.E.D.I.S

Todo el desarrollo del núcleo del sistema, optimizaciones de memoria, evolución arquitectónica y actualizaciones de la interfaz táctica quedan documentados en este archivo[cite: 7].

---

## [v4.1.0] - 2026-07-19
### Añadido
* **Mapa Territorial:** Integración de Tooltips contextuales dinámicos (`.bindTooltip`) en las macrozonas de emisión de Chile (Valparaíso, Santiago, Concepción, etc.)[cite: 7].
* **Interfaz Visual:** Clases CSS personalizadas (`.cyber-tooltip`) con estética cyberpunk oscura, bordes verde neón, tipografía monospace y transparencias para no obstruir la visibilidad del mapa base[cite: 7].

### Modificado
* **Lógica del Mapa:** Modificación exclusiva del bucle de renderizado georreferenciado en `main.js` para capturar eventos de mouse (hover) sobre los vectores de impacto sin afectar los ciclos de telemetría de 450 ms[cite: 7].

---

## [v4.0.0] - Versión de Lanzamiento M.A.E.D.I.S
### Rediseño de Arquitectura (De CarbonoApp a Suite Multidimensional)
* **Aislamiento Estricto (`dataPool`):** Creación de un pool de datos segregado en memoria para cada dimensión analítica (CARB-X, LUX-NET, SONAR-IND, THERMO-GEN)[cite: 7]. Al cambiar de pestaña, el núcleo destruye las instancias y libera memoria en caliente[cite: 7].
* **Caché Histórico Retrospectivo:** Implementación de un motor que precarga de forma inmediata un histórico simulado de 15 minutos (300 intervalos cronológicos) desde el segundo cero de ejecución de la app[cite: 7].
* **Sincronización Unificada:** Centralización de todos los procesos de actualización predictiva y renderizado gráfico bajo un único `setInterval` unificado ajustado a 450 ms[cite: 7].

### UI/UX Cyberpunk y Diseño Táctico
* **Layout 2x2 Dinámico:** Matriz adaptativa con CSS Grid para la renderización simultánea de gráficos analíticos mediante Chart.js[cite: 7].
* **Evolución Responsive:** Reestructuración automatizada por `@media (max-width: 768px)` que convierte la barra lateral de navegación en una botonera táctil inferior estilo consola portátil[cite: 7].
* **Modo Dual Fluido:** Soporte completo de variables de marca CSS para transiciones nativas entre entornos de visualización Oscuro (Predeterminado) y Claro[cite: 7].

### Pipelines de Datos
* **Exportación Avanzada:** Integración de scripts para la generación directa de reportes consolidados en formato Excel (.xlsx) y PDF estructurado sin dependencias de servidor[cite: 7].

---

## [v3.0.0] - Prototipo de Consola Integrada
### Añadido
* **Módulo Cartográfico Inicial:** Primera integración experimental de Leaflet.js enfocada en la macrozona central de Chile[cite: 7].
* **Internacionalización (i18n):** Sistema de traducción básico (Español/Inglés) mediante diccionarios en objetos JSON inyectados al DOM mediante JavaScript[cite: 7].
* **Simulación Predictiva:** Desarrollo de algoritmos basados en Random Walk inercial para simular fluctuaciones realistas en la telemetría de gases[cite: 7].

---

## [v2.0.0] - CarbonoApp Multi-Registro
### Modificado
* **Estructura de Datos:** Transición de una vista única a un sistema de almacenamiento local (LocalStorage) para guardar múltiples registros industriales de huella de carbono[cite: 7].
* **Componentes Gráficos:** Reemplazo de tablas estáticas por los primeros gráficos de líneas básicos utilizando Chart.js[cite: 7].

---

## [v1.0.0] - CarbonoApp Base
### Añadido
* **MVP (Producto Mínimo Viable):** Calculadora lineal estática para el registro de huella de carbono industrial[cite: 7].
* **Layout:** Interfaz básica en HTML y CSS convencional basada en formularios de entrada de datos[cite: 7].
