# Guía del Expositor: Fundamentos del Paralelismo y Rendimiento
**Universidad:** Universidad Nacional del Altiplano - Puno (UNA PUNO)  
**Facultad:** Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas (FIMEES)  
**Escuela Profesional:** Ingeniería de Sistemas  
**Curso:** Computación Paralela y Distribuida (SIS225) — Semestre 2026-II  
**Docente:** Dr. Ing. Robert Antonio Romero Flores  
**Tiempo Total:** 16 minutos (4 minutos cronometrados por persona)  
**Paleta Oficial:** Navy Profundo (`#446491`), Océano (`#4B89AC`), Cyan (`#ACE6F6`), Menta Glacial (`#E4FCF9`)

---

## 1. Instrucciones de Uso de la Presentación Web

1. **Abrir la presentación:** Doble clic en `index.html` en Chrome, Edge, Firefox o Brave. Funciona 100% offline.
2. **Atajos de Teclado:**
   - **`→` / `Espacio`:** Siguiente diapositiva.
   - **`←` / `Backspace`:** Diapositiva anterior.
   - **`N`:** Abrir/Cerrar el **Panel de Notas del Expositor** con el guión exacto, cronómetro y preguntas del docente.
   - **`O`:** Abrir la **Vista General en Mosaico** para saltar a cualquier diapositiva.
   - **`F`:** Modo **Pantalla Completa** para el proyector.
   - **`T`:** Iniciar/Pausar el temporizador de 4 minutos.
   - **`R`:** Reiniciar el temporizador a 04:00.
3. **Simuladores Interactivos en Vivo:**
   - **Diapositiva 10:** Mover los controles de $T_{seq}$, $T_{par}$ y $p$ para ver la redistribución de carga por núcleo y desglose de tiempo en vivo.
   - **Diapositiva 11:** Mover los controles de $f$ y $p$ para ver cómo la curva y la asíntota de Amdahl se redibujan en tiempo real.
   - **Diapositivas 13 y 14:** Clic en **`Ejecutar Código`** para simular la ejecución en terminal de `threading` y `multiprocessing`.

---

## 2. Guiones Paso a Paso por Diapositiva (Diapositivas 01 a 16)

---

### DIAPOSITIVA 01: Portada Institucional UNA Puno
- **Expositor:** Equipo / Apertura
- **Tiempo sugerido:** 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Buenas tardes Dr. Robert Romero y compañeros. Somos el grupo encargado del tema **'Fundamentos del Paralelismo y Rendimiento'** (Unidad 1, Semanas 1 y 2) del curso SIS225. Nuestra exposición durará exactamente 16 minutos cronometrados, dividida en 4 intervenciones de 4 minutos cada una. Empezaremos explorando los principios de la concurrencia y cómo se diferencia físicamente del paralelismo."*
- **Palabras Clave:** `SIS225`, `Concurrencia`, `Paralelismo`, `Rendimiento`, `Ley de Amdahl`, `Python`.
- **Posible Pregunta del Docente:**
  - *P: ¿Cuál es el objetivo central de la sesión?*  
    *R: Comprender la diferencia formal entre concurrencia y paralelismo, y aprender a medir cuantitativamente la aceleración, eficiencia y límites teóricos en hardware multinúcleo.*

---

### DIAPOSITIVA 02: Agenda y Hoja de Ruta
- **Expositor:** Equipo / Hoja de Ruta
- **Tiempo sugerido:** 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Nuestra hoja de ruta se estructura en 4 bloques complementarios: **Persona 1** abordará la Concurrencia y sus modelos lógicos; **Persona 2** explicará el Paralelismo físico, la Regla de Oro y la Taxonomía de Flynn; **Persona 3** detallará las Métricas Cuantitativas de Rendimiento, la Ley de Amdahl y la Consistencia de Memoria; y **Persona 4** cerrará con la implementación en Python analizando el GIL, Threading y Multiprocessing con simulaciones en vivo."*
- **Palabras Clave:** `4 Bloques`, `Concurrencia`, `Paralelismo`, `Métricas Cuantitativas`, `Python & GIL`.
- **Posible Pregunta del Docente:**
  - *P: ¿Cómo se conectan los 4 bloques?*  
    *R: Van desde la abstracción conceptual del software (concurrencia), a la ejecución física del hardware (paralelismo), la evaluación matemática (rendimiento) y la implementación práctica en código (Python).*

---

### DIAPOSITIVA 03: Persona 1 — ¿Qué es Concurrencia?
- **Expositor:** Persona 1 (Minuto 0:00 a 4:00)
- **Tiempo sugerido:** 1 minuto
- **Guión Exacto (Qué decir):**
  > *"Iniciando con el Bloque 1: La **concurrencia** es la capacidad de un sistema para gestionar y avanzar múltiples tareas al **mismo tiempo lógico**, aunque no necesariamente en el mismo instante físico. Como vemos en el diagrama, en un sistema de 1 solo núcleo las tareas progresan de forma **intercalada** mediante **time-slicing** y cambios de contexto (context switches). La concurrencia trata sobre la **estructura** del programa para evitar que el CPU quede ocioso durante esperas."*
- **Palabras Clave:** `Tiempo Lógico`, `Progreso Intercalado`, `Time-Slicing`, `Context Switch`, `Estructura`.
- **Posible Pregunta del Docente:**
  - *P: ¿Qué es un context switch y qué costo tiene?*  
    *R: Es el procedimiento del sistema operativo para guardar el estado del hilo actual (registros, PC) y cargar el estado del siguiente. Consume ciclos de reloj (overhead de CPU).*
  - *P: ¿Puede haber concurrencia con 1 solo procesador?*  
    *R: Sí, mediante multiprogramación y time-slicing donde el procesador comparte el tiempo entre múltiples tareas.*

---

### DIAPOSITIVA 04: Persona 1 — Analogía de la Cocina
- **Expositor:** Persona 1 (Minuto 0:00 a 4:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Para entenderlo cotidianamente: imaginemos a **1 solo chef** en una cocina. Mientras el agua hierve para la pasta (espera pasiva de I/O), el chef pica verduras (cómputo activo) y supervisa el horno. El chef no tiene 6 brazos para hacer todo al mismo nanosegundo, pero avanza en las 3 tareas sin quedarse de brazos cruzados. En un modelo secuencial estricto, el chef se quedaría parado 10 minutos esperando que hierva el agua antes de picar. La concurrencia optimiza la gestión del tiempo y la capacidad de respuesta."*
- **Palabras Clave:** `1 Chef = 1 CPU`, `Espera I/O`, `Cómputo Activo`, `Progreso Intercalado`, `No Bloqueante`.
- **Posible Pregunta del Docente:**
  - *P: ¿En qué se diferencia la concurrencia de la ejecución secuencial?*  
    *R: La secuencial ejecuta tareas una tras otra de forma bloqueante; la concurrente intercala el avance aprovechando los tiempos muertos de espera.*

---

### DIAPOSITIVA 05: Persona 1 — Modelos de Concurrencia
- **Expositor:** Persona 1 (Minuto 0:00 a 4:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"En la ingeniería de software implementamos la concurrencia mediante 4 modelos arquitectónicos:  
  > 1) **Hilos (Threads):** comparten el mismo espacio de memoria (livianos pero requieren sincronización);  
  > 2) **Procesos:** memoria aislada comunicada por IPC (robustos y protegidos);  
  > 3) **Modelo de Actores:** no comparten memoria y se comunican enviando mensajes asíncronos;  
  > 4) **Modelo Reactivo:** asíncrono y no bloqueante guiado por bucles de eventos (Event Loops).  
  > Ahora que comprendemos la concurrencia lógica, le doy el pase a mi compañero para analizar qué ocurre cuando sumamos múltiples núcleos físicos: el paralelismo."*
- **Palabras Clave:** `Hilos`, `Procesos & IPC`, `Modelo de Actores`, `Modelo Reactivo`, `Transición a P2`.
- **Posible Pregunta del Docente:**
  - *P: ¿Qué diferencia crítica hay entre un hilo y un proceso?*  
    *R: Los hilos comparten el espacio de direcciones de memoria del proceso padre; los procesos tienen memoria totalmente aislada por el SO.*

---

### DIAPOSITIVA 06: Persona 2 — ¿Qué es Paralelismo?
- **Expositor:** Persona 2 (Minuto 4:00 a 8:00)
- **Tiempo sugerido:** 1 minuto
- **Guión Exacto (Qué decir):**
  > *"Continuando con el Bloque 2: El **paralelismo** es la ejecución **simultánea física** de múltiples tareas en diferentes unidades de procesamiento (núcleos, sockets de CPU o nodos de cómputo). A diferencia de la concurrencia que opera en tiempo lógico, en el paralelismo las operaciones ocurren **exactamente en el mismo instante de tiempo físico t**. Como vemos en el diagrama, un procesador de 4 núcleos ejecuta 4 instrucciones al unísono, reduciendo drásticamente el tiempo de cálculo $T_{par}$."*
- **Palabras Clave:** `Simultaneidad Física`, `Mismo Instante t`, `Hardware Multinúcleo (4 Cores)`, `Reducción de Latencia`.
- **Posible Pregunta del Docente:**
  - *P: ¿Se puede lograr paralelismo en un CPU mononúcleo?*  
    *R: No, el paralelismo exige físicamente dos o más unidades de cómputo (núcleos, ALUs o procesadores) ejecutando instrucciones al unísono.*

---

### DIAPOSITIVA 07: Persona 2 — La Regla de Oro
- **Expositor:** Persona 2 (Minuto 4:00 a 8:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Llegamos a la regla fundamental de nuestra exposición: **'Todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelismo'**. Como resume nuestro cuadro comparativo: la concurrencia trata sobre cómo **estructuramos** un programa para gestionar muchas tareas a la vez (diseño de software); el paralelismo trata sobre la **ejecución física simultánea** en hardware para acelerar el cálculo. 1 núcleo logra concurrencia intercalada; 4 núcleos logran paralelismo físico simultáneo."*
- **Palabras Clave:** `Regla de Oro`, `Estructura vs Ejecución`, `Diseño de Software`, `Hardware Físico`.
- **Posible Pregunta del Docente:**
  - *P: ¿Puede existir paralelismo sin concurrencia?*  
    *R: No, porque si múltiples tareas se ejecutan en paralelo, el sistema ya las está administrando como tareas en progreso concurrente dentro de su arquitectura.*

---

### DIAPOSITIVA 08: Persona 2 — Tipos de Paralelismo & Taxonomía de Flynn
- **Expositor:** Persona 2 (Minuto 4:00 a 8:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Existen dos formas principales de partición: **Paralelismo de Datos**, donde dividimos un conjunto grande de datos y cada núcleo procesa un bloque (base de GPUs y vectores); y **Paralelismo de Tareas**, donde dividimos funciones independientes entre núcleos (pipelines). Michael Flynn clasificó las arquitecturas en: **SISD** (secuencial tradicional Von Neumann), **SIMD** (1 sola instrucción aplicada a múltiples datos a la vez, como shaders y AVX) y **MIMD** (múltiples instrucciones sobre múltiples datos, base de procesadores multinúcleo como Intel Core, AMD Ryzen y clusters). Le doy el pase a mi compañero para analizar el rendimiento cuantitativo."*
- **Palabras Clave:** `Paralelismo de Datos`, `Paralelismo de Tareas`, `Taxonomía de Flynn`, `SISD`, `SIMD`, `MIMD`.
- **Posible Pregunta del Docente:**
  - *P: ¿Qué diferencia hay entre SIMD y MIMD?*  
    *R: En SIMD todas las unidades ejecutan la misma instrucción sincronizadas sobre datos distintos (ideal para matrices); en MIMD cada núcleo ejecuta código y flujos independientes de forma autónoma.*

---

### DIAPOSITIVA 09: Persona 3 — Métricas Fundamentales de Rendimiento
- **Expositor:** Persona 3 (Minuto 8:00 a 12:00)
- **Tiempo sugerido:** 1 minuto
- **Guión Exacto (Qué decir):**
  > *"En el Bloque 3 evaluamos cuantitativamente los sistemas paralelos mediante 4 métricas formales: 1) **Tiempos base:** $T_{seq}$ (1 procesador) y $T_{par}$ ($p$ procesadores); 2) **Speedup ($S$):** $S = T_{seq} / T_{par}$, que mide cuántas veces más rápido corre el algoritmo; 3) **Eficiencia ($E$):** $E = S / p$, que mide el aprovechamiento útil por núcleo; 4) **Overhead ($T_{ovh}$):** tiempo perdido en sincronización y comunicación. En el gráfico de curvas vemos el Speedup Ideal Lineal ($S=p$), el Real Sublineal por overhead ($S<p$) y el caso **Superlineal ($S>p$)** que ocurre cuando el problema cabe 100% en las memorias caché L2/L3 combinadas."*
- **Palabras Clave:** `Tseq`, `Tpar`, `Speedup S`, `Eficiencia E`, `Overhead Tovh`, `Curvas de Rendimiento`, `Superlineal`.
- **Posible Pregunta del Docente:**
  - *P: ¿Por qué se produce el Speedup Superlineal (E > 100%)?*  
    *R: Ocurre cuando la suma de memorias caché L2/L3 de todos los núcleos permite alojar todo el dataset en memoria ultrarrápida, eliminando accesos lentos a la memoria RAM principal.*

---

### DIAPOSITIVA 10: Persona 3 — Ejemplo Numérico & Simulación en Vivo
- **Expositor:** Persona 3 (Minuto 8:00 a 12:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Analicemos el caso numérico del curso: Un algoritmo tarda $T_{seq} = 100\text{ s}$ en secuencial y $T_{par} = 30\text{ s}$ con $p = 4$ procesadores.  
  > • Speedup: $S = 100 / 30 = 3.33x$  
  > • Eficiencia: $E = 3.33 / 4 = 83.3\%$  
  > • Overhead: $16.7\%$ ($5.0\text{ s}$ perdidos en sincronización).  
  > **Interpretación:** Logramos acelerar el programa 3.33 veces aprovechando el 83.3% del hardware. Como vemos en nuestro simulador en tiempo real, podemos ajustar los parámetros en vivo y observar la redistribución de carga por núcleo y el desglose de tiempo ahorrado."*
- **Palabras Clave:** `Tseq = 100s`, `Tpar = 30s`, `p = 4 Cores`, `S = 3.33x`, `E = 83.3%`, `Overhead = 16.7%`, `Simulador en Vivo`.
- **Posible Pregunta del Docente:**
  - *P: ¿Por qué la eficiencia no fue del 100% (S = 4)?*  
    *R: Debido al costo extra (overhead) de creación de hilos, sincronización con locks, comunicación por el bus y las secciones de código no paralelizables.*

---

### DIAPOSITIVA 11: Persona 3 — Ley de Amdahl: El Límite del Paralelismo
- **Expositor:** Persona 3 (Minuto 8:00 a 12:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Gene Amdahl demostró que la porción estrictamente secuencial $(1-f)$ impone una cota máxima teórica al Speedup: $S = \frac{1}{(1-f) + f/p}$. Si el 80% del código es paralelizable ($f=0.80$) y usamos 4 procesadores, el Speedup obtenido es $2.50x$. Pero si tuviéramos infinitos núcleos ($p \to \infty$), el límite teórico jamás superará $1 / 0.20 = 5.00x$. Como muestra la línea roja de asíntota en nuestro gráfico interactivo en tiempo real: ¡el cuello de botella secuencial limita la aceleración máxima posible!"*
- **Palabras Clave:** `Ley de Amdahl`, `Fracción f`, `Porción Secuencial (1-f)`, `Asíntota S_max`, `Límite Teórico`, `Simulador Amdahl`.
- **Posible Pregunta del Docente:**
  - *P: ¿Qué ocurre si p tiende a infinito en la Ley de Amdahl?*  
    *R: El término f/p se vuelve cero, por lo que el Speedup queda topado estrictamente en S_max = 1 / (1 - f).*

---

### DIAPOSITIVA 12: Persona 3 — Modelos de Consistencia de Memoria
- **Expositor:** Persona 3 (Minuto 8:00 a 12:00)
- **Tiempo sugerido:** 1 minuto
- **Guión Exacto (Qué decir):**
  > *"Para cerrar el bloque teórico: La **Consistencia de Memoria** define las reglas sobre cuándo las escrituras de un núcleo son visibles para las lecturas de los demás. 1) **Estricta:** lectura instantánea en un reloj físico absoluto (imposible por $\Delta t > 0$); 2) **Secuencial (Leslie Lamport):** todas las CPUs ven el mismo orden global intercalado respetando el Program Order (estándar clásico); 3) **Relajada / Débil:** las CPUs modernas (x86, ARM) reordenan operaciones en búferes de escritura para maximizar el throughput, delegando la sincronización al programador mediante **Memory Barriers (FENCE)** y cerrojos (Mutex). Le doy el pase a mi compañero para la implementación práctica en Python."*
- **Palabras Clave:** `Consistencia de Memoria`, `Estricta (Inviable)`, `Secuencial (Lamport)`, `Relajada (Moderna)`, `Memory Barriers`, `Transición a P4`.
- **Posible Pregunta del Docente:**
  - *P: ¿Por qué los CPUs modernos usan consistencia relajada?*  
    *R: Porque permite reordenamiento fuera de orden (out-of-order execution) y uso de Store Buffers que aumentan enormemente el rendimiento del hardware.*

---

### DIAPOSITIVA 13: Persona 4 — Concurrencia en Python: `threading` & GIL
- **Expositor:** Persona 4 (Minuto 12:00 a 16:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Iniciando el Bloque 4 de implementación: En Python estándar (CPython), los hilos existen dentro de 1 solo proceso y comparten memoria. Sin embargo, CPython tiene el **GIL (Global Interpreter Lock)**, un cerrojo mutex que previene que múltiples hilos nativos ejecuten bytecode Python simultáneamente para proteger la gestión de memoria por conteo de referencias. Por esta razón, el módulo `threading` es ideal para tareas **I/O Bound** (descargas web, bases de datos), donde los hilos liberan el GIL durante la espera. Como probamos en el simulador en vivo, dos tareas de 2 segundos terminan en solo 2.01 segundos de forma concurrente."*
- **Palabras Clave:** `Python threading`, `GIL (Global Interpreter Lock)`, `CPython`, `I/O Bound`, `time.sleep()`, `start() y join()`, `Terminal en Vivo`.
- **Posible Pregunta del Docente:**
  - *P: ¿Por qué threading no acelera tareas CPU Bound en Python?*  
    *R: Porque el GIL serializa la ejecución del bytecode Python, forzando a que solo un hilo a la vez ejecute instrucciones en el procesador.*

---

### DIAPOSITIVA 14: Persona 4 — Paralelismo Real con `multiprocessing`
- **Expositor:** Persona 4 (Minuto 12:00 a 16:00)
- **Tiempo sugerido:** 1 minuto 30 segundos
- **Guión Exacto (Qué decir):**
  > *"Para lograr **paralelismo real** en tareas de cálculo intensivo (**CPU Bound**), Python nos ofrece el módulo `multiprocessing`. A diferencia de los hilos, cada proceso tiene su propio espacio de memoria aislado y su propia instancia del intérprete con su propio GIL. Usando `Pool(processes=4).map()`, distribuimos una lista de 40 millones de datos entre los 4 núcleos físicos del CPU. Como vemos en el simulador interactivo en vivo, el tiempo se reduce de 4.82 segundos a 1.35 segundos, logrando un **Speedup medido de 3.57x**."*
- **Palabras Clave:** `multiprocessing`, `Pool(4).map()`, `CPU Bound`, `Paralelismo Real`, `Memoria Aislada`, `Speedup 3.57x`, `Terminal en Vivo`.
- **Posible Pregunta del Docente:**
  - *P: ¿Qué desventaja tiene multiprocessing frente a threading?*  
    *R: Mayor consumo de memoria RAM (cada proceso carga el intérprete) y mayor overhead en la comunicación interproceso (IPC y serialización Pickle).*

---

### DIAPOSITIVA 15: Persona 4 / Equipo — Resumen de Fórmulas & Conclusiones
- **Expositor:** Persona 4 / Equipo Completo
- **Tiempo sugerido:** 1 minuto
- **Guión Exacto (Qué decir):**
  > *"Para sintetizar nuestra exposición, repasamos el Formulario Maestro y las 5 conclusiones del grupo:  
  > 1) **Concurrencia:** estructura lógica de tareas intercaladas (I/O Bound);  
  > 2) **Paralelismo:** ejecución física simultánea en 2+ núcleos (CPU Bound);  
  > 3) **Rendimiento:** evaluado cuantitativamente con Speedup y Eficiencia;  
  > 4) **Ley de Amdahl:** la porción secuencial $(1-f)$ impone el tope asintótico;  
  > 5) **Python:** threading para I/O y multiprocessing para cómputo pesado.  
  > Recordando siempre la Regla de Oro: Todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelismo."*
- **Palabras Clave:** `5 Conclusiones`, `Formulario Maestro`, `Speedup`, `Eficiencia`, `Ley de Amdahl`, `Regla de Oro`, `Cierre del Grupo`.
- **Posible Pregunta del Docente:**
  - *P: ¿Qué recomendación de diseño general nos deja el tema?*  
    *R: Identificar si el problema es de I/O o de cómputo antes de elegir la tecnología, y minimizar los puntos de sincronización para mantener la eficiencia alta.*

---

### DIAPOSITIVA 16: Equipo Completo — Cierre Institucional & Ronda de Preguntas
- **Expositor:** Equipo Completo (Defensa)
- **Tiempo sugerido:** Ronda de Preguntas
- **Guión Exacto (Qué decir):**
  > *"Agradecemos a la Universidad Nacional del Altiplano - Puno, a la Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas, a la Escuela Profesional de Ingeniería de Sistemas y de manera especial a nuestro docente Dr. Robert Antonio Romero Flores por su atención y orientación en este tema. Quedamos a su entera disposición para responder las preguntas del docente y de nuestros compañeros de aula."*
- **Palabras Clave:** `UNA Puno`, `FIMEES • EPIS`, `Dr. Robert Romero`, `SIS225`, `Ronda de Preguntas`, `Defensa de Exposición`.
- **Posible Pregunta del Docente:**
  - *P: ¿Por qué no se puede paralelizar todo un programa al 100%?*  
    *R: Porque siempre existen etapas intrínsecamente secuenciales: inicialización de recursos, lectura de entrada/salida y sincronización final de resultados.*
  - *P: ¿Qué impacto tiene el hardware en la consistencia de memoria?*  
    *R: Las CPUs modernas priorizan la velocidad reordenando instrucciones en caché, lo que obliga a los compiladores y programadores a insertar Memory Barriers explícitas en código concurrente.*

---

## 3. Matriz de Control y Rúbrica de Exposición

| Integrante | Rol | Diapositivas | Minuto | Checklist Obligatorio |
|---|---|---|---|---|
| **Persona 1** | Fundamentos Concurrencia | 03, 04, 05 | 0:00 - 4:00 | [ ] Definir tiempo lógico e intercalado.<br>[ ] Analogía del chef y tiempos de espera I/O.<br>[ ] Explicar los 4 modelos (hilos, procesos, actores, reactivo). |
| **Persona 2** | Paralelismo y Arquitecturas | 06, 07, 08 | 4:00 - 8:00 | [ ] Definir simultaneidad física en instante $t$.<br>[ ] Explicar la Regla de Oro.<br>[ ] Taxonomía de Flynn (SISD, SIMD, MIMD). |
| **Persona 3** | Rendimiento y Consistencia | 09, 10, 11, 12 | 8:00 - 12:00 | [ ] Explicar Speedup, Eficiencia y Overhead.<br>[ ] Demostrar caso numérico (3.33x, 83.3%) en simulador.<br>[ ] Explicar Ley de Amdahl y límite asintótico en gráfico.<br>[ ] Modelos de consistencia (Estricta, Lamport, Relajada). |
| **Persona 4** | Implementación y Cierre | 13, 14, 15, 16 | 12:00 - 16:00 | [ ] Explicar el GIL y ejecutar demo `threading`.<br>[ ] Explicar `multiprocessing.Pool` y ejecutar demo en vivo.<br>[ ] Sintetizar formulario y 5 conclusiones.<br>[ ] Apertura de ronda de preguntas institucional. |

---
*Documento oficial de defensa académica — SIS225: Computación Paralela y Distribuida — UNA Puno.*
