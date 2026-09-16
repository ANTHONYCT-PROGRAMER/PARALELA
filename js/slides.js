/**
 * SIS225: Computación Paralela y Distribuida
 * Motor de Diapositivas e Interactividad - Sin Emojis (Iconos Vectoriales)
 * Paleta de Colores: #446491, #4B89AC, #ACE6F6, #E4FCF9
 */

const SPEAKER_NOTES_DB = {
  1: {
    persona: "General / Portada",
    time: "30 seg",
    badge: "Inicio",
    guide: "Saludar cordialmente al Dr. Robert Romero y compañeros. Presentar el tema <strong>'Fundamentos del Paralelismo y Rendimiento'</strong> (Unidad 1, Semanas 1 y 2). Indicar que la exposición durará 16 minutos dividida exactamente en 4 intervenciones de 4 minutos cada una.",
    keyWords: ["SIS225", "Concurrencia", "Paralelismo", "Rendimiento", "Consistencia", "Python"],
    qa: [
      { q: "¿Cuál es el objetivo principal del tema?", a: "Comprender la diferencia fundamental entre concurrencia y paralelismo, y aprender a medir el rendimiento en arquitecturas paralelas." }
    ]
  },
  2: {
    persona: "General / Agenda",
    time: "30 seg",
    badge: "Estructura",
    guide: "Explicar brevemente el hilo conductor: Persona 1 iniciará con los conceptos de concurrencia y modelos lógicos; Persona 2 profundizará en la simultaneidad física del paralelismo y taxonomía de Flynn; Persona 3 detallará las fórmulas de Speedup, Amdahl y consistencia; y Persona 4 cerrará con casos prácticos en Python.",
    keyWords: ["4 Bloques", "Flujo Teórico", "Demostración Práctica"],
    qa: [
      { q: "¿Cómo se conectan los 4 temas?", a: "Van de lo conceptual (concurrencia) a lo físico (paralelismo), luego a la medición matemática (rendimiento) y finalmente a la implementación en código (Python)." }
    ]
  },
  3: {
    persona: "Persona 1 (Integrante 1)",
    time: "4 min (P1)",
    badge: "Concurrencia",
    guide: "<strong>(0:00 - 1:00)</strong> Definir concurrencia: <em>'Capacidad de un sistema para ejecutar múltiples tareas al mismo tiempo lógico, aunque no necesariamente en el mismo instante físico'</em>.<br><br><strong>Idea clave:</strong> Las tareas progresan de manera intercalada compartiendo el procesador (time-slicing).",
    keyWords: ["Tiempo lógico", "Progreso intercalado", "Compartir recursos", "Context Switch"],
    qa: [
      { q: "¿Qué es la concurrencia?", a: "Es la composición y gestión de múltiples tareas que progresan de forma intercalada en el tiempo lógico." },
      { q: "¿Por qué mejora el uso del CPU?", a: "Porque aprovecha los tiempos muertos y esperas de I/O para avanzar otras tareas en lugar de dejar el procesador ocioso." }
    ]
  },
  4: {
    persona: "Persona 1 (Integrante 1)",
    time: "4 min (P1)",
    badge: "Analogía Cocina",
    guide: "<strong>(1:00 - 2:30)</strong> Explicar el ejemplo cotidiano: <em>'Imagina un solo chef cocinando. Mientras hierve la pasta (espera I/O), pica verduras (cómputo activo) y revisa el horno. No hace las 3 cosas al mismo nanosegundo, pero avanza en todas sin bloquearse'</em>. Comparar con la secuencialidad donde esperaría a hervir la pasta para recién picar.",
    keyWords: ["1 Chef = 1 CPU", "Intercalado de atención", "Secuencial vs Concurrente"],
    qa: [
      { q: "¿En qué se diferencia de la ejecución secuencial?", a: "La secuencial ejecuta una tras otra de forma bloqueante; la concurrente intercala el avance optimizando tiempos de espera." }
    ]
  },
  5: {
    persona: "Persona 1 (Integrante 1)",
    time: "4 min (P1)",
    badge: "Modelos",
    guide: "<strong>(2:30 - 4:00)</strong> Explicar dónde se aplica: Sistemas operativos (procesos compitiendo), servidores web (atender miles de peticiones), GUIs (interfaz fluida mientras se descarga algo).<br><br><strong>Modelos:</strong> Hilos (memoria compartida), Procesos (memoria aislada, IPC), Actores (mensajes), Reactivo (eventos).<br><em>Transición: 'Ahora que sabemos qué es concurrencia, veamos qué es el paralelismo real'.</em>",
    keyWords: ["Hilos vs Procesos", "Servidores Web", "Modelo de Actores", "IPC"],
    qa: [
      { q: "¿Qué es un hilo y en qué se diferencia de un proceso?", a: "Un hilo es la unidad mínima de ejecución dentro de un proceso y comparte memoria; un proceso tiene su propio espacio de memoria aislado." }
    ]
  },
  6: {
    persona: "Persona 2 (Integrante 2)",
    time: "4 min (P2)",
    badge: "Paralelismo",
    guide: "<strong>(0:00 - 1:00)</strong> Definir paralelismo: <em>'Ejecución simultánea física de múltiples tareas en diferentes unidades de procesamiento (núcleos, procesadores o nodos de cómputo)'</em>.<br><br><strong>Idea clave:</strong> Ocurre exactamente en el mismo instante de tiempo t. Requiere obligatoriamente 2 o más núcleos.",
    keyWords: ["Simultaneidad física", "Múltiples núcleos", "Mismo instante t"],
    qa: [
      { q: "¿Qué es el paralelismo?", a: "Es la ejecución física real de dos o más instrucciones exactamente al mismo instante en distintos núcleos de cómputo." }
    ]
  },
  7: {
    persona: "Persona 2 (Integrante 2)",
    time: "4 min (P2)",
    badge: "Regla de Oro",
    guide: "<strong>(1:00 - 2:30)</strong> Enfatizar la Regla de Oro: <mark>'Todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelismo'</mark>.<br><br>Mostrar la tabla y el diagrama: 1 núcleo hace concurrencia intercalada; 4 núcleos hacen paralelismo físico simultáneo para reducir drásticamente el tiempo de ejecución.",
    keyWords: ["Regla de Oro", "Concurrencia = Estructura", "Paralelismo = Ejecución física"],
    qa: [
      { q: "¿Cuál es la diferencia clave entre concurrencia y paralelismo?", a: "La concurrencia es cómo estructuramos el avance de tareas intercaladas (puede ser 1 núcleo); el paralelismo es la ejecución física simultánea en múltiples núcleos." }
    ]
  },
  8: {
    persona: "Persona 2 (Integrante 2)",
    time: "4 min (P2)",
    badge: "Flynn & Tipos",
    guide: "<strong>(2:30 - 4:00)</strong> Explicar Tipos de paralelismo: <em>Datos</em> (dividir arreglos/matrices) y <em>Tareas</em> (operaciones distintas).<br><br><strong>Taxonomía de Flynn:</strong> SISD (secuencial tradicional), SIMD (GPUs, operaciones vectoriales como AVX), MIMD (CPUs multinúcleo modernos y clusters de servidores).<br><em>Transición: 'Ahora veamos cómo medir el rendimiento de estos sistemas paralelos'.</em>",
    keyWords: ["Paralelismo de Datos", "Paralelismo de Tareas", "SISD", "SIMD", "MIMD"],
    qa: [
      { q: "¿Qué diferencia hay entre SIMD y MIMD?", a: "SIMD aplica una sola instrucción a múltiples datos a la vez (ideal para GPUs y matrices); MIMD ejecuta múltiples instrucciones diferentes sobre distintos datos de forma autónoma (CPUs multinúcleo)." }
    ]
  },
  9: {
    persona: "Persona 3 (Integrante 3)",
    time: "4 min (P3)",
    badge: "Métricas",
    guide: "<strong>(0:00 - 1:00)</strong> Presentar las métricas fundamentales:<br>• Tseq: Tiempo secuencial con 1 procesador.<br>• Tpar: Tiempo paralelo con p procesadores.<br>• <strong>Speedup (S):</strong> S = Tseq / Tpar (aceleración obtenida).<br>• <strong>Eficiencia (E):</strong> E = S / p (fracción de aprovechamiento por procesador).",
    keyWords: ["Tseq", "Tpar", "Speedup S", "Eficiencia E", "Overhead"],
    qa: [
      { q: "¿Cómo se calcula el speedup?", a: "Dividiendo el tiempo secuencial entre el tiempo paralelo: S = Tseq / Tpar." },
      { q: "¿Qué representa la eficiencia?", a: "Representa el porcentaje de uso efectivo de cada procesador: E = S / p. Si es 1.0 (100%), el paralelismo es ideal y lineal." }
    ]
  },
  10: {
    persona: "Persona 3 (Integrante 3)",
    time: "4 min (P3)",
    badge: "Ejemplo Numérico",
    guide: "<strong>(1:00 - 2:00)</strong> Resolver el caso numérico del silabo:<br>• Tseq = 100 s, Tpar = 30 s con p = 4 procesadores.<br>• S = 100 / 30 = 3.33x<br>• E = 3.33 / 4 = 0.83 (83.3%)<br>• <strong>Interpretación:</strong> El 83.3% del poder de los 4 núcleos se aprovechó; el 16.7% restante se perdió en <em>Overhead</em> (comunicación, sincronización, creación de hilos).",
    keyWords: ["S = 3.33x", "E = 83%", "17% Overhead", "Sincronización"],
    qa: [
      { q: "¿Por qué la eficiencia no fue del 100% (S=4)?", a: "Por el overhead de coordinación, sincronización entre hilos y la parte de código que no se pudo paralelizar." }
    ]
  },
  11: {
    persona: "Persona 3 (Integrante 3)",
    time: "4 min (P3)",
    badge: "Ley de Amdahl",
    guide: "<strong>(2:00 - 3:00)</strong> Explicar la Ley de Amdahl: Smax = 1 / ((1-f) + f/p), donde f es la fracción paralelizable.<br><br><strong>Ejemplo clave:</strong> Si f = 0.8 (80% paralelizable) y p = 4: Smax = 1 / (0.2 + 0.8/4) = 2.5x.<br>Aunque tengamos infinitos procesadores (p -> infinito), el speedup máximo jamás pasará de 1 / 0.2 = 5x.",
    keyWords: ["Fracción f", "Límite superior", "Cuello de botella secuencial", "S_max"],
    qa: [
      { q: "¿Por qué no se puede lograr Speedup infinito?", a: "Por la Ley de Amdahl: la parte estrictamente secuencial (1-f) impone una asíntota máxima infranqueable, sin importar cuántos procesadores agreguemos." }
    ]
  },
  12: {
    persona: "Persona 3 (Integrante 3)",
    time: "4 min (P3)",
    badge: "Consistencia",
    guide: "<strong>(3:00 - 4:00)</strong> Consistencia de Memoria: ¿Cómo garantizamos que todos los procesadores vean un estado coherente de las variables compartidas?<br><br>• <strong>Estricta:</strong> Lecturas instantáneas (reloj físico único, utópica).<br>• <strong>Secuencial:</strong> Orden global válido (Leslie Lamport).<br>• <strong>Relajada:</strong> Reordenamiento de hardware con barreras/locks para máxima velocidad.<br><em>Transición: 'Ahora veamos cómo se implementa esto en Python'.</em>",
    keyWords: ["Memoria Compartida", "Lamport", "Consistencia Secuencial", "Memory Barriers"],
    qa: [
      { q: "¿Qué es la consistencia de memoria?", a: "Es el modelo de reglas que define en qué orden y cuándo las escrituras en memoria realizadas por un procesador son visibles para los demás." }
    ]
  },
  13: {
    persona: "Persona 4 (Integrante 4)",
    time: "4 min (P4)",
    badge: "Python Threading",
    guide: "<strong>(0:00 - 1:30)</strong> Explicar threading en Python:<br>• Ocurre dentro de 1 solo proceso.<br>• <strong>GIL (Global Interpreter Lock):</strong> Permite que solo 1 hilo ejecute bytecode Python a la vez.<br>• <strong>Uso ideal:</strong> Tareas I/O Bound (descargas web, base de datos). En el ejemplo, 2 tareas de 2s terminan en ~2s en lugar de 4s porque esperan I/O concurrentemente.",
    keyWords: ["threading", "GIL", "I/O Bound", "time.sleep", "join()"],
    qa: [
      { q: "¿Qué es el GIL y cómo afecta?", a: "El Global Interpreter Lock es un mutex en CPython que evita que múltiples hilos nativos ejecuten código Python simultáneamente en distintos núcleos." },
      { q: "¿Cuándo conviene usar threading?", a: "Cuando el cuello de botella es de entrada/salida (red, disco, APIs) y los hilos liberan el GIL durante la espera." }
    ]
  },
  14: {
    persona: "Persona 4 (Integrante 4)",
    time: "4 min (P4)",
    badge: "Python Multiprocessing",
    guide: "<strong>(1:30 - 3:00)</strong> Explicar multiprocessing:<br>• Crea procesos separados con su propia memoria y su propio GIL.<br>• Logra <strong>paralelismo real</strong> en los 4 núcleos del CPU.<br>• <strong>Uso ideal:</strong> CPU Bound (cálculos matemáticos, sumas de cuadrados).<br>• Mostrar cómo Pool(4).map() divide la lista de datos y reduce el tiempo a casi una cuarta parte, logrando Speedup real.",
    keyWords: ["multiprocessing", "Pool(4)", "CPU Bound", "Paralelismo real", "Speedup medido"],
    qa: [
      { q: "¿Cuándo usar multiprocessing?", a: "Para tareas CPU Bound pesadas (cómputo numérico, procesamiento de imágenes, simulaciones) que necesitan aprovechar todos los núcleos físicos." }
    ]
  },
  15: {
    persona: "Persona 4 / Equipo Completo",
    time: "4 min (P4)",
    badge: "Fórmulas & Cierre",
    guide: "<strong>(3:00 - 4:00)</strong> Resumir los 5 aprendizajes clave de la exposición:<br>1. Concurrencia = gestión intercalada de tareas.<br>2. Paralelismo = ejecución simultánea en múltiples núcleos.<br>3. Speedup y Eficiencia miden la ganancia real.<br>4. La Ley de Amdahl fija el techo de aceleración.<br>5. En Python: threading para I/O, multiprocessing para CPU.<br>Dar paso a las preguntas del docente y del aula.",
    keyWords: ["5 Conclusiones", "Resumen de Fórmulas", "Cierre del Grupo"],
    qa: [
      { q: "¿Qué conclusiones generales nos deja el tema?", a: "Que el paralelismo no es automático: requiere hardware adecuado, algoritmos divisibles y control de overhead para obtener eficiencia real." }
    ]
  },
  16: {
    persona: "Equipo Completo (Q&A)",
    time: "Ronda Final",
    badge: "Preguntas Frecuentes",
    guide: "Mantener esta diapositiva proyectada durante la ronda de preguntas. Contiene las respuestas preparadas a las 4 preguntas de la rúbrica para responder con seguridad ante el profesor Dr. Romero.",
    keyWords: ["Preguntas Docente", "Defensa de Exposición", "Respuestas Clave"],
    qa: [
      { q: "¿Puede haber paralelismo sin concurrencia?", a: "No, porque si estás ejecutando tareas en paralelo, el sistema ya las está gestionando de forma concurrente en su ciclo de vida." },
      { q: "¿Qué pasa si p tiende a infinito en la Ley de Amdahl?", a: "El término f/p se vuelve 0, por lo que el Speedup máximo queda estrictamente limitado a 1 / (1 - f)." }
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
