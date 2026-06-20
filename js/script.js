// ==========================================================================
// CONFIGURACIONES CUÁNTICAS GLOBALES Y FLUJO INDEPENDIENTE
// ==========================================================================
lucide.createIcons();

let activeTab = 'carbono';
let totalRecords = 0;
// Tablas de memoria 100% aisladas
let dataPool = { carbono: [], luminica: [], ruido: [] };
let poolIngestaManual = [];
let metricsSum = { carbono: 0, luminica: 0, ruido: 0 };
let simulationInterval;

let timeLabels = Array(20).fill('--:--:--');
let streamBufferData = Array(20).fill(2500);
let labelsNodos = ['PLANT-NORTH-01', 'LOGISTIC-VALPO', 'URBAN-STGO', 'MINER-ANTOF'];
let datosManualesNodos = [0, 0, 0, 0];

let chartA1, chartA2, chartA3, chartA4, chartA5, manualWineChart;

const colorMap = {
    carbono: '#00ff88',
    luminica: '#ffaa00',
    ruido: '#bd00ff'
};

// ==========================================================================
// RETORNO ÓPTIMO DE CONFIGURACIONES DE EJES SEGÚN MODO CLARO/OSCURO
// ==========================================================================
function obtenerConfiguracionEjes() {
    const esModoOscuro = document.documentElement.getAttribute('data-theme') !== 'light';
    const colorEtiquetas = esModoOscuro ? '#94a3b8' : '#4b5563';
    const colorGrilla = esModoOscuro ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';

    return {
        x: { ticks: { color: colorEtiquetas }, grid: { color: colorGrilla } },
        y: { ticks: { color: colorEtiquetas }, grid: { color: colorGrilla } }
    };
}

function inicializarEntornoGrafico() {
    const colorActual = colorMap[activeTab];
    const configuracionEjes = obtenerConfiguracionEjes();
    const esModoOscuro = document.documentElement.getAttribute('data-theme') !== 'light';

    // CHART A1: Monitor Continuo con Fondo y Relleno Adaptativo al Tema
    chartA1 = new Chart(document.getElementById('chart-A1').getContext('2d'), {
        type: 'line',
        data: { 
            labels: timeLabels, 
            datasets: [{ 
                data: streamBufferData, 
                borderColor: colorActual, 
                borderWidth: 2, 
                pointRadius: 0, 
                tension: 0.3, 
                fill: true, 
                backgroundColor: esModoOscuro ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.35)' 
            }] 
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            animation: false, 
            plugins: { legend: { display: false } }, 
            scales: { 
                x: { display: false }, 
                y: { min: 0, max: 5500, ticks: { color: configuracionEjes.y.ticks.color }, grid: { color: configuracionEjes.y.grid.color } } 
            } 
        }
    });

    // Construcción de la matriz mutante A2
    reconstruirGraficoA2();

    // CHART A4: Historial de Promedio diario
    chartA4 = new Chart(document.getElementById('chart-A4').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{ data: [1200, 2400, 3100, 1800, 2900, 2100], borderColor: colorActual, borderWidth: 2, tension: 0.4, pointRadius: 3, fill: false }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: configuracionEjes.x, y: { min: 0, max: 5000, ticks: configuracionEjes.y.ticks, grid: configuracionEjes.y.grid } } }
    });

    // CHART A5: Distribución Vectorial por Nodos
    chartA5 = new Chart(document.getElementById('chart-A5').getContext('2d'), {
        type: 'bar',
        data: {
            labels: labelsNodos,
            datasets: [{ data: [1500, 2300, 4100, 1800], backgroundColor: 'rgba(0, 255, 136, 0.2)', borderColor: colorActual, borderWidth: 1, borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: configuracionEjes.x, y: { min: 0, max: 5000, ticks: configuracionEjes.y.ticks, grid: configuracionEjes.y.grid } } }
    });

    reconstruirGraficoA3('bubble');

    // Radar Auxiliar Ingesta Manual
    manualWineChart = new Chart(document.getElementById('manualWineChart').getContext('2d'), {
        type: 'radar',
        data: { labels: labelsNodos, datasets: [{ data: datosManualesNodos, borderColor: '#ff0055', backgroundColor: 'rgba(255, 0, 85, 0.1)', pointBackgroundColor: '#ff0055', borderWidth: 2 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { ticks: { display: false }, min: 0, max: 5000, angleLines: { color: configuracionEjes.x.grid.color }, grid: { color: configuracionEjes.x.grid.color }, pointLabels: { color: configuracionEjes.x.ticks.color } } } }
    });
}

// ==========================================================================
// MUTACIÓN ESPECÍFICA DE MÉTODOS DE ANÁLISIS (CHART A2)
// ==========================================================================
function reconstruirGraficoA2() {
    if (chartA2) chartA2.destroy();
    const ctx = document.getElementById('chart-A2').getContext('2d');
    const colorActual = colorMap[activeTab];
    const configuracionEjes = obtenerConfiguracionEjes();

    if (activeTab === 'carbono') {
        // MÉTODO: Curva ROC (Probabilidades de Clasificación de Umbrales Críticos)
        chartA2 = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0'],
                datasets: [
                    { data: [0, 0.55, 0.82, 0.91, 0.97, 1.0], borderColor: colorActual, backgroundColor: 'rgba(0, 255, 136, 0.05)', borderWidth: 2, pointRadius: 2, fill: true, tension: 0.2 },
                    { data: [0, 0.2, 0.4, 0.6, 0.8, 1.0], borderColor: '#4b5563', borderWidth: 1, borderDash: [4, 4], pointRadius: 0, fill: false }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: configuracionEjes }
        });
    } else if (activeTab === 'luminica') {
        // MÉTODO: Histograma Frecuencial Discreto (Distribución de Densidad de Luxes)
        chartA2 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1k lx', '2k lx', '3k lx', '4k lx', '5k lx'],
                datasets: [{ data: [12, 28, 45, 18, 8], backgroundColor: colorActual, barPercentage: 1.0, categoryPercentage: 1.0, borderColor: configuracionEjes.x.grid.color, borderWidth: 1 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: configuracionEjes }
        });
    } else if (activeTab === 'ruido') {
        // MÉTODO: Transformada de Fourier (PSD - Densidad Espectral en Hz)
        chartA2 = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    data: [{x: 63, y: 22}, {x: 125, y: 38}, {x: 250, y: 55}, {x: 500, y: 78}, {x: 1000, y: 42}, {x: 2000, y: 31}, {x: 4000, y: 15}],
                    borderColor: colorActual, backgroundColor: colorActual, showLine: true, borderWidth: 2, pointRadius: 4, tension: 0.25
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, 
                scales: {
                    x: { type: 'linear', min: 0, max: 4500, ticks: { color: configuracionEjes.x.ticks.color }, grid: { color: configuracionEjes.x.grid.color } },
                    y: { min: 0, max: 90, ticks: { color: configuracionEjes.y.ticks.color }, grid: { color: configuracionEjes.y.grid.color } }
                }
            }
        });
    }
}

function reconstruirGraficoA3(tipoGeometria) {
    if (chartA3) chartA3.destroy();
    const ctx = document.getElementById('chart-A3').getContext('2d');
    const colorActual = colorMap[activeTab];
    const configuracionEjes = obtenerConfiguracionEjes();

    if (tipoGeometria === 'radar') {
        chartA3 = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labelsNodos,
                datasets: [
                    { label: 'Picos Decibelios (dB)', data: [1100, 2900, 3100, 1400], borderColor: colorActual, backgroundColor: 'rgba(189, 0, 255, 0.08)', borderWidth: 2, pointRadius: 3 },
                    { label: 'Anillo Crítico Alto Ruido', data: [4000, 4000, 4000, 4000], borderColor: 'rgba(255, 0, 85, 0.2)', borderWidth: 1, borderDash: [4, 4], pointRadius: 0, fill: false }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: configuracionEjes.x.ticks.color, font: { size: 9 } } } }, scales: { r: { min: 0, max: 5000, ticks: { display: false }, angleLines: { color: configuracionEjes.x.grid.color }, grid: { color: configuracionEjes.x.grid.color }, pointLabels: { color: configuracionEjes.x.ticks.color } } } }
        });
    } else {
        chartA3 = new Chart(ctx, {
            type: 'bubble',
            data: { datasets: [{ data: [{x:1.2,y:0.3,r:15}, {x:2.8,y:0.8,r:22}, {x:4.1,y:-0.4,r:12}], backgroundColor: activeTab === 'luminica' ? 'rgba(255, 170, 0, 0.2)' : 'rgba(0, 255, 136, 0.2)', borderColor: colorActual }] },
            options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 5, ticks: { color: configuracionEjes.x.ticks.color }, grid: { display: false } }, y: { min: -1, max: 1.5, ticks: { color: configuracionEjes.y.ticks.color }, grid: { display: false } } } }
        });
    }
}

// ==========================================================================
// FLUJO INTEGRADO ASÍNCRONO INDEPENDIENTE
// ==========================================================================
function feedDataStream() {
    const timeStr = new Date().toLocaleTimeString();
    const currentNodo = labelsNodos[Math.floor(Math.random() * labelsNodos.length)];
    totalRecords++;

    let valCarbono = Math.max(100, Math.min(5000, Math.floor(2400 + (Math.sin(totalRecords * 0.12) * 1100) + (Math.random() * 200 - 100))));
    let valLuminica = Math.max(100, Math.min(5000, Math.floor(2800 + (Math.sin(totalRecords * 0.75) * 1500) + (Math.random() * 400 - 200))));
    let valRuido = Math.max(100, Math.min(5000, Math.floor(900 + (Math.sin(totalRecords * 0.04) * 250) + (Math.random() > 0.8 ? 2000 : 200))));

    // Memoria estricta segregada
    dataPool.carbono.push({ time: timeStr, nodo: currentNodo, val: valCarbono });
    dataPool.luminica.push({ time: timeStr, nodo: currentNodo, val: valLuminica });
    dataPool.ruido.push({ time: timeStr, nodo: currentNodo, val: valRuido });

    metricsSum.carbono += (valCarbono / 50000);
    metricsSum.luminica = valLuminica;
    metricsSum.ruido = valRuido;

    document.getElementById('kpi-carbono').innerHTML = `${metricsSum.carbono.toFixed(3)} <span style="font-size:0.75rem;color:var(--text-muted)">t</span>`;
    document.getElementById('kpi-luminica').innerText = `${Math.floor(metricsSum.luminica)} lx`;
    document.getElementById('kpi-ruido').innerText = `${Math.floor(metricsSum.ruido)} dB`;
    document.getElementById('kpi-registros').innerText = totalRecords;

    let valorSeleccionado = (activeTab === 'carbono') ? valCarbono : (activeTab === 'luminica' ? valLuminica : valRuido);

    timeLabels.shift(); timeLabels.push(timeStr);
    streamBufferData.shift(); streamBufferData.push(valorSeleccionado);
    chartA1.update('none');

    if (chartA4 && chartA5) {
        chartA4.data.datasets[0].data = chartA4.data.datasets[0].data.map(v => Math.max(500, Math.min(4800, Math.floor(v + (Math.random() * 80 - 40)))));
        chartA4.update('none');

        chartA5.data.datasets[0].data = [
            Math.max(200, Math.min(5000, Math.floor(valorSeleccionado * 0.95 + (Math.random() * 200 - 100)))),
            Math.max(200, Math.min(5000, Math.floor(valorSeleccionado * 0.72 + (Math.random() * 300 - 150)))),
            Math.max(200, Math.min(5000, Math.floor(valorSeleccionado * 1.05 + (Math.random() * 200 - 100)))),
            Math.max(200, Math.min(5000, Math.floor(valorSeleccionado * 0.88)))
        ];
        chartA5.update('none');
    }

    if (chartA3) {
        if (activeTab === 'ruido' && chartA3.config.type === 'radar') {
            chartA3.data.datasets[0].data = [valRuido, Math.floor(valRuido * 0.8), Math.floor(valRuido * 1.05), Math.floor(valRuido * 0.65)];
            chartA3.update('none');
        } else if (chartA3.config.type === 'bubble') {
            chartA3.data.datasets[0].data = [
                { x: 1.5, y: (valorSeleccionado / 5000) * 2 - 1, r: Math.max(6, (valCarbono % 25)) },
                { x: 2.8, y: Math.cos(totalRecords * 0.1) * 0.6, r: Math.max(8, (valLuminica % 20)) },
                { x: 4.2, y: (valRuido / 5000) * 1.4 - 0.5, r: Math.max(5, (valRuido % 15)) }
            ];
            chartA3.update('none');
        }
    }

    if (totalRecords % 2 === 0) renderTableData();
}

// ==========================================================================
// RECONFIGURACIÓN DE IDENTIDAD Y COLORES POR PESTAÑA
// ==========================================================================
function switchTableTab(tabName) {
    activeTab = tabName;
    const colorActual = colorMap[tabName];
    
    document.documentElement.style.setProperty('--active-color', colorActual);

    let textA1 = 'CANAL A1: OSCILOSCOPIO CO2 (FLUJO INDUSTRIAL DENSO)';
    let textA2 = 'CANAL A2: ANALÍTICA ROC DE CLASIFICACIÓN DE ALERTA';
    let textA3 = 'CANAL A3: MAPA DE DENSIDAD TÉRMICA MOLECULAR';
    let textA4 = 'CANAL A4: HISTORIAL DE TENDENCIA CO2 ACUMULADA';
    let textA5 = 'CANAL A5: CONCENTRACIÓN CO2 POR ESTACIONES';

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');

    const headersRow = document.getElementById('table-headers');

    if (tabName === 'carbono') {
        reconstruirGraficoA3('bubble');
        headersRow.innerHTML = `<th>Timestamp</th><th>Nodo Operativo</th><th>Estado Gas</th><th>Indicador Base</th><th>Masa CO2 (ppm)</th>`;
    } else if (tabName === 'luminica') {
        textA1 = 'CANAL A1: FRECUENCIA FOTÓNICA EN TIEMPO REAL (LUXES)';
        textA2 = 'CANAL A2: HISTOGRAMA DE DISTRIBUCIÓN CONTINUA FOTÓNICA';
        textA3 = 'CANAL A3: ANÁLISIS DE DISPERSIÓN DISCRETA DE PARTÍCULAS';
        textA4 = 'CANAL A4: FLUJO LUMÍNICO INTEGRADO DIARIO';
        textA5 = 'CANAL A5: INTENSIDAD FOTÓNICA PROMEDIO DE ZONA';
        reconstruirGraficoA3('bubble');
        headersRow.innerHTML = `<th>Timestamp</th><th>Célula Lumínica</th><th>Sensibilidad fotón</th><th>Rango Óptico</th><th>Intensidad (lx)</th>`;
    } else if (tabName === 'ruido') {
        textA1 = 'CANAL A1: ESPECTROGRAMA DE RUIDO TRANSITORIO';
        textA2 = 'CANAL A2: TRANSFORMADA DE FOURIER (FFT) - POTENCIA DE FRECUENCIA';
        textA3 = 'CANAL A3: SONAR DE PICOS OPERATIVOS CON BARRERA DE EXCESO';
        textA4 = 'CANAL A4: EVOLUCIÓN HISTÓRICA DE PRESIÓN ACÚSTICA';
        textA5 = 'CANAL A5: IMPACTO DE DECIBELIOS POR PUNTOS DE ESCUCHA';
        reconstruirGraficoA3('radar');
        headersRow.innerHTML = `<th>Timestamp</th><th>Estación de Escucha</th><th>Modulación Frecuencia</th><th>Umbral Crítico</th><th>Presión Acústica (dB)</th>`;
    }

    document.getElementById('lbl-chart-a1').innerText = textA1;
    document.getElementById('lbl-chart-a2').innerText = textA2;
    document.getElementById('lbl-chart-a3').innerText = textA3;
    document.getElementById('lbl-chart-a4').innerText = textA4;
    document.getElementById('lbl-chart-a5').innerText = textA5;

    // Mutar tonalidades generales
    chartA1.data.datasets[0].borderColor = colorActual;
    chartA4.data.datasets[0].borderColor = colorActual;
    chartA5.data.datasets[0].borderColor = colorActual;
    chartA5.data.datasets[0].backgroundColor = (tabName === 'carbono') ? 'rgba(0,255,136,0.2)' : ((tabName === 'luminica') ? 'rgba(255,170,0,0.2)' : 'rgba(189,0,255,0.2)');

    chartA4.data.datasets[0].data = tabName === 'ruido' ? [600, 1400, 2800, 900, 3100, 1100] : (tabName === 'luminica' ? [4000, 3100, 800, 1200, 3500, 4400] : [1200, 2400, 3100, 1800, 2900, 2100]);

    // Mutar método matemático de la matriz A2
    reconstruirGraficoA2();

    // Sincronizar búfer del osciloscopio A1 con memoria independiente
    const recent = dataPool[tabName].slice(-20);
    for (let i = 0; i < 20; i++) {
        if (recent[i]) {
            timeLabels[i] = recent[i].time;
            streamBufferData[i] = recent[i].val;
        } else {
            timeLabels[i] = '--:--:--';
            streamBufferData[i] = 0;
        }
    }

    chartA1.update();
    chartA4.update();
    chartA5.update();
    renderTableData();
}

function renderTableData() {
    const tbody = document.getElementById('log-table-body');
    if (!tbody) return; tbody.innerHTML = '';
    const logs = dataPool[activeTab].slice(-5).reverse();

    logs.forEach(item => {
        const row = document.createElement('tr');
        let est = 'STABLE', clr = 'background:rgba(0,255,136,0.08);color:#00ff88;border:1px solid rgba(0,255,136,0.15);';

        if (item.val >= 3900) {
            est = 'CRITICAL-SPIKE';
            clr = 'background:rgba(255,0,85,0.08);color:#ff0055;border:1px solid rgba(255,0,85,0.15);';
        } else if (item.val <= 700) {
            est = 'LOW-ANOMALY';
            clr = 'background:rgba(0,191,255,0.08);color:#00bfff;border:1px solid rgba(0,191,255,0.15);';
        }

        let m1 = activeTab === 'carbono' ? 'Filtro CO2 Fijo' : (activeTab === 'luminica' ? 'Fotodiodo Corregido' : 'Ponderación Tipo A');
        row.innerHTML = `<td>${item.time}</td><td style="font-weight:500;">${item.nodo}</td><td><span class="tag" style="${clr}">${est}</span></td><td>${m1}</td><td style="font-weight:bold;">${item.val}</td>`;
        tbody.appendChild(row);
    });
}

// ==========================================================================
// CONMUTACIÓN DE ESQUEMAS CLARO/OSCURO COMPLETA (CORREGIDA)
// ==========================================================================
function toggleTheme() {
    const el = document.documentElement;
    const isLight = el.getAttribute('data-theme') === 'light';
    const nuevoTema = isLight ? 'dark' : 'light';
    el.setAttribute('data-theme', nuevoTema);
    document.getElementById('theme-text').innerText = isLight ? "Modo Claro" : "Modo Oscuro";

    const nuevosEjes = obtenerConfiguracionEjes();
    
    // Corregir relleno adaptativo e indicadores del gráfico A1
    if (chartA1) {
        chartA1.data.datasets[0].backgroundColor = (nuevoTema === 'dark') ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.35)';
        chartA1.options.scales.y.ticks.color = nuevosEjes.y.ticks.color;
        chartA1.options.scales.y.grid.color = nuevosEjes.y.grid.color;
        chartA1.update('none');
    }

    const listaOtrosGraficos = [chartA4, chartA5];
    listaOtrosGraficos.forEach(chartInstance => {
        if (chartInstance) {
            if (chartInstance.options.scales.x) chartInstance.options.scales.x.ticks.color = nuevosEjes.x.ticks.color;
            if (chartInstance.options.scales.y) {
                chartInstance.options.scales.y.ticks.color = nuevosEjes.y.ticks.color;
                chartInstance.options.scales.y.grid.color = nuevosEjes.y.grid.color;
            }
            chartInstance.update();
        }
    });

    // Reconstrucciones estructurales forzadas para refrescar tipografías internas
    reconstruirGraficoA2();
    reconstruirGraficoA3(activeTab === 'ruido' ? 'radar' : 'bubble');
    
    if (manualWineChart) {
        manualWineChart.options.scales.r.angleLines.color = nuevosEjes.x.grid.color;
        manualWineChart.options.scales.r.grid.color = nuevosEjes.x.grid.color;
        manualWineChart.options.scales.r.pointLabels.color = nuevosEjes.x.ticks.color;
        manualWineChart.update();
    }
}

// ==========================================================================
// EXPORTADORES INDEPENDIENTES DE TABLAS
// ==========================================================================
function exportActiveTabToExcel() {
    const subsetData = dataPool[activeTab];
    if (!subsetData.length) return alert(`El registro del canal ${activeTab.toUpperCase()} está vacío.`);
    
    const ws = XLSX.utils.json_to_sheet(subsetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    XLSX.writeFile(wb, `EcoTrack_Registros_${activeTab.toUpperCase()}.xlsx`);
}

function exportActiveTabToPDF() {
    const subsetData = dataPool[activeTab];
    if (!subsetData.length) return alert(`El registro del canal ${activeTab.toUpperCase()} está vacío.`);
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const colorRGB = activeTab === 'carbono' ? [0, 255, 136] : (activeTab === 'luminica' ? [255, 170, 0] : [189, 0, 255]);

    doc.setFont("helvetica", "bold");
    doc.text(`REPORTE EXCLUSIVO - CANAL DE MONITOREO: ${activeTab.toUpperCase()}`, 14, 18);
    
    doc.autoTable({
        startY: 25,
        head: [['Timestamp / Hora', 'Sensor / Estación de Origen', 'Valor Cuantificado']],
        body: subsetData.map(i => [i.time, i.nodo, i.val]),
        headStyles: { fillColor: colorRGB, textColor: [0, 0, 0] }
    });
    
    doc.save(`Reporte_Independent_${activeTab.toUpperCase()}.pdf`);
}

// FUNCIONES DE SOPORTE GENERALES
function switchView(viewName) {
    ['dashboard', 'nodos', 'settings'].forEach(v => {
        document.getElementById(`view-${v}`).style.display = (v === viewName) ? 'block' : 'none';
        document.getElementById(`btn-${v}`).classList.toggle('active', v === viewName);
    });
    if (viewName === 'nodos') setTimeout(() => { manualWineChart.resize(); }, 30);
}

function procesarIngestaManual(event) {
    event.preventDefault();
    const id = document.getElementById('ingesta-id').value;
    const lugar = document.getElementById('ingesta-lugar').value;
    const modulo = document.getElementById('ingesta-modulo').value;
    const cantidad = parseFloat(document.getElementById('ingesta-cantidad').value);
    const timeStr = new Date().toLocaleTimeString();

    dataPool[modulo].push({ time: timeStr, nodo: `${id} (${lugar})`, val: cantidad });
    poolIngestaManual.push({ time: timeStr, id: id, nodo: lugar, canal: modulo.toUpperCase(), val: cantidad });
    totalRecords++;

    const idx = labelsNodos.indexOf(lugar);
    if (idx !== -1) {
        datosManualesNodos[idx] += cantidad;
        manualWineChart.update();
    }

    if(modulo === activeTab) renderTableData();
    renderManualTableData();

    document.getElementById('manual-data-form').reset();
    alert("Inyección manual completada exitosamente.");
}

function renderManualTableData() {
    const tbody = document.getElementById('manual-table-body');
    if (!tbody) return; tbody.innerHTML = '';
    [...poolIngestaManual].reverse().forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.time}</td><td style="color:var(--neon-wine);font-weight:bold;">${item.id}</td><td>${item.nodo}</td><td><span class="tag" style="background:rgba(255,0,85,0.06);color:var(--neon-wine);border:1px solid rgba(255,0,85,0.15)">${item.canal}</span></td><td style="font-weight:bold;">${item.val}</td>`;
        tbody.appendChild(row);
    });
}

function actualizarUnidadFormulario() {
    const mod = document.getElementById('ingesta-modulo').value;
    document.getElementById('lbl-unidad').innerText = mod === 'carbono' ? 'kg' : (mod === 'luminica' ? 'lx' : 'dB');
}

function simularLoginGoogle() {
    document.getElementById('user-avatar').src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
    document.getElementById('user-name').innerText = "Dr. Analista Quantum";
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-interface').style.display = 'flex';
    inicializarEntornoGrafico();
    switchTableTab('carbono');
    simulationInterval = setInterval(feedDataStream, 500);
}

function exportarManualExcel() {
    if(!poolIngestaManual.length) return alert("Auditoría vacía.");
    const ws = XLSX.utils.json_to_sheet(poolIngestaManual);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Auditoria");
    XLSX.writeFile(wb, "Auditoria_Manual.xlsx");
}

function exportarManualPDF() {
    if(!poolIngestaManual.length) return alert("Auditoría vacía.");
    const { jsPDF } = window.jspdf; const doc = new jsPDF();
    doc.text("INFORME DE INGESTA FORZADA MANUAL", 14, 18);
    doc.autoTable({ startY: 25, head: [['Timestamp', 'ID', 'Nodo', 'Canal', 'Magnitud']], body: poolIngestaManual.map(i => [i.time, i.id, i.nodo, i.canal, i.val]), styles: { headStyles: { fillColor: [255, 0, 85] } } });
    doc.save("Auditoria_Manual.pdf");
}

function simularCargaCSV() {
    const text = document.getElementById('upload-text');
    const bar = document.getElementById('upload-progress-bar');
    text.innerText = "Transfiriendo lote masivo..."; bar.style.width = "100%";
    setTimeout(() => {
        for(let i=0; i<15; i++) feedDataStream();
        bar.style.width = "0%"; text.innerText = "Disparar ráfaga masiva";
    }, 600);
}