document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       0. CONSOLA DE ARRANQUE (BOOT Y SHUTDOWN APAGADO OPTIMIZADO)
       ========================================= */
    const bootScreen = document.getElementById('boot-screen'), bootTerminal = document.getElementById('boot-terminal'), shutdownScreen = document.getElementById('shutdown-screen'), logoutBtn = document.getElementById('btn-salir');
    const bootSequence = ["Iniciando Núcleo MAEDIS v3.0...", "Estableciendo enlace con sensores multidimensionales...", "Sincronizando registros en caché reactiva...", "Calibración gráfica exitosa. Interfaz Desbloqueada."];
    
    let currentLang = 'es'; // Estado global del idioma

    function simulateBoot() { 
        if (!bootScreen || !bootTerminal) return; 
        bootTerminal.innerHTML = ''; 
        let delay = 0; 
        bootSequence.forEach(text => { 
            setTimeout(() => { 
                const p = document.createElement('p'); 
                p.innerHTML = `> ${text}`; 
                bootTerminal.appendChild(p); 
            }, delay); 
            delay += 350; 
        }); 
        setTimeout(() => { 
            bootScreen.style.opacity = '0'; 
            setTimeout(() => bootScreen.classList.add('hidden'), 600); 
        }, delay + 250); 
    }
    simulateBoot();

    if (logoutBtn && shutdownScreen) {
        logoutBtn.addEventListener('click', () => { 
            const msg = currentLang === 'es' ? "¿Desconectar terminal del servidor y cerrar aplicación?" : "Disconnect terminal from server and close application?";
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
    const canvas = document.getElementById('particle-canvas'), ctx = canvas.getContext('2d'); let particles = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3; this.size = Math.random() * 1.5; } update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width) this.vx *= -1; if (this.y < 0 || this.y > canvas.height) this.vy *= -1; } draw() { ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(148,163,184,0.12)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } }
    for (let i = 0; i < 35; i++) particles.push(new Particle());
    function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
    animateParticles();

    /* =========================================
       2. NAVEGACIÓN Y CORRECCIÓN DE MAPAS / PESTAÑAS
       ========================================= */
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', (e) => { const target = e.currentTarget.getAttribute('data-target'); if (!target) return; document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active')); e.currentTarget.classList.add('active'); document.querySelectorAll('.view').forEach(v => v.classList.remove('active')); document.getElementById(target).classList.add('active'); if (target === 'radar-territorial' && typeof map !== 'undefined') { setTimeout(() => { map.invalidateSize(true); }, 250); } }));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', (e) => { document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); e.currentTarget.classList.add('active'); const targetId = e.currentTarget.getAttribute('data-tab'); const content = document.getElementById(targetId); if (content) content.classList.add('active'); setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 50); }));

    /* =========================================
       3. INICIALIZACIÓN DE GRÁFICOS (CHART.JS)
       ========================================= */
    Chart.defaults.color = '#94a3b8'; Chart.defaults.font.family = "'Orbitron', sans-serif"; Chart.defaults.scale.grid.color = 'rgba(255,255,255,0.04)';
    const darkColors = { co2: '#00e676', light: '#ffea00', noise: '#d500f9', bio: '#ff3d00' };
    const lightColors = { co2: '#2e7d32', light: '#fbc02d', noise: '#9c27b0', bio: '#c62828' };
    let cStyle = { ...darkColors };

    const optLine = { animation: false, responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { beginAtZero: false } } };
    const optStruct = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 9 } } } } };

    // Gráficos CARB-X
    const cCX1 = new Chart(document.getElementById('carbx-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(410), borderColor: cStyle.co2, backgroundColor: 'rgba(0,230,118,0.05)', fill: true, tension: 0.2 }] }, options: optLine });
    const cCX2 = new Chart(document.getElementById('carbx-bar'), { type: 'bar', data: { labels: ['Norte', 'Centro', 'Metrop.', 'Sur'], datasets: [{ label: 'PPM', data: [390, 415, 480, 400], backgroundColor: 'rgba(0,230,118,0.4)' }] }, options: optStruct });
    const cCX3 = new Chart(document.getElementById('carbx-radar'), { type: 'radar', data: { labels: ['Disp', 'Sat', 'Est', 'Capt'], datasets: [{ label: 'Vectores', data: [75, 60, 80, 50], borderColor: cStyle.co2, backgroundColor: 'rgba(0,230,118,0.08)' }] }, options: optStruct });
    const cCX4 = new Chart(document.getElementById('carbx-polar'), { type: 'polarArea', data: { labels: ['Crit', 'Alerta', 'Ok'], datasets: [{ data: [12, 28, 60], backgroundColor: ['rgba(0,230,118,0.8)', 'rgba(0,230,118,0.5)', 'rgba(0,230,118,0.2)'] }] }, options: optStruct });
    
    // Gráficos LUX-NET
    const cLX1 = new Chart(document.getElementById('luxnet-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(65), borderColor: cStyle.light, backgroundColor: 'rgba(255,234,0,0.05)', fill: true }] }, options: optLine });
    const cLX2 = new Chart(document.getElementById('luxnet-bar'), { type: 'bar', data: { labels: ['Norte', 'Valpo', 'STGO', 'Concep'], datasets: [{ label: 'Lux', data: [30, 70, 120, 80], backgroundColor: 'rgba(255,234,0,0.4)' }] }, options: optStruct });
    const cLX3 = new Chart(document.getElementById('luxnet-doughnut'), { type: 'doughnut', data: { labels: ['Limpio', 'Sat', 'Crit'], datasets: [{ data: [50, 35, 15], backgroundColor: ['rgba(255,234,0,0.2)', 'rgba(255,234,0,0.5)', 'rgba(255,234,0,0.8)'] }] }, options: optStruct });
    const cLX4 = new Chart(document.getElementById('luxnet-bubble'), { type: 'bubble', data: { datasets: [{ label: 'Nodos', data: [{ x: 4, y: 6, r: 10 }, { x: 9, y: 11, r: 18 }], backgroundColor: 'rgba(255,234,0,0.4)' }] }, options: optStruct });

    // Gráficos SONAR-IND
    const cSI1 = new Chart(document.getElementById('sonarind-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(55), borderColor: cStyle.noise, backgroundColor: 'rgba(213,0,249,0.05)', fill: true }] }, options: optLine });
    const cSI2 = new Chart(document.getElementById('sonarind-bar'), { type: 'bar', data: { labels: ['Resid.', 'Mixto', 'Ind.', 'Rural'], datasets: [{ label: 'dBA', data: [50, 65, 85, 45], backgroundColor: 'rgba(213,0,249,0.4)' }] }, options: optStruct });
    const cSI3 = new Chart(document.getElementById('sonarind-radar'), { type: 'radar', data: { labels: ['Baja', 'Media', 'Alta', 'Norma'], datasets: [{ label: 'Frecuencias', data: [60, 80, 70, 90], borderColor: cStyle.noise, backgroundColor: 'rgba(213,0,249,0.08)' }] }, options: optStruct });
    const cSI4 = new Chart(document.getElementById('sonarind-doughnut'), { type: 'doughnut', data: { labels: ['Ok', 'Exceso', 'Critico'], datasets: [{ data: [70, 20, 10], backgroundColor: ['rgba(213,0,249,0.2)', 'rgba(213,0,249,0.5)', 'rgba(213,0,249,0.8)'] }] }, options: optStruct });

    // Gráficos THERMO-GEN
    const cTG1 = new Chart(document.getElementById('thermogen-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(24), borderColor: cStyle.bio, backgroundColor: 'rgba(255,61,0,0.05)', fill: true }] }, options: optLine });
    const cTG2 = new Chart(document.getElementById('thermogen-bar'), { type: 'bar', data: { labels: ['Alfa', 'Bravo', 'Silo', 'Fosa'], datasets: [{ label: '°C', data: [22, 26, 38, 29], backgroundColor: 'rgba(255,61,0,0.4)' }] }, options: optStruct });
    const cTG3 = new Chart(document.getElementById('thermogen-polar'), { type: 'polarArea', data: { labels: ['Inerte', 'Metano', 'CO2'], datasets: [{ data: [55, 30, 15], backgroundColor: ['rgba(255,61,0,0.2)', 'rgba(255,61,0,0.5)', 'rgba(255,61,0,0.8)'] }] }, options: optStruct });
    const cTG4 = new Chart(document.getElementById('thermogen-radar'), { type: 'radar', data: { labels: ['Disip', 'Pres', 'Hum', 'Comb'], datasets: [{ label: 'Térmico', data: [50, 65, 60, 75], borderColor: cStyle.bio, backgroundColor: 'rgba(255,61,0,0.08)' }] }, options: optStruct });

    const allCharts = [cCX1, cCX2, cCX3, cCX4, cLX1, cLX2, cLX3, cLX4, cSI1, cSI2, cSI3, cSI4, cTG1, cTG2, cTG3, cTG4];

    /* =========================================
       4. SIMULACIÓN DE FLUJOS EN VIVO Y CAPA PREDICTIVA
       ========================================= */
    const db = { carbx: [], luxnet: [], sonarind: [], thermogen: [] }, limit = 50, tb = document.getElementById('table-body');
    
    function pushDataRow(mod, val, sec, stat) {
        const ts = new Date().toTimeString().split(' ')[0];
        let k = mod.toLowerCase().replace('-', ''); if (db[k]) db[k].push({ Timestamp: ts, Modulo: mod, Valor: val, Sector: sec, Status: stat });
        if (db[k] && db[k].length > limit) db[k].shift();
        if (!tb) return;
        
        let displayStat = stat;
        if (currentLang === 'en') {
            if (stat === 'CRÍTICO') displayStat = 'CRITICAL';
            if (stat === 'ALERTA') displayStat = 'ALERT';
            if (stat === 'NORMAL') displayStat = 'NORMAL';
            if (stat === 'ESTABLE') displayStat = 'STABLE';
        }

        const tr = document.createElement('tr'), col = stat === 'CRÍTICO' ? 'var(--neon-red)' : (stat === 'ALERTA' ? 'var(--neon-yellow)' : 'var(--neon-green)');
        tr.innerHTML = `<td style="color:var(--text-muted)">[${ts}]</td><td style="font-weight:600">${mod}</td><td>${val}</td><td>${sec}</td><td style="color:${col};text-shadow:0 0 3px ${col}">[ ${displayStat} ]</td>`;
        tb.prepend(tr); if (tb.children.length > 20) tb.removeChild(tb.lastChild);
    }
    
    let curCX = 410, curLX = 65, curSI = 55, curTG = 24;

    function updatePredictiveAnalysis(idElement, value, baseValue, unit) {
        const el = document.getElementById(idElement);
        if (!el) return;
        const diff = value - baseValue;
        
        if (diff > (baseValue * 0.03)) {
            el.innerHTML = currentLang === 'es' ? `[ 🔮 IA PROY: INCREMENTO ▲ ${(diff).toFixed(1)} ${unit} ]` : `[ 🔮 AI PROJ: INCREASE ▲ ${(diff).toFixed(1)} ${unit} ]`;
            el.style.opacity = "1";
        } else if (diff < -(baseValue * 0.03)) {
            el.innerHTML = currentLang === 'es' ? `[ 🔮 IA PROY: DESCENSO ▼ ${Math.abs(diff).toFixed(1)} ${unit} ]` : `[ 🔮 AI PROJ: DECREASE ▼ ${Math.abs(diff).toFixed(1)} ${unit} ]`;
            el.style.opacity = "1";
        } else {
            el.innerHTML = currentLang === 'es' ? `[ 🔮 IA PROY: ESTABLE ]` : `[ 🔮 AI PROJ: STABLE ]`;
            el.style.opacity = "0.85";
        }
    }

    /* =========================================
       5. MAPA LEAFLET Y RADAR DE IMPACTO CON DISPLAY DE PORCENTAJES
       ========================================= */
    const chileBounds = L.latLngBounds(L.latLng([-56.0, -80.0]), L.latLng([-17.5, -62.0]));
    const map = L.map('chile-map', { zoomControl: false, minZoom: 4, maxZoom: 12, maxBounds: chileBounds, maxBoundsViscosity: 1.0, worldCopyJump: false }).setView([-33.45, -70.66], 5);
    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    
    const dataA = { co2: '#00e676', luz: '#ffea00', ruido: '#d500f9', bio: '#ff3d00' };
    let activeAgent = 'co2';

    const radarZones = [
        { name: "Zona Norte (Iquique)", coords: [-20.21, -70.14], weight: 0.85 },
        { name: "Zona Centro-Costa (Valparaíso)", coords: [-33.04, -71.61], weight: 0.90 },
        { name: "Macrozona Central (Santiago)", coords: [-33.45, -70.66], weight: 1.20 },
        { name: "Zona Sur-Industrial (Concepción)", coords: [-36.82, -73.03], weight: 1.05 },
        { name: "Zona Austral (Puerto Montt)", coords: [-41.47, -72.94], weight: 0.70 }
    ];

    let mapCircles = [];
    radarZones.forEach(zone => {
        let circle = L.circle(zone.coords, { color: dataA.co2, fillColor: dataA.co2, fillOpacity: 0.25, radius: 35000 * zone.weight, className: 'radar-pulse-layer' }).addTo(map);
        mapCircles.push({ layer: circle, weight: zone.weight });
    });

    const cImp = new Chart(document.getElementById('impact-chart').getContext('2d'), { 
        type: 'doughnut', 
        data: { 
            labels: ['Impacto Red %', 'Margen Seguro'], 
            datasets: [{ data: [0, 100], backgroundColor: [dataA.co2, 'rgba(255,255,255,0.04)'], borderWidth: 0 }] 
        }, 
        options: { cutout: '85%', plugins: { legend: { display: false }, tooltip: { enabled: true } } } 
    });
    
    const impactDisplay = document.getElementById('impact-value-display');

    document.querySelectorAll('.agent-btn').forEach(b => b.addEventListener('click', e => {
        document.querySelectorAll('.agent-btn').forEach(btn => btn.classList.remove('active')); e.currentTarget.classList.add('active');
        activeAgent = e.currentTarget.getAttribute('data-agent'); const c = dataA[activeAgent];
        mapCircles.forEach(obj => obj.layer.setStyle({ color: c, fillColor: c }));
        cImp.data.datasets[0].backgroundColor[0] = c; cImp.update();
    }));

    function updateRadarTelemetry(value, minVal, maxVal) {
        let pct = ((value - minVal) / (maxVal - minVal)) * 100; if (pct < 10) pct = 10; if (pct > 100) pct = 100;
        const formattedPct = pct.toFixed(1);
        
        cImp.data.datasets[0].data = [formattedPct, (100 - pct).toFixed(1)]; 
        cImp.update('none');
        
        if(impactDisplay) {
            impactDisplay.textContent = `${formattedPct}%`;
            impactDisplay.style.color = dataA[activeAgent];
        }
        
        mapCircles.forEach(obj => { let targetRadius = (12000 + (pct * 700)) * obj.weight; obj.layer.setRadius(targetRadius); });
    }

    // Intervalo Unificado de Actualización
    setInterval(() => {
        curCX += (Math.random() * 4 - 2); cCX1.data.datasets[0].data.shift(); cCX1.data.datasets[0].data.push(curCX); cCX1.update();
        if(Math.random() > 0.75) pushDataRow('CARB-X', curCX.toFixed(1) + ' PPM', 'Estación RM', curCX > 428 ? 'ALERTA' : 'NORMAL');
        updatePredictiveAnalysis('pred-cx', curCX, 410, 'PPM');

        curLX += (Math.random() * 6 - 3); cLX1.data.datasets[0].data.shift(); cLX1.data.datasets[0].data.push(curLX); cLX1.update();
        if(Math.random() > 0.8) pushDataRow('LUX-NET', curLX.toFixed(1) + ' Lux', 'Urbano Norte', curLX > 92 ? 'ALERTA' : 'ESTABLE');
        updatePredictiveAnalysis('pred-ln', curLX, 65, 'Lux');

        curSI += (Math.random() * 8 - 4); cSI1.data.datasets[0].data.shift(); cSI1.data.datasets[0].data.push(curSI); cSI1.update();
        if(Math.random() > 0.75) pushDataRow('SONAR-IND', curSI.toFixed(1) + ' dBA', 'Zona Industrial', curSI > 82 ? 'CRÍTICO' : 'NORMAL');
        updatePredictiveAnalysis('pred-si', curSI, 55, 'dBA');

        curTG += (Math.random() * 1 - 0.5); cTG1.data.datasets[0].data.shift(); cTG1.data.datasets[0].data.push(curTG); cTG1.update();
        if(Math.random() > 0.8) pushDataRow('THERMO-GEN', curTG.toFixed(2) + ' °C', 'Subsuelo Alfa', 'ESTABLE');
        updatePredictiveAnalysis('pred-tg', curTG, 24, '°C');

        if (activeAgent === 'co2')     updateRadarTelemetry(curCX, 380, 460);
        if (activeAgent === 'luz')     updateRadarTelemetry(curLX, 20, 140);
        if (activeAgent === 'ruido')   updateRadarTelemetry(curSI, 40, 95);
        if (activeAgent === 'bio')     updateRadarTelemetry(curTG, 15, 40);
    }, 450);

    /* =========================================
       6. PIPELINES DE EXPORTACIÓN
       ========================================= */
    document.getElementById('btn-excel').addEventListener('click', () => { const wb = XLSX.utils.book_new(); Object.keys(db).forEach(k => { if(db[k].length > 0) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(db[k]), k.toUpperCase()); }); XLSX.writeFile(wb, "Reporte_MAEDIS_v3.xlsx"); });
    document.getElementById('btn-pdf').addEventListener('click', () => { const { jsPDF } = window.jspdf, doc = new jsPDF(); doc.setFont("helvetica", "bold"); doc.text("AUDITORIA TACTICA MAEDIS v3.0", 14, 15); doc.setFontSize(9); doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 22); doc.save("Reporte_MAEDIS_v3.pdf"); });

    /* =========================================
       7. PANEL CONFIGURACIÓN INTERFAZ Y TRADUCCIONES EXPANSIBLES
       ========================================= */
    const themeSwitch = document.getElementById('theme-switch'), langSelect = document.getElementById('lang-select');
    
    const translations = {
        es: { 
            "m-dash": "Dashboard", "m-radar": "Radar Map", "m-audit": "Tabla de Registros", "m-sett": "Ajustes", "m-exit": "Salir", 
            "s-title": "Configuración", "s-core": "Preferencias del Sistema", "s-tmode": "Tema Visual", 
            "s-tdesc": "Alternar entre modo oscuro cibernético y claro armónico pastel.", "s-lselect": "Idioma Regional", 
            "s-ldesc": "Modificar la localización lingüística del núcleo.", "a-title": "Auditoría Táctica", 
            "t-ts": "[ TIMESTAMP ]", "t-sub": "SISTEMA", "t-rd": "LECTURA", "t-sc": "SECTOR", "t-st": "ESTADO", 
            "r-ctrl": "Consola Georreferenciada", "r-desc": "Seleccione el agente para proyectar ondas sobre el territorio chileno.", "r-inf": "IMPACTO PROMEDIO",
            "desc-cx-title": "Monitoreo de Emisiones de Carbono (CARB-X)", 
            "desc-cx-body": "Este módulo analiza la concentración de partículas de CO₂ en la atmósfera en partes por millón (PPM). Supervisa la dispersión macrozonal y activa alertas críticas cuando los niveles superan los umbrales de seguridad ambiental establecidos.",
            "desc-ln-title": "Evaluación de Contaminación Lumínica (LUX-NET)",
            "desc-ln-body": "Módulo encargado de medir la saturación de flujo fotónico y degradación de la oscuridad natural en la bóveda celeste. Grafica la densidad de emisiones artificiales reflejadas hacia el espacio y su impacto en ecosistemas astronómicos.",
            "desc-si-title": "Diagnóstico de Presión Acústica (SONAR-IND)",
            "desc-si-body": "Registra los niveles de ruido ambiental e industrial expresados en decibelios ponderados (dBA). Analiza las bandas de frecuencia en áreas mixtas y residenciales para asegurar el cumplimiento de normativas de salud pública.",
            "desc-tg-title": "Análisis de Dispersión Térmica (THERMO-GEN)",
            "desc-tg-body": "Supervisa las fluctuaciones termodinámicas y gradientes de calor en grados Celsius (°C). Detecta fenómenos de islas de calor urbanas, anomalías energéticas en subsuelos y vectores de inestabilidad climática local.",
            "cx-l": "CARB-X // Dinámica Temporal", "cx-b": "Concentración Macrozona", "cx-r": "Dispersión Indexada", "cx-p": "Alertas Críticas",
            "ln-l": "LUX-NET // Espectro Fotónico", "ln-b": "Saturación Lumínica", "ln-d": "Clasificación Bóveda", "ln-bu": "Densidad de Emisiones",
            "si-l": "SONAR-IND // Presión Sonora", "si-b": "Histograma Amplitud dBA", "si-r": "Frecuencias Industriales", "si-d": "Cumplimiento Normativo",
            "tg-l": "THERMO-GEN // Gradiente Térmico", "tg-b": "Fluctuación de Columnas", "tg-p": "Perfil de Calor Estático", "tg-r": "Inestabilidad Térmica"
        },
        en: { 
            "m-dash": "Dashboard", "m-radar": "Radar Map", "m-audit": "Audit Logs", "m-sett": "Settings", "m-exit": "Logout", 
            "s-title": "System Settings", "s-core": "System Core Preferences", "s-tmode": "Visual Theme", 
            "s-tdesc": "Toggle between cyber dark mode and balanced light pastel theme.", "s-lselect": "Regional Language", 
            "s-ldesc": "Modify core system language localization mapping.", "a-title": "Tactical Audit Logs", 
            "t-ts": "[ TIMESTAMP ]", "t-sub": "SUBSYSTEM", "t-rd": "READING", "t-sc": "SECTOR", "t-st": "STATUS", 
            "r-ctrl": "Georeferenced Radar", "r-desc": "Select environmental target to display critical area overlay inside Chilean coordinates.", "r-inf": "AVERAGE IMPACT",
            "desc-cx-title": "Carbon Emissions Monitoring (CARB-X)", 
            "desc-cx-body": "This module analyzes the atmospheric CO₂ particle concentration in parts per million (PPM). It monitors macro-zonal dispersion and triggers critical alerts when levels exceed established environmental safety limits.",
            "desc-ln-title": "Light Pollution Assessment (LUX-NET)",
            "desc-ln-body": "Subsystem designed to measure photon flux saturation and natural darkness degradation in the night sky. It tracks artificial light emission density reflected spacebound and its direct impact on astronomical preserves.",
            "desc-si-title": "Acoustic Pressure Diagnostics (SONAR-IND)",
            "desc-si-body": "Logs ambient and industrial noise levels expressed in weighted decibels (dBA). It dynamically analyzes audio frequency distributions across mixed and residential zones to guarantee compliance with public health mandates.",
            "desc-tg-title": "Thermal Dispersion Analysis (THERMO-GEN)",
            "desc-tg-body": "Monitors thermodynamic fluctuations and core heat gradients in degrees Celsius (°C). Detects urban heat island anomalies, sub-surface energy discharge points, and local micro-climatic instability vectors.",
            "cx-l": "CARB-X // Temporal Dynamics", "cx-b": "Macro-Zone Concentration", "cx-r": "Indexed Dispersion", "cx-p": "Critical Alerts",
            "ln-l": "LUX-NET // Photonic Spectrum", "ln-b": "Luminous Saturation", "ln-d": "Dome Classification", "ln-bu": "Emission Density",
            "si-l": "SONAR-IND // Sonic Pressure", "si-b": "dBA Amplitude Histogram", "si-r": "Industrial Frequencies", "si-d": "Regulatory Compliance",
            "tg-l": "THERMO-GEN // Thermal Gradient", "tg-b": "Column Fluctuation", "tg-p": "Static Heat Profile", "tg-r": "Thermal Instability"
        }
    };

    if (themeSwitch) themeSwitch.addEventListener('change', (e) => {
        const isLight = e.target.checked;
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
        cStyle = isLight ? { ...lightColors } : { ...darkColors };
        
        const txt = isLight ? '#0f172a' : '#e2e8f0';
        const gridCol = isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.04)';
        
        Chart.defaults.color = txt; Chart.defaults.scale.grid.color = gridCol;

        if (isLight) { tileLayer.setUrl('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'); } 
        else { tileLayer.setUrl('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'); }

        cCX1.data.datasets[0].borderColor = cStyle.co2; cCX1.data.datasets[0].backgroundColor = isLight ? 'rgba(46,125,50,0.08)' : 'rgba(0,230,118,0.05)';
        cCX2.data.datasets[0].backgroundColor = isLight ? 'rgba(46,125,50,0.35)' : 'rgba(0,230,118,0.4)';
        cCX3.data.datasets[0].borderColor = cStyle.co2; cCX3.data.datasets[0].backgroundColor = isLight ? 'rgba(46,125,50,0.05)' : 'rgba(0,230,118,0.08)';
        cCX4.data.datasets[0].backgroundColor = ['rgba(46,125,50,0.8)', 'rgba(46,125,50,0.5)', 'rgba(46,125,50,0.2)'];
        
        cLX1.data.datasets[0].borderColor = cStyle.light; cLX1.data.datasets[0].backgroundColor = isLight ? 'rgba(251,192,45,0.08)' : 'rgba(255,234,0,0.05)';
        cLX2.data.datasets[0].backgroundColor = isLight ? 'rgba(251,192,45,0.35)' : 'rgba(255,234,0,0.4)';
        cLX3.data.datasets[0].backgroundColor = ['rgba(251,192,45,0.2)', 'rgba(251,192,45,0.5)', 'rgba(251,192,45,0.8)'];
        
        cSI1.data.datasets[0].borderColor = cStyle.noise; cSI1.data.datasets[0].backgroundColor = isLight ? 'rgba(156,39,176,0.08)' : 'rgba(213,0,249,0.05)';
        cSI2.data.datasets[0].backgroundColor = isLight ? 'rgba(156,39,176,0.35)' : 'rgba(213,0,249,0.4)';
        cSI4.data.datasets[0].backgroundColor = ['rgba(156,39,176,0.2)', 'rgba(156,39,176,0.5)', 'rgba(156,39,176,0.8)'];
        
        cTG1.data.datasets[0].borderColor = cStyle.bio; cTG1.data.datasets[0].backgroundColor = isLight ? 'rgba(198,40,40,0.08)' : 'rgba(255,61,0,0.05)';
        cTG2.data.datasets[0].backgroundColor = isLight ? 'rgba(198,40,40,0.35)' : 'rgba(255,61,0,0.4)';
        cTG3.data.datasets[0].backgroundColor = ['rgba(198,40,40,0.2)', 'rgba(198,40,40,0.5)', 'rgba(198,40,40,0.8)'];

        cImp.data.datasets[0].backgroundColor[0] = dataA[activeAgent];
        cImp.data.datasets[0].backgroundColor[1] = isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.04)';

        allCharts.forEach(c => {
            if (c.options.scales) { Object.keys(c.options.scales).forEach(s => { if (c.options.scales[s].grid) c.options.scales[s].grid.color = gridCol; }); }
            c.update();
        });
    });

    if (langSelect) langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        const set = translations[currentLang];
        
        // Traducción de Elementos del DOM estándar
        document.querySelectorAll('[data-tr]').forEach(el => {
            const k = el.getAttribute('data-tr');
            if (set[k]) {
                if (el.querySelector('i')) { 
                    const icon = el.querySelector('i').cloneNode(true); 
                    el.textContent = ' ' + set[k]; 
                    el.prepend(icon); 
                } else { 
                    el.textContent = set[k]; 
                }
            }
        });

        // Traducción Dinámica Interna de etiquetas de los Gráficos de Chart.js
        cCX2.data.datasets[0].label = currentLang === 'es' ? 'PPM' : 'PPM';
        cCX3.data.datasets[0].label = currentLang === 'es' ? 'Vectores' : 'Vectors';
        cCX3.data.labels = currentLang === 'es' ? ['Disp', 'Sat', 'Est', 'Capt'] : ['Disp', 'Sat', 'Stab', 'Capt'];
        cCX4.data.labels = currentLang === 'es' ? ['Crit', 'Alerta', 'Ok'] : ['Crit', 'Alert', 'Ok'];

        cLX2.data.datasets[0].label = currentLang === 'es' ? 'Lux' : 'Lux';
        cLX3.data.labels = currentLang === 'es' ? ['Limpio', 'Sat', 'Crit'] : ['Clean', 'Sat', 'Crit'];

        cSI2.data.datasets[0].label = currentLang === 'es' ? 'dBA' : 'dBA';
        cSI3.data.datasets[0].label = currentLang === 'es' ? 'Frecuencias' : 'Frequencies';
        cSI4.data.labels = currentLang === 'es' ? ['Ok', 'Exceso', 'Critico'] : ['Ok', 'Excess', 'Critical'];

        cTG2.data.datasets[0].label = currentLang === 'es' ? '°C' : '°C';
        cTG4.data.datasets[0].label = currentLang === 'es' ? 'Térmico' : 'Thermal';

        allCharts.forEach(c => c.update());
    });
});
