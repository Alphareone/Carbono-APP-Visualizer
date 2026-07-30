document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       0. CONSOLA DE ARRANQUE Y DICCIONARIO I18N
       ========================================= */
    const bootScreen = document.getElementById('boot-screen'), 
          bootTerminal = document.getElementById('boot-terminal'), 
          shutdownScreen = document.getElementById('shutdown-screen'), 
          logoutBtn = document.getElementById('btn-salir');

    let currentLang = 'es'; 

    const i18nDict = {
        es: {
            "m-dash": "Dashboard",
            "m-radar": "Radar Map",
            "m-audit": "Tabla de Registros",
            "m-sett": "Ajustes",
            "m-exit": "Salir",
            "desc-cx-title": "Monitoreo de Emisiones de Carbono (CARB-X)",
            "desc-cx-body": "Este módulo analiza la concentración de partículas de CO₂ en la atmósfera en partes por millón (PPM). Supervisa la dispersión macrozonal y activa alertas críticas cuando los niveles superan los umbrales de seguridad ambiental establecidos.",
            "desc-ln-title": "Evaluación de Contaminación Lumínica (LUX-NET)",
            "desc-ln-body": "Módulo encargado de medir la saturación de flujo fotónico y degradación de la oscuridad natural en la bóveda celeste. Grafica la densidad de emisiones artificiales reflejadas hacia el espacio y su impacto en ecosistemas astronómicos.",
            "desc-si-title": "Diagnóstico de Presión Acústica (SONAR-IND)",
            "desc-si-body": "Registra los niveles de ruido ambiental e industrial expresados en decibelios ponderados (dBA). Analiza las bandas de frecuencia en áreas mixtas y residenciales para asegurar el cumplimiento de normativas de salud pública.",
            "desc-tg-title": "Análisis de Dispersión Térmica (THERMO-GEN)",
            "desc-tg-body": "Supervisa las fluctuaciones termodinámicas y gradientes de calor en grados Celsius (°C). Detecta fenómenos de islas de calor urbanas, anomalías energéticas en subsuelos y vectores de inestabilidad climática local.",
            "kpi-cx-1": "Mapeo Atmosférico", "kpi-cx-2": "Volumen Temporal",
            "kpi-ln-1": "Flujo Fotónico", "kpi-ln-2": "Saturación Bóveda",
            "kpi-si-1": "Presión Acústica", "kpi-si-2": "Umbral Seguro",
            "kpi-tg-1": "Gradiente Térmico", "kpi-tg-2": "Isla de Calor",
            "kpi-var": "Variación:", "kpi-state": "Estado:", "kpi-sync": "Sincronizado",
            "kpi-macro": "Macrozonas", "kpi-tend": "Tendencia", "kpi-inst": "Instante", "kpi-conf": "Confianza",
            "cx-l": "CARB-X // Dinámica Temporal", "cx-b": "Concentración Macrozona", "cx-r": "Dispersión Indexada", "cx-p": "Alertas Críticas",
            "ln-l": "LUX-NET // Espectro Fotónico", "ln-b": "Saturación Lumínica", "ln-d": "Clasificación Bóveda", "ln-bu": "Densidad de Emisiones",
            "si-l": "SONAR-IND // Presión Sonora", "si-b": "Histograma Amplitud dBA", "si-r": "Frecuencias Industriales", "si-d": "Cumplimiento Normativo",
            "tg-l": "THERMO-GEN // Gradiente Térmico", "tg-b": "Fluctuación de Columnas", "tg-p": "Perfil de Calor Estático", "tg-r": "Inestabilidad Térmica",
            "r-ctrl": "Consola Georreferenciada", "rb-co2": "CO2", "rb-luz": "LUX", "rb-ruido": "RUIDO", "rb-bio": "TÉRMICO",
            "r-th-zone": "ZONA METROPOLITANA", "r-th-val": "VALOR", "r-inf": "IMPACTO PROMEDIO",
            "a-title": "Auditoría Táctica", "t-ts": "[ TIMESTAMP ]", "t-sub": "SISTEMA", "t-rd": "LECTURA", "t-sc": "SECTOR", "t-st": "ESTADO",
            "s-title": "Configuración", "s-core": "Preferencias del Sistema", "s-tmode": "Tema Visual",
            "s-tdesc": "Alternar entre modo oscuro cibernético y claro armónico pastel.",
            "s-lselect": "Idioma Regional", "s-ldesc": "Modificar la localización lingüística del núcleo."
        },
        en: {
            "m-dash": "Dashboard",
            "m-radar": "Radar Map",
            "m-audit": "Records Log",
            "m-sett": "Settings",
            "m-exit": "Logout",
            "desc-cx-title": "Carbon Emissions Monitoring (CARB-X)",
            "desc-cx-body": "This module analyzes the concentration of CO₂ particles in the atmosphere in parts per million (PPM). It monitors macrozonal dispersion and triggers critical alerts when levels exceed established environmental safety thresholds.",
            "desc-ln-title": "Light Pollution Assessment (LUX-NET)",
            "desc-ln-body": "Module responsible for measuring photonic flux saturation and degradation of natural darkness in the celestial vault. Charts artificial emission density reflected towards space and its impact on astronomical ecosystems.",
            "desc-si-title": "Acoustic Pressure Diagnosis (SONAR-IND)",
            "desc-si-body": "Records environmental and industrial noise levels expressed in A-weighted decibels (dBA). Analyzes frequency bands in mixed and residential areas to ensure compliance with public health regulations.",
            "desc-tg-title": "Thermal Dispersion Analysis (THERMO-GEN)",
            "desc-tg-body": "Monitors thermodynamic fluctuations and heat gradients in degrees Celsius (°C). Detects urban heat island phenomena, subsurface energy anomalies, and local climate instability vectors.",
            "kpi-cx-1": "Atmospheric Mapping", "kpi-cx-2": "Temporal Volume",
            "kpi-ln-1": "Photonic Flux", "kpi-ln-2": "Vault Saturation",
            "kpi-si-1": "Acoustic Pressure", "kpi-si-2": "Safe Threshold",
            "kpi-tg-1": "Thermal Gradient", "kpi-tg-2": "Heat Island",
            "kpi-var": "Variation:", "kpi-state": "Status:", "kpi-sync": "Synchronized",
            "kpi-macro": "Macro-zones", "kpi-tend": "Trend", "kpi-inst": "Instant", "kpi-conf": "Confidence",
            "cx-l": "CARB-X // Time Dynamics", "cx-b": "Macrozona Concentration", "cx-r": "Indexed Dispersion", "cx-p": "Critical Alerts",
            "ln-l": "LUX-NET // Photonic Spectrum", "ln-b": "Light Saturation", "ln-d": "Vault Classification", "ln-bu": "Emission Density",
            "si-l": "SONAR-IND // Sound Pressure", "si-b": "dBA Amplitude Histogram", "si-r": "Industrial Frequencies", "si-d": "Regulatory Compliance",
            "tg-l": "THERMO-GEN // Thermal Gradient", "tg-b": "Column Fluctuation", "tg-p": "Static Heat Profile", "tg-r": "Thermal Instability",
            "r-ctrl": "Georeferenced Console", "rb-co2": "CO2", "rb-luz": "LUX", "rb-ruido": "NOISE", "rb-bio": "THERMAL",
            "r-th-zone": "METROPOLITAN ZONE", "r-th-val": "VALUE", "r-inf": "AVERAGE IMPACT",
            "a-title": "Tactical Audit", "t-ts": "[ TIMESTAMP ]", "t-sub": "SYSTEM", "t-rd": "READING", "t-sc": "SECTOR", "t-st": "STATUS",
            "s-title": "Settings", "s-core": "System Preferences", "s-tmode": "Visual Theme",
            "s-tdesc": "Toggle between cyber dark mode and soft pastel light mode.",
            "s-lselect": "Regional Language", "s-ldesc": "Modify the core's linguistic localization."
        }
    };

    const bootSequences = {
        es: ["Iniciando Núcleo M.A.E.D.I.S V5.2...", "Estableciendo enlace con sensores multidimensionales...", "Sincronizando registros en caché reactiva...", "Calibración gráfica exitosa. Interfaz Desbloqueada."],
        en: ["Starting M.A.E.D.I.S Core V5.2...", "Establishing link with multidimensional sensors...", "Synchronizing records in reactive cache...", "Graphic calibration successful. Interface Unlocked."]
    };

    function simulateBoot() { 
        if (!bootScreen || !bootTerminal) return; 
        bootTerminal.innerHTML = ''; 
        const seq = bootSequences[currentLang] || bootSequences.es;
        seq.forEach((text, index) => { 
            setTimeout(() => { 
                const p = document.createElement('p'); 
                p.innerHTML = `> ${text}`; 
                bootTerminal.appendChild(p); 
            }, index * 350); 
        }); 
        setTimeout(() => { 
            bootScreen.style.opacity = '0'; 
            setTimeout(() => bootScreen.classList.add('hidden'), 600); 
        }, (seq.length * 350) + 250); 
    }
    simulateBoot();

    if (logoutBtn && shutdownScreen) {
        logoutBtn.addEventListener('click', () => { 
            const msg = currentLang === 'es' 
                ? "¿Desconectar terminal del servidor y cerrar aplicación?" 
                : "Disconnect terminal from server and close application?";
            if (confirm(msg)) { 
                shutdownScreen.classList.remove('hidden'); 
                setTimeout(() => { 
                    window.close();
                    const textContainer = shutdownScreen.querySelector('.boot-text');
                    if (textContainer) {
                        textContainer.innerHTML = currentLang === 'es' 
                            ? `> Desconectando enlace satelital...<br>> Descargando base dataPool...<br>> Terminal fuera de línea.<br><br><span style="color:var(--neon-green); font-weight:bold;">[ NÚCLEO APAGADO CORRECTAMENTE. PUEDE CERRAR ESTA VENTANA ]</span>`
                            : `> Disconnecting satellite link...<br>> Dumping dataPool buffer...<br>> Terminal offline.<br><br><span style="color:var(--neon-green); font-weight:bold;">[ CORE TERMINATED SUCCESSFULLY. YOU MAY CLOSE THIS WINDOW ]</span>`;
                    }
                }, 2200); 
            } 
        });
    }

    /* =========================================
       1. CANVAS DE PARTÍCULAS
       ========================================= */
    const canvas = document.getElementById('particle-canvas'), ctx = canvas.getContext('2d'); 
    let nodes = [];
    
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    
    class Node { 
        constructor() { 
            this.x = Math.random() * canvas.width; 
            this.y = Math.random() * canvas.height; 
            this.vx = (Math.random() - 0.5) * 0.3; 
            this.vy = (Math.random() - 0.5) * 0.3; 
            this.size = Math.random() * 1.5 + 1.2; 
        } 
        update() { 
            this.x += this.vx; this.y += this.vy; 
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1; 
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1; 
        } 
    }
    
    const nodeCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 26000)); 
    for (let i = 0; i < nodeCount; i++) nodes.push(new Node());
    
    function animateParticles() { 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        const rootStyles = getComputedStyle(document.documentElement);
        const currentAgentColor = rootStyles.getPropertyValue('--agent-color').trim() || '#00e676';
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const maxDistance = 150; 
    
        ctx.strokeStyle = currentAgentColor;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDistance) {
                    ctx.globalAlpha = (1 - dist / maxDistance) * (isLight ? 0.15 : 0.22);
                    ctx.lineWidth = (1 - dist / maxDistance) * 1.2; 
                    ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
                }
            }
        }
        nodes.forEach(node => { 
            node.update(); 
            ctx.fillStyle = currentAgentColor;
            ctx.globalAlpha = isLight ? 0.35 : 0.55; 
            ctx.beginPath(); ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2); ctx.fill(); 
        }); 
        ctx.globalAlpha = 1.0; 
        requestAnimationFrame(animateParticles); 
    }
    animateParticles();

    /* =========================================
       2. NAVEGACIÓN Y PESTAÑAS
       ========================================= */
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', (e) => { 
        const target = e.currentTarget.getAttribute('data-target'); 
        if (!target) return; 
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active')); 
        e.currentTarget.classList.add('active'); 
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active')); 
        document.getElementById(target).classList.add('active'); 
        if (target === 'radar-territorial' && typeof map !== 'undefined') { 
            setTimeout(() => { map.invalidateSize(true); }, 250); 
        } 
    }));
    
    document.querySelectorAll('[data-agent-switch]').forEach(el => el.addEventListener('click', (e) => {
        document.documentElement.setAttribute('data-agent', e.currentTarget.getAttribute('data-agent-switch'));
    }));

    document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', (e) => { 
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); 
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); 
        e.currentTarget.classList.add('active'); 
        const content = document.getElementById(e.currentTarget.getAttribute('data-tab')); 
        if (content) content.classList.add('active'); 
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 5); 
    }));

    /* =========================================
       3. CONFIGURACIÓN DE GRÁFICOS (CHART.JS)
       ========================================= */
    Chart.defaults.color = '#94a3b8'; 
    Chart.defaults.font.family = "'Orbitron', sans-serif"; 
    Chart.defaults.scale.grid.color = 'rgba(255,255,255,0.04)';
    
    const darkColors = { co2: '#00e676', light: '#ffea00', noise: '#d500f9', bio: '#ff3d00' };
    let cStyle = { ...darkColors };

    const optLine = { animation: false, responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { beginAtZero: false } } };
    const optStruct = { animation: false, responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 9 } } } } };

    const cCX1 = new Chart(document.getElementById('carbx-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(410), borderColor: cStyle.co2, backgroundColor: 'rgba(0,230,118,0.05)', fill: true, tension: 0.2 }] }, options: optLine });
    const cCX2 = new Chart(document.getElementById('carbx-bar'), { type: 'bar', data: { labels: ['Norte', 'Valpo', 'Santiago', 'Concep', 'Austral'], datasets: [{ label: 'PPM', data: [390, 400, 420, 405, 385], backgroundColor: 'rgba(0,230,118,0.4)' }] }, options: optStruct });
    const cCX3 = new Chart(document.getElementById('carbx-radar'), { type: 'radar', data: { labels: ['Disp', 'Sat', 'Est', 'Capt'], datasets: [{ label: 'Vectores', data: [75, 60, 80, 50], borderColor: cStyle.co2, backgroundColor: 'rgba(0,230,118,0.08)' }] }, options: optStruct });
    const cCX4 = new Chart(document.getElementById('carbx-polar'), { type: 'polarArea', data: { labels: ['Crit', 'Alerta', 'Ok'], datasets: [{ data: [12, 28, 60], backgroundColor: ['rgba(0,230,118,0.8)', 'rgba(0,230,118,0.5)', 'rgba(0,230,118,0.2)'] }] }, options: optStruct });
    
    const cLX1 = new Chart(document.getElementById('luxnet-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(65), borderColor: cStyle.light, backgroundColor: 'rgba(255,234,0,0.05)', fill: true }] }, options: optLine });
    const cLX2 = new Chart(document.getElementById('luxnet-bar'), { type: 'bar', data: { labels: ['Norte', 'Valpo', 'Santiago', 'Concep', 'Austral'], datasets: [{ label: 'Lux', data: [55, 60, 80, 65, 45], backgroundColor: 'rgba(255,234,0,0.4)' }] }, options: optStruct });
    const cLX3 = new Chart(document.getElementById('luxnet-doughnut'), { type: 'doughnut', data: { labels: ['Limpio', 'Sat', 'Crit'], datasets: [{ data: [50, 35, 15], backgroundColor: ['rgba(255,234,0,0.2)', 'rgba(255,234,0,0.5)', 'rgba(255,234,0,0.8)'] }] }, options: optStruct });
    const cLX4 = new Chart(document.getElementById('luxnet-bubble'), { type: 'bubble', data: { datasets: [{ label: 'Nodos', data: [{ x: 4, y: 6, r: 10 }, { x: 9, y: 11, r: 18 }], backgroundColor: 'rgba(255,234,0,0.4)' }] }, options: optStruct });

    const cSI1 = new Chart(document.getElementById('sonarind-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(55), borderColor: cStyle.noise, backgroundColor: 'rgba(213,0,249,0.05)', fill: true }] }, options: optLine });
    const cSI2 = new Chart(document.getElementById('sonarind-bar'), { type: 'bar', data: { labels: ['Norte', 'Valpo', 'Santiago', 'Concep', 'Austral'], datasets: [{ label: 'dBA', data: [50, 58, 72, 62, 42], backgroundColor: 'rgba(213,0,249,0.4)' }] }, options: optStruct });
    const cSI3 = new Chart(document.getElementById('sonarind-radar'), { type: 'radar', data: { labels: ['Baja', 'Media', 'Alta', 'Norma'], datasets: [{ label: 'Frecuencias', data: [60, 80, 70, 90], borderColor: cStyle.noise, backgroundColor: 'rgba(213,0,249,0.08)' }] }, options: optStruct });
    const cSI4 = new Chart(document.getElementById('sonarind-doughnut'), { type: 'doughnut', data: { labels: ['Ok', 'Exceso', 'Critico'], datasets: [{ data: [70, 20, 10], backgroundColor: ['rgba(213,0,249,0.2)', 'rgba(213,0,249,0.5)', 'rgba(213,0,249,0.8)'] }] }, options: optStruct });

    const cTG1 = new Chart(document.getElementById('thermogen-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(24), borderColor: cStyle.bio, backgroundColor: 'rgba(255,61,0,0.05)', fill: true }] }, options: optLine });
    const cTG2 = new Chart(document.getElementById('thermogen-bar'), { type: 'bar', data: { labels: ['Norte', 'Valpo', 'Santiago', 'Concep', 'Austral'], datasets: [{ label: '°C', data: [22, 23, 28, 24, 18], backgroundColor: 'rgba(255,61,0,0.4)' }] }, options: optStruct });
    const cTG3 = new Chart(document.getElementById('thermogen-polar'), { type: 'polarArea', data: { labels: ['Inerte', 'Metano', 'CO2'], datasets: [{ data: [55, 30, 15], backgroundColor: ['rgba(255,61,0,0.2)', 'rgba(255,61,0,0.5)', 'rgba(255,61,0,0.8)'] }] }, options: optStruct });
    const cTG4 = new Chart(document.getElementById('thermogen-radar'), { type: 'radar', data: { labels: ['Disip', 'Pres', 'Hum', 'Comb'], datasets: [{ label: 'Térmico', data: [50, 65, 60, 75], borderColor: cStyle.bio, backgroundColor: 'rgba(255,61,0,0.08)' }] }, options: optStruct });

    const allCharts = [cCX1, cCX2, cCX3, cCX4, cLX1, cLX2, cLX3, cLX4, cSI1, cSI2, cSI3, cSI4, cTG1, cTG2, cTG3, cTG4];

    /* =========================================
       4. ESTRUCTURA CENTRALIZADA DE ZONAS Y SECTORES (ESTABILIZACIÓN GLOBAL)
       ========================================= */
    const radarZones = [
        { id: "NORTE", name: "Zona Norte (Iquique)", coords: [-20.21, -70.14], weight: 0.92 },
        { id: "VALPO", name: "Zona Centro-Costa (Valparaíso)", coords: [-33.04, -71.61], weight: 0.98 },
        { id: "RM", name: "Macrozona Central (Santiago)", coords: [-33.45, -70.66], weight: 1.18 },
        { id: "BIOBIO", name: "Zona Sur-Industrial (Concepción)", coords: [-36.82, -73.03], weight: 1.06 },
        { id: "AUSTRAL", name: "Zona Austral (Puerto Montt)", coords: [-41.47, -72.94], weight: 0.85 }
    ];

    // Estado global reactivo en tiempo real compartido por Mapa, Dashboard y Tabla
    const zoneTelemetryState = {
        carbx: {},
        luxnet: {},
        sonarind: {},
        thermogen: {}
    };

    radarZones.forEach(zone => {
        zoneTelemetryState.carbx[zone.id] = 410 * zone.weight;
        zoneTelemetryState.luxnet[zone.id] = 65 * zone.weight;
        zoneTelemetryState.sonarind[zone.id] = 55 * zone.weight;
        zoneTelemetryState.thermogen[zone.id] = 24 * zone.weight;
    });

    const db = { carbx: [], luxnet: [], sonarind: [], thermogen: [] }, limit = 100, tb = document.getElementById('table-body');
    const kpiHistory = { cx: Array(10).fill(410), ln: Array(10).fill(65), si: Array(10).fill(55), tg: Array(10).fill(24) };

    function generateSparklinePolyline(arrayData, elementId, min, max) {
        const svgEl = document.getElementById(elementId); if (!svgEl) return;
        const width = 110, height = 42, padding = 2;
        if (max === min) max = min + 1;
        const points = arrayData.map((val, index) => {
            const x = (index / (arrayData.length - 1)) * width;
            const y = height - padding - ((val - min) / (max - min)) * (height - padding * 2);
            return `${x},${y}`;
        }).join(' ');
        svgEl.setAttribute('points', points);
    }

    function updateKPIElements(prefix, currentVal, historyArray, minVal, maxVal, unit) {
        const mainValEl = document.getElementById(`${prefix}-kpi-main`);
        if (mainValEl) mainValEl.textContent = `${currentVal.toFixed(prefix === 'tg' ? 2 : 1)} ${unit}`;
        if (document.getElementById(`${prefix}-kpi-delta`)) {
            const diff = currentVal - historyArray[0];
            document.getElementById(`${prefix}-kpi-delta`).textContent = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)}`;
        }
        historyArray.push(currentVal); if (historyArray.length > 10) historyArray.shift();
        if (document.getElementById(`${prefix}-kpi-mini`)) document.getElementById(`${prefix}-kpi-mini`).textContent = `${currentVal.toFixed(prefix === 'tg' ? 2 : 1)}`;
        generateSparklinePolyline(historyArray, `${prefix}-sparkline-path`, minVal, maxVal);
        const tString = new Date().toTimeString().split(' ')[0];
        document.querySelectorAll(`.${prefix}-kpi-ts`).forEach(el => el.textContent = tString);
    }

    function updateSecondaryCards(cx, lx, si, tg) {
        // 1. CARB-X
        const volTempPct = (((cx - 380) / (460 - 380)) * 100).toFixed(1);
        const volTempEl = document.getElementById('vol-temp-val');
        const volTempStat = document.getElementById('vol-temp-status');
        if (volTempEl) volTempEl.textContent = `${volTempPct}%`;
        if (volTempStat) {
            const isAlert = volTempPct > 75;
            volTempStat.textContent = isAlert 
                ? (currentLang === 'en' ? 'ALERT' : 'ALERTA') 
                : (currentLang === 'en' ? 'STABLE' : 'ESTABLE');
            volTempStat.className = `highlight ${isAlert ? 'text-alert' : ''}`;
        }

        // 2. LUX-NET
        const satBovPct = (((lx - 15) / (140 - 15)) * 100).toFixed(1);
        const satBovEl = document.getElementById('sat-bov-val');
        const satBovStat = document.getElementById('sat-bov-status');
        if (satBovEl) satBovEl.textContent = `${satBovPct}%`;
        if (satBovStat) {
            const isAlert = satBovPct > 70;
            satBovStat.textContent = isAlert 
                ? (currentLang === 'en' ? 'HIGH' : 'SATURADO') 
                : (currentLang === 'en' ? 'STABLE' : 'ESTABLE');
            satBovStat.className = `highlight ${isAlert ? 'text-alert' : ''}`;
        }

        // 3. SONAR-IND
        const umbralEl = document.getElementById('umbral-val');
        const umbralStat = document.getElementById('umbral-status');
        if (umbralEl) umbralEl.textContent = `${si.toFixed(1)} dBA`;
        if (umbralStat) {
            const isCrit = si > 80;
            const isMod = si > 65;
            if (isCrit) {
                umbralStat.textContent = currentLang === 'en' ? 'CRITICAL' : 'CRÍTICO';
                umbralStat.className = 'highlight text-alert';
            } else if (isMod) {
                umbralStat.textContent = currentLang === 'en' ? 'MODERATE' : 'MODERADO';
                umbralStat.className = 'highlight';
            } else {
                umbralStat.textContent = currentLang === 'en' ? 'OPTIMAL' : 'ÓPTIMO';
                umbralStat.className = 'highlight';
            }
        }

        // 4. THERMO-GEN
        const islaEl = document.getElementById('isla-calor-val');
        const islaStat = document.getElementById('isla-calor-status');
        if (islaEl) islaEl.textContent = `${tg.toFixed(1)} °C`;
        if (islaStat) {
            const isHigh = tg > 30;
            islaStat.textContent = isHigh 
                ? (currentLang === 'en' ? 'ELEVATED' : 'ELEVADO') 
                : (currentLang === 'en' ? 'STABLE' : 'ESTABLE');
            islaStat.className = `highlight ${isHigh ? 'text-alert' : ''}`;
        }
    }

    function pushDataRow(mod, val, sec, stat) {
        const ts = new Date().toTimeString().split(' ')[0];
        let k = mod.toLowerCase().replace('-', ''); 
        if (db[k]) {
            db[k].push({ Timestamp: ts, Modulo: mod, Valor: val, Sector: sec, Status: stat });
            if (db[k].length > limit) db[k].shift(); 
        }
        if (!tb) return;
        
        let displayStat = stat;
        if (currentLang === 'en') {
            displayStat = (stat === 'CRÍTICO' || stat === 'CRITICAL') ? 'CRITICAL' : (stat === 'OPERATIVO' || stat === 'NOMINAL') ? 'NOMINAL' : 'OPTIMAL';
        } else {
            displayStat = (stat === 'CRITICAL' || stat === 'CRÍTICO') ? 'CRÍTICO' : (stat === 'NOMINAL' || stat === 'OPERATIVO') ? 'OPERATIVO' : 'ÓPTIMO';
        }

        const tr = document.createElement('tr');
        const isCrit = displayStat === 'CRÍTICO' || displayStat === 'CRITICAL';
        const isOp = displayStat === 'OPERATIVO' || displayStat === 'NOMINAL';
        const col = isCrit ? 'var(--neon-red)' : (isOp ? 'var(--neon-yellow)' : 'var(--neon-green)');

        tr.innerHTML = `<td style="color:var(--text-muted)">[${ts}]</td><td style="font-weight:600">${mod}</td><td>${val}</td><td>${sec}</td><td style="color:${col};text-shadow:0 0 3px ${col}">[ ${displayStat} ]</td>`;
        tb.prepend(tr); 
        if (tb.children.length > 20) tb.removeChild(tb.lastChild);
    }

    function updatePredictiveAnalysis(idElement, value, baseValue, unit) {
        const el = document.getElementById(idElement); if (!el) return;
        const diff = value - baseValue;
        if (Math.abs(diff) > (baseValue * 0.03)) {
            el.innerHTML = currentLang === 'es' 
                ? `[ 🔮 IA PROY: ${diff > 0 ? 'INCREMENTO ▲' : 'DESCENSO ▼'} ${Math.abs(diff).toFixed(1)} ${unit} ]` 
                : `[ 🔮 AI PROJ: ${diff > 0 ? 'INCREASE ▲' : 'DECREASE ▼'} ${Math.abs(diff).toFixed(1)} ${unit} ]`;
            el.style.opacity = "1";
        } else {
            el.innerHTML = currentLang === 'es' ? `[ 🔮 IA PROY: ESTABLE ]` : `[ 🔮 AI PROJ: STABLE ]`; 
            el.style.opacity = "0.85";
        }
    }

    /* =========================================
       5. MAPA Y RADAR DE IMPACTO CONGRUENTE
       ========================================= */
    const chileBounds = L.latLngBounds(L.latLng([-56.0, -80.0]), L.latLng([-17.5, -62.0]));
    const map = L.map('chile-map', { 
        zoomControl: false, 
        minZoom: 4, 
        maxZoom: 12, 
        maxBounds: chileBounds, 
        maxBoundsViscosity: 1.0 
    }).setView([-33.45, -70.66], 5);
    
    const initialHour = new Date().getHours();
    const isDaytime = initialHour >= 6 && initialHour < 19;
    const initialTileUrl = isDaytime 
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    const tileLayer = L.tileLayer(initialTileUrl).addTo(map);
    
    const dataA = { co2: '#00e676', luz: '#ffea00', ruido: '#d500f9', bio: '#ff3d00' };
    let activeAgent = 'co2';

    const agentMetadata = {
        co2: { 
            title: { es: "> SUBSISTEMA: CARB-X (CO2)", en: "> SUBSYSTEM: CARB-X (CO2)" }, 
            desc: { es: "Escaneo satelital activo sobre la red macrozonal. Evaluando partículas por millón de gases.", en: "Active satellite scan over macrozonal network. Evaluating gas parts per million." }, 
            unit: "PPM",
            key: "carbx"
        },
        luz: { 
            title: { es: "> SUBSISTEMA: LUX-NET (LUX)", en: "> SUBSYSTEM: LUX-NET (LUX)" }, 
            desc: { es: "Monitoreo fotónico del espectro nocturno. Evaluando degradación lumínica ambiental.", en: "Photonic monitoring of night spectrum. Evaluating environmental light pollution." }, 
            unit: "Lux",
            key: "luxnet"
        },
        ruido: { 
            title: { es: "> SUBSISTEMA: SONAR-IND (dBA)", en: "> SUBSYSTEM: SONAR-IND (dBA)" }, 
            desc: { es: "Análisis acústico ambiental de decibelios continuos. Mapeo de polución sónica.", en: "Environmental acoustic analysis of continuous decibels. Sonic pollution mapping." }, 
            unit: "dBA",
            key: "sonarind"
        },
        bio: { 
            title: { es: "> SUBSISTEMA: THERMO-GEN (°C)", en: "> SUBSYSTEM: THERMO-GEN (°C)" }, 
            desc: { es: "Evaluación termodinámica infrarroja. Monitoreo de islas de calor urbanas.", en: "Infrared thermodynamic evaluation. Monitoring urban heat islands." }, 
            unit: "°C",
            key: "thermogen"
        }
    };

    function getAgentStyle(agent, color) {
        switch(agent) {
            case 'ruido': return { color: color, fillColor: color, fillOpacity: 0.15, weight: 2, dashArray: '5, 8' };
            case 'luz':   return { color: color, fillColor: color, fillOpacity: 0.40, weight: 0, dashArray: null };
            case 'bio':   return { color: color, fillColor: color, fillOpacity: 0.30, weight: 4, dashArray: null };
            case 'co2':
            default:      return { color: color, fillColor: color, fillOpacity: 0.25, weight: 2, dashArray: null };
        }
    }

    function getZoneStatus(val, agentKey) {
        const numericVal = parseFloat(val);
        if (agentKey === 'carbx') {
            if (numericVal > 425) return currentLang === 'en' ? 'CRITICAL' : 'CRÍTICO';
            if (numericVal > 400) return currentLang === 'en' ? 'NOMINAL' : 'OPERATIVO';
            return currentLang === 'en' ? 'OPTIMAL' : 'ÓPTIMO';
        } else if (agentKey === 'luxnet') {
            if (numericVal > 95) return currentLang === 'en' ? 'CRITICAL' : 'CRÍTICO';
            if (numericVal > 60) return currentLang === 'en' ? 'NOMINAL' : 'OPERATIVO';
            return currentLang === 'en' ? 'OPTIMAL' : 'ÓPTIMO';
        } else if (agentKey === 'sonarind') {
            if (numericVal > 80) return currentLang === 'en' ? 'CRITICAL' : 'CRÍTICO';
            if (numericVal > 65) return currentLang === 'en' ? 'NOMINAL' : 'OPERATIVO';
            return currentLang === 'en' ? 'OPTIMAL' : 'ÓPTIMO';
        } else if (agentKey === 'thermogen') {
            if (numericVal > 30) return currentLang === 'en' ? 'CRITICAL' : 'CRÍTICO';
            if (numericVal > 22) return currentLang === 'en' ? 'NOMINAL' : 'OPERATIVO';
            return currentLang === 'en' ? 'OPTIMAL' : 'ÓPTIMO';
        }
        return currentLang === 'en' ? 'OPTIMAL' : 'ÓPTIMO';
    }

    function getZoneStatusBadge(statusText) {
        let bg = 'rgba(0, 230, 118, 0.15)';
        let color = '#00e676';
        if (statusText === 'CRÍTICO' || statusText === 'CRITICAL') { bg = 'rgba(255, 61, 0, 0.2)'; color = '#ff3d00'; }
        else if (statusText === 'OPERATIVO' || statusText === 'NOMINAL') { bg = 'rgba(255, 234, 0, 0.2)'; color = '#ffea00'; }

        return `<span style="background:${bg}; color:${color}; padding: 2px 6px; border-radius: 4px; font-size: 8px; font-weight: bold; margin-left: 6px;">${statusText}</span>`;
    }

let mapCircles = [];
    radarZones.forEach(zone => {
        const initialStyle = getAgentStyle('co2', dataA.co2);
        initialStyle.radius = 35000 * zone.weight;
        
        let circle = L.circle(zone.coords, initialStyle).addTo(map);
        circle.bindTooltip(`<b>${zone.name}</b><br>${currentLang === 'en' ? 'State: Operational' : 'Estado: Operacional'}`, { 
            sticky: true,
            className: 'cyber-tooltip' // <-- Parámetro agregado
        });
        mapCircles.push({ id: zone.id, layer: circle, weight: zone.weight, name: zone.name });
    });

    const cImp = new Chart(document.getElementById('impact-chart').getContext('2d'), { 
        type: 'doughnut', 
        data: { 
            labels: ['Impacto Red %', 'Margen Seguro'], 
            datasets: [{ data: [0, 100], backgroundColor: [dataA.co2, 'rgba(255,255,255,0.04)'], borderWidth: 0 }] 
        }, 
        options: { animation: false, cutout: '85%', plugins: { legend: { display: false } } } 
    });
    
    const impactDisplay = document.getElementById('impact-value-display'), 
          zoneTableBody = document.getElementById('radar-zone-table-body'), 
          descBlock = document.querySelector('.map-zone-description');

    function renderZoneTable() {
        if (!zoneTableBody) return; 
        zoneTableBody.innerHTML = '';
        
        const meta = agentMetadata[activeAgent], colorAgente = dataA[activeAgent];
        const currentChannelKey = meta.key;

        radarZones.forEach((zone, idx) => {
            const rawValue = zoneTelemetryState[currentChannelKey][zone.id] || 0;
            const valorZona = rawValue.toFixed(currentChannelKey === 'thermogen' ? 2 : 1);
            const statusText = getZoneStatus(valorZona, currentChannelKey);
            const statusBadge = getZoneStatusBadge(statusText);
            
            if (mapCircles[idx]) {
                const labelReading = currentLang === 'en' ? 'Reading' : 'Lectura';
                mapCircles[idx].layer.setTooltipContent(`<b>${zone.name}</b><br>${labelReading}: ${valorZona} ${meta.unit}`);
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="color: var(--text-main); font-weight: 600;">
                    <i class="fa-solid fa-location-dot" style="color:${colorAgente}; margin-right:6px; font-size:9px;"></i> 
                    ${zone.name}
                </td>
                <td style="text-align: right; font-weight: bold;">
                    <span style="color: ${colorAgente};">${valorZona}</span> 
                    <span style="font-size:8px; color:var(--text-muted); font-weight:normal;">${meta.unit}</span>
                    ${statusBadge}
                </td>`;
            zoneTableBody.appendChild(tr);
        });
    }

    function syncAgentUI() {
        const color = dataA[activeAgent], meta = agentMetadata[activeAgent];
        const newStyle = getAgentStyle(activeAgent, color);
        mapCircles.forEach(obj => obj.layer.setStyle(newStyle));

        if (descBlock) descBlock.style.borderColor = color;
        
        const titleEl = document.getElementById('radar-desc-title');
        const textEl = document.getElementById('radar-desc-text');
        if (titleEl) titleEl.textContent = meta.title[currentLang] || meta.title.es;
        if (textEl) textEl.textContent = meta.desc[currentLang] || meta.desc.es;
        
        cImp.data.datasets[0].backgroundColor[0] = color; 
        cImp.update('none');
        renderZoneTable();
    }

    document.querySelectorAll('.agent-btn').forEach(b => b.addEventListener('click', e => {
        document.querySelectorAll('.agent-btn').forEach(btn => btn.classList.remove('active')); 
        e.currentTarget.classList.add('active');
        
        activeAgent = e.currentTarget.getAttribute('data-agent'); 
        syncAgentUI();
    }));

    function updateRadarTelemetry(avgValue, minVal, maxVal) {
        let pctBase = ((avgValue - minVal) / (maxVal - minVal)) * 100; 
        if (pctBase < 10) pctBase = 10; if (pctBase > 100) pctBase = 100;
        const formattedPct = pctBase.toFixed(1);
        
        cImp.data.datasets[0].data = [formattedPct, (100 - pctBase).toFixed(1)]; 
        cImp.update('none');
        
        if (impactDisplay) { 
            impactDisplay.textContent = `${formattedPct}%`; 
            impactDisplay.style.color = dataA[activeAgent]; 
        }
        
        mapCircles.forEach(obj => { 
            obj.layer.setRadius((12000 + (pctBase * 700)) * obj.weight); 
        });
        
        renderZoneTable();
    }

    /* =========================================
       6. MOTOR ÚNICO DE SIMULACIÓN Y TELEMETRÍA V5.2
       ========================================= */
    let curCX = 410, curLX = 65, curSI = 55, curTG = 24;
    let telemetrySeed = 0; 

    setInterval(() => {
        telemetrySeed += 0.05;
        const waveA = Math.sin(telemetrySeed), waveB = Math.cos(telemetrySeed * 1.3), noise = () => (Math.random() - 0.5);

        const hour = new Date().getHours();
        let mod = { cx: 1, lx: 1, si: 1, tg: 1 };
        
        if (hour >= 0 && hour < 6) { 
            mod = { cx: 0.85, lx: 0.70, si: 0.50, tg: 0.75 }; 
        } else if (hour >= 6 && hour < 12) { 
            mod = { cx: 1.25, lx: 0.20, si: 1.20, tg: 0.95 }; 
        } else if (hour >= 12 && hour < 19) { 
            mod = { cx: 1.15, lx: 0.15, si: 1.30, tg: 1.45 }; 
        } else { 
            mod = { cx: 0.90, lx: 1.60, si: 0.85, tg: 0.85 }; 
        }

        // 1. CARB-X (CO2)
        curCX += (waveA * 0.9 * mod.cx) + (noise() * 3.5); 
        curCX = Math.max(380, Math.min(460, curCX));
        cCX1.data.datasets[0].data.shift(); cCX1.data.datasets[0].data.push(curCX); cCX1.update('none');
        
        radarZones.forEach((z, i) => {
            const zVal = Math.max(370, Math.min(480, curCX * z.weight + (noise() * 2)));
            zoneTelemetryState.carbx[z.id] = zVal;
            cCX2.data.datasets[0].data[i] = zVal;
        });
        cCX2.update('none');

        updatePredictiveAnalysis('pred-cx', curCX, 410, 'PPM'); 
        updateKPIElements('cx', curCX, kpiHistory.cx, 380, 460, 'PPM');

        // 2. LUX-NET (LUX)
        curLX += (waveB * 1.5 * mod.lx) + (noise() * 5.0); 
        curLX = Math.max(15, Math.min(140, curLX));
        cLX1.data.datasets[0].data.shift(); cLX1.data.datasets[0].data.push(curLX); cLX1.update('none');
        
        radarZones.forEach((z, i) => {
            const zVal = Math.max(10, Math.min(150, curLX * z.weight + (noise() * 3)));
            zoneTelemetryState.luxnet[z.id] = zVal;
            cLX2.data.datasets[0].data[i] = zVal;
        });
        cLX2.update('none');

        updatePredictiveAnalysis('pred-ln', curLX, 65, 'Lux'); 
        updateKPIElements('ln', curLX, kpiHistory.ln, 15, 140, 'Lux');

        // 3. SONAR-IND (dBA)
        curSI += (waveA * waveB * 2.2 * mod.si) + (noise() * 6.0); 
        curSI = Math.max(35, Math.min(95, curSI));
        cSI1.data.datasets[0].data.shift(); cSI1.data.datasets[0].data.push(curSI); cSI1.update('none');
        
        radarZones.forEach((z, i) => {
            const zVal = Math.max(20, Math.min(100, curSI * z.weight + (noise() * 4)));
            zoneTelemetryState.sonarind[z.id] = zVal;
            cSI2.data.datasets[0].data[i] = zVal;
        });
        cSI2.update('none');

        updatePredictiveAnalysis('pred-si', curSI, 55, 'dBA'); 
        updateKPIElements('si', curSI, kpiHistory.si, 35, 95, 'dBA');

        // 4. THERMO-GEN (°C)
        curTG += (waveB * 0.18 * mod.tg) + (noise() * 0.55); 
        curTG = Math.max(14, Math.min(40, curTG));
        cTG1.data.datasets[0].data.shift(); cTG1.data.datasets[0].data.push(curTG); cTG1.update('none');
        
        radarZones.forEach((z, i) => {
            const zVal = Math.max(10, Math.min(45, curTG * z.weight + (noise() * 0.4)));
            zoneTelemetryState.thermogen[z.id] = zVal;
            cTG2.data.datasets[0].data[i] = zVal;
        });
        cTG2.update('none');

        updatePredictiveAnalysis('pred-tg', curTG, 24, '°C'); 
        updateKPIElements('tg', curTG, kpiHistory.tg, 14, 40, '°C');

        // 5. REGISTROS CONGRUENTES A LA TABLA GLOBAL
        const randomZone = radarZones[Math.floor(Math.random() * radarZones.length)];
        const channels = [
            { mod: 'CARB-X', key: 'carbx', unit: 'PPM' },
            { mod: 'LUX-NET', key: 'luxnet', unit: 'Lux' },
            { mod: 'SONAR-IND', key: 'sonarind', unit: 'dBA' },
            { mod: 'THERMO-GEN', key: 'thermogen', unit: '°C' }
        ];
        const selectedChan = channels[Math.floor(Math.random() * channels.length)];
        
        const exactValue = zoneTelemetryState[selectedChan.key][randomZone.id];
        const exactStatus = getZoneStatus(exactValue, selectedChan.key);

        pushDataRow(
            selectedChan.mod, 
            `${exactValue.toFixed(selectedChan.key === 'thermogen' ? 2 : 1)} ${selectedChan.unit}`, 
            randomZone.name, 
            exactStatus
        );

        // 6. ACTUALIZAR MAPA SEGÚN AGENTE ACTIVO
        if (activeAgent === 'co2')   updateRadarTelemetry(curCX, 380, 460);
        if (activeAgent === 'luz')   updateRadarTelemetry(curLX, 15, 140);
        if (activeAgent === 'ruido') updateRadarTelemetry(curSI, 35, 95);
        if (activeAgent === 'bio')   updateRadarTelemetry(curTG, 14, 40);

        // 7. ACTUALIZACIÓN DINÁMICA DE TARJETAS SECUNDARIAS
        updateSecondaryCards(curCX, curLX, curSI, curTG);

    }, 500);

    /* =========================================
       7. PIPELINES DE EXPORTACIÓN (EXCELJS Y PDF V5.2)
       ========================================= */
    const pastelTheme = {
        CARBX:    { tab: '86EFAC', headerBg: 'DCFCE7', headerFg: '14532D', accentBg: 'C6F6D5', accentFg: '15803D', rowBg: 'F0FDF4' },
        LUXNET:   { tab: 'FDE047', headerBg: 'FEF9C3', headerFg: '713F12', accentBg: 'FEFCBF', accentFg: 'A16207', rowBg: 'FEFCE8' },
        SONARIND: { tab: 'E9D5FF', headerBg: 'F3E8FF', headerFg: '581C87', accentBg: 'E9D5FF', accentFg: '7E22CE', rowBg: 'FAF5FF' },
        THERMOGEN:{ tab: 'FCA5A5', headerBg: 'FEE2E2', headerFg: '7F1D1D', accentBg: 'FCA5A5', accentFg: 'B91C1C', rowBg: 'FFF1F2' }
    };

    const statusPastels = {
        CRITICAL:  { bg: 'FEE2E2', fg: '991B1B' },
        CRÍTICO:   { bg: 'FEE2E2', fg: '991B1B' },
        NOMINAL:   { bg: 'FEF9C3', fg: '854D0E' },
        OPERATIVO: { bg: 'FEF9C3', fg: '854D0E' },
        OPTIMAL:   { bg: 'DCFCE7', fg: '166534' },
        ÓPTIMO:    { bg: 'DCFCE7', fg: '166534' }
    };

    // EXPORTACIÓN EXCEL
    const btnExcel = document.getElementById('btn-excel');
    if (btnExcel) {
        btnExcel.addEventListener('click', async () => { 
            const workbook = new ExcelJS.Workbook();

            Object.keys(db).forEach(k => { 
                const channelKey = k.toUpperCase();
                const theme = pastelTheme[channelKey] || pastelTheme.CARBX;

                const worksheet = workbook.addWorksheet(channelKey, {
                    properties: { tabColor: { argb: 'FF' + theme.tab } }
                });

                worksheet.columns = [
                    { header: 'TIMESTAMP', key: 'timestamp', width: 18 },
                    { header: 'MÓDULO', key: 'modulo', width: 18 },
                    { header: 'VALOR LÍNEA', key: 'valor', width: 20 },
                    { header: 'SECTOR EVALUADO', key: 'sector', width: 32 },
                    { header: 'ESTADO', key: 'status', width: 18 }
                ];

                db[k].forEach(r => {
                    worksheet.addRow({
                        timestamp: r.Timestamp,
                        modulo: r.Modulo,
                        valor: r.Valor,
                        sector: r.Sector,
                        status: r.Status
                    });
                });

                const headerRow = worksheet.getRow(1);
                headerRow.height = 26;
                headerRow.eachCell((cell) => {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + theme.headerBg } };
                    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF' + theme.headerFg } };
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    cell.border = {
                        bottom: { style: 'medium', color: { argb: 'FF' + theme.tab } },
                        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
                    };
                });

                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return;

                    row.height = 20;
                    const isEven = rowNumber % 2 === 0;
                    const defaultBg = isEven ? theme.rowBg : 'FFFFFF';

                    row.eachCell((cell, colNumber) => {
                        let cellBg = defaultBg;
                        let cellFg = '334155';
                        let isBold = false;
                        let align = 'left';

                        if (colNumber === 1) {
                            align = 'center';
                        } else if (colNumber === 2) {
                            cellBg = theme.accentBg;
                            cellFg = theme.accentFg;
                            isBold = true;
                            align = 'center';
                        } else if (colNumber === 3) {
                            align = 'right';
                            isBold = true;
                            cellFg = '0F172A';
                        } else if (colNumber === 5) {
                            const st = statusPastels[cell.value] || { bg: 'F1F5F9', fg: '475569' };
                            cellBg = st.bg;
                            cellFg = st.fg;
                            isBold = true;
                            align = 'center';
                        }

                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + cellBg } };
                        cell.font = { name: 'Segoe UI', size: 9.5, bold: isBold, color: { argb: 'FF' + cellFg } };
                        cell.alignment = { horizontal: align, vertical: 'middle' };
                        cell.border = {
                            bottom: { style: 'thin', color: { argb: 'FFF1F5F9' } },
                            top: { style: 'thin', color: { argb: 'FFF1F5F9' } },
                            left: { style: 'thin', color: { argb: 'FFF1F5F9' } },
                            right: { style: 'thin', color: { argb: 'FFF1F5F9' } }
                        };
                    });
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "Reporte_MAEDIS_V5_2_Dashboards.xlsx";
            link.click();
        });
    }

    // EXPORTACIÓN PDF
    const btnPdf = document.getElementById('btn-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', () => { 
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF(); 

            const pdfPastelTheme = {
                CARBX:     { bg: [240, 253, 244], border: [187, 247, 208], text: [22, 101, 52], accent: [22, 163, 74] },
                LUXNET:    { bg: [254, 252, 232], border: [254, 240, 138], text: [113, 63, 18], accent: [202, 138, 4] },
                SONARIND:  { bg: [250, 245, 255], border: [233, 213, 255], text: [88, 28, 135], accent: [147, 51, 234] },
                THERMOGEN: { bg: [255, 241, 242], border: [254, 202, 202], text: [153, 27, 27], accent: [220, 38, 38] }
            };

            const pdfStatusColors = {
                CRITICAL:  { bg: [254, 226, 226], text: [153, 27, 27] },
                CRÍTICO:   { bg: [254, 226, 226], text: [153, 27, 27] },
                NOMINAL:   { bg: [254, 249, 195], text: [133, 77, 14] },
                OPERATIVO: { bg: [254, 249, 195], text: [133, 77, 14] },
                OPTIMAL:   { bg: [220, 252, 231], text: [22, 101, 52] },
                ÓPTIMO:    { bg: [220, 252, 231], text: [22, 101, 52] }
            };

            function drawPDFPageHeader(pageNumber) {
                doc.setFillColor(15, 23, 42); 
                doc.rect(0, 0, 210, 26, 'F');

                doc.setFont("helvetica", "bold"); 
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.text("INFORME DE REGISTROS M.A.E.D.I.S V5.2", 14, 12); 

                doc.setFont("helvetica", "normal"); 
                doc.setFontSize(7.5); 
                doc.setTextColor(148, 163, 184);
                doc.text(`Fecha de emisión: ${new Date().toLocaleString()} | Pág. ${pageNumber} | Enlace Satelital Activo`, 14, 19); 

                doc.setFillColor(30, 41, 59); 
                doc.roundedRect(14, 29, 182, 8, 1, 1, 'F');

                doc.setFont("helvetica", "bold"); 
                doc.setFontSize(7.5); 
                doc.setTextColor(248, 250, 252); 
                doc.text("ID", 18, 34.5);
                doc.text("TIMESTAMP", 32, 34.5);
                doc.text("MÓDULO / CANAL", 68, 34.5);
                doc.text("VALOR MÉTRICO", 118, 34.5);
                doc.text("ESTADO", 164, 34.5);
            }

            let pageNum = 1;
            drawPDFPageHeader(pageNum);

            let historialGlobal = [];
            Object.keys(db).forEach(k => db[k].forEach(r => historialGlobal.push({ canal: k.toUpperCase(), timestamp: r.Timestamp, valor: r.Valor, status: r.Status })));

            let ejeY = 40;

            historialGlobal.slice(-300).forEach((item, index) => {
                if (ejeY > 270) { 
                    doc.addPage(); 
                    pageNum++;
                    drawPDFPageHeader(pageNum);
                    ejeY = 40; 
                }
                
                const theme = pdfPastelTheme[item.canal] || pdfPastelTheme.CARBX;
                const stTheme = pdfStatusColors[item.status] || { bg: [241, 245, 249], text: [71, 85, 105] };

                doc.setFillColor(theme.bg[0], theme.bg[1], theme.bg[2]);
                doc.setDrawColor(theme.border[0], theme.border[1], theme.border[2]);
                doc.setLineWidth(0.3);
                doc.roundedRect(14, ejeY, 182, 7.5, 1, 1, 'FD');

                doc.setFont("helvetica", "bold");
                doc.setFontSize(7);
                doc.setTextColor(theme.text[0], theme.text[1], theme.text[2]);
                doc.text(`#${String(index + 1).padStart(3, '0')}`, 17, ejeY + 4.8);

                doc.setFont("helvetica", "normal");
                doc.setTextColor(51, 65, 85);
                doc.text(String(item.timestamp), 32, ejeY + 4.8);

                doc.setFont("helvetica", "bold");
                doc.setTextColor(theme.accent[0], theme.accent[1], theme.accent[2]);
                doc.text(String(item.canal), 68, ejeY + 4.8);

                doc.setFont("helvetica", "bold");
                doc.setTextColor(15, 23, 42);
                doc.text(String(item.valor), 118, ejeY + 4.8);

                doc.setFillColor(stTheme.bg[0], stTheme.bg[1], stTheme.bg[2]);
                doc.roundedRect(158, ejeY + 1.2, 28, 5, 0.8, 0.8, 'F');
                doc.setFont("helvetica", "bold");
                doc.setFontSize(6.5);
                doc.setTextColor(stTheme.text[0], stTheme.text[1], stTheme.text[2]);
                doc.text(String(item.status), 172, ejeY + 4.6, { align: 'center' });

                ejeY += 8.5;
            });

            doc.save("Reporte_MAEDIS_V5_2.pdf"); 
        });
    }

    /* =========================================
       8. GESTOR DE IDIOMAS E INTERNACIONALIZACIÓN V5.2
       ========================================= */
    const themeSwitch = document.getElementById('theme-switch'), 
          langSelect = document.getElementById('lang-select');

    function changeLanguage(newLang) {
        currentLang = newLang;

        // 1. Traducciones por data-tr (i18nDict)
        document.querySelectorAll('[data-tr]').forEach(el => {
            const key = el.getAttribute('data-tr');
            if (i18nDict[currentLang] && i18nDict[currentLang][key]) {
                el.textContent = i18nDict[currentLang][key];
            }
        });

        // 2. Traducciones explícitas data-es / data-en
        document.querySelectorAll('[data-es]').forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation) {
                el.innerHTML = translation;
            }
        });

        if (typeof syncAgentUI === 'function') syncAgentUI();

        if (typeof updatePredictiveAnalysis === 'function') {
            updatePredictiveAnalysis('pred-cx', curCX, 410, 'PPM');
            updatePredictiveAnalysis('pred-ln', curLX, 65, 'Lux');
            updatePredictiveAnalysis('pred-si', curSI, 55, 'dBA');
            updatePredictiveAnalysis('pred-tg', curTG, 24, '°C');
        }

        if (typeof updateSecondaryCards === 'function') {
            updateSecondaryCards(curCX, curLX, curSI, curTG);
        }

        if (tb) {
            tb.querySelectorAll('tr').forEach(tr => {
                const statusCell = tr.children[4];
                if (statusCell) {
                    let text = statusCell.textContent.replace(/\[|\]/g, '').trim();
                    let newStatus = text;
                    if (currentLang === 'en') {
                        if (text === 'ÓPTIMO' || text === 'OPTIMAL') newStatus = 'OPTIMAL';
                        if (text === 'OPERATIVO' || text === 'NOMINAL') newStatus = 'NOMINAL';
                        if (text === 'CRÍTICO' || text === 'CRITICAL') newStatus = 'CRITICAL';
                    } else {
                        if (text === 'OPTIMAL' || text === 'ÓPTIMO') newStatus = 'ÓPTIMO';
                        if (text === 'NOMINAL' || text === 'OPERATIVO') newStatus = 'OPERATIVO';
                        if (text === 'CRITICAL' || text === 'CRÍTICO') newStatus = 'CRÍTICO';
                    }
                    const isCrit = newStatus === 'CRÍTICO' || newStatus === 'CRITICAL';
                    const isOp = newStatus === 'OPERATIVO' || newStatus === 'NOMINAL';
                    const col = isCrit ? 'var(--neon-red)' : (isOp ? 'var(--neon-yellow)' : 'var(--neon-green)');
                    
                    statusCell.style.color = col;
                    statusCell.style.textShadow = `0 0 3px ${col}`;
                    statusCell.textContent = `[ ${newStatus} ]`;
                }
            });
        }
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    document.querySelectorAll('[data-lang], [data-lang-switch]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-lang-switch') || e.currentTarget.getAttribute('data-lang');
            if (lang) changeLanguage(lang);
        });
    });

    if (themeSwitch) {
        themeSwitch.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            const isLight = newTheme === 'light';
            Chart.defaults.color = isLight ? '#475569' : '#94a3b8';

            if (typeof tileLayer !== 'undefined') {
                const mapUrl = isLight 
                    ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' 
                    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
                tileLayer.setUrl(mapUrl);
            }

            allCharts.forEach(chart => {
                chart.options.scales.x.grid.color = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)';
                chart.options.scales.y.grid.color = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)';
                chart.update('none');
            });
        });
    }
});
