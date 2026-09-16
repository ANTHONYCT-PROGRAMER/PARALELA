# Guía del Expositor: Fundamentos del Paralelismo y Rendimiento
**Universidad:** Universidad Nacional del Altiplano - Puno (UNA PUNO)  
**Facultad:** Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas (FIMEES)  
**Escuela Profesional:** Ingeniería de Sistemas  
**Curso:** Computación Paralela y Distribuida (SIS225) — 2026-II  
**Docente:** Dr. Ing. Robert Antonio Romero Flores  
**Tiempo Total:** 16 minutos (4 minutos cronometrados por persona)  
**Paleta Oficial:** Navy Profundo (`#446491`), Océano (`#4B89AC`), Cyan (`#ACE6F6`), Menta Glacial (`#E4FCF9`)

---

## 1. Cómo Usar la Presentación Web Interactiva

1. **Abrir la presentación:**  
   Haz doble clic sobre el archivo `index.html` en tu navegador favorito (Chrome, Edge, Firefox, Brave). No requiere instalar nada ni usar internet (funciona 100% offline).
2. **Atajos de Teclado Principales:**
   - **`→` / `Espacio` / `PageDown`:** Siguiente diapositiva.
   - **`←` / `Backspace` / `PageUp`:** Diapositiva anterior.
   - **`N`:** Abrir/Cerrar el **Panel de Notas del Expositor** (guión, cronómetro y preguntas con respuestas).
   - **`O`:** Abrir la **Vista General en Cuadrícula** para saltar a cualquier diapositiva al instante.
   - **`F`:** Modo **Pantalla Completa** para el proyector.
   - **`T`:** Iniciar/Pausar el temporizador de 4 minutos.
   - **`R`:** Reiniciar el temporizador a 04:00.
3. **Widgets Interactivos en Vivo:**
   - **Diapositiva 10:** Puedes mover los sliders o escribir valores en la **Calculadora de Speedup y Eficiencia**.
   - **Diapositiva 11:** Puedes mover el slider de **Fracción Paralelizable (f)** y **Procesadores (p)** para mostrar cómo la Ley de Amdahl frena el Speedup máximo.
   - **Diapositivas 13 y 14:** Botón **`Ejecutar Código`** para simular la ejecución en terminal de Python en vivo con código resaltado de 15px nítido.
4. **Imágenes Personalizadas:**
   - Si deseas agregar o cambiar imágenes, consulta la guía en `assets/images/README.txt`.

---

## 2. Estructura y Guiones de Exposición por Persona (4 min c/u)

---

### PERSONA 1: ¿Qué es Concurrencia? (Diapositivas 03, 04, 05)
**Tiempo Asignado:** Minuto 0:00 a 4:00

#### 1. Guión Paso a Paso:
- **(0:00 - 0:30) Saludo y Objetivo:**  
  *"Buenas tardes profesor Robert Romero y compañeros de la Escuela Profesional de Ingeniería de Sistemas de la UNA Puno. En este primer bloque definiremos qué es la concurrencia, cómo se diferencia de la ejecución secuencial tradicional y por qué es un pilar fundamental en la computación moderna."*
- **(0:30 - 1:30) Definición y Concepto Clave:**  
  *"La concurrencia es la capacidad de un sistema para gestionar múltiples tareas al **mismo tiempo lógico**, aunque no necesariamente en el mismo instante físico. La idea central es que las tareas progresan de manera **intercalada** (time-slicing), alternando el uso del CPU."*
- **(1:30 - 2:30) Analogía de la Cocina (Diapositiva 04):**  
  *"Para entenderlo de forma sencilla: imaginemos a 1 solo chef en la cocina. Mientras el agua hierve para la pasta (espera pasiva de I/O), el chef pica verduras (cómputo activo) y revisa el horno. El chef no tiene 6 brazos para hacer todo al mismo nanosegundo, pero avanza en las 3 tareas sin quedarse de brazos cruzados. Eso es concurrencia: progreso intercalado."*
- **(2:30 - 3:30) Concurrencia en la Computación y Modelos (Diapositiva 05):**  
  *"En la práctica, lo vemos en los sistemas operativos atendiendo múltiples procesos, servidores web manejando miles de peticiones y aplicaciones con interfaces gráficas fluidas. Existen varios modelos: Hilos (memoria compartida), Procesos (memoria aislada con IPC), Actores (paso de mensajes) y Modelo Reactivo (asíncrono por eventos)."*
- **(3:30 - 4:00) Transición a Persona 2:**  
  *"Ahora que entendemos que la concurrencia organiza tareas intercaladas incluso en 1 solo núcleo, le doy el pase a mi compañero para ver qué ocurre cuando tenemos múltiples núcleos ejecutando al unísono: el paralelismo."*

#### 2. Preguntas Clave que Puede Hacer el Docente:
- **P: ¿Qué es un hilo y en qué se diferencia de un proceso?**  
  *R: Un hilo es la unidad básica de ejecución dentro de un proceso y comparte el espacio de memoria y variables con otros hilos del mismo proceso (muy liviano). Un proceso es un programa en ejecución con su propio espacio de memoria aislado e independiente protegido por el sistema operativo.*
- **P: ¿Por qué la concurrencia mejora el uso del CPU si solo hay 1 núcleo?**  
  *R: Porque aprovecha los tiempos muertos y bloqueos de Entrada/Salida (disco, red, base de datos) para ceder el procesador a otra tarea lista para calcular, evitando que el CPU quede ocioso.*

---

### PERSONA 2: ¿Qué es Paralelismo? (Diapositivas 06, 07, 08)
**Tiempo Asignado:** Minuto 4:00 a 8:00

#### 1. Guión Paso a Paso:
- **(4:00 - 4:30) Definición de Paralelismo:**  
  *"Continuando con la exposición, el **paralelismo** es la ejecución **simultánea física** de múltiples tareas en diferentes unidades de procesamiento (núcleos, sockets de CPU, procesadores o nodos). A diferencia de la concurrencia, las tareas se ejecutan **exactamente en el mismo instante de tiempo t**."*
- **(4:30 - 5:30) La Regla de Oro (Diapositiva 07):**  
  *"Aquí llegamos a la regla fundamental de la sesión: **'Todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelismo'**. La concurrencia trata sobre la estructura del programa (manejar muchas tareas a la vez); el paralelismo trata sobre la ejecución física simultánea en hardware con 2 o más núcleos para reducir drásticamente el tiempo de ejecución."*
- **(5:30 - 6:30) Tipos de Paralelismo:**  
  *"Existen principalmente dos formas de dividir el trabajo: **Paralelismo de Datos**, donde se divide una matriz o arreglo grande y cada núcleo procesa un trozo; y **Paralelismo de Tareas**, donde cada núcleo ejecuta una función o algoritmo completamente distinto (como en un pipeline)."*
- **(6:30 - 7:30) Taxonomía de Flynn (Diapositiva 08):**  
  *"Michael Flynn clasificó las arquitecturas según sus flujos de instrucciones y datos:  
  1. **SISD:** 1 instrucción, 1 dato (computador secuencial clásico).  
  2. **SIMD:** 1 sola instrucción aplicada a múltiples datos a la vez (base de GPUs y vectores AVX).  
  3. **MIMD:** Múltiples instrucciones sobre múltiples datos (procesadores multinúcleo modernos como Intel i7/Ryzen y supercomputadoras)."*
- **(7:30 - 8:00) Transición a Persona 3:**  
  *"Ahora que conocemos el hardware y las arquitecturas paralelas, ¿cómo sabemos cuánto ganamos realmente al paralelizar un código? Le doy el pase a mi compañero para analizar las métricas de rendimiento y consistencia."*

#### 2. Preguntas Clave que Puede Hacer el Docente:
- **P: ¿Qué diferencia hay entre SIMD y MIMD?**  
  *R: En SIMD, todas las unidades de procesamiento ejecutan exactamente la misma instrucción al mismo tiempo sobre datos distintos (ideal para operaciones con matrices y gráficos). En MIMD, cada núcleo es autónomo y puede estar ejecutando instrucciones totalmente diferentes sobre datos diferentes (arquitectura de CPUs modernas y clusters).*
- **P: ¿Puede haber paralelismo sin concurrencia?**  
  *R: No, porque al ejecutar múltiples tareas en paralelo en hardware, el sistema obligatoriamente las está administrando como tareas en progreso simultáneo dentro de su ciclo de vida concurrente.*

---

### PERSONA 3: Rendimiento y Consistencia (Diapositivas 09, 10, 11, 12)
**Tiempo Asignado:** Minuto 8:00 a 12:00

#### 1. Guión Paso a Paso:
- **(8:00 - 9:00) Métricas Fundamentales (Diapositiva 09):**  
  *"Para evaluar un sistema paralelo usamos métricas cuantitativas:  
  • Tseq: Tiempo secuencial (1 CPU).  
  • Tpar: Tiempo paralelo con p procesadores.  
  • **Speedup (S):** S = Tseq / Tpar, que mide la aceleración.  
  • **Eficiencia (E):** E = S / p, que mide el porcentaje de aprovechamiento por núcleo."*
- **(9:00 - 10:00) Caso Numérico (Diapositiva 10):**  
  *"Veamos el caso práctico del curso: Un programa tarda 100 s en secuencial y 30 s con 4 procesadores.  
  • S = 100 / 30 = 3.33x.  
  • E = 3.33 / 4 = 0.833 (83.3%).  
  **Interpretación:** Obtuvimos un Speedup de 3.33x aprovechando el 83.3% del hardware. El 16.7% restante se perdió en **Overhead** (costo de crear hilos, comunicar datos y sincronizar)."*
- **(10:00 - 11:00) Ley de Amdahl (Diapositiva 11):**  
  *"Gene Amdahl demostró que el Speedup máximo está limitado por la fracción secuencial (1-f):  
  Smax = 1 / ((1-f) + f/p)  
  Si un programa tiene f = 0.8 (80% paralelizable) y p = 4: Smax = 1 / (0.2 + 0.2) = 2.5x.  
  Incluso si tuviéramos infinitos núcleos (p -> infinito), el Speedup jamás superará 1 / 0.2 = 5.0x. La parte secuencial impone un techo inquebrantable."*
- **(11:00 - 11:30) Consistencia de Memoria (Diapositiva 12):**  
  *"En sistemas de memoria compartida debemos asegurar que todos los núcleos vean datos coherentes. Los modelos van desde la **Consistencia Estricta** (lecturas instantáneas con reloj absoluto, teórica), pasando por la **Consistencia Secuencial** de Leslie Lamport (orden global entrelazado válido), hasta la **Consistencia Relajada** (usada en hardware moderno x86/ARM con barreras de memoria para máxima velocidad)."*
- **(11:30 - 12:00) Transición a Persona 4:**  
  *"Habiendo analizado la base matemática y los límites del paralelismo, veamos cómo se implementa y mide todo esto en código real con Python."*

#### 2. Preguntas Clave que Puede Hacer el Docente:
- **P: ¿Por qué la eficiencia en la práctica casi nunca es del 100%?**  
  *R: Por tres factores: el overhead de comunicación entre procesadores, los tiempos de espera y bloqueos por sincronización (cerrojos/barreras) y la porción de código secuencial que no se puede dividir (Ley de Amdahl).*
- **P: ¿Qué ocurre si p -> infinito en la fórmula de Amdahl?**  
  *R: El término f/p se vuelve 0, por lo que el Speedup queda estrictamente acotado por 1 / (1 - f). Si el 10% del programa es secuencial, el límite máximo es 10x.*

---

### PERSONA 4: Ejemplos en Python y Cierre (Diapositivas 13, 14, 15, 16)
**Tiempo Asignado:** Minuto 12:00 a 16:00

#### 1. Guión Paso a Paso:
- **(12:00 - 13:00) Threading y el GIL en Python (Diapositiva 13):**  
  *"En Python tenemos dos módulos clave. Primero, `threading`: crea hilos dentro de un solo proceso compartiendo memoria. Sin embargo, CPython cuenta con el **GIL (Global Interpreter Lock)**, que restringe la ejecución de bytecode a 1 solo hilo nativo a la vez. Por lo tanto, `threading` es excelente para tareas **I/O Bound** (esperas de red, descargas, base de datos) donde el hilo suelta el GIL al dormir, permitiendo que dos tareas de 2s terminen en ~2s en lugar de 4s."*
- **(13:00 - 14:15) Multiprocessing y Paralelismo Real (Diapositiva 14):**  
  *"Para tareas **CPU Bound** (cálculos matemáticos, procesamiento numérico) usamos `multiprocessing`. Este módulo crea procesos del SO separados, cada uno con su propia memoria y su propio GIL, logrando **paralelismo real** en los 4 núcleos físicos. Con `Pool(4).map()`, dividimos la carga y reducimos el tiempo de 4.82s a 1.35s, logrando un **Speedup real de 3.57x**."*
- **(14:15 - 15:15) Resumen de Fórmulas y 5 Conclusiones (Diapositiva 15):**  
  *"Para resumir nuestra exposición en 5 ideas clave:  
  1. **Concurrencia:** Estructura y avance intercalado (ideal para I/O y servidores).  
  2. **Paralelismo:** Ejecución física simultánea en 2+ núcleos (reduce tiempo de cálculo).  
  3. **Rendimiento:** Se mide cuantitativamente con Speedup y Eficiencia.  
  4. **Ley de Amdahl:** El límite de aceleración está fijado por la porción secuencial.  
  5. **En Python:** Usar `threading` para I/O y `multiprocessing` para CPU."*
- **(15:15 - 16:00) Cierre y Ronda de Preguntas (Diapositiva 16):**  
  *"Con esto concluimos la presentación de los Fundamentos del Paralelismo y Rendimiento para la Escuela Profesional de Ingeniería de Sistemas de la UNA Puno. Quedamos a disposición del Dr. Robert Romero y de la clase para sus preguntas. ¡Muchas gracias!"*

#### 2. Preguntas Clave que Puede Hacer el Docente:
- **P: ¿Por qué `threading` en Python no acelera un bucle de cálculo numérico?**  
  *R: Por el GIL (Global Interpreter Lock), que serializa la ejecución de las instrucciones de Python en un solo núcleo. Aunque haya 4 hilos, compiten por el mismo cerrojo y agregan sobrecosto de context-switching.*
- **P: ¿Qué ventaja tiene `multiprocessing.Pool.map()` frente a crear procesos manualmente?**  
  *R: Administra un grupo de procesos trabajadores reutilizables, divide automáticamente la lista de datos en lotes (*chunksize*) y recolecta los resultados preservando el orden, minimizando el costo de creación de procesos.*

---

## 3. Checklist de Control de la Rúbrica de Evaluación

| Integrante | Tema | Checklist de Puntos Obligatorios |
|---|---|---|
| **Persona 1** | Concurrencia | [ ] Definir concurrencia en tiempo lógico.<br>[ ] Comparar con secuencialidad (tabla).<br>[ ] Explicar analogía de la cocina.<br>[ ] Explicar hilos, procesos y modelos. |
| **Persona 2** | Paralelismo | [ ] Definir paralelismo físico real.<br>[ ] Explicar la Regla de Oro.<br>[ ] Clasificar datos vs tareas.<br>[ ] Explicar SISD, SIMD y MIMD (Flynn). |
| **Persona 3** | Rendimiento | [ ] Fórmulas de Speedup y Eficiencia.<br>[ ] Resolver caso numérico (3.33x, 83%).<br>[ ] Explicar Ley de Amdahl y límite asintótico.<br>[ ] Explicar consistencia de memoria (Lamport). |
| **Persona 4** | Python & Cierre | [ ] Explicar GIL y diferencia con `multiprocessing`.<br>[ ] Demostrar ejemplo de `threading`.<br>[ ] Demostrar ejemplo de `multiprocessing`.<br>[ ] Presentar formulario y 5 conclusiones. |

---
*Documento preparado conforme al sílabo SIS225 - Universidad Nacional del Altiplano - Puno (UNA PUNO).*
