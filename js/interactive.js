/**
 * SIS225: Simulaciones Interactivas en Vivo
 * Calculadoras de Amdahl, Speedup y Ejecutor de Código Python Simulado
 * Sincronización en Tiempo Real entre Calculadora y Diagramas Dinámicos
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmdahlCalculator();
  initSpeedupCalculator();
  initPythonSimulators();
});

// Also expose an initialization function that can be safely re-run
window.initAllSimulations = function() {
  initAmdahlCalculator();
  initSpeedupCalculator();
  initPythonSimulators();
};

// ==========================================================================
// 1. CALCULADORA INTERACTIVA DE LEY DE AMDAHL (DIAPOSITIVA 11)
// ==========================================================================
function initAmdahlCalculator() {
  const fractionSlider = document.getElementById('amdahlFraction');
  const procsSlider = document.getElementById('amdahlProcs');
  
  const fractionVal = document.getElementById('amdahlFractionVal');
  const procsVal = document.getElementById('amdahlProcsVal');
  
  const speedupResult = document.getElementById('amdahlSpeedupRes');
  const theoreticalMax = document.getElementById('amdahlTheoMax');
  const seqPortionBar = document.getElementById('amdahlSeqBar');
  const parPortionBar = document.getElementById('amdahlParBar');

  function updateAmdahl() {
    if (!fractionSlider || !procsSlider) return;
    
    const f = parseFloat(fractionSlider.value) / 100;
    const p = parseInt(procsSlider.value, 10);
    
    if (fractionVal) fractionVal.innerText = `${Math.round(f * 100)}%`;
    if (procsVal) procsVal.innerText = `${p} núcleos`;

    const seqFraction = 1 - f;
    const denominator = seqFraction + (f / p);
    const speedup = 1 / denominator;
    const maxTheoretical = 1 / seqFraction;

    if (speedupResult) speedupResult.innerText = `${speedup.toFixed(2)}x`;
    if (theoreticalMax) theoreticalMax.innerText = `${maxTheoretical.toFixed(2)}x`;

    // Update relative visual time bars
    if (seqPortionBar && parPortionBar) {
      const parTime = (f / p) / (seqFraction + (f / p)) * 100;
      const seqTime = seqFraction / (seqFraction + (f / p)) * 100;
      seqPortionBar.style.width = `${seqTime}%`;
      parPortionBar.style.width = `${parTime}%`;
    }
  }

  fractionSlider?.addEventListener('input', updateAmdahl);
  procsSlider?.addEventListener('input', updateAmdahl);
  updateAmdahl();
}

// ==========================================================================
// 2. CALCULADORA INTERACTIVA DE SPEEDUP & DIAGRAMA DINÁMICO (DIAPOSITIVA 10)
// ==========================================================================
function initSpeedupCalculator() {
  // Inputs & Sliders
  const sliderTSeq = document.getElementById('sliderTSeq');
  const calcTSeq = document.getElementById('calcTSeq');
  
  const sliderTPar = document.getElementById('sliderTPar');
  const calcTPar = document.getElementById('calcTPar');
  
  const sliderProcs = document.getElementById('sliderProcs');
  const calcProcs = document.getElementById('calcProcs');

  // KPI Output elements
  const speedupOut = document.getElementById('calcSpeedupOut');
  const efficiencyOut = document.getElementById('calcEfficiencyOut');
  const statusBox = document.getElementById('calcStatusBox');

  // Dynamic Diagram elements (Slide 10 Left Side)
  const dynPillHeaderBadge = document.getElementById('dynPillHeaderBadge');
  const dynSeqTimeVal = document.getElementById('dynSeqTimeVal');
  const dynSeqBarFill = document.getElementById('dynSeqBarFill');
  const dynSeqBarText = document.getElementById('dynSeqBarText');
  
  const dynProcsCountLabel = document.getElementById('dynProcsCountLabel');
  const dynParTimeVal = document.getElementById('dynParTimeVal');
  const dynCompFill = document.getElementById('dynCompFill');
  const dynCompText = document.getElementById('dynCompText');
  const dynOvhFill = document.getElementById('dynOvhFill');
  const dynOvhText = document.getElementById('dynOvhText');
  const dynSavedFill = document.getElementById('dynSavedFill');
  const dynSavedText = document.getElementById('dynSavedText');

  const dynCoresTitleCount = document.getElementById('dynCoresTitleCount');
  const dynPerCoreLoad = document.getElementById('dynPerCoreLoad');
  const dynCoresContainer = document.getElementById('dynCoresContainer');

  const dynFooterSpeedup = document.getElementById('dynFooterSpeedup');
  const dynFooterEfficiency = document.getElementById('dynFooterEfficiency');
  const dynFooterOverhead = document.getElementById('dynFooterOverhead');

  function updateSpeedupAndDiagram() {
    if (!calcTSeq || !calcTPar || !calcProcs) return;

    const tSeq = Math.max(1, parseFloat(calcTSeq.value) || 100);
    const tPar = Math.max(0.1, parseFloat(calcTPar.value) || 30);
    const p = Math.max(1, parseInt(calcProcs.value, 10) || 4);

    // Calculate Core Metrics
    const speedup = tSeq / tPar;
    const efficiency = (speedup / p) * 100;
    const usefulCompute = tSeq / p;
    const overheadSec = Math.max(0, tPar - usefulCompute);
    const overheadPercent = Math.max(0, 100 - efficiency);
    const savedTime = Math.max(0, tSeq - tPar);
    const savedPercent = Math.max(0, (savedTime / tSeq) * 100);

    // 1. Update KPI Values in Calculator
    if (speedupOut) speedupOut.innerText = `${speedup.toFixed(2)}x`;
    if (efficiencyOut) efficiencyOut.innerText = `${efficiency.toFixed(1)}%`;

    // 2. Update Status Diagnosis Badge
    if (statusBox) {
      if (efficiency > 100) {
        statusBox.style.background = '#E4FCF9';
        statusBox.style.color = '#0E6056';
        statusBox.style.borderColor = '#4B89AC';
        statusBox.innerHTML = `<strong>⚡ Speedup Superlineal (${efficiency.toFixed(1)}%):</strong> Gran ganancia por efecto de caché L2/L3 combinada.`;
      } else if (efficiency >= 75) {
        statusBox.style.background = '#E8F8F4';
        statusBox.style.color = '#126353';
        statusBox.style.borderColor = '#A3DEC9';
        statusBox.innerHTML = `<strong>✓ Alta Eficiencia (${efficiency.toFixed(1)}%):</strong> Excelente escalabilidad paralela con bajo overhead (${overheadPercent.toFixed(1)}%).`;
      } else if (efficiency >= 50) {
        statusBox.style.background = '#EDF7FC';
        statusBox.style.color = '#255877';
        statusBox.style.borderColor = '#ACE6F6';
        statusBox.innerHTML = `<strong>ℹ Eficiencia Moderada (${efficiency.toFixed(1)}%):</strong> Sobrecosto de sincronización perceptible (${overheadPercent.toFixed(1)}%).`;
      } else {
        statusBox.style.background = '#FFF3F3';
        statusBox.style.color = '#9E2424';
        statusBox.style.borderColor = '#FFC4C4';
        statusBox.innerHTML = `<strong>⚠ Alto Overhead (${overheadPercent.toFixed(1)}%):</strong> Gran costo en sincronización/comunicación para ${p} procesadores.`;
      }
    }

    // 3. Update Left-Side Dynamic Diagram Bars
    if (dynPillHeaderBadge) dynPillHeaderBadge.innerText = `${p} Núcleos Activos`;
    if (dynSeqTimeVal) dynSeqTimeVal.innerText = `${tSeq.toFixed(1)} s (100%)`;
    if (dynSeqBarText) dynSeqBarText.innerText = `${tSeq.toFixed(1)} s de cómputo secuencial continuo en 1 núcleo`;

    if (dynProcsCountLabel) dynProcsCountLabel.innerText = `${p}`;
    if (dynParTimeVal) dynParTimeVal.innerText = `${tPar.toFixed(1)} s`;

    // Bar segment widths relative to T_seq
    const compWidthPct = Math.min(100, Math.max(3, (usefulCompute / tSeq) * 100));
    const ovhWidthPct = Math.min(100 - compWidthPct, Math.max(0, (overheadSec / tSeq) * 100));
    const savedWidthPct = Math.max(0, 100 - (compWidthPct + ovhWidthPct));

    if (dynCompFill) {
      dynCompFill.style.width = `${compWidthPct}%`;
      if (dynCompText) dynCompText.innerText = `Cómputo: ${usefulCompute.toFixed(1)}s`;
    }

    if (dynOvhFill) {
      dynOvhFill.style.width = `${ovhWidthPct}%`;
      if (dynOvhText) {
        dynOvhText.innerText = ovhWidthPct > 5 ? `Ovh: ${overheadSec.toFixed(1)}s` : `${overheadSec.toFixed(1)}s`;
      }
      dynOvhFill.style.display = overheadSec > 0.05 ? 'flex' : 'none';
    }

    if (dynSavedFill) {
      dynSavedFill.style.width = `${savedWidthPct}%`;
      if (dynSavedText) {
        dynSavedText.innerText = savedWidthPct > 15 ? 
          `Ahorro: ${savedTime.toFixed(1)} s (${savedPercent.toFixed(0)}%)` : 
          `${savedTime.toFixed(1)}s`;
      }
    }

    // 4. Update Cores Rack
    if (dynCoresTitleCount) dynCoresTitleCount.innerText = `${p}`;
    if (dynPerCoreLoad) dynPerCoreLoad.innerText = `~${usefulCompute.toFixed(1)} s de cómputo por núcleo`;

    if (dynCoresContainer) {
      let coresHtml = '';
      const displayCores = Math.min(p, 16);
      for (let i = 0; i < displayCores; i++) {
        coresHtml += `
          <div class="core-chip-item active">
            <span>Core ${i}</span>
            <span style="font-size: 8.5px; color: var(--secondary-ocean); font-family: 'JetBrains Mono', monospace;">${usefulCompute.toFixed(1)}s</span>
          </div>
        `;
      }
      if (p > 16) {
        coresHtml += `
          <div class="core-chip-item active" style="background: var(--primary-navy); color: #FFFFFF; border-color: var(--primary-navy);">
            <span>+${p - 16} Cores</span>
          </div>
        `;
      }
      dynCoresContainer.innerHTML = coresHtml;
    }

    // 5. Update Footer Metric Pills
    if (dynFooterSpeedup) dynFooterSpeedup.innerText = `${speedup.toFixed(2)}x`;
    if (dynFooterEfficiency) dynFooterEfficiency.innerText = `${efficiency.toFixed(1)}%`;
    if (dynFooterOverhead) {
      dynFooterOverhead.innerText = `${overheadSec.toFixed(1)} s (${overheadPercent.toFixed(1)}%)`;
    }
  }

  // Two-way synchronization helpers
  function syncInputAndSlider(slider, input) {
    if (!slider || !input) return;
    slider.addEventListener('input', () => {
      input.value = slider.value;
      updateSpeedupAndDiagram();
    });
    input.addEventListener('input', () => {
      slider.value = input.value;
      updateSpeedupAndDiagram();
    });
  }

  syncInputAndSlider(sliderTSeq, calcTSeq);
  syncInputAndSlider(sliderTPar, calcTPar);
  syncInputAndSlider(sliderProcs, calcProcs);

  // Global preset handler
  window.applySpeedupPreset = function(tSeq, tPar, p) {
    if (sliderTSeq) sliderTSeq.value = tSeq;
    if (calcTSeq) calcTSeq.value = tSeq;

    if (sliderTPar) sliderTPar.value = tPar;
    if (calcTPar) calcTPar.value = tPar;

    if (sliderProcs) sliderProcs.value = p;
    if (calcProcs) calcProcs.value = p;

    updateSpeedupAndDiagram();
  };

  updateSpeedupAndDiagram();
}

// ==========================================================================
// 3. SIMULADOR DE EJECUCIÓN DE CÓDIGO PYTHON (DIAPOSITIVAS 13 & 14)
// ==========================================================================
function initPythonSimulators() {
  // Simulator 1: Threading
  const runBtnThreading = document.getElementById('btnRunThreading');
  const terminalThreading = document.getElementById('terminalThreading');

  runBtnThreading?.addEventListener('click', () => {
    if (!terminalThreading) return;
    runBtnThreading.disabled = true;
    runBtnThreading.innerText = 'Ejecutando...';
    terminalThreading.innerHTML = `<span class="terminal-line">$ python ejemplo_threading.py</span><br><span style="color:#ACE6F6">Iniciando Tarea 1 (2s)...</span><br><span style="color:#ACE6F6">Iniciando Tarea 2 (2s)...</span>`;

    setTimeout(() => {
      terminalThreading.innerHTML += `<br><span style="color:#8FD88B">Terminando Tarea 1</span><br><span style="color:#8FD88B">Terminando Tarea 2</span><br><span class="terminal-highlight">Tiempo total: 2.01 segundos (Concurrente)</span>`;
      runBtnThreading.disabled = false;
      runBtnThreading.innerText = '▶ Ejecutar de nuevo';
    }, 2000);
  });

  // Simulator 2: Multiprocessing
  const runBtnMulti = document.getElementById('btnRunMultiprocessing');
  const terminalMulti = document.getElementById('terminalMulti');

  runBtnMulti?.addEventListener('click', () => {
    if (!terminalMulti) return;
    runBtnMulti.disabled = true;
    runBtnMulti.innerText = 'Calculando...';
    terminalMulti.innerHTML = `<span class="terminal-line">$ python ejemplo_multiprocessing.py</span><br><span style="color:#E4FCF9">Ejecutando en modo secuencial...</span>`;

    setTimeout(() => {
      terminalMulti.innerHTML += `<br><span style="color:#FFBD2E">Secuencial: 4.82 s</span><br><span style="color:#ACE6F6">Distribuyendo datos en Pool(processes=4)...</span>`;
      
      setTimeout(() => {
        terminalMulti.innerHTML += `<br><span style="color:#8FD88B">Paralelo (4 núcleos): 1.35 s</span><br><span class="terminal-highlight">⚡ Speedup obtenido: 3.57x</span>`;
        runBtnMulti.disabled = false;
        runBtnMulti.innerText = '▶ Ejecutar de nuevo';
      }, 1400);
    }, 1200);
  });
}
