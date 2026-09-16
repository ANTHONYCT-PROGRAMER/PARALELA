# PAGE 1

Universidad Nacional de Ingeniería
F acultad de Ingeniería de Sistemas
Estructura de Exposición
Fundamentos del Paralelismo
y Rendimiento
Curso:Computación Paralela y Distribuida
Código:SIS225
Ciclo:VII
Semestre:2026-II
Docente:Dr. Ing. Robert Antonio Romero Flores
Unidad:Unidad 1 – Semanas 1 y 2
Duración:16 minutos (4 min por persona)
Integrantes:
1. Integrante 1 – Concurrencia
2. Integrante 2 – Paralelismo
3. Integrante 3 – Rendimiento y consistencia
4. Integrante 4 – Ejemplos en Python
15 de septiembre de 2026

---

# PAGE 2

Computación Paralela y Distribuida – SIS225 2026-II
Índice
1. Información General de la Exposición 2
2. PERSONA 1: ¿Qué es concurrencia? 2
2.1. Objetivo de la intervención . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
2.2. Contenido teórico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
2.2.1. Definición de concurrencia . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
2.2.2. Concurrencia vs. secuencialidad . . . . . . . . . . . . . . . . . . . . . . . . 3
2.2.3. Ejemplo cotidiano . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
2.2.4. Concurrencia en computación . . . . . . . . . . . . . . . . . . . . . . . . . 3
2.2.5. Modelos de concurrencia . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
2.3. Preguntas que debe poder responder . . . . . . . . . . . . . . . . . . . . . . . . . 4
2.4. Estructura sugerida de la intervención (4 min) . . . . . . . . . . . . . . . . . . . . 4
3. PERSONA 2: ¿Qué es paralelismo? 4
3.1. Objetivo de la intervención . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
3.2. Contenido teórico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
3.2.1. Definición de paralelismo . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
3.2.2. Diferencia clave: concurrencia vs. paralelismo . . . . . . . . . . . . . . . . 4
3.2.3. Tipos de paralelismo . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
3.2.4. Arquitecturas paralelas . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
3.3. Preguntas que debe poder responder . . . . . . . . . . . . . . . . . . . . . . . . . 5
3.4. Estructura sugerida de la intervención (4 min) . . . . . . . . . . . . . . . . . . . . 5
4. PERSONA 3: Rendimiento y consistencia 6
4.1. Objetivo de la intervención . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
4.2. Contenido teórico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
4.2.1. Métricas de rendimiento . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
4.2.2. Ejemplo numérico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6
4.2.3. Ley de Amdahl . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
4.2.4. Consistencia . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7
4.3. Preguntas que debe poder responder . . . . . . . . . . . . . . . . . . . . . . . . . 7
4.4. Estructura sugerida de la intervención (4 min) . . . . . . . . . . . . . . . . . . . . 7
5. PERSONA 4: Ejemplos en Python 8
5.1. Objetivo de la intervención . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
5.2. Contenido teórico . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8
5.2.1. Diferencia entre threading y multiprocessing . . . . . . . . . . . . . . . . . 8
5.2.2. Ejemplo 1: Concurrencia con threading . . . . . . . . . . . . . . . . . . . . 8
5.2.3. Ejemplo 2: Paralelismo con multiprocessing . . . . . . . . . . . . . . . . . 8
5.2.4. Ejemplo 3: Cálculo de speedup y eficiencia . . . . . . . . . . . . . . . . . . 9
5.2.5. Cierre de la exposición . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
5.3. Preguntas que debe poder responder . . . . . . . . . . . . . . . . . . . . . . . . . 10
5.4. Estructura sugerida de la intervención (4 min) . . . . . . . . . . . . . . . . . . . . 10
6. Resumen de Fórmulas Clave 10
7. Glosario 11
8. Checklist por Persona 11
9. Consejos para la Exposición 12
1

---

# PAGE 3

Computación Paralela y Distribuida – SIS225 2026-II
1. Información General de la Exposición
Datos de la exposición
Tema:Fundamentos del paralelismo y rendimiento.
Semanas del sílabo:Semana 1 y Semana 2 (Unidad 1).
Duración total:16 minutos.
Integrantes:4 personas.
Tiempo por persona:4 minutos.
Objetivo:Comprender la diferencia entre concurrencia y paralelismo, y cómo se mide el
rendimiento en sistemas paralelos.
Semanas del sílabo involucradas
azulUPSemana Tema del sílabo
1 Fundamentos del paralelismo. Rendimiento y consistencia.
2 Rendimiento y consistencia.
Estructura general
azulUPOrden Persona Tema Tiempo
1 Persona 1 ¿Qué es concurrencia? 4 min
2 Persona 2 ¿Qué es paralelismo? 4 min
3 Persona 3 Rendimiento y consistencia 4 min
4 Persona 4 Ejemplos en Python 4 min
2. PERSONA 1: ¿Qué es concurrencia?
2.1 Objetivo de la intervención
Explicar qué es la concurrencia, cómo se diferencia de la secuencialidad y por qué es impor-
tante en sistemas computacionales.
2.2 Contenido teórico
2.2.1 Definición de concurrencia
Definición
Laconcurrenciaes la capacidad de un sistema para ejecutar múltiples tareasal mismo
tiempo lógico, aunque no necesariamente en el mismo instante físico.
Idea clave:las tareas progresan de manera intercalada, compartiendo recursos como el
CPU.
2

---

# PAGE 4

Computación Paralela y Distribuida – SIS225 2026-II
2.2.2 Concurrencia vs. secuencialidad
azulClaroazulUP
Criterio
Secuencial Concurrente
azulClaroEjecución Una tarea tras otra. Varias tareas intercaladas.
azulClaroRecursos Un solo recurso a la vez. Recursos compartidos.
azulClaroEjemplo Un solo hilo ejecutando pasos. Varios hilos turnándose el CPU.
azulClaroVentaja Simplicidad. Mejor uso del CPU.
2.2.3 Ejemplo cotidiano
Ejemplo para exponer
Imagina que estás cocinando y, mientras hierves pasta, cortas verduras y revisas el horno.
No haces las tres cosas exactamente al mismo tiempo, peroavanzas en todassin esperar
a que una termine para empezar la otra.
Eso es concurrencia:progreso intercalado de tareas.
2.2.4 Concurrencia en computación
¿Dónde aparece la concurrencia?
Sistemas operativos: múltiples procesos compitiendo por el CPU.
Servidores web: atender varias peticiones a la vez.
Aplicaciones de escritorio: interfaz gráfica mientras se procesa algo en segundo plano.
Hilos (threads): unidades de ejecución dentro de un proceso.
2.2.5 Modelos de concurrencia
azulClaroazulUP
Modelo
Descripción
azulClaroHilos
(threads)
Comparten memoria dentro de un proceso.
azulClaroProcesos Memoria independiente, comunicación por IPC.
azulClaroActores Cada actor tiene su propio estado y se comunican por mensajes.
azulClaroReactivo Responde a eventos de forma asíncrona.
3

---

# PAGE 5

Computación Paralela y Distribuida – SIS225 2026-II
2.3 Preguntas que debe poder responder
Preguntas clave
1. ¿Qué es la concurrencia?
2. ¿En qué se diferencia de la ejecución secuencial?
3. ¿Qué es un hilo y en qué se diferencia de un proceso?
4. ¿Por qué la concurrencia mejora el uso del CPU?
2.4 Estructura sugerida de la intervención (4 min)
1.(30 s)Presentación del tema y objetivo.
2.(1 min)Definición de concurrencia y comparación con secuencialidad.
3.(1 min)Ejemplo cotidiano (cocina).
4.(1 min)Concurrencia en computación: hilos, procesos, servidores.
5.(30 s)Transición: “Ahora que sabemos qué es concurrencia, veamos qué es paralelismo”.
3. PERSONA 2: ¿Qué es paralelismo?
3.1 Objetivo de la intervención
Explicar qué es el paralelismo, cómo se diferencia de la concurrencia y qué tipos existen.
3.2 Contenido teórico
3.2.1 Definición de paralelismo
Definición
Elparalelismoes la ejecuciónsimultánea físicade múltiples tareas en diferentes unidades
de procesamiento (núcleos, procesadores, nodos).
Idea clave:las tareas se ejecutanexactamente al mismo tiempo, no intercaladas.
3.2.2 Diferencia clave: concurrencia vs. paralelismo
La diferencia más importante de la exposición
Concurrencia:varias tareas progresan intercaladamente. Puede ocurrir en un solo núcleo.
Paralelismo:varias tareas se ejecutan simultáneamente. Requiere múltiples núcleos.
Regla:todo paralelismo implica concurrencia, pero no toda concurrencia implica paralelis-
mo.
4

---

# PAGE 6

Computación Paralela y Distribuida – SIS225 2026-II
azulClaroazulUP
Criterio
Concurrencia Paralelismo
azulClaroEjecución Intercalada. Simultánea.
azulClaroNúcleos Puede ser 1. Requiere 2 o más.
azulClaroObjetivo Mejorar uso del CPU. Reducir tiempo de ejecución.
azulClaroEjemplo Hilos turnándose el CPU. 4 núcleos ejecutando 4 tareas.
3.2.3 Tipos de paralelismo
Tipos de paralelismo
Paralelismo de datos:se dividen los datos y cada núcleo procesa una parte. Ejemplo:
sumar dos vectores.
Paralelismo de tareas:se dividen las operaciones en tareas independientes. Ejemplo: pi-
peline de procesamiento.
Paralelismo de bits:se procesan varios bits a la vez (histórico).
Paralelismo de instrucciones:el hardware ejecuta varias instrucciones simultáneamente
(ILP).
3.2.4 Arquitecturas paralelas
azulClaroazulUP
Arquitectura
Descripción
azulClaroSISD Un solo procesador, una sola instrucción, un solo dato.
azulClaroSIMD Múltiples procesadores, misma instrucción, múltiples datos.
azulClaroMIMD Múltiples procesadores, distintas instrucciones, distintos datos.
3.3 Preguntas que debe poder responder
Preguntas clave
1. ¿Qué es el paralelismo?
2. ¿Cuál es la diferencia entre concurrencia y paralelismo?
3. ¿Qué tipos de paralelismo existen?
4. ¿Qué diferencia hay entre SIMD y MIMD?
3.4 Estructura sugerida de la intervención (4 min)
1.(30 s)Definición de paralelismo.
2.(1 min)Diferencia clave concurrencia vs. paralelismo (con tabla).
3.(1 min)Tipos de paralelismo (datos, tareas, bits, instrucciones).
4.(1 min)Arquitecturas paralelas: SISD, SIMD, MIMD.
5

---

# PAGE 7

Computación Paralela y Distribuida – SIS225 2026-II
5.(30 s)Transición: “Ahora que sabemos qué es paralelismo, veamos cómo medir su rendimien-
to”.
4. PERSONA 3: Rendimiento y consistencia
4.1 Objetivo de la intervención
Explicar cómo se mide el rendimiento en sistemas paralelos (speedup, eficiencia, Ley de
Amdahl) y qué es la consistencia.
4.2 Contenido teórico
4.2.1 Métricas de rendimiento
Métricas fundamentales
Tiempo secuencial (Tseq):tiempo de ejecución con 1 procesador.
Tiempo paralelo (Tpar):tiempo de ejecución conpprocesadores.
Speedup (S):S= Tseq
Tpar
.
Eficiencia (E):E= S
p.
4.2.2 Ejemplo numérico
Ejemplo para exponer
Un programa tarda:
100 segundos en secuencial (Tseq = 100)
30 segundos con 4 procesadores (Tpar = 30,p= 4)
S= 100
30 = 3,33
E= 3,33
4 = 0,83(83%)
Interpretación:se obtuvo un speedup de 3.33x con 4 procesadores, con una eficiencia del
83%. El 17% restante se perdió en overhead.
6

---

# PAGE 8

Computación Paralela y Distribuida – SIS225 2026-II
4.2.3 Ley de Amdahl
Ley de Amdahl
Establece el speedup máximo alcanzable cuando solo una fracciónfdel programa es para-
lelizable:
Smax = 1
(1−f) + f
p
Ejemplo:sif= 0,8yp= 4:
Smax = 1
0,2 + 0,8
4
= 1
0,4 = 2,5
Aunque tengas 4 procesadores, el speedup máximo es 2.5 por el 20% secuencial.
4.2.4 Consistencia
¿Qué es la consistencia?
Laconsistenciase refiere a cómo se garantiza que todos los procesadores vean el mismo
estado de la memoria compartida.
Modelos de consistencia:
Consistencia estricta:cualquier lectura ve la última escritura.
Consistencia secuencial:las operaciones se ven en algún orden secuencial.
Consistencia relajada:se permiten reordenamientos para mejorar el rendimiento.
4.3 Preguntas que debe poder responder
Preguntas clave
1. ¿Cómo se calcula el speedup?
2. ¿Qué es la eficiencia?
3. ¿Qué dice la Ley de Amdahl?
4. ¿Qué es la consistencia de memoria?
5. ¿Por qué no se puede lograr speedup infinito?
4.4 Estructura sugerida de la intervención (4 min)
1.(30 s)Introducción a las métricas de rendimiento.
2.(1 min)Speedup y eficiencia con ejemplo numérico.
3.(1 min)Ley de Amdahl con ejemplo.
4.(1 min)Consistencia de memoria y sus modelos.
5.(30 s)Transición: “Ahora veamos ejemplos prácticos en Python”.
7

---

# PAGE 9

Computación Paralela y Distribuida – SIS225 2026-II
5. PERSONA 4: Ejemplos en Python
5.1 Objetivo de la intervención
Mostrar ejemplos prácticos de concurrencia y paralelismo en Python, y cerrar la exposición.
5.2 Contenido teórico
5.2.1 Diferencia entre threading y multiprocessing
Threading vs. Multiprocessing
threading:concurrencia dentro de un proceso. Comparten memoria. Limitado por el GIL
en Python.
multiprocessing:paralelismo real con múltiples procesos. Memoria independiente. Sin
GIL.
5.2.2 Ejemplo 1: Concurrencia con threading
1import t hre ad in g
2import time
3
4def tarea ( nombre , duracion ) :
5print ( f " Ini ci an do { nombre } " )
6time . sleep ( duracion )
7print ( f " T e r m i n a n d o { nombre } " )
8
9# Crear hilos
10hilo1 = th re ad in g . Thread ( target = tarea , args =( " Tarea 1 " , 2) )
11hilo2 = th re ad in g . Thread ( target = tarea , args =( " Tarea 2 " , 2) )
12
13inicio = time . time ()
14hilo1 . start ()
15hilo2 . start ()
16hilo1 . join ()
17hilo2 . join ()
18fin = time . time ()
19
20print ( f " Tiempo total : { fin - inicio :.2 f } segundos " )
21# Ambas tareas tardan 2 segundos , pero el total es ~2 s
22# porque se ejecutan c o n c u r r e n t e m e n t e
Listing 1: Concurrencia con threading
5.2.3 Ejemplo 2: Paralelismo con multiprocessing
1from m u l t i p r o c e s s i n g import Pool
2import time
3
4def t a r e a _ p e s a d a ( n ) :
5" " " Simula una tarea costosa . " " "
6return sum ( i * i for i in range ( n ) )
7
8if __name__ == " __main__ " :
9datos = [10**6 , 10**6 , 10**6 , 10**6]
10
8

---

# PAGE 10

Computación Paralela y Distribuida – SIS225 2026-II
11# S e c u e n c i a l
12inicio = time . time ()
13r e s u l t a d o s _ s e q = [ t a r e a _ p e s a d a ( n ) for n in datos ]
14t i e m p o _ s e q = time . time () - inicio
15print ( f " S e c u e n c i a l : { t i e m p o _ s e q :.2 f } s " )
16
17# Paralelo
18inicio = time . time ()
19with Pool ( p ro ce ss es =4) as pool :
20r e s u l t a d o s _ p a r = pool . map ( tarea_pesada , datos )
21t i e m p o _ p a r = time . time () - inicio
22print ( f " Paralelo : { t i e m p o _ p a r :.2 f } s " )
23
24# Speedup
25speedup = t i e m p o _ s e q / t i e m p o _ p a r
26print ( f " Speedup : { speedup :.2 f } x " )
Listing 2: Paralelismo con multiprocessing
5.2.4 Ejemplo 3: Cálculo de speedup y eficiencia
1def c a l c u l a r _ m e t r i c a s ( t_seq , t_par , p ) :
2speedup = t_seq / t_par
3e f i c i e n c i a = speedup / p
4print ( f " Speedup : { speedup :.2 f } x " )
5print ( f " E f i c i e n c i a : { e f i c i e n c i a :.2 %} " )
6return speedup , e f i c i e n c i a
7
8# Ejemplo
9c a l c u l a r _ m e t r i c a s ( t_seq =100 , t_par =30 , p =4)
10# Speedup : 3.33 x
11# E f i c i e n c i a : 83.33 %
Listing 3: Cálculo de speedup y eficiencia
5.2.5 Cierre de la exposición
Conclusiones finales
Concurrencia:varias tareas progresan intercaladamente.
Paralelismo:varias tareas se ejecutan simultáneamente.
Rendimiento:se mide con speedup y eficiencia.
Ley de Amdahl:el speedup tiene límites por la parte secuencial.
Python:ofrece threading (concurrencia) y multiprocessing (paralelismo).
9

---

# PAGE 11

Computación Paralela y Distribuida – SIS225 2026-II
5.3 Preguntas que debe poder responder
Preguntas clave
1. ¿Cuándo usar threading y cuándo multiprocessing?
2. ¿Qué es el GIL y cómo afecta?
3. ¿Cómo se mide el speedup en Python?
4. ¿Qué conclusiones sacamos del tema?
5.4 Estructura sugerida de la intervención (4 min)
1.(30 s)Diferencia threading vs. multiprocessing.
2.(1 min)Ejemplo 1: threading (concurrencia).
3.(1 min)Ejemplo 2: multiprocessing (paralelismo).
4.(1 min)Ejemplo 3: cálculo de speedup.
5.(30 s)Conclusiones y cierre.
6. Resumen de Fórmulas Clave
azulClaroazulUP
Métrica
Fórmula
azulClaroSpeedup S= Tseq
Tpar
azulClaroEficiencia E= S
p
azulClaroLeydeAm-
dahl
Smax = 1
(1−f) + f
p
azulClaroOverhead Toverhead =T par − Tseq
p
10

---

# PAGE 12

Computación Paralela y Distribuida – SIS225 2026-II
7. Glosario
azulClaroazulUP
Término
Definición
azulClaroConcurrencia Varias tareas progresan intercaladamente.
azulClaroParalelismo Varias tareas se ejecutan simultáneamente.
azulClaroHilo (th-
read)
Unidad de ejecución dentro de un proceso.
azulClaroProceso Programa en ejecución con memoria independiente.
azulClaroSpeedup Aceleración obtenida.
azulClaroEficiencia Speedup por procesador.
azulClaroLeydeAm-
dahl
Límite del speedup por la parte secuencial.
azulClaroConsistencia Garantía de que todos ven el mismo estado de memoria.
azulClaroGIL Global Interpreter Lock de Python.
azulClaroOverhead Costo adicional por coordinación.
8. Checklist por Persona
Checklist Persona 1 – Concurrencia
□Definir concurrencia.
□Comparar con secuencialidad.
□Explicar ejemplo de la cocina.
□Mencionar hilos y procesos.
Checklist Persona 2 – Paralelismo
□Definir paralelismo.
□Explicar diferencia con concurrencia.
□Mencionar tipos de paralelismo.
□Explicar SISD, SIMD, MIMD.
Checklist Persona 3 – Rendimiento
□Explicar speedup y eficiencia.
□Resolver ejemplo numérico.
□Explicar Ley de Amdahl.
□Explicar consistencia de memoria.
11

---

# PAGE 13

Computación Paralela y Distribuida – SIS225 2026-II
Checklist Persona 4 – Ejemplos en Python
□Diferenciar threading y multiprocessing.
□Dominar el ejemplo de threading.
□Dominar el ejemplo de multiprocessing.
□Explicar el cálculo de speedup.
□Cerrar con conclusiones.
9. Consejos para la Exposición
Recomendaciones
1.Ensayo cronometrado:cada persona debe practicar su parte en 4 minutos.
2.Transiciones claras:cada uno debe enlazar con el siguiente.
3.Ejemplo común:usar el mismo caso (procesar datos) en las 4 intervenciones.
4.Diapositivas visuales:usar diagramas, tablas y código resaltado.
5.Anticipar preguntas:preparar respuestas a las preguntas clave.
6.Cierre conjunto:los 4 integrantes al frente para conclusiones.
Errores que se deben evitar
Leer diapositivas textualmente.
No coordinarse entre integrantes.
Exceder el tiempo asignado.
No dar ejemplos concretos.
No conectar con el proyecto final.
12

---

