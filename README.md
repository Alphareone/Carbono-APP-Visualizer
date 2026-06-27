# 🌐 MAEDIS - Panel de Extracción y Monitoreo Dimensional
### *Suite Analítica Ambiental e Instrumentación Avanzada*

## 📊 Origen del Proyecto: Evolución a la Suite Multidimensional

**MAEDIS** nació de una necesidad de evolución técnica, estratégica y de cumplimiento analítico. El proyecto original, *CarbonoApp / Carbono-App-Visualizer*, fue concebido inicialmente como una herramienta lineal y estática para registrar la huella de carbono industrial de manera centralizada. 

Sin embargo, en entornos operativos y críticos reales, las variables ambientales no actúan de forma aislada. La necesidad de monitorear simultáneamente la contaminación acústica, los flujos fotónicos (luminosidad) y las alteraciones térmicas de los sistemas evidenció las limitaciones de una arquitectura rígida. 

Para resolver esto, se rediseñó por completo el núcleo gráfico y estructural del software, transformándolo en una **simulación de consola analítica de carácter predictivo, inmersivo e innovador bajo el nombre de MAEDIS**. La idea central es simular un entorno de instrumentación avanzada y de "Centro de Comando" donde cada flujo de datos no solo se renderiza, sino que es sometido a métodos de análisis estadístico y matemático específicos en tiempo real, manteniendo un aislamiento absoluto de la memoria por cada canal de telemetría ambiental.

---

## 🚀 Características Innovadoras y Diferenciales

* **Aislamiento de Datos Integrado (`dataPool`):** A diferencia de arquitecturas compartidas, cada dimensión ambiental posee su propio búfer de memoria segregado en la aplicación. Al alternar de módulo, el núcleo destruye y regenera los flujos en caliente para garantizar un rendimiento óptimo y evitar colisiones de variables físicas.
* **Caché Histórico Retrospectivo:** Para solucionar el problema de exportaciones vacías en sistemas en tiempo real, el motor de datos inyecta automáticamente un bloque retrospectivo de 15 minutos (300 registros cronológicos distribuidos en todos los canales) desde el milisegundo cero de ejecución.
* **Matriz Multi-Gráfico Adaptativa (Estructura 2x2):** El sistema procesa de manera concurrente una matriz elástica de 4 cuadrantes con gráficos dinámicos optimizados mediante *Chart.js*. El entorno mitiga fugas de memoria críticas mediante la destrucción y reconstrucción controlada de instancias (`chart.destroy()`) en cada conmutación táctil o de pestaña.
* **Telemetría Multidimensional de Cuatro Canales:**
  * **`CARB-X` (Carbono):** Análisis de partículas por millón (PPM CO₂) mediante histogramas y líneas de tendencia.
  * **`LUX-NET` (Luminosidad):** Medición analítica de lúmenes y flujos fotónicos para control de contaminación lumínica.
  * **`SONAR-IND` (Estrés Acústico):** Monitoreo de decibelios (dB) en entornos industriales con alertas de picos críticos.
  * **`THERMO-GEN` (Termografía/Biometría):** Monitoreo de fluctuaciones térmicas subterráneas y telemetría biológica.
* **Radar Territorial Georreferenciado:** Integración avanzada con *Leaflet.js* acoplado a mapas de estilo *Dark Matter*. Al activar un módulo, el sistema detona simulaciones visuales de ondas de propagación concéntricas sobre sectores geográficos específicos (Estación RM, Zona Fabril, Centro, Subsuelo), emulando el impacto real de los contaminantes en el terreno.
* **Pipelines de Exportación Corporativa:** Compilación instantánea de datasets históricos mediante procesos asíncronos. Genera hojas de cálculo **Excel (XLSX)** segmentadas por pestañas analíticas mediante *SheetJS* y documentos de auditoría **PDF Consolidados** con tablas estructuradas cronológicamente a través de *jsPDF AutoTable*.
* **Arquitectura Fluida Dual con Diseño Táctico (UI/UX):** La interfaz implementa un enfoque híbrido extremo. En pantallas de escritorio (Desktop), utiliza *CSS Grid* para emular monitores empotrados con sombras de profundidad y estética cyber-industrial. En dispositivos móviles, el layout se adapta dinámicamente como una App nativa con menús iconográficos optimizados para el uso táctil en terreno.

---

## 🛠️ Stack Tecnológico

* **Core Estructural:** HTML5 / CSS3 Avanzado (Variables nativas CSS, Grid cuántica responsiva, efectos neón y Media Queries adaptativas).
* **Logic Core:** Vanilla JavaScript ES6+ (Programación asíncrona, Random Walk inercial para telemetría sintética, POO para el motor de partículas y aislamiento de buffers).
* **Graphics Engine:** Chart.js v4.x (Renderizado en canvas de alta tasa de refresco; áreas polares, radares cardinales y líneas de tensión).
* **Geolocalización:** Leaflet.js (Capas vectoriales dinámicas con manipulación de radios en tiempo real).
* **Icons:** Lucide Icons (Librería vectorial moderna de trazo limpio).
* **Export Engines:** SheetJS (xlsx.full.min.js) & jsPDF / jsPDF-AutoTable.

---

## 👥 Equipo de Ingeniería y Diseño

Este ecosistema analítico avanzado ha sido conceptualizado, diseñado y desarrollado de manera integral por el equipo de **A.B.C.A - Link**, impulsando la transformación de arquitecturas de datos tradicionales hacia entornos de simulación predictivos, escalables, inmersivos e innovadores.

---

## 📂 Arquitectura del Repositorio

```text
├── css/
│   └── styles.css       # Layout táctico, CSS Grid, variables de marca, responsive y efectos neón
├── js/
│   └── main.js          # Controlador lógico, Historical Cache, Leaflet Map y pipelines de exportación
├── index.html           # Interfaz estructural renovada y contenedores de la suite analítica MAEDIS
├── CHANGELOG.md         # Notas de actualización y registro de saltos arquitectónicos del núcleo
└── README.md            # Documentación técnica general del proyecto
