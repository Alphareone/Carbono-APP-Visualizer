// ==========================================================================
// CONTROL CORE LOGIC - MONITOR DE DATOS EN TIEMPO REAL Y GRADIENTES DINÁMICOS
// ==========================================================================
lucide.createIcons();

let activeTab = 'carbono';
let totalRecords = 0;

// Almacenes aislados e históricos
let dataPool = { carbono: [], luminica: [], ruido: [] };
let historicalData = []; 
let timeLabels = Array(10).fill('--:--:--');
let ultimosValoresCanales = { carbono: 1659, luminica: 1100, ruido: 750 };

// Mapeos estéticos y cromáticos
const colorMap = { carbono: '#00ffa3', luminica: '#ffaa00', ruido: '#bd00ff' };
const nombresCanales = { carbono: 'Emisiones CO₂e', luminica: 'Flujo Fotónico', ruido: 'Presión Acústica' };
let labelsNodos = ['PLANT-NORTH-01', 'LOGISTIC-VALPO', 'URBAN-STGO', 'MINER-ANTOF'];

let chartPrimary, chartSecondary, chartTertiary, chartQuaternary;

// Inicialización global al arranque
window.addEventListener('DOMContentLoaded', () => {
    inicializarEcosistemaGraficos('carbono');
    inicializarGraficoDonaPermanente();
    
    setTimeout(() => {
        ajustarDimensionesCanvas();
        actualizarMapaRadar('carbono');
    }, 150);
});

// ==========================================================================
// ORQUESTACIÓN DE GRÁFICOS DINÁMICOS (MATRIZ 2x2)
// ==========================================================================
function inicializarEcosistemaGraficos(canal) {
    if (chartPrimary) chartPrimary.destroy();
    if (chartSecondary) chartSecondary.destroy();
    if (chartTertiary) chartTertiary.destroy();

    const ctx1 = document.getElementById('chartPrimary').getContext('2d');
    const ctx2 = document.getElementById('chartSecondary').getContext('2d');
    const ctx3 = document.getElementById('chartTertiary').getContext('2d');

    const configEjesBase = {
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6b7280', font: { size: 9 } } },
            x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 9 } } }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
    };

    if (canal === 'carbono') {
        document.getElementById('lbl-suite-title').innerText = "Consola Analítica: Huella de Carbono";
        document.getElementById('lbl-suite-desc').innerText = "Análisis volumétrico de emisiones moleculares CO₂e continuas.";
        document.getElementById('title-chart-1').innerText = "LÍNEA TEMPORAL DINÁMICA";
        document.getElementById('title-chart-2').innerText = "DISTRIBUCIÓN POR NODO [BARRAS]";
        document.getElementById('title-chart-3').innerText = "MASA DE GASES [ÁREA POLAR]";

        chartPrimary = new Chart(ctx1, {
            type: 'line',
            data: { labels: timeLabels, datasets: [{ data: Array(10).fill(1659), borderColor: '#00ffa3', backgroundColor: 'rgba(0, 255, 163, 0.05)', fill: true, tension: 0.3 }] },
            options: configEjesBase
        });

        chartSecondary = new Chart(ctx2, {
            type: 'bar',
            data: { labels: labelsNodos, datasets: [{ data: [1100, 2300, 1600, 3100], backgroundColor: '#00ffa3', borderRadius: 4 }] },
            options: configEjesBase
        });

        chartTertiary = new Chart(ctx3, {
            type: 'polarArea',
            data: { labels: labelsNodos, datasets: [{ data: [25, 30, 15, 40], backgroundColor: ['rgba(0,255,163,0.1)', 'rgba(0,255,163,0.3)', 'rgba(0,255,163,0.5)', 'rgba(0,255,163,0.7)'], strokeWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { ticks: { display: false }, grid: { color: 'rgba(255,255,255,0.05)' } } } }
        });

    } else if (canal === 'luminica') {
        document.getElementById('lbl-suite-title').innerText = "Consola Analítica: Contaminación Lumínica";
        document.getElementById('lbl-suite-desc').innerText = "Irradiación lumínica y vectores fotónicos residuales.";
        document.getElementById('title-chart-1').innerText = "DISPERSIÓN CARDINAL [RADAR]";
        document.getElementById('title-chart-2').innerText = "LÚMENES POR VECTOR [SCATTER]";
        document.getElementById('title-chart-3').innerText = "EFICIENCIA DEL HAZ LUMÍNICO";

        chartPrimary = new Chart(ctx1, {
            type: 'radar',
            data: { labels: ['Norte', 'Sur', 'Este', 'Oeste', 'Cénit'], datasets: [{ data: [80, 50, 70, 65, 90], borderColor: '#ffaa00', backgroundColor: 'rgba(255, 170, 0, 0.1)' }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        chartSecondary = new Chart(ctx2, {
            type: 'scatter',
            data: { datasets: [{ label: 'Fotones', data: [{x: 3, y: 1200}, {x: 5, y: 2900}, {x: 8, y: 3800}], backgroundColor: '#ffaa00' }] },
            options: configEjesBase
        });

        chartTertiary = new Chart(ctx3, {
            type: 'doughnut',
            data: { labels: ['Aprovechado', 'Desperdiciado'], datasets: [{ data: [65, 35], backgroundColor: ['#ffaa00', 'rgba(255,255,255,0.04)'], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, circumference: 180, rotation: -90, plugins: { legend: { display: false } } }
        });

 } else if (canal === 'ruido') {
        document.getElementById('lbl-suite-title').innerText = "Consola Analítica: Ondas de Ruido";
        document.getElementById('lbl-suite-desc').innerText = "Monitoreo continuo de presión acústica ambiental.";
        document.getElementById('title-chart-1').innerText = "OSCILOSCOPIO ACÚSTICO CONTINUO";
        document.getElementById('title-chart-2').innerText = "RUIDO POR LOCALIDAD [PROMEDIO VS PICO]";
        document.getElementById('title-chart-3').innerText = "FRECUENCIAS CRÍTICAS [BURBUJA]";

        chartPrimary = new Chart(ctx1, {
            type: 'line',
            data: { labels: timeLabels, datasets: [{ data: Array(10).fill(750), borderColor: '#bd00ff', pointRadius: 0, fill: false, tension: 0.45 }] },
            options: configEjesBase
        });

        // MEJORA: Gráfico de Barras Múltiples/Agrupadas para Comparativa Acústica por Localidad
        chartSecondary = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['ANTOFAGASTA', 'VALPARAÍSO', 'SANTIAGO', 'NODO NORTE'],
                datasets: [
                    {
                        label: 'Nivel Promedio (dB)',
                        data: [55, 72, 85, 45],
                        backgroundColor: '#bd00ff',
                        borderRadius: 4,
                        barPercentage: 0.8,
                        categoryPercentage: 0.6
                    },
                    {
                        label: 'Pico Máximo (dB)',
                        data: [80, 98, 110, 65],
                        backgroundColor: 'rgba(189, 0, 255, 0.3)', // Tono translúcido de advertencia
                        borderWidth: 1,
                        borderColor: '#bd00ff',
                        borderRadius: 4,
                        barPercentage: 0.8,
                        categoryPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#6b7280',
                            font: { size: 8, family: 'monospace' },
                            boxWidth: 10
                        }
                    }
                },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255, 255, 255, 0.03)' }, 
                        ticks: { color: '#6b7280', font: { size: 9 } },
                        title: { display: true, text: 'Decibelios (dB)', color: '#6b7280', font: { size: 8 } }
                    },
                    x: { 
                        grid: { display: false }, 
                        ticks: { color: '#6b7280', font: { size: 9 } } 
                    }
                }
            }
        });

        chartTertiary = new Chart(ctx3, {
            type: 'bubble',
            data: { datasets: [{ datasets: [{ data: [{x: 5, y: 10, r: 8}, {x: 15, y: 20, r: 15}, {x: 9, y: 12, r: 11}], backgroundColor: '#bd00ff' }] }] },
            options: configEjesBase
        });
    }
}

// CUADRANTE 4: INICIALIZACIÓN DE LA DONA FUTURISTA (HUD)
function inicializarGraficoDonaPermanente() {
    const ctx4 = document.getElementById('chartQuaternary').getContext('2d');
    const activeColor = colorMap[activeTab];
    
    let gradientActive = ctx4.createLinearGradient(0, 0, 0, 200);
    gradientActive.addColorStop(0, activeColor);
    gradientActive.addColorStop(1, 'rgba(14, 23, 38, 0.1)');

    chartQuaternary = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['Flujo Primario', 'Rendimiento Core', 'Búfer Fijo'],
            datasets: [{
                data: [55, 30, 15],
                backgroundColor: [gradientActive, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.08)'],
                borderWidth: 0,
                spacing: 6,       // Segmentación Sci-Fi
                borderRadius: 4,  // Suavizado premium
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '76%', // Anillo ultrafino hiper-moderno
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#6b7280', font: { size: 9, family: 'monospace' }, boxWidth: 8, padding: 12 }
                },
                tooltip: { backgroundColor: '#111827', titleFont: { family: 'monospace' }, bodyFont: { family: 'monospace' }, borderColor: activeColor, borderWidth: 1 }
            }
        }
    });
}

// ==========================================================================
// FEED PIPELINE - LIVE DATA INGESTION PIPELINE
// ==========================================================================
function feedDataStream() {
    const ahora = new Date();
    const timeStr = ahora.toTimeString().split(' ')[0];
    
    timeLabels.shift();
    timeLabels.push(timeStr);
    
    const canales = ['carbono', 'luminica', 'ruido'];
    
    canales.forEach(canal => {
        let ultimoValor = ultimosValoresCanales[canal];
        let variacion = (Math.random() - 0.5) * 220;
        let estabilizador = (1800 - ultimoValor) * 0.02; // Reparado bug de detención (typo)
        
        let nuevoValor = Math.round(ultimoValor + variacion + estabilizador);
        if (nuevoValor > 5000) nuevoValor = 4700;
        if (nuevoValor < 100) nuevoValor = 150;
        
        ultimosValoresCanales[canal] = nuevoValor;
        totalRecords++;
        
        const registro = {
            Timestamp: timeStr,
            Nodo: labelsNodos[Math.floor(Math.random() * labelsNodos.length)],
            Categoria: nombresCanales[canal],
            Consumo: nuevoValor,
            Impacto: (nuevoValor * 0.38).toFixed(1)
        };
        
        dataPool[canal].push(registro);
        historicalData.push(registro);
    });
    
    if (historicalData.length > 30) historicalData.shift();
    
    // Inyección de Línea de Onda activa
    if (chartPrimary && (activeTab === 'carbono' || activeTab === 'ruido')) {
        chartPrimary.data.labels = timeLabels;
        let buffer = dataPool[activeTab].slice(-10).map(r => r.Consumo);
        while(buffer.length < 10) buffer.unshift(ultimosValoresCanales[activeTab]);
        chartPrimary.data.datasets[0].data = buffer;
        chartPrimary.update('none');
    }
    
    // Fluctuación en la Dona HUD Futurista
    if (chartQuaternary) {
        let valorBase = ultimosValoresCanales[activeTab];
        let compAlfa = Math.floor((valorBase * 0.55) + (Math.random() - 0.5) * 40);
        let compBeta = Math.floor((valorBase * 0.30) + (Math.random() - 0.5) * 25);
        let compGama = Math.floor((valorBase * 0.15) + (Math.random() - 0.5) * 10);
        chartQuaternary.data.datasets[0].data = [Math.max(10, compAlfa), Math.max(5, compBeta), Math.max(2, compGama)];
        chartQuaternary.update('none');
    }
    
    // Actualización de Widgets KPIs numéricos
    if (document.getElementById('lbl-total-co2')) {
        document.getElementById('lbl-total-co2').innerText = `${ultimosValoresCanales[activeTab]} u`;
    }
    if (document.getElementById('lbl-total-records')) {
        document.getElementById('lbl-total-records').innerText = totalRecords;
    }
    
    updateTable();
}

let simulationInterval = setInterval(feedDataStream, 700);

function cambiarCanalAmbiental(canal) {
    if (!dataPool[canal]) return;
    activeTab = canal;
    
    document.querySelectorAll('.btn-channel').forEach(b => b.classList.remove('active'));
    document.querySelector(`.btn-${canal}`).classList.add('active');
    
    inicializarEcosistemaGraficos(canal);
    actualizarMapaRadar(canal);
    
    // INTERCEPCIÓN CROMÁTICA EN CALIENTE PARA LA DONA HUD
    if (chartQuaternary) {
        const ctx4 = document.getElementById('chartQuaternary').getContext('2d');
        const activeColor = colorMap[canal];
        
        let newGradient = ctx4.createLinearGradient(0, 0, 0, 200);
        newGradient.addColorStop(0, activeColor);
        newGradient.addColorStop(1, 'rgba(14, 23, 38, 0.05)');
        
        chartQuaternary.data.datasets[0].backgroundColor = [newGradient, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.08)'];
        
        if(canal === 'carbono') chartQuaternary.data.labels = ['Captura CO₂', 'Dispersión', 'Búfer Residual'];
        if(canal === 'luminica') chartQuaternary.data.labels = ['Espectro Útil', 'Polución Irradiada', 'Pérdida Fotónica'];
        if(canal === 'ruido') chartQuaternary.data.labels = ['Presión Pico', 'Atenuación Vector', 'Fondo Base'];
        
        chartQuaternary.update('active');
    }

    const cardKpi1 = document.getElementById('card-kpi-1');
    const lblKpi1 = document.getElementById('lbl-total-co2');
    if (lblKpi1 && cardKpi1) {
        lblKpi1.style.color = colorMap[canal];
        cardKpi1.style.borderLeftColor = colorMap[canal];
        lblKpi1.innerText = `${ultimosValoresCanales[canal]} u`;
    }
    
    updateTable();
}

function updateTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const ultimos15 = historicalData.slice(-15);
    [...ultimos15].reverse().forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.Timestamp}</td>
            <td><span class="badge-nodo">${row.Nodo}</span></td>
            <td>${row.Categoria}</td>
            <td style="font-weight:700;">${row.Consumo} u</td>
            <td><span class="impact-tag">+${row.Impacto} kg</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function switchView(viewId) {
    document.getElementById('view-dashboard').style.display = viewId === 'dashboard' ? 'block' : 'none';
    document.getElementById('view-terminal').style.display = viewId === 'terminal' ? 'block' : 'none';
    document.getElementById('view-settings').style.display = viewId === 'settings' ? 'block' : 'none';
    
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    if(viewId === 'dashboard') document.getElementById('btn-dashboard').classList.add('active');
    if(viewId === 'terminal') document.getElementById('btn-nodos').classList.add('active');
    if(viewId === 'settings') document.getElementById('btn-settings').classList.add('active');
}

// ==========================================================================
// MOTOR KASPERSKY CYBER MAP (MOVIMIENTO SUAVE ATENUADO SIN DISTRACCIÓN)
// ==========================================================================
const canvas = document.getElementById('kasperskyMapCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let impacts = [];
let scanLineY = 0;

const nodosDestino = [{ x: 0.45, y: 0.25 }, { x: 0.49, y: 0.55 }, { x: 0.52, y: 0.64 }];

function ajustarDimensionesCanvas() {
    if (!canvas) return;
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}
window.addEventListener('resize', ajustarDimensionesCanvas);

class DatapackParticle {
    constructor() {
        this.target = nodosDestino[Math.floor(Math.random() * nodosDestino.length)];
        this.x = Math.random() * canvas.width * 0.15; 
        this.y = Math.random() * canvas.height;
        
        const targetX = canvas.width * this.target.x;
        const targetY = canvas.height * this.target.y;
        
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        // CALIBRACIÓN: Velocidad de traslado de partículas relajada (~1.2 px/s)
        this.speed = Math.random() * 0.8 + 0.8; 
        this.vx = (dx / distance) * this.speed;
        this.vy = (dy / distance) * this.speed;
        this.color = colorMap[activeTab] || '#00ffa3';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        const targetX = canvas.width * this.target.x;
        const targetY = canvas.height * this.target.y;
        const dist = Math.sqrt((targetX - this.x)**2 + (targetY - this.y)**2);

        if (dist < 4) {
            impacts.push({ x: targetX, y: targetY, radius: 1, maxRadius: 14, alpha: 1, color: this.color });
            return false;
        }
        return true;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2.0;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 1.8, this.y - this.vy * 1.8);
        ctx.stroke();
    }
}

function renderCyberMap() {
    if (!canvas) return;
    // Fondo oscuro blindado persistente
    ctx.fillStyle = 'rgba(6, 9, 19, 0.22)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // CALIBRACIÓN: Barrido láser lento y sutil (0.5 px/s)
    scanLineY += 0.5;
    if (scanLineY > canvas.height) scanLineY = 0;
    ctx.beginPath();
    ctx.strokeStyle = `${colorMap[activeTab]}15`;
    ctx.lineWidth = 2;
    ctx.moveTo(0, scanLineY);
    ctx.lineTo(canvas.width, scanLineY);
    ctx.stroke();

    // CALIBRACIÓN: Frecuencia de aparición disminuida para evitar fatiga visual (5%)
    if (Math.random() < 0.05) {
        particles.push(new DatapackParticle());
        const flowRateEl = document.getElementById('cyber-flow-rate');
        if (flowRateEl) {
            flowRateEl.innerText = `${Math.floor(Math.random() * 15 + 40)} p/s`;
        }
    }

    particles = particles.filter(p => {
        if (p.update()) { p.draw(); return true; }
        return false;
    });

    impacts = impacts.filter(imp => {
        imp.radius += 0.6;
        imp.alpha -= 0.03;
        ctx.beginPath();
        ctx.strokeStyle = imp.color;
        ctx.globalAlpha = Math.max(0, imp.alpha);
        ctx.lineWidth = 1.5;
        ctx.arc(imp.x, imp.y, imp.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        return imp.alpha > 0;
    });

    requestAnimationFrame(renderCyberMap);
}
requestAnimationFrame(renderCyberMap);

function actualizarMapaRadar(canal) {
    const activeColor = colorMap[canal];
    document.querySelectorAll('.pigmento-nodo .core-dot').forEach(dot => {
        dot.style.backgroundColor = activeColor;
        dot.style.boxShadow = `0 0 10px ${activeColor}`;
    });
    document.querySelectorAll('.pigmento-nodo .radar-pulse').forEach(pulse => {
        pulse.style.borderColor = activeColor;
    });
}

// --- EXPORTACIONES ---
function exportToExcel() {
    const workbook = XLSX.utils.book_new();
    ['carbono', 'luminica', 'ruido'].forEach(cat => {
        const sheetData = dataPool[cat].length ? dataPool[cat] : [{ Alerta: "Sin registros" }];
        const worksheet = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, nombresCanales[cat]);
    });
    XLSX.writeFile(workbook, `Reporte_QuantumOS.xlsx`);
}

function exportToPDF() {
    if(!historicalData.length) return alert("Búfer vacío.");
    const { jsPDF } = window.jspdf; const doc = new jsPDF();
    doc.text("C-APP VISUALIZER - REPORTE DE AUDITORÍA", 14, 18);
    doc.autoTable({ startY: 25, head: [['Timestamp', 'Nodo', 'Dimensión', 'Lectura', 'Impacto']], body: historicalData.map(i => [i.Timestamp, i.Nodo, i.Categoria, `${i.Consumo} u`, `${i.Impacto} kg`]) });
    doc.save("Reporte_Auditoria.pdf");
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', target);
    document.getElementById('theme-text').innerText = target === 'light' ? 'Modo Oscuro' : 'Modo Claro';
    inicializarEcosistemaGraficos(activeTab); // Reparado bug de detención (typo)
    if(chartQuaternary) chartQuaternary.update();
}

function simularCargaCSV() {
    document.getElementById('upload-progress-bar').style.width = "100%";
    setTimeout(() => {
        alert("Simulación de Lote Completada.");
        document.getElementById('upload-progress-bar').style.width = "0%";
    }, 1200);
}
