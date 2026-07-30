# Registro de Cambios - M.A.E.D.I.S

Todo el desarrollo del núcleo del sistema, optimizaciones de memoria, evolución arquitectónica y actualizaciones de la interfaz táctica quedan documentados en este archivo.

---

## [v4.1.0] - 2026-07-19
### Añadido
* **Mapa Territorial:** Integración de Tooltips contextuales dinámicos (`.bindTooltip`) en las macrozonas de emisión de Chile (Valparaíso, Santiago, Concepción, entre otras).
* **Interfaz Visual:** Clases CSS personalizadas (`.cyber-tooltip`) con estética cyberpunk oscura, bordes verde neón, tipografía monospace y transparencias para garantizar legibilidad sin obstruir la visibilidad del mapa base.

### Modificado
* **Lógica del Mapa:** Modificación del bucle de renderizado georreferenciado en `main.js` para capturar eventos de puntero (`hover`) sobre los vectores de impacto sin interferir ni ralentizar los ciclos de telemetría de 450 ms.

---

## [v4.0.0] - Versión de Lanzamiento M.A.E.D.I.S
### Rediseño de Arquitectura (Evolución de CarbonoApp a Suite Multidimensional)
* **Aislamiento Estricto (`dataPool`):** Creación de un pool de datos segregado en memoria para cada dimensión analítica (`CARB-X`, `LUX-NET`, `SONAR-IND`, `THERMO-GEN`). Al cambiar de pestaña o módulo, el núcleo destruye las instancias activas y libera memoria en caliente para prevenir colisiones de variables físicas.
* **Caché Histórico Retrospectivo:** Implementación de un motor que precarga automáticamente un histórico simulado de 15 minutos (300 intervalos cronológicos distribuidos en todos los canales) desde el milisegundo cero de ejecución.
* **Sincronización Unificada:** Centralización de todos los procesos de actualización predictiva y renderizado gráfico bajo un único `setInterval` unificado ajustado a 450 ms.

### UI/UX Cyberpunk y Diseño Táctico
* **Layout 2x2 Dinámico:** Matriz adaptativa con CSS Grid para la renderización simultánea de gráficos analíticos dinámicos mediante Chart.js v4.x.
* **Evolución Responsive:** Reestructuración automatizada por `@media (max-width: 768px)` que convierte la barra lateral de navegación en una botonera táctil inferior estilo consola portátil.
* **Modo Dual Fluido:** Soporte completo de variables de marca CSS para transiciones nativas e instantáneas entre entornos de visualización Oscuro (Predeterminado) y Claro.

### Pipelines de Datos y Cartografía
* **Radar Territorial:** Integración de Leaflet.js con capas *Dark Matter* para la delimitación georreferenciada de macrozonas industriales.
* **Exportación Avanzada:** Integración de scripts para la generación directa en el cliente de reportes consolidados en formato Excel (`.xlsx` vía SheetJS) y PDF estructurado (vía jsPDF) sin dependencias de servidor.

---

## [v3.0.0] - Prototipo de Consola Integrada
### Añadido
* **Módulo Cartográfico Inicial:** Primera integración experimental de Leaflet.js enfocada en la macrozona central de Chile.
* **Internacionalización (i18n):** Sistema de traducción dinámico (Español/Inglés) mediante diccionarios en objetos JSON inyectados al DOM mediante JavaScript.
* **Simulación Predictiva:** Desarrollo de algoritmos basados en *Random Walk* inercial para simular fluctuaciones realistas de telemetría sintética en tiempo real.

### Modificado
* **Estructura del DOM:** Reorganización modular del archivo `index.html` para alojar contenedores dinámicos multi-gráfico.

---

## [v2.0.0] - CarbonoApp Multi-Registro
### Añadido
* **Persistencia Local:** Implementación de `LocalStorage` para el almacenamiento y persistencia de múltiples registros de huella de carbono industrial.

### Modificado
* **Componentes Gráficos:** Reemplazo de tablas estáticas por los primeros gráficos de líneas dinámicos utilizando Chart.js.
* **Lógica de Formulario:** Refactorización del flujo de captura de datos para permitir la creación, edición y eliminación de entradas industriales.

---

## [v1.0.0] - CarbonoApp Base
### Añadido
* **MVP (Producto Mínimo Viable):** Calculadora lineal estática para la estimación de huella de carbono industrial (PPM CO₂).
* **Layout Inicial:** Interfaz estructural básica en HTML5 y CSS3 convencional basada en formularios de entrada de datos y presentación tabular.
