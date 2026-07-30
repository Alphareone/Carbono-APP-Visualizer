# 🌐 Carbono-APP-Visualizer - Monitoreo Analítico de Entornos Dimensionales con Inyección Simulada (M.A.E.D.I.S)
### *Suite Analítica Ambiental e Instrumentación Avanzada — Versión 5.2.0*

> **M.A.E.D.I.S = Monitoreo Analítico de Entornos Dimensionales con Inyección Simulada**  
> *(La letra **S** corresponde a **Simulación de datos**, indicando que las métricas son generadas sintéticamente para pruebas y visualización.)*

---

## 📊 Origen y Evolución del Proyecto

**M.A.E.D.I.S** nació de una transformación técnica y estratégica continua. El proyecto original, *CarbonoApp / Carbono-App-Visualizer*, fue concebido en sus primeras fases (**v1.0.0 – v2.0.0**) como una herramienta de entrada manual de datos y almacenamiento en `LocalStorage` para registrar la huella de carbono industrial de manera centralizada.

A medida que el prototipo evolucionó hacia una consola integrada (**v3.0.0 – v4.x**), quedó en evidencia que las variables ambientales no actúan de forma aislada. La necesidad de monitorear simultáneamente contaminación acústica, flujos fotónicos y fluctuaciones térmicas motivó un rediseño total del núcleo del software. 

En la **versión 5.2.0**, el sistema se consolida como una **consola analítica de instrumentación avanzada** estilo "Centro de Comando" en tiempo real, con aislamiento absoluto de memoria en los canales de telemetría, procesamiento predictivo inercial y capas cartográficas dinámicas tácticas.

---

## 🚀 Características Innovadoras y Diferenciales

* **Aislamiento de Datos Integrado (`dataPool`):** Cada dimensión ambiental posee su propio búfer de memoria segregado. Al conmutar entre módulos, el núcleo destruye y regenera los flujos en caliente para prevenir colisiones de variables físicas y fugas de memoria.
* **Caché Histórico Retrospectivo:** El motor precarga instantáneamente un bloque retrospectivo de 15 minutos (300 registros cronológicos distribuidos en todos los canales) desde el milisegundo cero de ejecución.
* **Sincronización Unificada de Telemetría:** Un único motor temporal ajustado a intervalos de **450 ms** gobierna la actualización predictiva y el renderizado gráfico continuo.
* **Matriz Multi-Gráfico Adaptativa (Estructura 2x2):** Renderizado concurrente en una matriz elástica de 4 cuadrantes optimizada mediante *Chart.js v4.x*.
* **Telemetría Multidimensional de Cuatro Canales:**
  * **`CARB-X` (Carbono):** Monitoreo y proyección de partículas por millón (PPM CO₂).
  * **`LUX-NET` (Luminosidad):** Medición analítica de lúmenes y flujos fotónicos.
  * **`SONAR-IND` (Estrés Acústico):** Registro dinámico de contaminación sonora en decibelios (dB).
  * **`THERMO-GEN` (Termografía/Biometría):** Telemetría de temperaturas subterráneas y parámetros biológicos.
* **Radar Territorial Georreferenciado e Interfaz Cyberpunk (v5.2.0):** Cartografía vectorial basada en *Leaflet.js* con capa *Dark Matter*, enfocada en las macrozonas de emisión industriales de Chile (Valparaíso, Santiago, Concepción, entre otras).
  * **Capas de Información Interactiva (Hover):** Implementación de tooltips tácticos dinámicos (`.bindTooltip`) con clases CSS personalizadas (`.cyber-tooltip`). Ofrecen estética cyberpunk oscura, bordes verde neón, tipografía monospace y transparencias optimizadas, capturando eventos de mouse sin bloquear ni ralentizar los ciclos de telemetría de 450 ms.
* **Simulación Predictiva Inercial:** Algoritmos basados en *Random Walk* con inercia para emular variaciones físicas reales en la telemetría.
* **Pipelines de Exportación Corporativa:** Generación directa en el cliente de reportes consolidados en formatos **Excel (`.xlsx` vía SheetJS)** y **PDF estructurado (vía jsPDF)** sin dependencias de servidor.
* **Arquitectura Fluida Dual con UI/UX Táctico:** Adaptación responsive híbrida que transforma la barra lateral en una consola táctil inferior en pantallas móviles ($\le 768\text{px}$), sumado a la conmutación nativa entre modos **Oscuro (Predeterminado)** y **Claro**.

---

## 🛠️ Stack Tecnológico

* **Core Estructural:** HTML5 / CSS3 Avanzado (CSS Grid, Variables CSS, `.cyber-tooltip` styling)
* **Logic Core:** Vanilla JavaScript ES6+ (Motor `dataPool`, Random Walk inercial, Event Hooks para Leaflet)
* **Graphics Engine:** Chart.js v4.x
* **Geolocalización:** Leaflet.js + Tiles CartoDB Dark Matter
* **Icons:** Lucide Icons
* **Export Engines:** SheetJS (XLSX) & jsPDF

---

## 👥 Equipo de Ingeniería y Diseño

Este ecosistema analítico avanzado ha sido conceptualizado, diseñado y desarrollado de manera integral por el equipo de **A.B.C.A - Link**, impulsando la transformación de arquitecturas de datos tradicionales hacia entornos de simulación predictivos, escalables, inmersivos e innovadores.

---

## 📂 Arquitectura del Repositorio

```text
├── css/
│   └── styles.css       # Layout táctico, CSS Grid, variables CSS (Dark/Light), responsive y clases .cyber-tooltip
├── js/
│   └── main.js          # Controlador principal, dataPool, Historical Cache (15 min), mapa Leaflet y exportadores
├── index.html           # Estructura de consola 2x2 y contenedores de telemetría M.A.E.D.I.S
├── RegistroDeCambios(Changelog).md # Historial detallado de cambios y saltos de versión (v1.0.0 a v5.2.0)
└── README.md            # Documentación técnica general del proyecto
