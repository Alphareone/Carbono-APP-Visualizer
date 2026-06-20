// ==========================================================================
// CONTROL CORE - CARBONO-APP-VISUALIZER MULTIDIMENSIONAL
// ==========================================================================
lucide.createIcons();

let activeTab = 'carbono';
let totalRecords = 0;

// Estructura de buffers independientes en memoria (DataPool)
let dataPool = { carbono: [], luminica: [], ruido: [] };
let historicalData = []; 
let timeLabels = Array(10).fill('--:--:--');

// Estado físico inercial (Random Walk)
let ultimosValoresCanales = { carbono: 2500, luminica: 1200, ruido: 800 };

// Identidad visual por canal ambiental
const colorMap = { carbono: '#00ffa3', luminica: '#ffaa00', ruido: '#bd00ff' };
const nombresCanales = { carbono: 'Huella de Carbono', luminica: 'Contaminación Lumínica', ruido: 'Ondas de Ruido Industrial' };
let labelsNodos = ['PLANT-NORTH-01', 'LOGISTIC-VALPO', 'URBAN-STGO', 'MINER-ANTOF'];

// Instancias globales para el cuarteto dinámico de gráficos en pantalla
let chartPrimary, chartSecondary, chartTertiary, chartQuaternary;

// Inicialización de la consola al arrancar
window.addEventListener('DOMContentLoaded', () => {
    inicializarEcosistemaGraficos('carbono');
});

// ==========================================================================
// ORQUESTADOR DE GRÁFICOS: GENERADOR DE 12 TIPOLOGÍAS ÚNICAS (Matriz 2x2)
// ==========================================================================
function inicializarEcosistemaGraficos(canal) {
    if (chartPrimary) chartPrimary.destroy();
    if (chartSecondary) chartSecondary.destroy();
    if (chartTertiary) chartTertiary.destroy();
    if (chartQuaternary) chartQuaternary.destroy();

    const ctx1 = document.getElementById('chartPrimary').getContext('2d');
    const ctx2 = document.getElementById('chartSecondary').getContext('2d');
    const ctx3 = document.getElementById('chartTertiary').getContext('2d');
    const ctx4 = document.getElementById('chartQuaternary').getContext('2d');

    const configEjes = {
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#6b7280', fontSize: 10 } },
            x: { grid: { display: false }, ticks: { color: '#6b7280', fontSize: 10 } }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
    };

    if (canal === 'carbono') {
        document.getElementById('lbl-suite-title').innerText = "Consola Analítica: Huella de Carbono";
        document.getElementById('lbl-suite-desc').innerText = "Análisis volumétrico de emisiones moleculares CO₂e continuas.";
        document.getElementById('title-chart-1').innerText = "Línea Temporal Dinámica";
        document.getElementById('title-chart-2').innerText = "Distribución por Nodo [Barras]";
        document.getElementById('title-chart-3').innerText = "Masa de Gases [Área Polar]";
        document.getElementById('title-chart-4').innerText = "Mitigación Proyectada [Área Suave]";

        chartPrimary = new Chart(ctx1, {
            type: 'line',
            data: { labels: timeLabels, datasets: [{ data: Array(10).fill(2500), borderColor: '#00ffa3', backgroundColor: 'rgba(0, 255, 163, 0.08)', fill: true, tension: 0.35 }] },
            options: configEjes
        });

        chartSecondary = new Chart(ctx2, {
            type: 'bar',
            data: { labels: labelsNodos, datasets: [{ data: [1200, 2300, 1800, 3100], backgroundColor: '#00ffa3', borderRadius: 4 }] },
            options: configEjes
        });

        chartTertiary = new Chart(ctx3, {
            type: 'polarArea',
            data: { labels: labelsNodos, datasets: [{ data: [20, 35, 15, 30], backgroundColor: ['rgba(0,255,163,0.2)', 'rgba(0,255,163,0.4)', 'rgba(0,255,163,0.6)', 'rgba(0,255,163,0.8)'] }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        chartQuaternary = new Chart(ctx4, {
            type: 'line',
            data: { labels: ['Ene', 'Feb', 'Mar', 'Abr'], datasets: [{ data: [3000, 2600, 2100, 1500], borderColor: '#00ffa3', backgroundColor: 'rgba(0,255,163,0.15)', fill: true, tension: 0.5 }] },
            options: configEjes
        });

    } else if (canal === 'luminica') {
        document.getElementById('lbl-suite-title').innerText = "Consola Analítica: Contaminación Lumínica";
        document.getElementById('lbl-suite-desc').innerText = "Medición de flujo radiante fotónico e irradiación desmesurada.";
        document.getElementById('title-chart-1').innerText = "Dispersión Cardinal [Radar]";
        document.getElementById('title-chart-2').innerText = "Lúmenes por Vector [Scatter]";
        document.getElementById('title-chart-3').innerText = "Eficiencia del Haz [Dona Radial]";
        document.getElementById('title-chart-4').innerText = "Picos de Irradiación Estelar [Barras Finas]";

        chartPrimary = new Chart(ctx1, {
            type: 'radar',
            data: { labels: ['Norte', 'Sur', 'Este', 'Oeste', 'Cénit'], datasets: [{ data: [75, 40, 65, 80, 95], borderColor: '#ffaa00', backgroundColor: 'rgba(255, 170, 0, 0.15)' }] },
            options: { responsive: true, maintainAspectRatio: false }
        });

        chartSecondary = new Chart(ctx2, {
            type: 'scatter',
            data: { datasets: [{ label: 'Fotones', data: [{x: 2, y: 1500}, {x: 4, y: 3200}, {x: 7, y: 4100}], backgroundColor: '#ffaa00' }] },
            options: configEjes
        });

        chartTertiary = new Chart(ctx3, {
            type: 'doughnut',
            data: { labels: ['Útil', 'Dispersado'], datasets: [{ data: [70, 30], backgroundColor: ['#ffaa00', 'rgba(255,255,255,0.05)'] }] },
            options: { responsive: true, maintainAspectRatio: false, circumference: 180, rotation: -90, plugins: { legend: { display: false } } }
        });

        chartQuaternary = new Chart(ctx4, {
            type: 'bar',
            data: { labels: ['V1', 'V2', 'V3', 'V4', 'V5'], datasets: [{ data: [400, 800, 200, 600, 900], backgroundColor: '#ffaa00', barThickness: 6 }] },
            options: configEjes
        });

    } else if (canal === 'ruido') {
        document.getElementById('lbl-suite-title').innerText = "Consola Analítica: Ondas de Ruido";
        document.getElementById('lbl-suite-desc').innerText = "Análisis de presión acústica y picos estocásticos de decibelios.";
        document.getElementById('title-chart-1').innerText = "Osciloscopio Acústico [Espectro]";
        document.getElementById('title-chart-2').innerText = "Presión de Nodos [Barras H]";
        document.getElementById('title-chart-3').innerText = "Impactos de Frecuencia [Burbujas]";
        document.getElementById('title-chart-4').innerText = "Aislamiento Estructural [Radar Alterno]";

        chartPrimary = new Chart(ctx1, {
            type: 'line',
            data: { labels: timeLabels, datasets: [{ data: Array(10).fill(800), borderColor: '#bd00ff', pointRadius: 0, borderWidth: 2, fill: false, tension: 0.5 }] },
            options: configEjes
        });

        chartSecondary = new Chart(ctx2, {
            type: 'bar',
            data: { labels: labelsNodos, datasets: [{ data: [75, 105, 60, 90], backgroundColor: '#bd00ff' }] },
            options: { indexAxis: 'y', ...configEjes }
        });

        chartTertiary = new Chart(ctx3, {
            type: 'bubble',
            data: { datasets: [{ data: [{x: 8, y: 15, r: 10}, {x: 12, y: 25, r: 18}, {x: 5, y: 8, r: 7}], backgroundColor: '#bd00ff' }] },
            options: configEjes
        });

        chartQuaternary = new Chart(ctx4, {
            type: 'radar',
            data: { labels: ['F1', 'F2', 'F3', 'F4'], datasets: [{ data: [90, 60, 85, 40], borderColor: '#bd00ff', backgroundColor: 'rgba(189,0,255,0.1)' }] },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

// ==========================================================================
// STREAMING DE TELEMETRÍA ASÍNCRONA
// ==========================================================================
function feedDataStream() {
    const ahora = new Date();
    const timeStr = ahora.toTimeString().split(' ')[0];
    
    timeLabels.shift();
    timeLabels.push(timeStr);
    
    const canales = ['carbono', 'luminica', 'ruido'];
    
    canales.forEach(canal => {
        let ultimoValor = ultimosValoresCanales[canal];
        let cambio = (Math.random() - 0.5) * 400;
        let gravedad = (2300 - ultimoValor) * 0.03;
        let anomalia = Math.random() < 0.02 ? (Math.random() - 0.3) * 1500 : 0;
        
        let nuevoValor = Math.round(ultimoValor + cambio + gravedad + anomalia);
        if (nuevoValor > 5000) nuevoValor = 4900;
        if (nuevoValor < 100) nuevoValor = 150;
        
        ultimosValoresCanales[canal] = nuevoValor;
        totalRecords++;
        
        const registro = {
            Timestamp: timeStr,
            Nodo: labelsNodos[Math.floor(Math.random() * labelsNodos.length)],
            Categoria: nombresCanales[canal],
            Consumo: nuevoValor,
            Impacto_kgCO2e: (nuevoValor * 0.41).toFixed(1)
        };
        
        dataPool[canal].push(registro);
        historicalData.push(registro);
        
        if (dataPool[canal].length > 300) dataPool[canal].shift();
    });
    
    if (historicalData.length > 300) historicalData.shift();
    
    if (chartPrimary && (activeTab === 'carbono' || activeTab === 'ruido')) {
        chartPrimary.data.labels = timeLabels;
        let buffer = dataPool[activeTab].slice(-10).map(r => r.Consumo);
        while(buffer.length < 10) buffer.unshift(ultimosValoresCanales[activeTab]);
        chartPrimary.data.datasets[0].data = buffer;
        chartPrimary.update('none');
    }
    
    document.getElementById('lbl-total-co2').innerText = `${ultimosValoresCanales[activeTab]} u`;
    document.getElementById('lbl-total-records').innerText = totalRecords;
    
    updateTable();
}

let simulationInterval = setInterval(feedDataStream, 600);

function cambiarCanalAmbiental(canal) {
    if (!dataPool[canal]) return;
    activeTab = canal;
    
    document.querySelectorAll('.btn-channel').forEach(b => b.classList.remove('active'));
    document.querySelector(`.btn-${canal}`).classList.add('active');
    
    inicializarEcosistemaGraficos(canal);
    
    const cardKpi1 = document.getElementById('card-kpi-1');
    const lblKpi1 = document.getElementById('lbl-total-co2');
    lblKpi1.style.color = colorMap[canal];
    cardKpi1.style.borderLeftColor = colorMap[canal];
    lblKpi1.innerText = `${ultimosValoresCanales[canal]} u`;
    
    updateTable();
}

function updateTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const ultimos30 = historicalData.slice(-30);
    [...ultimos30].reverse().forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.Timestamp}</td>
            <td><span class="badge-nodo">${row.Nodo}</span></td>
            <td>${row.Categoria}</td>
            <td style="font-weight:700;">${row.Consumo} u</td>
            <td><span class="impact-tag">${row.Impacto_kgCO2e} kg</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function switchView(viewId) {
    document.querySelectorAll('main > section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    const sec = document.getElementById(`view-${viewId}`);
    if (sec) sec.style.display = 'block';
    const btn = document.getElementById(`btn-${viewId}`);
    if (btn) btn.classList.add('active');
}

function exportToExcel() {
    const workbook = XLSX.utils.book_new();
    const pestañas = [
        { id: 'carbono', hoja: "Huella de Carbono" },
        { id: 'luminica', hoja: "Contaminación Lumínica" },
        { id: 'ruido', hoja: "Ondas de Ruido" }
    ];
    let flags = false;

    pestañas.forEach(p => {
        const data = dataPool[p.id];
        if (data && data.length > 0) {
            const sheet = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, sheet, p.hoja);
            flags = true;
        } else {
            const sheetVacia = XLSX.utils.json_to_sheet([{ Alerta: "Sin telemetrías registradas" }]);
            XLSX.utils.book_append_sheet(workbook, sheetVacia, p.hoja);
        }
    });

    if(!flags) return alert("Búfer vacío.");
    XLSX.writeFile(workbook, `Reporte_CApp_Visualizer_${new Date().toISOString().slice(0,10)}.xlsx`);
}

function exportToPDF() {
    if(!historicalData.length) return alert("Matriz vacía.");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("Helvetica", "bold"); doc.setFontSize(13);
    doc.text("CARBONO-APP-VISUALIZER - REGISTRO HISTÓRICO CONSOLIDADO", 14, 20);
    
    const rows = historicalData.map(i => [i.Timestamp, i.Nodo, i.Categoria, `${i.Consumo} u`, `${i.Impacto_kgCO2e} kg`]);
    doc.autoTable({
        startY: 28,
        head: [['Timestamp', 'Nodo Emisor', 'Dimensión Ambiental', 'Lectura Física', 'Impacto Neto']],
        body: rows,
        styles: { headStyles: { fillColor: [15, 23, 42] } }
    });
    doc.save(`Auditoria_CarbonoApp_${new Date().toISOString().slice(0,10)}.pdf`);
}

function toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const txt = document.getElementById('theme-text');
    const ico = document.getElementById('theme-icon');
    if(theme === 'light') {
        if(txt) txt.innerText = 'Modo Oscuro';
        if(ico) ico.setAttribute('data-lucide', 'moon');
    } else {
        if(txt) txt.innerText = 'Modo Claro';
        if(ico) ico.setAttribute('data-lucide', 'sun');
    }
    lucide.createIcons();
    inicializarEcosistemaGraficos(activeTab);
}

function simularCargaCSV() {
    const bar = document.getElementById('upload-progress-bar');
    const txt = document.getElementById('upload-text');
    if(!bar || !txt) return;
    txt.innerText = "Sincronizando registros en el Core de Carbono-App...";
    bar.style.width = "100%";
    setTimeout(() => {
        alert("Simulación exitosa: 150 vectores acoplados al Visualizer.");
        txt.innerText = "Click aquí para simular importación de lote CSV";
        bar.style.width = "0%";
    }, 2000);
}
