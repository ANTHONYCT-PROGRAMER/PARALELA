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
// 1. CALCULADORA INTERACTIVA DE LEY DE AMDAHL & GRÁFICO DINÁMICO (DIAPOSITIVA 11)
// ==========================================================================
function initAmdahlCalculator() {
  const fractionSlider = document.getElementById('amdahlFraction');
  const calcFractionInput = document.getElementById('calcAmdahlFraction');
  
  const procsSlider = document.getElementById('amdahlProcs');
  const calcProcsInput = document.getElementById('calcAmdahlProcs');
  
  const pillBadge = document.getElementById('amdahlPillBadge');
  const seqFractionTag = document.getElementById('dynSeqFractionTag');
  
  const speedupResult = document.getElementById('amdahlSpeedupRes');
  const theoreticalMax = document.getElementById('amdahlTheoMax');
  const seqPortionBar = document.getElementById('amdahlSeqBar');
  const parPortionBar = document.getElementById('amdahlParBar');
  const conclusionText = document.getElementById('amdahlConclusionText');

  const dynFormulaText = document.getElementById('dynAmdahlFormulaText');
  const dynStepResult = document.getElementById('dynAmdahlStepResult');
  const dynMaxLimit = document.getElementById('dynAmdahlMaxLimit');

  // SVG elements for live plotting
  const dynamicCurve = document.getElementById('amdahlDynamicCurve');
  const asymptoteLine = document.getElementById('amdahlAsymptoteLine');
  const asymptoteLabel = document.getElementById('amdahlAsymptoteLabel');
  const activePoint = document.getElementById('amdahlActivePoint');
  const pointHalo = document.getElementById('amdahlPointHalo');
  const pointLabel = document.getElementById('amdahlPointLabel');

  function updateAmdahl() {
    if (!fractionSlider || !procsSlider) return;
    
    const fPercent = Math.min(99, Math.max(1, parseFloat(fractionSlider.value) || 80));
    const f = fPercent / 100;
    const p = Math.max(1, parseInt(procsSlider.value, 10) || 4);

    const seqFraction = 1 - f;
    const denominator = seqFraction + (f / p);
    const speedup = 1 / denominator;
    const maxTheoretical = 1 / seqFraction;

    // 1. Text & KPI Updates
    if (pillBadge) pillBadge.innerText = `f = ${Math.round(fPercent)}% • ${p} Cores`;
    if (seqFractionTag) seqFractionTag.innerText = `Secuencial (1-f): ${(seqFraction * 100).toFixed(0)}%`;

    if (speedupResult) speedupResult.innerText = `${speedup.toFixed(2)}x`;
    if (theoreticalMax) theoreticalMax.innerText = `${maxTheoretical.toFixed(2)}x`;

    if (dynFormulaText) {
      dynFormulaText.innerText = `S = 1 / [${seqFraction.toFixed(2)} + ${f.toFixed(2)}/${p}]`;
    }
    if (dynStepResult) {
      dynStepResult.innerText = `S(${p}) = ${speedup.toFixed(2)}x (${((speedup / p) * 100).toFixed(0)}% Efic.)`;
    }
    if (dynMaxLimit) {
      dynMaxLimit.innerText = `S_max = ${maxTheoretical.toFixed(2)}x`;
    }

    // 2. Relative Visual Time Composition Bars
    if (seqPortionBar && parPortionBar) {
      const parTime = (f / p) / denominator * 100;
      const seqTime = seqFraction / denominator * 100;
      seqPortionBar.style.width = `${seqTime}%`;
      seqPortionBar.innerText = seqTime > 15 ? `Secuencial: ${(seqFraction * 100).toFixed(0)}%` : `${(seqFraction * 100).toFixed(0)}%`;
      
      parPortionBar.style.width = `${parTime}%`;
      parPortionBar.innerText = parTime > 15 ? `Paralelo (f/p): ${((f / p) * 100).toFixed(1)}%` : `${((f / p) * 100).toFixed(1)}%`;
    }

    // 3. Dynamic Takeaway Message
    if (conclusionText) {
      conclusionText.innerHTML = `<strong>Conclusión de Amdahl:</strong> Con un <strong>${(seqFraction * 100).toFixed(0)}%</strong> de código estrictamente secuencial, el Speedup máximo está topado a <strong>${maxTheoretical.toFixed(2)}x</strong>, sin importar si usas 64 o 1,000,000 de procesadores.`;
    }

    // 4. Live SVG Plot Updates
    // Plot coordinate math:
    // X range: p in [1, 64] -> X in [55, 495] (width: 440) using log2 scale
    const mapX = (coreCount) => {
      const clampedP = Math.max(1, Math.min(64, coreCount));
      const logRatio = Math.log2(clampedP) / Math.log2(64); // [0, 1]
      return 55 + (440 * logRatio);
    };

    // Y range: S in [1, 20] -> Y in [195, 20] (height: 175) using log2 scale
    const mapY = (sVal) => {
      const clampedS = Math.max(1, Math.min(20, sVal));
      const logRatio = Math.log2(clampedS) / Math.log2(20); // [0, 1]
      return 195 - (175 * logRatio);
    };

    // Draw Dynamic Amdahl Curve Path
    if (dynamicCurve) {
      const samplePoints = [1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64];
      let pathD = '';
      samplePoints.forEach((ptP, idx) => {
        const ptS = 1 / (seqFraction + (f / ptP));
        const px = mapX(ptP);
        const py = mapY(ptS);
        if (idx === 0) {
          pathD += `M ${px.toFixed(1)} ${py.toFixed(1)}`;
        } else {
          pathD += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
        }
      });
      dynamicCurve.setAttribute('d', pathD);
    }

    // Update Asymptote Line & Label
    if (asymptoteLine) {
      const asymY = mapY(maxTheoretical);
      asymptoteLine.setAttribute('y1', asymY.toFixed(1));
      asymptoteLine.setAttribute('y2', asymY.toFixed(1));
      if (asymptoteLabel) {
        asymptoteLabel.setAttribute('y', Math.max(16, asymY - 5).toFixed(1));
        asymptoteLabel.textContent = maxTheoretical >= 50 ? 'Tope S_max > 50x' : `Tope Asintótico S_max = ${maxTheoretical.toFixed(2)}x`;
      }
    }

    // Update Operating Point (p, S) Marker
    if (activePoint && pointHalo && pointLabel) {
      const curX = mapX(p);
      const curY = mapY(speedup);

      activePoint.setAttribute('cx', curX.toFixed(1));
      activePoint.setAttribute('cy', curY.toFixed(1));

      pointHalo.setAttribute('cx', curX.toFixed(1));
      pointHalo.setAttribute('cy', curY.toFixed(1));

      const labelX = curX > 380 ? curX - 85 : curX + 10;
      const labelY = Math.max(30, curY - 6);
      pointLabel.setAttribute('x', labelX.toFixed(1));
      pointLabel.setAttribute('y', labelY.toFixed(1));
      pointLabel.textContent = `(p=${p}, S=${speedup.toFixed(2)}x)`;
    }
  }

  // Two-way sync for Fraction slider & number input
  if (fractionSlider && calcFractionInput) {
    fractionSlider.addEventListener('input', () => {
      calcFractionInput.value = fractionSlider.value;
      updateAmdahl();
    });
    calcFractionInput.addEventListener('input', () => {
      fractionSlider.value = calcFractionInput.value;
      updateAmdahl();
    });
  }

  // Two-way sync for Procs slider & number input
  if (procsSlider && calcProcsInput) {
    procsSlider.addEventListener('input', () => {
      calcProcsInput.value = procsSlider.value;
      updateAmdahl();
    });
    calcProcsInput.addEventListener('input', () => {
      procsSlider.value = calcProcsInput.value;
      updateAmdahl();
    });
  }

  // Global preset handler for Slide 11
  window.applyAmdahlPreset = function(fVal, pVal) {
    if (fractionSlider) fractionSlider.value = fVal;
    if (calcFractionInput) calcFractionInput.value = fVal;

    if (procsSlider) procsSlider.value = pVal;
    if (calcProcsInput) calcProcsInput.value = pVal;

    updateAmdahl();
  };

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
