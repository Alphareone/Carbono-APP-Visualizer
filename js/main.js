document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       0. CONSOLA DE ARRANQUE (OPTIMIZADA)
       ========================================= */
    const bootScreen = document.getElementById('boot-screen'), 
          bootTerminal = document.getElementById('boot-terminal'), 
          shutdownScreen = document.getElementById('shutdown-screen'), 
          logoutBtn = document.getElementById('btn-salir');
    const bootSequence = ["Iniciando Núcleo M.A.E.D.I.S V4.0...", "Estableciendo enlace con sensores multidimensionales...", "Sincronizando registros en caché reactiva...", "Calibración gráfica exitosa. Interfaz Desbloqueada."];
    
    let currentLang = 'es'; 

    function simulateBoot() { 
        if (!bootScreen || !bootTerminal) return; 
        bootTerminal.innerHTML = ''; 
        bootSequence.forEach((text, index) => { 
            setTimeout(() => { 
                const p = document.createElement('p'); 
                p.innerHTML = `> ${text}`; 
                bootTerminal.appendChild(p); 
            }, index * 350); 
        }); 
        setTimeout(() => { 
            bootScreen.style.opacity = '0'; 
            setTimeout(() => bootScreen.classList.add('hidden'), 600); 
        }, (bootSequence.length * 350) + 250); 
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
       1. CANVAS DE PARTÍCULAS (MÉTODO ULTRA-LIVIANO)
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
       2. NAVEGACIÓN Y INTERFAZ
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
       3. INICIALIZACIÓN DE GRÁFICOS (CHART.JS)
       ========================================= */
    Chart.defaults.color = '#94a3b8'; Chart.defaults.font.family = "'Orbitron', sans-serif"; Chart.defaults.scale.grid.color = 'rgba(255,255,255,0.04)';
    const darkColors = { co2: '#00e676', light: '#ffea00', noise: '#d500f9', bio: '#ff3d00' };
    const lightColors = { co2: '#2e7d32', light: '#fbc02d', noise: '#9c27b0', bio: '#c62828' };
    let cStyle = { ...darkColors };

    const optLine = { animation: false, responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { beginAtZero: false } } };
    const optStruct = { animation: false, responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, labels: { boxWidth: 10, font: { size: 9 } } } } };

    const cCX1 = new Chart(document.getElementById('carbx-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(410), borderColor: cStyle.co2, backgroundColor: 'rgba(0,230,118,0.05)', fill: true, tension: 0.2 }] }, options: optLine });
    const cCX2 = new Chart(document.getElementById('carbx-bar'), { type: 'bar', data: { labels: ['Norte', 'Centro', 'Metrop.', 'Sur'], datasets: [{ label: 'PPM', data: [390, 415, 480, 400], backgroundColor: 'rgba(0,230,118,0.4)' }] }, options: optStruct });
    const cCX3 = new Chart(document.getElementById('carbx-radar'), { type: 'radar', data: { labels: ['Disp', 'Sat', 'Est', 'Capt'], datasets: [{ label: 'Vectores', data: [75, 60, 80, 50], borderColor: cStyle.co2, backgroundColor: 'rgba(0,230,118,0.08)' }] }, options: optStruct });
    const cCX4 = new Chart(document.getElementById('carbx-polar'), { type: 'polarArea', data: { labels: ['Crit', 'Alerta', 'Ok'], datasets: [{ data: [12, 28, 60], backgroundColor: ['rgba(0,230,118,0.8)', 'rgba(0,230,118,0.5)', 'rgba(0,230,118,0.2)'] }] }, options: optStruct });
    
    const cLX1 = new Chart(document.getElementById('luxnet-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(65), borderColor: cStyle.light, backgroundColor: 'rgba(255,234,0,0.05)', fill: true }] }, options: optLine });
    const cLX2 = new Chart(document.getElementById('luxnet-bar'), { type: 'bar', data: { labels: ['Norte', 'Valpo', 'STGO', 'Concep'], datasets: [{ label: 'Lux', data: [30, 70, 120, 80], backgroundColor: 'rgba(255,234,0,0.4)' }] }, options: optStruct });
    const cLX3 = new Chart(document.getElementById('luxnet-doughnut'), { type: 'doughnut', data: { labels: ['Limpio', 'Sat', 'Crit'], datasets: [{ data: [50, 35, 15], backgroundColor: ['rgba(255,234,0,0.2)', 'rgba(255,234,0,0.5)', 'rgba(255,234,0,0.8)'] }] }, options: optStruct });
    const cLX4 = new Chart(document.getElementById('luxnet-bubble'), { type: 'bubble', data: { datasets: [{ label: 'Nodos', data: [{ x: 4, y: 6, r: 10 }, { x: 9, y: 11, r: 18 }], backgroundColor: 'rgba(255,234,0,0.4)' }] }, options: optStruct });

    const cSI1 = new Chart(document.getElementById('sonarind-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(55), borderColor: cStyle.noise, backgroundColor: 'rgba(213,0,249,0.05)', fill: true }] }, options: optLine });
    const cSI2 = new Chart(document.getElementById('sonarind-bar'), { type: 'bar', data: { labels: ['Resid.', 'Mixto', 'Ind.', 'Rural'], datasets: [{ label: 'dBA', data: [50, 65, 85, 45], backgroundColor: 'rgba(213,0,249,0.4)' }] }, options: optStruct });
    const cSI3 = new Chart(document.getElementById('sonarind-radar'), { type: 'radar', data: { labels: ['Baja', 'Media', 'Alta', 'Norma'], datasets: [{ label: 'Frecuencias', data: [60, 80, 70, 90], borderColor: cStyle.noise, backgroundColor: 'rgba(213,0,249,0.08)' }] }, options: optStruct });
    const cSI4 = new Chart(document.getElementById('sonarind-doughnut'), { type: 'doughnut', data: { labels: ['Ok', 'Exceso', 'Critico'], datasets: [{ data: [70, 20, 10], backgroundColor: ['rgba(213,0,249,0.2)', 'rgba(213,0,249,0.5)', 'rgba(213,0,249,0.8)'] }] }, options: optStruct });

    const cTG1 = new Chart(document.getElementById('thermogen-line'), { type: 'line', data: { labels: Array(30).fill(''), datasets: [{ data: Array(30).fill(24), borderColor: cStyle.bio, backgroundColor: 'rgba(255,61,0,0.05)', fill: true }] }, options: optLine });
    const cTG2 = new Chart(document.getElementById('thermogen-bar'), { type: 'bar', data: { labels: ['Alfa', 'Bravo', 'Silo', 'Fosa'], datasets: [{ label: '°C', data: [22, 26, 38, 29], backgroundColor: 'rgba(255,61,0,0.4)' }] }, options: optStruct });
    const cTG3 = new Chart(document.getElementById('thermogen-polar'), { type: 'polarArea', data: { labels: ['Inerte', 'Metano', 'CO2'], datasets: [{ data: [55, 30, 15], backgroundColor: ['rgba(255,61,0,0.2)', 'rgba(255,61,0,0.5)', 'rgba(255,61,0,0.8)'] }] }, options: optStruct });
    const cTG4 = new Chart(document.getElementById('thermogen-radar'), { type: 'radar', data: { labels: ['Disip', 'Pres', 'Hum', 'Comb'], datasets: [{ label: 'Térmico', data: [50, 65, 60, 75], borderColor: cStyle.bio, backgroundColor: 'rgba(255,61,0,0.08)' }] }, options: optStruct });

    const allCharts = [cCX1, cCX2, cCX3, cCX4, cLX1, cLX2, cLX3, cLX4, cSI1, cSI2, cSI3, cSI4, cTG1, cTG2, cTG3, cTG4];

    /* =========================================
       4. TELEMETRÍA, KPIS INTERACTIVOS Y ESCUDO ANTI-RAM
       ========================================= */
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

    function pushDataRow(mod, val, sec, stat) {
        const ts = new Date().toTimeString().split(' ')[0];
        let k = mod.toLowerCase().replace('-', ''); 
        if (db[k]) {
            db[k].push({ Timestamp: ts, Modulo: mod, Valor: val, Sector: sec, Status: stat });
            if (db[k].length > limit) db[k].shift(); 
        }
        if (!tb) return;
        let displayStat = currentLang === 'en' ? (stat === 'CRÍTICO' ? 'CRITICAL' : stat === 'ALERTA' ? 'ALERT' : stat) : stat;
        const tr = document.createElement('tr'), col = stat === 'CRÍTICO' ? 'var(--neon-red)' : (stat === 'ALERTA' ? 'var(--neon-yellow)' : 'var(--neon-green)');
        tr.innerHTML = `<td style="color:var(--text-muted)">[${ts}]</td><td style="font-weight:600">${mod}</td><td>${val}</td><td>${sec}</td><td style="color:${col};text-shadow:0 0 3px ${col}">[ ${displayStat} ]</td>`;
        tb.prepend(tr); if (tb.children.length > 20) tb.removeChild(tb.lastChild);
    }
    
    let curCX = 410, curLX = 65, curSI = 55, curTG = 24;

    function updatePredictiveAnalysis(idElement, value, baseValue, unit) {
        const el = document.getElementById(idElement); if (!el) return;
        const diff = value - baseValue;
        if (Math.abs(diff) > (baseValue * 0.03)) {
            el.innerHTML = currentLang === 'es' ? `[ 🔮 IA PROY: ${diff > 0 ? 'INCREMENTO ▲' : 'DESCENSO ▼'} ${Math.abs(diff).toFixed(1)} ${unit} ]` : `[ 🔮 AI PROJ: ${diff > 0 ? 'INCREASE ▲' : 'DECREASE ▼'} ${Math.abs(diff).toFixed(1)} ${unit} ]`;
            el.style.opacity = "1";
        } else {
            el.innerHTML = currentLang === 'es' ? `[ 🔮 IA PROY: ESTABLE ]` : `[ 🔮 AI PROJ: STABLE ]`; el.style.opacity = "0.85";
        }
    }

    /* =========================================
       5. MAPA Y RADAR DE IMPACTO ASOCIADO AL VOLUMEN TOTAL
       ========================================= */
    const chileBounds = L.latLngBounds(L.latLng([-56.0, -80.0]), L.latLng([-17.5, -62.0]));
    const map = L.map('chile-map', { zoomControl: false, minZoom: 4, maxZoom: 12, maxBounds: chileBounds, maxBoundsViscosity: 1.0 }).setView([-33.45, -70.66], 5);
    const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    
    const dataA = { co2: '#00e676', luz: '#ffea00', ruido: '#d500f9', bio: '#ff3d00' };
    let activeAgent = 'co2';

    const agentMetadata = {
        co2: { title: "> SUBSISTEMA: CARB-X (CO2)", desc: "Escaneo satelital activo sobre la red macrozonal. Evaluando partículas por millón de gases.", unit: "PPM" },
        luz: { title: "> SUBSISTEMA: LUX-NET (LUX)", desc: "Monitoreo fotónico del espectro nocturno. Evaluando degradación lumínica ambiental.", unit: "Lux" },
        ruido: { title: "> SUBSISTEMA: SONAR-IND (dBA)", desc: "Análisis acústico ambiental de decibelios continuos. Mapeo de polución sónica.", unit: "dBA" },
        bio: { title: "> SUBSISTEMA: THERMO-GEN (°C)", desc: "Evaluación termodinámica infrarroja. Monitoreo de islas de calor urbanas.", unit: "°C" }
    };

    const radarZones = [
        { name: "Zona Norte (Iquique)", coords: [-20.21, -70.14], weight: 0.85 },
        { name: "Zona Centro-Costa (Valparaíso)", coords: [-33.04, -71.61], weight: 0.90 },
        { name: "Macrozona Central (Santiago)", coords: [-33.45, -70.66], weight: 1.20 },
        { name: "Zona Sur-Industrial (Concepción)", coords: [-36.82, -73.03], weight: 1.05 },
        { name: "Zona Austral (Puerto Montt)", coords: [-41.47, -72.94], weight: 0.70 }
    ];

    let mapCircles = [];
    radarZones.forEach(zone => {
        let circle = L.circle(zone.coords, { color: dataA.co2, fillColor: dataA.co2, fillOpacity: 0.25, radius: 35000 * zone.weight }).addTo(map);
        mapCircles.push({ layer: circle, weight: zone.weight, name: zone.name });
    });

    const cImp = new Chart(document.getElementById('impact-chart').getContext('2d'), { 
        type: 'doughnut', data: { labels: ['Impacto Red %', 'Margen Seguro'], datasets: [{ data: [0, 100], backgroundColor: [dataA.co2, 'rgba(255,255,255,0.04)'], borderWidth: 0 }] }, 
        options: { animation: false, cutout: '85%', plugins: { legend: { display: false } } } 
    });
    
    const impactDisplay = document.getElementById('impact-value-display'), zoneTableBody = document.getElementById('radar-zone-table-body'), descBlock = document.querySelector('.map-zone-description');

    function renderZoneTable() {
        if (!zoneTableBody) return; zoneTableBody.innerHTML = '';
        let baseValorActual = activeAgent === 'co2' ? curCX : activeAgent === 'luz' ? curLX : activeAgent === 'ruido' ? curSI : curTG;
        const meta = agentMetadata[activeAgent], colorAgente = dataA[activeAgent];

        radarZones.forEach(zone => {
            const valorZona = (baseValorActual * zone.weight * (0.95 + Math.random() * 0.1)).toFixed(activeAgent === 'bio' ? 2 : 1);
            const tr = document.createElement('tr');
            tr.innerHTML = `<td style="color: var(--text-main); font-weight: 600;"><i class="fa-solid fa-location-dot" style="color:${colorAgente}; margin-right:6px; font-size:9px;"></i> ${zone.name}</td><td style="text-align: right; color: ${colorAgente}; font-weight: bold;">${valorZona} <span style="font-size:8px; color:var(--text-muted); font-weight:normal;">${meta.unit}</span></td>`;
            zoneTableBody.appendChild(tr);
        });
    }

    document.querySelectorAll('.agent-btn').forEach(b => b.addEventListener('click', e => {
        document.querySelectorAll('.agent-btn').forEach(btn => btn.classList.remove('active')); e.currentTarget.classList.add('active');
        activeAgent = e.currentTarget.getAttribute('data-agent'); 
        const c = dataA[activeAgent], meta = agentMetadata[activeAgent];

        mapCircles.forEach(obj => obj.layer.setStyle({ color: c, fillColor: c }));
        if (descBlock) descBlock.style.borderColor = c;
        document.getElementById('radar-desc-title').textContent = meta.title;
        document.getElementById('radar-desc-text').textContent = meta.desc;
        cImp.data.datasets[0].backgroundColor[0] = c; cImp.update('none');
        renderZoneTable();
    }));

    function updateRadarTelemetry(value, minVal, maxVal, totalRegistros = 0) {
        let pctBase = ((value - minVal) / (maxVal - minVal)) * 100; 
        let pct = pctBase + (totalRegistros * 0.12); 
        if (pct < 10) pct = 10; if (pct > 100) pct = 100;
        const formattedPct = pct.toFixed(1);
        
        cImp.data.datasets[0].data = [formattedPct, (100 - pct).toFixed(1)]; cImp.update('none');
        if(impactDisplay) { impactDisplay.textContent = `${formattedPct}%`; impactDisplay.style.color = dataA[activeAgent]; }
        mapCircles.forEach(obj => { obj.layer.setRadius((12000 + (pct * 700)) * obj.weight); });
        renderZoneTable();
    }

    /* =========================================
       6. INTERVALO DE TELEMETRÍA (RÁPIDO Y CONTROLADO)
       ========================================= */
    let telemetrySeed = 0; 
    setInterval(() => {
        telemetrySeed += 0.05;
        const waveA = Math.sin(telemetrySeed), waveB = Math.cos(telemetrySeed * 1.3), noise = () => (Math.random() - 0.5);

        // CARB-X
        curCX += (waveA * 0.9) + (noise() * 3.5); curCX = Math.max(380, Math.min(460, curCX));
        cCX1.data.datasets[0].data.shift(); cCX1.data.datasets[0].data.push(curCX); cCX1.update('none');
        cCX2.data.datasets[0].data = cCX2.data.datasets[0].data.map(v => Math.max(350, v + noise() * 4)); cCX2.update('none');
        if (Math.random() > 0.75) pushDataRow('CARB-X', curCX.toFixed(1) + ' PPM', 'Estación RM', curCX > 428 ? 'ALERTA' : 'NORMAL');
        updatePredictiveAnalysis('pred-cx', curCX, 410, 'PPM'); updateKPIElements('cx', curCX, kpiHistory.cx, 380, 460, 'PPM');

        // LUX-NET
        curLX += (waveB * 1.5) + (noise() * 5.0); curLX = Math.max(20, Math.min(140, curLX));
        cLX1.data.datasets[0].data.shift(); cLX1.data.datasets[0].data.push(curLX); cLX1.update('none');
        cLX2.data.datasets[0].data = cLX2.data.datasets[0].data.map(v => Math.max(10, Math.min(150, v + noise() * 6))); cLX2.update('none');
        if(Math.random() > 0.8) pushDataRow('LUX-NET', curLX.toFixed(1) + ' Lux', 'STGO Centro', curLX > 92 ? 'ALERTA' : 'ESTABLE');
        updatePredictiveAnalysis('pred-ln', curLX, 65, 'Lux'); updateKPIElements('ln', curLX, kpiHistory.ln, 20, 140, 'Lux');

        // SONAR-IND
        curSI += (waveA * waveB * 2.2) + (noise() * 6.0); curSI = Math.max(40, Math.min(95, curSI));
        cSI1.data.datasets[0].data.shift(); cSI1.data.datasets[0].data.push(curSI); cSI1.update('none');
        cSI2.data.datasets[0].data = cSI2.data.datasets[0].data.map(v => Math.max(20, Math.min(100, v + noise() * 5))); cSI2.update('none');
        if(Math.random() > 0.75) pushDataRow('SONAR-IND', curSI.toFixed(1) + ' dBA', 'Zona Ind', curSI > 82 ? 'CRÍTICO' : 'NORMAL');
        updatePredictiveAnalysis('pred-si', curSI, 55, 'dBA'); updateKPIElements('si', curSI, kpiHistory.si, 40, 95, 'dBA');

        // THERMO-GEN
        curTG += (waveB * 0.18) + (noise() * 0.55); curTG = Math.max(15, Math.min(40, curTG));
        cTG1.data.datasets[0].data.shift(); cTG1.data.datasets[0].data.push(curTG); cTG1.update('none');
        cTG2.data.datasets[0].data = cTG2.data.datasets[0].data.map(v => Math.max(10, Math.min(45, v + noise() * 2))); cTG2.update('none');
        if(Math.random() > 0.8) pushDataRow('THERMO-GEN', curTG.toFixed(2) + ' °C', 'Isla Calor Centro', curTG > 32 ? 'ALERTA' : 'ESTABLE');
        updatePredictiveAnalysis('pred-tg', curTG, 24, '°C'); updateKPIElements('tg', curTG, kpiHistory.tg, 15, 40, '°C');

        // Sincronización Dinámica KPI
        const totalRegistros = db.carbx.length + db.luxnet.length + db.sonarind.length + db.thermogen.length;
        if (activeAgent === 'co2')   updateRadarTelemetry(curCX, 380, 460, totalRegistros);
        if (activeAgent === 'luz')   updateRadarTelemetry(curLX, 20, 140, totalRegistros);
        if (activeAgent === 'ruido') updateRadarTelemetry(curSI, 40, 95, totalRegistros);
        if (activeAgent === 'bio')   updateRadarTelemetry(curTG, 15, 40, totalRegistros);

    }, 450);

    /* =========================================
       7. PIPELINES DE EXPORTACIÓN (PDF / EXCEL)
       ========================================= */
    document.getElementById('btn-pdf').addEventListener('click', () => { 
        const { jsPDF } = window.jspdf, doc = new jsPDF(); 
        doc.setFont("helvetica", "bold"); doc.text("INFORME DE REGISTROS M.A.E.D.I.S V4.1.0", 14, 15); 
        doc.setFontSize(9); doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 22); 
        doc.setFont("courier", "bold"); doc.setFontSize(8); doc.setFillColor(230, 230, 230); doc.rect(14, 36, 182, 6, 'F');
        doc.setTextColor(50, 50, 50); doc.text(" INDEX | TIMESTAMP        | CANAL DETECTADO      | VALOR METRICO", 16, 40);
        
        let historialGlobal = [];
        Object.keys(db).forEach(k => db[k].forEach(r => historialGlobal.push({ canal: k.toUpperCase(), timestamp: r.Timestamp, valor: r.Valor })));

        doc.setFont("courier", "normal"); let ejeY = 42;
        historialGlobal.slice(-300).forEach((item, index) => {
            if (ejeY > 275) { doc.addPage(); ejeY = 20; }
            doc.text(` #${String(index + 1).padStart(3, '0')}  | ${String(item.timestamp).padEnd(16, ' ')} | ${String(item.canal).padEnd(20, ' ')} | ${String(item.valor)}`, 16, ejeY + 4.5); ejeY += 6;
        });
        doc.save("Reporte_MAEDIS_v4.pdf"); 
    });

    document.getElementById('btn-excel').addEventListener('click', () => { 
        const wb = XLSX.utils.book_new();
        Object.keys(db).forEach(k => { 
            const wsData = [["TIMESTAMP", "MÓDULO", "VALOR LÍNEA", "SECTOR EVALUADO", "ESTADO"]];
            db[k].forEach(r => wsData.push([r.Timestamp, r.Modulo, r.Valor, r.Sector, r.Status]));
            XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsData), k.toUpperCase()); 
        }); 
        XLSX.writeFile(wb, "Reporte_MAEDIS_v4_Dashboards.xlsx"); 
    });

    /* =========================================
       8. TRADUCCIONES Y TEMAS (BLINDADO)
       ========================================= */
    const themeSwitch = document.getElementById('theme-switch'), 
          langSelect = document.getElementById('lang-select');

    if (themeSwitch) {
        themeSwitch.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            const isLight = newTheme === 'light';
            Chart.defaults.color = isLight ? '#475569' : '#94a3b8';
            allCharts.forEach(chart => {
                chart.options.scales.x.grid.color = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)';
                chart.options.scales.y.grid.color = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)';
                chart.update('none');
            });
        });
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
        });
    }
});
