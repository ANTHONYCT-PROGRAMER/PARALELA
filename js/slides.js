/**
 * SIS225: Computación Paralela y Distribuida
 * Motor de Diapositivas e Interactividad - Sin Emojis (Iconos Vectoriales)
 * Paleta de Colores: #446491, #4B89AC, #ACE6F6, #E4FCF9
 */

const SPEAKER_NOTES_DB = {
  1: {
    persona: "Equipo / Apertura",
    time: "30 seg",
    badge: "Inicio (0:00)",
    guide: "<em>\"Buenas tardes Dr. Robert Romero y compañeros. Somos el grupo encargado del tema <strong>'Fundamentos del Paralelismo y Rendimiento'</strong> (Unidad 1, Semanas 1 y 2) del curso SIS225. Nuestra exposición durará exactamente 16 minutos cronometrados, dividida en 4 intervenciones de 4 minutos cada una. Empezaremos explorando los principios de la concurrencia y cómo se diferencia físicamente del paralelismo.\"</em>",
    keyWords: ["SIS225", "Concurrencia", "Paralelismo", "Rendimiento", "Ley de Amdahl", "Python"],
    qa: [
      { q: "¿Cuál es el objetivo central de la sesión?", a: "Comprender la diferencia formal entre concurrencia y paralelismo, y aprender a medir cuantitativamente la aceleración, eficiencia y límites teóricos en hardware multinúcleo." }
    ]
  },
  2: {
    persona: "Equipo / Hoja de Ruta",
    time: "30 seg",
    badge: "Estructura (0:30)",
    guide: "<em>\"Nuestra hoja de ruta se estructura en 4 bloques complementarios: <strong>Persona 1</strong> abordará la Concurrencia y sus modelos lógicos; <strong>Persona 2</strong> explicará el Paralelismo físico, la Regla de Oro y la Taxonomía de Flynn; <strong>Persona 3</strong> detallará las Métricas Cuantitativas de Rendimiento, la Ley de Amdahl y la Consistencia de Memoria; y <strong>Persona 4</strong> cerrará con la implementación en Python analizando el GIL, Threading y Multiprocessing con simulaciones en vivo.\"</em>",
    keyWords: ["4 Bloques", "Concurrencia", "Paralelismo", "Métricas Cuantitativas", "Python & GIL"],
    qa: [
      { q: "¿Cómo se conectan los 4 bloques?", a: "Van desde la abstracción conceptual del software (concurrencia), a la ejecución física del hardware (paralelismo), la evaluación matemática (rendimiento) y la implementación práctica en código (Python)." }
    ]
  },
  3: {
    persona: "Persona 1 (Integrante 1)",
    time: "1 min",
    badge: "Concurrencia (1:00)",
    guide: "<em>\"Iniciando con el Bloque 1: La <strong>concurrencia</strong> es la capacidad de un sistema para gestionar y avanzar múltiples tareas al <strong>mismo tiempo lógico</strong>, aunque no necesariamente en el mismo instante físico.<br><br>Como vemos en el diagrama, en un sistema de 1 solo núcleo las tareas progresan de forma <strong>intercalada</strong> mediante <strong>time-slicing</strong> y cambios de contexto (context switches). La concurrencia trata sobre la <strong>estructura</strong> del programa para evitar que el CPU quede ocioso durante esperas.\"</em>",
    keyWords: ["Tiempo Lógico", "Progreso Intercalado", "Time-Slicing", "Context Switch", "Estructura"],
    qa: [
      { q: "¿Qué es un context switch y qué costo tiene?", a: "Es el procedimiento del sistema operativo para guardar el estado del hilo actual (registros, PC) y cargar el estado del siguiente. Consume ciclos de reloj (overhead de CPU)." },
      { q: "¿Puede haber concurrencia con 1 solo procesador?", a: "Sí, mediante multiprogramación y time-slicing donde el procesador comparte el tiempo entre múltiples tareas." }
    ]
  },
  4: {
    persona: "Persona 1 (Integrante 1)",
    time: "1 min 30 seg",
    badge: "Analogía Cocina (2:00)",
    guide: "<em>\"Para entenderlo cotidianamente: imaginemos a <strong>1 solo chef</strong> en una cocina. Mientras el agua hierve para la pasta (espera pasiva de I/O), el chef pica verduras (cómputo activo) y supervisa el horno. El chef no tiene 6 brazos para hacer todo al mismo nanosegundo, pero avanza en las 3 tareas sin quedarse de brazos cruzados.<br><br>En un modelo secuencial estricto, el chef se quedaría parado 10 minutos esperando que hierva el agua antes de picar. La concurrencia optimiza la gestión del tiempo y la capacidad de respuesta.\"</em>",
    keyWords: ["1 Chef = 1 CPU", "Espera I/O", "Cómputo Activo", "Progreso Intercalado", "No Bloqueante"],
    qa: [
      { q: "¿En qué se diferencia la concurrencia de la ejecución secuencial?", a: "La secuencial ejecuta tareas una tras otra de forma bloqueante; la concurrente intercala el avance aprovechando los tiempos muertos de espera." }
    ]
  },
  5: {
    persona: "Persona 1 (Integrante 1)",
    time: "1 min 30 seg",
    badge: "Modelos Lógicos (3:30)",
    guide: "<em>\"En la ingeniería de software implementamos la concurrencia mediante 4 modelos arquitectónicos:<br>1) <strong>Hilos (Threads):</strong> comparten el mismo espacio de memoria (livianos pero requieren control de concurrencia);<br>2) <strong>Procesos:</strong> memoria aislada comunicada por IPC (robustos);<br>3) <strong>Modelo de Actores:</strong> no comparten memoria y se comunican enviando mensajes asíncronos;<br>4) <strong>Modelo Reactivo:</strong> asíncrono y no bloqueante guiado por bucles de eventos.<br><br>Ahora que comprendemos la concurrencia lógica, le doy el pase a mi compañero para analizar qué ocurre cuando sumamos múltiples núcleos físicos: el paralelismo.\"</em>",
    keyWords: ["Hilos (Memoria Compartida)", "Procesos & IPC", "Modelo de Actores", "Modelo Reactivo", "Transición a P2"],
    qa: [
      { q: "¿Qué diferencia crítica hay entre un hilo y un proceso?", a: "Los hilos comparten el espacio de direcciones de memoria del proceso padre; los procesos tienen memoria totalmente aislada por el SO." }
    ]
  },
  6: {
    persona: "Persona 2 (Integrante 2)",
    time: "1 min",
    badge: "Paralelismo (4:30)",
    guide: "<em>\"Continuando con el Bloque 2: El <strong>paralelismo</strong> es la ejecución <strong>simultánea física</strong> de múltiples tareas en diferentes unidades de procesamiento (núcleos, sockets de CPU o nodos de cómputo).<br><br>A diferencia de la concurrencia que opera en tiempo lógico, en el paralelismo las operaciones ocurren <strong>exactamente en el mismo instante de tiempo físico t</strong>. Como vemos en el diagrama, un procesador de 4 núcleos ejecuta 4 instrucciones al unísono, reduciendo drásticamente el tiempo de cálculo $T_{par}$.\"</em>",
    keyWords: ["Simultaneidad Física", "Mismo Instante t", "Hardware Multinúcleo (4 Cores)", "Reducción de Latencia"],
    qa: [
      { q: "¿Se puede lograr paralelismo en un CPU mononúcleo?", a: "No, el paralelismo exige físicamente dos o más unidades de cómputo (núcleos, ALUs o procesadores) ejecutando instrucciones al unísono." }
    ]
  },
  7: {
    persona: "Persona 2 (Integrante 2)",
    time: "1 min 30 seg",
    badge: "Regla de Oro (5:30)",
    guide: "<em>\"Llegamos a la regla fundamental de nuestra exposición: <mark><strong>'Todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelismo'</strong></mark>.<br><br>Como resume nuestro cuadro comparativo: la concurrencia trata sobre cómo <strong>estructuramos</strong> un programa para gestionar muchas tareas a la vez (diseño de software); el paralelismo trata sobre la <strong>ejecución física simultánea</strong> en hardware para acelerar el cálculo. 1 núcleo logra concurrencia intercalada; 4 núcleos logran paralelismo físico simultáneo.\"</em>",
    keyWords: ["Regla de Oro", "Estructura vs Ejecución", "Diseño de Software", "Hardware Físico"],
    qa: [
      { q: "¿Puede existir paralelismo sin concurrencia?", a: "No, porque si múltiples tareas se ejecutan en paralelo, el sistema ya las está administrando como tareas en progreso concurrente dentro de su arquitectura." }
    ]
  },
  8: {
    persona: "Persona 2 (Integrante 2)",
    time: "1 min 30 seg",
    badge: "Flynn & Tipos (7:30)",
    guide: "<em>\"Existen dos formas principales de partición: <strong>Paralelismo de Datos</strong>, donde dividimos un conjunto grande de datos y cada núcleo procesa un bloque (base de GPUs y vectores); y <strong>Paralelismo de Tareas</strong>, donde dividimos funciones independientes entre núcleos (pipelines).<br><br>Michael Flynn clasificó las arquitecturas en: <strong>SISD</strong> (secuencial tradicional Von Neumann), <strong>SIMD</strong> (1 sola instrucción aplicada a múltiples datos a la vez, como shaders y AVX) y <strong>MIMD</strong> (múltiples instrucciones sobre múltiples datos, base de procesadores multinúcleo como Intel Core, AMD Ryzen y clusters). Le doy el pase a mi compañero para analizar el rendimiento cuantitativo.\"</em>",
    keyWords: ["Paralelismo de Datos", "Paralelismo de Tareas", "Taxonomía de Flynn", "SISD", "SIMD", "MIMD"],
    qa: [
      { q: "¿Qué diferencia hay entre SIMD y MIMD?", a: "En SIMD todas las unidades ejecutan la misma instrucción sincronizadas sobre datos distintos (ideal para matrices); en MIMD cada núcleo ejecuta código y flujos independientes de forma autónoma." }
    ]
  },
  9: {
    persona: "Persona 3 (Integrante 3)",
    time: "1 min",
    badge: "Métricas (8:30)",
    guide: "<em>\"En el Bloque 3 evaluamos cuantitativamente los sistemas paralelos mediante 4 métricas formales:<br>1) <strong>Tiempos base:</strong> $T_{seq}$ (1 procesador) y $T_{par}$ ($p$ procesadores);<br>2) <strong>Speedup ($S$):</strong> $S = T_{seq} / T_{par}$, que mide cuántas veces más rápido corre el algoritmo;<br>3) <strong>Eficiencia ($E$):</strong> $E = S / p$, que mide el aprovechamiento útil por núcleo;<br>4) <strong>Overhead ($T_{ovh}$):</strong> tiempo perdido en sincronización y comunicación.<br><br>En el gráfico de curvas vemos el Speedup Ideal Lineal ($S=p$), el Real Sublineal por overhead ($S<p$) y el caso <strong>Superlineal ($S>p$)</strong> que ocurre cuando el problema cabe 100% en las memorias caché L2/L3 combinadas.\"</em>",
    keyWords: ["Tseq", "Tpar", "Speedup S", "Eficiencia E", "Overhead Tovh", "Curvas de Rendimiento", "Superlineal"],
    qa: [
      { q: "¿Por qué se produce el Speedup Superlineal (E > 100%)?", a: "Ocurre cuando la suma de memorias caché L2/L3 de todos los núcleos permite alojar todo el dataset en memoria ultrarrápida, eliminando accesos lentos a la memoria RAM principal." }
    ]
  },
  10: {
    persona: "Persona 3 (Integrante 3)",
    time: "1 min 30 seg",
    badge: "Ejemplo Numérico (9:30)",
    guide: "<em>\"Analicemos el caso numérico del curso: Un algoritmo tarda $T_{seq} = 100\\text{ s}$ en secuencial y $T_{par} = 30\\text{ s}$ con $p = 4$ procesadores.<br><br>• Speedup: $S = 100 / 30 = 3.33x$<br>• Eficiencia: $E = 3.33 / 4 = 83.3\\%$<br>• Overhead: $16.7\\%$ ($5.0\\text{ s}$ perdidos en sincronización).<br><br><strong>Interpretación:</strong> Logramos acelerar el programa 3.33 veces aprovechando el 83.3% del hardware. Como vemos en nuestro simulador en tiempo real, podemos ajustar los parámetros en vivo y observar la redistribución de carga por núcleo y el desglose de tiempo ahorrado.\"</em>",
    keyWords: ["Tseq = 100s", "Tpar = 30s", "p = 4 Cores", "S = 3.33x", "E = 83.3%", "Overhead = 16.7%", "Simulador en Vivo"],
    qa: [
      { q: "¿Por qué la eficiencia no fue del 100% (S = 4)?", a: "Debido al costo extra (overhead) de creación de hilos, sincronización con locks, comunicación por el bus y las secciones de código no paralelizables." }
    ]
  },
  11: {
    persona: "Persona 3 (Integrante 3)",
    time: "1 min 30 seg",
    badge: "Ley de Amdahl (11:00)",
    guide: "<em>\"Gene Amdahl demostró que la porción estrictamente secuencial $(1-f)$ impone una cota máxima teórica al Speedup:<br>$$S = \\frac{1}{(1-f) + \\frac{f}{p}}$$<br>Si el 80% del código es paralelizable ($f=0.80$) y usamos 4 procesadores, el Speedup obtenido es $2.50x$. Pero si tuviéramos infinitos núcleos ($p \\to \\infty$), el límite teórico jamás superará $1 / 0.20 = 5.00x$.<br><br>Como muestra la línea roja de asíntota en nuestro gráfico interactivo en tiempo real: ¡el cuello de botella secuencial limita la aceleración máxima posible!\"</em>",
    keyWords: ["Ley de Amdahl", "Fracción f", "Porción Secuencial (1-f)", "Asíntota S_max", "Límite Teórico", "Simulador Amdahl"],
    qa: [
      { q: "¿Qué ocurre si p tiende a infinito en la Ley de Amdahl?", a: "El término f/p se vuelve cero, por lo que el Speedup queda topado estrictamente en S_max = 1 / (1 - f)." }
    ]
  },
  12: {
    persona: "Persona 3 (Integrante 3)",
    time: "1 min",
    badge: "Consistencia (12:00)",
    guide: "<em>\"Para cerrar el bloque teórico: La <strong>Consistencia de Memoria</strong> define las reglas sobre cuándo las escrituras de un núcleo son visibles para las lecturas de los demás.<br><br>1) <strong>Estricta:</strong> lectura instantánea en un reloj físico absoluto (imposible por $\\Delta t > 0$);<br>2) <strong>Secuencial (Leslie Lamport):</strong> todas las CPUs ven el mismo orden global intercalado respetando el Program Order (estándar clásico);<br>3) <strong>Relajada / Débil:</strong> las CPUs modernas (x86, ARM) reordenan operaciones en búferes de escritura para maximizar el throughput, delegando la sincronización al programador mediante <strong>Memory Barriers (FENCE)</strong> y cerrojos (Mutex). Le doy el pase a mi compañero para la implementación práctica en Python.\"</em>",
    keyWords: ["Consistencia de Memoria", "Estricta (Inviable)", "Secuencial (Lamport)", "Relajada (Moderna)", "Memory Barriers", "Transición a P4"],
    qa: [
      { q: "¿Por qué los CPUs modernos usan consistencia relajada?", a: "Porque permite reordenamiento fuera de orden (out-of-order execution) y uso de Store Buffers que aumentan enormemente el rendimiento del hardware." }
    ]
  },
  13: {
    persona: "Persona 4 (Integrante 4)",
    time: "1 min 30 seg",
    badge: "Python Threading (13:00)",
    guide: "<em>\"Iniciando el Bloque 4 de implementación: En Python estándar (CPython), los hilos existen dentro de 1 solo proceso y comparten memoria. Sin embargo, CPython tiene el <strong>GIL (Global Interpreter Lock)</strong>, un cerrojo mutex que previene que múltiples hilos nativos ejecuten bytecode Python simultáneamente para proteger la gestión de memoria por conteo de referencias.<br><br>Por esta razón, el módulo <code>threading</code> es ideal para tareas <strong>I/O Bound</strong> (descargas web, bases de datos), donde los hilos liberan el GIL durante la espera. Como probamos en el simulador en vivo, dos tareas de 2 segundos terminan en solo 2.01 segundos de forma concurrente.\"</em>",
    keyWords: ["Python threading", "GIL (Global Interpreter Lock)", "CPython", "I/O Bound", "time.sleep()", "start() y join()", "Terminal en Vivo"],
    qa: [
      { q: "¿Por qué threading no acelera tareas CPU Bound en Python?", a: "Porque el GIL serializa la ejecución del bytecode Python, forzando a que solo un hilo a la vez ejecute instrucciones en el procesador." }
    ]
  },
  14: {
    persona: "Persona 4 (Integrante 4)",
    time: "1 min 30 seg",
    badge: "Multiprocessing (14:30)",
    guide: "<em>\"Para lograr <strong>paralelismo real</strong> en tareas de cálculo intensivo (<strong>CPU Bound</strong>), Python nos ofrece el módulo <code>multiprocessing</code>.<br><br>A diferencia de los hilos, cada proceso tiene su propio espacio de memoria aislado y su propia instancia del intérprete con su propio GIL. Usando <code>Pool(processes=4).map()</code>, distribuimos una lista de 40 millones de datos entre los 4 núcleos físicos del CPU. Como vemos en el simulador interactivo en vivo, el tiempo se reduce de 4.82 segundos a 1.35 segundos, logrando un <strong>Speedup medido de 3.57x</strong>.\"</em>",
    keyWords: ["multiprocessing", "Pool(4).map()", "CPU Bound", "Paralelismo Real", "Memoria Aislada", "Speedup 3.57x", "Terminal en Vivo"],
    qa: [
      { q: "¿Qué desventaja tiene multiprocessing frente a threading?", a: "Mayor consumo de memoria RAM (cada proceso carga el intérprete) y mayor overhead en la comunicación interproceso (IPC y serialización Pickle)." }
    ]
  },
  15: {
    persona: "Persona 4 / Equipo Completo",
    time: "1 min",
    badge: "Síntesis (15:30)",
    guide: "<em>\"Para sintetizar nuestra exposición, repasamos el Formulario Maestro y las 5 conclusiones del grupo:<br>1) <strong>Concurrencia:</strong> estructura lógica de tareas intercaladas (I/O Bound);<br>2) <strong>Paralelismo:</strong> ejecución física simultánea en 2+ núcleos (CPU Bound);<br>3) <strong>Rendimiento:</strong> evaluado cuantitativamente con Speedup y Eficiencia;<br>4) <strong>Ley de Amdahl:</strong> la porción secuencial $(1-f)$ impone el tope asintótico;<br>5) <strong>Python:</strong> threading para I/O y multiprocessing para cómputo pesado.<br><br>Recordando siempre la Regla de Oro: Todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelismo.\"</em>",
    keyWords: ["5 Conclusiones", "Formulario Maestro", "Speedup", "Eficiencia", "Ley de Amdahl", "Regla de Oro", "Cierre del Grupo"],
    qa: [
      { q: "¿Qué recomendación de diseño general nos deja el tema?", a: "Identificar si el problema es de I/O o de cómputo antes de elegir la tecnología, y minimizar los puntos de sincronización para mantener la eficiencia alta." }
    ]
  },
  16: {
    persona: "Equipo Completo (Defensa)",
    time: "Ronda de Preguntas",
    badge: "Agradecimiento & Q&A (16:00)",
    guide: "<em>\"Agradecemos a la Universidad Nacional del Altiplano - Puno, a la Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas, a la Escuela Profesional de Ingeniería de Sistemas y de manera especial a nuestro docente Dr. Robert Antonio Romero Flores por su atención y orientación en este tema.<br><br>Quedamos a su entera disposición para responder las preguntas del docente y de nuestros compañeros de aula.\"</em>",
    keyWords: ["UNA Puno", "FIMEES • EPIS", "Dr. Robert Romero", "SIS225", "Ronda de Preguntas", "Defensa de Exposición"],
    qa: [
      { q: "¿Por qué no se puede paralelizar todo un programa al 100%?", a: "Porque siempre existen etapas intrínsecamente secuenciales: inicialización de recursos, lectura de entrada/salida y sincronización final de resultados." },
      { q: "¿Qué impacto tiene el hardware en la consistencia de memoria?", a: "Las CPUs modernas priorizan la velocidad reordenando instrucciones en caché, lo que obliga a los compiladores y programadores a insertar Memory Barriers explícitas en código concurrente." }
    ]
  }
};


class PresentationController {
  constructor() {
    this.slides = [];
    this.totalSlides = 0;
    this.currentSlideIndex = 0;
    
    this.timerSeconds = 240;
    this.initialSeconds = 240;
    this.timerInterval = null;
    this.isTimerRunning = false;
    
    this.isLaserActive = false;

    this.init();
  }

  async init() {
    // Si se ejecuta en un servidor local (http/https), carga en caliente los archivos desde slides/
    if (window.location.protocol.startsWith('http')) {
      await this.loadModularSlides();
    }

    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.totalSlides = this.slides.length;

    this.initDOM();
    this.initEventListeners();
    this.goToSlide(0);

    if (window.initAllSimulations) {
      window.initAllSimulations();
    }
  }

  async loadModularSlides() {
    const slideDeck = document.getElementById('slideDeck') || document.querySelector('.slide-deck');
    if (!slideDeck) return;
    try {
      const slidePromises = Array.from({ length: 16 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return fetch(`slides/slide_${num}.html?v=${Date.now()}`).then(res => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.text();
        });
      });
      const slideContents = await Promise.all(slidePromises);
      slideDeck.innerHTML = slideContents.join('\n');
      console.log('✅ 16 diapositivas modulares cargadas en caliente desde slides/');
    } catch (err) {
      console.info('Modo estático activo (usando diapositivas ensambladas):', err.message);
    }
  }

  initDOM() {
    this.progressFill = document.getElementById('progressFill');
    this.slideCounter = document.getElementById('slideCounter');
    this.speakerTag = document.getElementById('speakerTag');
    this.speakerNotesDrawer = document.getElementById('speakerNotesDrawer');
    this.overviewModal = document.getElementById('overviewModal');
    this.overviewGrid = document.getElementById('overviewGrid');
    this.laserDot = document.getElementById('laserDot');
    
    this.timerDisplay = document.getElementById('timerDisplay');
    this.timerToggleBtn = document.getElementById('timerToggleBtn');
    this.timerResetBtn = document.getElementById('timerResetBtn');
    
    this.notesSpeakerName = document.getElementById('notesSpeakerName');
    this.notesTimeBadge = document.getElementById('notesTimeBadge');
    this.notesGuideContent = document.getElementById('notesGuideContent');
    this.notesKeyWords = document.getElementById('notesKeyWords');
    this.notesQAContainer = document.getElementById('notesQAContainer');

    this.buildOverviewGrid();
  }

  buildOverviewGrid() {
    if (!this.overviewGrid) return;
    this.overviewGrid.innerHTML = '';
    
    this.slides.forEach((slide, idx) => {
      const titleElem = slide.querySelector('.slide-title');
      const badgeElem = slide.querySelector('.slide-badge-category');
      const title = titleElem ? titleElem.innerText.replace(/[\n\r]+/g, ' ') : `Diapositiva ${idx + 1}`;
      const badge = badgeElem ? badgeElem.innerText.trim() : 'SIS225';
      
      const thumb = document.createElement('div');
      thumb.className = `overview-thumb ${idx === this.currentSlideIndex ? 'active' : ''}`;
      thumb.onclick = () => {
        this.goToSlide(idx);
        this.toggleOverview(false);
      };

      thumb.innerHTML = `
        <div>
          <span class="thumb-num">SLIDE ${String(idx + 1).padStart(2, '0')}</span>
          <h4 class="thumb-title">${title.substring(0, 40)}${title.length > 40 ? '...' : ''}</h4>
        </div>
        <span class="thumb-speaker">${badge}</span>
      `;
      this.overviewGrid.appendChild(thumb);
    });
  }

  initEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch(e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
        case 'l':
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
        case 'h':
        case 'Backspace':
          this.prevSlide();
          break;
        case 'Home':
          this.goToSlide(0);
          break;
        case 'End':
          this.goToSlide(this.totalSlides - 1);
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          break;
        case 'n':
        case 'N':
          this.toggleNotes();
          break;
        case 'o':
        case 'O':
          this.toggleOverview();
          break;
        case 'Escape':
          this.toggleOverview(false);
          this.toggleNotes(false);
          this.setLaserMode(false);
          break;
        case 't':
        case 'T':
          this.toggleTimer();
          break;
        case 'r':
        case 'R':
          this.resetTimer();
          break;
      }
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 60) {
        if (diffX < 0) this.nextSlide();
        else this.prevSlide();
      }
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      if (this.isLaserActive && this.laserDot) {
        this.laserDot.style.left = `${e.clientX}px`;
        this.laserDot.style.top = `${e.clientY}px`;
      }
    });

    document.getElementById('btnPrevSlide')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('btnNextSlide')?.addEventListener('click', () => this.nextSlide());
    document.getElementById('btnToggleNotes')?.addEventListener('click', () => this.toggleNotes());
    document.getElementById('btnToggleOverview')?.addEventListener('click', () => this.toggleOverview());
    document.getElementById('btnToggleFullscreen')?.addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('btnCloseNotes')?.addEventListener('click', () => this.toggleNotes(false));
    document.getElementById('btnCloseOverview')?.addEventListener('click', () => this.toggleOverview(false));
    
    this.timerToggleBtn?.addEventListener('click', () => this.toggleTimer());
    this.timerResetBtn?.addEventListener('click', () => this.resetTimer());
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;

    this.slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev-slide');
      if (idx < index) {
        slide.classList.add('prev-slide');
      }
    });

    this.currentSlideIndex = index;
    const activeSlide = this.slides[index];
    activeSlide.classList.add('active');

    const progressPercent = ((index + 1) / this.totalSlides) * 100;
    if (this.progressFill) {
      this.progressFill.style.width = `${progressPercent}%`;
    }

    if (this.slideCounter) {
      this.slideCounter.innerText = `${String(index + 1).padStart(2, '0')} / ${String(this.totalSlides).padStart(2, '0')}`;
    }

    const categoryBadge = activeSlide.querySelector('.slide-badge-category');
    if (this.speakerTag && categoryBadge) {
      this.speakerTag.innerText = categoryBadge.innerText.trim();
    }

    this.updateSpeakerNotes(index + 1);

    const thumbs = document.querySelectorAll('.overview-thumb');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });

    if (window.initAllSimulations) {
      window.initAllSimulations();
    }
  }

  nextSlide() {
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.goToSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.goToSlide(this.currentSlideIndex - 1);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  toggleNotes(forceState) {
    const shouldOpen = forceState !== undefined ? forceState : !this.speakerNotesDrawer.classList.contains('open');
    this.speakerNotesDrawer.classList.toggle('open', shouldOpen);
    document.getElementById('btnToggleNotes')?.classList.toggle('active', shouldOpen);
  }

  toggleOverview(forceState) {
    const shouldOpen = forceState !== undefined ? forceState : !this.overviewModal.classList.contains('open');
    this.overviewModal.classList.toggle('open', shouldOpen);
  }

  setLaserMode(active) {
    this.isLaserActive = active;
    document.body.classList.toggle('laser-active', active);
  }

  toggleTimer() {
    if (this.isTimerRunning) {
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      if (this.timerToggleBtn) this.timerToggleBtn.innerText = 'Iniciar';
    } else {
      this.isTimerRunning = true;
      if (this.timerToggleBtn) this.timerToggleBtn.innerText = 'Pausar';
      this.timerInterval = setInterval(() => {
        this.timerSeconds--;
        this.renderTimer();
      }, 1000);
    }
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.timerSeconds = this.initialSeconds;
    if (this.timerToggleBtn) this.timerToggleBtn.innerText = 'Iniciar';
    this.renderTimer();
  }

  renderTimer() {
    if (!this.timerDisplay) return;
    const absSec = Math.abs(this.timerSeconds);
    const mins = Math.floor(absSec / 60);
    const secs = absSec % 60;
    const sign = this.timerSeconds < 0 ? '+ ' : '';
    
    this.timerDisplay.innerText = `${sign}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    this.timerDisplay.classList.remove('warning', 'danger');
    if (this.timerSeconds < 0) {
      this.timerDisplay.classList.add('danger');
    } else if (this.timerSeconds <= 30) {
      this.timerDisplay.classList.add('warning');
    }
  }

  updateSpeakerNotes(slideNum) {
    const data = SPEAKER_NOTES_DB[slideNum] || {
      persona: "Expositor",
      time: "4 min",
      badge: `Diapositiva ${slideNum}`,
      guide: "Exponer de manera clara y pausada los puntos clave mostrados en pantalla.",
      keyWords: ["SIS225", "Computación Paralela"],
      qa: []
    };

    if (this.notesSpeakerName) this.notesSpeakerName.innerText = data.persona;
    if (this.notesTimeBadge) this.notesTimeBadge.innerText = data.time;
    if (this.notesGuideContent) this.notesGuideContent.innerHTML = data.guide;

    if (this.notesKeyWords) {
      this.notesKeyWords.innerHTML = data.keyWords.map(w => 
        `<span style="background: var(--bg-mint); border: 1.5px solid var(--accent-cyan); color: var(--primary-navy); padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700;">${w}</span>`
      ).join(' ');
    }

    if (this.notesQAContainer) {
      if (data.qa && data.qa.length > 0) {
        this.notesQAContainer.innerHTML = data.qa.map(item => `
          <div class="qa-box">
            <div class="qa-question">[Pregunta] ${item.q}</div>
            <div class="qa-answer">[Respuesta] ${item.a}</div>
          </div>
        `).join('');
      } else {
        this.notesQAContainer.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); font-style: italic;">No hay preguntas críticas registradas para esta lámina.</p>`;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.presentation = new PresentationController();
});
