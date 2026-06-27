document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       0. MOTOR DE INMERSIÓN: BOOT Y SHUTDOWN
       ========================================= */
    const bootScreen = document.getElementById('boot-screen');
    const bootTerminal = document.getElementById('boot-terminal');
    const shutdownScreen = document.getElementById('shutdown-screen');
    const logoutBtn = document.getElementById('btn-salir'); 

    const bootSequence = [
        "Iniciando Núcleo MAEDIS v2.0...",
        "Estableciendo enlace con sensores remotos...",
        "Aislando dataPools de memoria táctica...",
        "Calibrando espectrometría gráfica...",
        "Recuperando caché histórico (300 registros/canal)...",
        "Sincronización Exitosa. Interfaz desbloqueada."
    ];

    function simulateBoot() {
        if (!bootScreen || !bootTerminal) return;
        let delay = 0;
        bootTerminal.innerHTML = ''; 
        
        bootSequence.forEach((text) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.innerHTML = `> ${text}`;
                bootTerminal.appendChild(p);
            }, delay);
            delay += 500 + (Math.random() * 400); 
        });

        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => { bootScreen.classList.add('hidden'); }, 800);
        }, delay + 800);
    }
    
    simulateBoot(); // Inicia la secuencia al cargar

    if(logoutBtn && shutdownScreen) {
        logoutBtn.addEventListener('click', (e) => {
            if(confirm("¿Autoriza la desconexión del servidor central?")) {
                shutdownScreen.classList.remove('hidden');
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
    }

    /* =========================================
       1. MOTOR DE PARTÍCULAS (FONDO)
       ========================================= */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(100, 116, 139, 0.25)';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    for (let i = 0; i < 70; i++) particles.push(new Particle());
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* =========================================
       2. NAVEGACIÓN Y TABS UI
       ========================================= */
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            if(!target) return;
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(target).classList.add('active');
            
            if(target === 'radar-territorial') setTimeout(() => map.invalidateSize(), 250);
        });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.getElementById(e.currentTarget.getAttribute('data-tab')).classList.add('active');
        });
    });

    /* =========================================
       3. INICIALIZACIÓN DE CHART.JS
       ========================================= */
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Orbitron', sans-serif";
    Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.03)';
    const colors = { co2: '#00e676', light: '#ffea00', noise: '#d500f9', bio: '#ff3d00' };
    const optE = { animation: false, scales: { x: { display: false } }, elements: { point: { radius: 0 } }, responsive: true, maintainAspectRatio: false };
    const optS = { animation: { duration: 1000, easing: 'linear' }, responsive: true, maintainAspectRatio: false };

    // --- CARB-X (CO2) ---
    const cCX1 = new Chart(document.getElementById('carbx-line'), { type: 'line', data: { labels: Array(40).fill(''), datasets: [{ label: 'CARB-X (PPM)', data: Array(40).fill(410), borderColor: colors.co2, fill: true, tension: 0.1 }] }, options: optE });
    const cCX2 = new Chart(document.getElementById('carbx-bar'), { type: 'bar', data: { labels: ['N','C','RM','S'], datasets: [{ data: [300, 500, 900, 200], backgroundColor: colors.co2 }] }, options: optS });
    const cCX3 = new Chart(document.getElementById('carbx-radar'), { type: 'radar', data: { labels: ['A','B','C','D','E'], datasets: [{ data: [80, 70, 90, 40, 50], borderColor: colors.co2 }] }, options: { ...optS, scales: { r: { ticks: { display: false } } } } });
    const cCX4 = new Chart(document.getElementById('carbx-polar'), { type: 'polarArea', data: { labels: ['F','G','B'], datasets: [{ data: [60, 20, 20], backgroundColor: [colors.co2, '#1b5e20', '#4caf50'] }] }, options: { ...optS, scales: { r: { ticks: { display: false } } } } });

    // --- LUX-NET (LUZ) ---
    const cLX1 = new Chart(document.getElementById('luxnet-line'), { type: 'line', data: { labels: Array(10).fill(''), datasets: [{ label: 'LUX-NET (Lux)', data: [60, 62, 58, 65, 70, 68, 64, 62, 60, 65], borderColor: colors.light, fill: true, tension: 0.4 }] }, options: optS });
    const cLX2 = new Chart(document.getElementById('luxnet-bar'), { type: 'bar', data: { labels: ['S','V','C','A'], datasets: [{ data: [800, 600, 550, 400], backgroundColor: colors.light }] }, options: optS });
    const cLX3 = new Chart(document.getElementById('luxnet-doughnut'), { type: 'doughnut', data: { labels: ['L','I','N'], datasets: [{ data: [50, 30, 20], backgroundColor: [colors.light, '#f57f17', '#fbc02d'] }] }, options: { ...optS, cutout: '70%' } });
    const cLX4 = new Chart(document.getElementById('luxnet-bubble'), { type: 'bubble', data: { datasets: [{ label: 'Nodos', data: [{x:10,y:20,r:10},{x:15,y:10,r:20}], backgroundColor: colors.light }] }, options: optS });

    // --- SONAR-IND (RUIDO) ---
    const cSI1 = new Chart(document.getElementById('sonarind-line'), { type: 'line', data: { labels: Array(60).fill(''), datasets: [{ label: 'SONAR-IND (dB)', data: Array(60).fill(65), borderColor: colors.noise, fill: true, tension: 0 }] }, options: optE });
    const cSI2 = new Chart(document.getElementById('sonarind-bar'), { type: 'bar', data: { labels: ['A','F','A','M'], datasets: [{ data: [70, 95, 85, 60], backgroundColor: colors.noise }] }, options: optE });
    const cSI3 = new Chart(document.getElementById('sonarind-radar'), { type: 'radar', data: { labels: ['1','2','3','4','5'], datasets: [{ data: [40, 80, 90, 60, 30], borderColor: colors.noise }] }, options: { ...optE, scales: { r: { ticks: { display: false } } } } });
    const cSI4 = new Chart(document.getElementById('sonarind-doughnut'), { type: 'doughnut', data: { labels: ['C','M','E'], datasets: [{ data: [20, 50, 30], backgroundColor: [colors.noise, '#7b1fa2', '#ab47bc'] }] }, options: { ...optE, cutout: '70%' } });

    // --- THERMO-GEN (BIO) ---
    const cTG1 = new Chart(document.getElementById('thermogen-line'), { type: 'line', data: { labels: Array(10).fill(''), datasets: [{ label: 'THERMO-GEN (°C)', data: [35, 35.2, 35.1, 35.4, 35.8], borderColor: colors.bio, fill: true, tension: 0.4 }] }, options: optS });
    const cTG2 = new Chart(document.getElementById('thermogen-bar'), { type: 'bar', data: { labels: ['T','L','S','P'], datasets: [{ data: [50, 40, 60, 35], backgroundColor: colors.bio }] }, options: optS });
    const cTG3 = new Chart(document.getElementById('thermogen-polar'), { type: 'polarArea', data: { labels: ['L','B','D'], datasets: [{ data: [40, 30, 30], backgroundColor: [colors.bio, '#bf360c', '#ff5722'] }] }, options: { ...optS, scales: { r: { ticks: { display: false } } } } });
    const cTG4 = new Chart(document.getElementById('thermogen-radar'), { type: 'radar', data: { labels: ['1','2','3','4'], datasets: [{ data: [70, 40, 80, 50], borderColor: colors.bio }] }, options: { ...optS, scales: { r: { ticks: { display: false } } } } });

    /* =========================================
       4. DATAPOOL Y SIMULACIÓN EN TIEMPO REAL
       ========================================= */
    const db = { carbx: [], luxnet: [], sonarind: [], thermogen: [] };
    const limit = 300;

    // Inyección de Historial (15 mins)
    const now = new Date();
    for(let i = limit; i > 0; i--) {
        const pt = new Date(now.getTime() - (i * 1500)); 
        const ts = pt.toTimeString().split(' ')[0];
        db.carbx.push({ Timestamp: ts, Modulo: 'CARB-X', Valor: (410+Math.random()*20).toFixed(1)+' PPM', Sector: 'Estación RM', Status: 'NORMAL' });
        db.luxnet.push({ Timestamp: ts, Modulo: 'LUX-NET', Valor: (65+Math.random()*10).toFixed(1)+' Lux', Sector: 'Grid Urbana', Status: 'ESTABLE' });
        db.sonarind.push({ Timestamp: ts, Modulo: 'SONAR-IND', Valor: (60+Math.random()*20).toFixed(1)+' dB', Sector: 'Z. Fabril', Status: 'NORMAL' });
        db.thermogen.push({ Timestamp: ts, Modulo: 'THERMO-GEN', Valor: (35+Math.random()*2).toFixed(2)+' °C', Sector: 'Subsuelo B3', Status: 'ESTABLE' });
    }

    function pushLog(mod, val, sec, stat, fast = false) {
        const tm = new Date();
        const ts = tm.toTimeString().split(' ')[0] + (fast ? '.'+tm.getMilliseconds().toString().substring(0,2) : '');
        
        let k = mod.toLowerCase().replace('-', '');
        if(db[k]) {
            db[k].push({ Timestamp: ts, Modulo: mod, Valor: val, Sector: sec, Status: stat });
            if(db[k].length > limit) db[k].shift();
        }

        const tb = document.getElementById('table-body');
        if(!tb) return; 
        
        const tr = document.createElement('tr');
        let col = stat === 'CRÍTICO' ? 'var(--neon-red)' : (stat === 'ALERTA' ? 'var(--neon-yellow)' : 'var(--neon-green)');
        tr.innerHTML = `<td style="color:var(--text-muted)">[${ts}]</td><td style="font-weight:bold">${mod}</td><td>${val}</td><td>${sec}</td><td style="color:${col}; text-shadow: 0 0 5px ${col}">[ ${stat} ]</td>`;
        tb.prepend(tr);
        if(tb.children.length > 30) tb.removeChild(tb.lastChild);
    }

    let v = { co2: 410, noise: 65, light: 65, bio: 35.5 };
    let tick = 0;

    setInterval(() => {
        tick++;
        v.noise = Math.max(40, Math.min(120, v.noise + (Math.random()*14 - 7)));
        cSI1.data.datasets[0].data.shift(); cSI1.data.datasets[0].data.push(v.noise); cSI1.update();
        if(tick % 5 === 0) pushLog('SONAR-IND', v.noise.toFixed(1)+' dB', 'Z. Fabril', v.noise > 95 ? 'CRÍTICO' : 'NORMAL', true);

        if(tick % 2 === 0) {
            v.co2 = Math.max(300, Math.min(550, v.co2 + (Math.random()*8 - 4)));
            cCX1.data.datasets[0].data.shift(); cCX1.data.datasets[0].data.push(v.co2); cCX1.update();
            if(tick % 10 === 0) pushLog('CARB-X', v.co2.toFixed(1)+' PPM', 'Estación RM', v.co2 > 480 ? 'ALERTA' : 'NORMAL');
        }

        if(tick % 10 === 0) {
            v.light = Math.max(20, Math.min(150, v.light + (Math.random()*4 - 2)));
            cLX1.data.datasets[0].data.shift(); cLX1.data.datasets[0].data.push(v.light); cLX1.update();
            pushLog('LUX-NET', v.light.toFixed(1)+' Lux', 'Grid Urbana', v.light > 100 ? 'ALERTA' : 'ESTABLE');
            
            v.bio += (Math.random()*0.4 - 0.2);
            cTG1.data.datasets[0].data.shift(); cTG1.data.datasets[0].data.push(v.bio); cTG1.update();
            pushLog('THERMO-GEN', v.bio.toFixed(2)+' °C', 'Subsuelo B3', v.bio > 37 ? 'ALERTA' : 'ESTABLE');
        }
    }, 300);

    /* =========================================
       5. RADAR TERRITORIAL (LEAFLET)
       ========================================= */
    const map = L.map('chile-map').setView([-33.0, -71.0], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

    const dataA = {
        co2: { col: colors.co2, perc: 45, zonas: [{lat:-32.77,lng:-71.53,r:40000}, {lat:-33.44,lng:-70.66,r:50000}] },
        luz: { col: colors.light, perc: 55, zonas: [{lat:-33.44,lng:-70.66,r:60000}, {lat:-23.65,lng:-70.40,r:40000}] },
        ruido: { col: colors.noise, perc: 25, zonas: [{lat:-33.39,lng:-70.78,r:20000}, {lat:-36.82,lng:-73.04,r:30000}] },
        bio: { col: colors.bio, perc: 15, zonas: [{lat:-33.08,lng:-70.93,r:15000}, {lat:-38.71,lng:-72.63,r:15000}] }
    };

    let waves = [];
    const cImp = new Chart(document.getElementById('impact-chart').getContext('2d'), { type: 'doughnut', data: { datasets:[{data:[0,100], backgroundColor:['#000','rgba(255,255,255,0.05)'], borderWidth:0}] }, options:{ cutout:'80%', plugins:{legend:{display:false}} } });

    function loadRadar(key) {
        waves.forEach(w => map.removeLayer(w.c)); waves = [];
        dataA[key].zonas.forEach(z => {
            for(let i=0; i<3; i++) {
                let rI = (z.r/3)*i;
                waves.push({ c: L.circle([z.lat, z.lng], { color: dataA[key].col, weight: 1.5, fillOpacity: 0.1, radius: rI }).addTo(map), rMax: z.r, rAct: rI });
            }
        });
        cImp.data.datasets[0].data = [dataA[key].perc, 100-dataA[key].perc];
        cImp.data.datasets[0].backgroundColor = [dataA[key].col, 'rgba(255,255,255,0.05)']; cImp.update();
        document.getElementById('map-wrapper').className = `map-container neon-border-${key==='co2'?'green':key==='luz'?'yellow':key==='ruido'?'purple':'red'}`;
    }

    setInterval(() => {
        waves.forEach(w => {
            w.rAct += (w.rMax * 0.01); if(w.rAct > w.rMax) w.rAct = 0;
            w.c.setRadius(w.rAct); w.c.setStyle({ opacity: 0.8 * (1 - (w.rAct/w.rMax)) });
        });
    }, 40);

    document.querySelectorAll('.agent-btn').forEach(b => b.addEventListener('click', e => {
        document.querySelectorAll('.agent-btn').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        loadRadar(e.currentTarget.getAttribute('data-agent'));
    }));
    setTimeout(() => { loadRadar('co2'); }, 500);

    /* =========================================
       6. PIPELINES DE EXPORTACIÓN (EXCEL / PDF)
       ========================================= */
    document.getElementById('btn-excel').addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        Object.keys(db).forEach(k => {
            if(db[k].length > 0) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(db[k]), k.toUpperCase());
        });
        XLSX.writeFile(wb, "Protocolo_MAEDIS_Dataset.xlsx");
    });

    document.getElementById('btn-pdf').addEventListener('click', () => {
        const { jsPDF } = window.jspdf; const doc = new jsPDF();
        doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.text("SISTEMA MAEDIS - AUDITORIA DE SISTEMAS", 14, 18);
        doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text(`Timestamp: ${new Date().toLocaleString()}`, 14, 25);
        
        let rawData = [...db.carbx.slice(-75), ...db.luxnet.slice(-75), ...db.sonarind.slice(-75), ...db.thermogen.slice(-75)];
        rawData.sort((a, b) => a.Timestamp.localeCompare(b.Timestamp));
        
        doc.autoTable({ 
            startY: 35, head: [['Hora', 'Módulo', 'Nivel', 'Sector', 'Status']], 
            body: rawData.map(r => [r.Timestamp, r.Modulo, r.Valor, r.Sector, r.Status]),
            theme: 'grid', styles: { fontSize: 8 }, headStyles: { fillColor: [10, 11, 14] } 
        });
        doc.save("Protocolo_MAEDIS_Reporte.pdf");
    });
});
