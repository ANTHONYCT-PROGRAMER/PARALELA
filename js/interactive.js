/**
 * SIS225: Simulaciones Interactivas en Vivo
 * Calculadoras de Amdahl, Speedup y Ejecutor de Código Python Simulado
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmdahlCalculator();
  initSpeedupCalculator();
  initPythonSimulators();
});

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
// 2. CALCULADORA INTERACTIVA DE SPEEDUP Y EFICIENCIA (DIAPOSITIVA 10)
// ==========================================================================
function initSpeedupCalculator() {
  const tSeqInput = document.getElementById('calcTSeq');
  const tParInput = document.getElementById('calcTPar');
  const pInput = document.getElementById('calcProcs');

  const speedupOut = document.getElementById('calcSpeedupOut');
  const efficiencyOut = document.getElementById('calcEfficiencyOut');
  const overheadOut = document.getElementById('calcOverheadOut');

  function updateSpeedup() {
    if (!tSeqInput || !tParInput || !pInput) return;

    const tSeq = parseFloat(tSeqInput.value) || 100;
    const tPar = parseFloat(tParInput.value) || 30;
    const p = parseInt(pInput.value, 10) || 4;

    if (tPar <= 0 || p <= 0) return;

    const s = tSeq / tPar;
    const e = (s / p) * 100;
    const overheadTime = (tPar * p) - tSeq;
    const overheadPercent = Math.max(0, 100 - e);

    if (speedupOut) speedupOut.innerText = `${s.toFixed(2)}x`;
    if (efficiencyOut) efficiencyOut.innerText = `${e.toFixed(1)}%`;
    if (overheadOut) overheadOut.innerText = `${overheadPercent.toFixed(1)}%`;
  }

  tSeqInput?.addEventListener('input', updateSpeedup);
  tParInput?.addEventListener('input', updateSpeedup);
  pInput?.addEventListener('input', updateSpeedup);
  updateSpeedup();
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
