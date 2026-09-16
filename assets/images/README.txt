========================================================================
 GUIA DE IMAGENES Y DIAGRAMAS PARA LAS DIAPOSITIVAS (SIS225)
========================================================================

Esta carpeta contiene las imagenes y diagramas vectoriales de alta
definicion utilizados en la presentacion web interactiva. Si deseas
reemplazar alguna imagen por un diagrama propio, foto o captura, guarda
tu archivo con el mismo nombre y extension, o modifica la etiqueta
<img src="..."> en el archivo `index.html`.

DIAGRAMAS INCLUIDOS POR DIAPOSITIVA:
------------------------------------------------------------------------
1. `uni_logo.svg`
   - Diapositiva: 01 (Portada Principal)
   - Descripcion: Emblema y logotipo academico oficial de UNI - FIIS.

2. `cooking_analogy.svg`
   - Diapositiva: 04 (Persona 1: Concurrencia vs Secuencialidad)
   - Descripcion: Ilustracion visual amplia de la analogia del Chef en la cocina (Hervir pasta, picar verduras, revisar horno).

3. `concurrency_models_diagram.svg`
   - Diapositiva: 05 (Persona 1: Modelos de Concurrencia)
   - Descripcion: Diagrama arquitectonico comparativo de Hilos (Memoria compartida), Procesos (Memoria aislada/IPC), Actores (Mensajes) y Modelo Reactivo (Event Loop).

4. `concurrency_cpu.svg`
   - Diapositiva: 07 (Persona 2: La Regla de Oro Concurrencia vs Paralelismo)
   - Descripcion: Diagrama comparativo de 1 Nucleo intercalado (Time-slicing) vs 4 Nucleos simultaneos fisicos.

5. `flynn_taxonomy.svg`
   - Diapositiva: 08 (Persona 2: Taxonomia de Flynn & Arquitecturas)
   - Descripcion: Diagrama hero de SISD, SIMD y MIMD con flujos de instrucciones y datos.

6. `speedup_efficiency_visual.svg`
   - Diapositiva: 10 (Persona 3: Ejemplo Numerico de Speedup y Eficiencia)
   - Descripcion: Diagrama visual de reduccion de tiempo (100s secuencial vs 30s paralelo con 4 CPUs y el 70% de tiempo ahorrado).

7. `speedup_chart.svg`
   - Diapositiva: 11 (Persona 3: Ley de Amdahl & Rendimiento)
   - Descripcion: Grafica vectorial de curvas de aceleracion maxima frente al numero de procesadores segun la fraccion f.

8. `memory_models.svg`
   - Diapositiva: 12 (Persona 3: Modelos de Consistencia de Memoria)
   - Descripcion: Diagrama de memoria compartida para Consistencia Estricta, Secuencial y Relajada.

9. `python_threading_gil.svg`
   - Diapositiva: 13 (Persona 4: Concurrencia con Threading y GIL en Python)
   - Descripcion: Diagrama de arquitectura de 1 proceso con cerrojo mutex GIL e hilos compitiendo.

10. `python_multiprocessing_cores.svg`
    - Diapositiva: 14 (Persona 4: Paralelismo Real con Multiprocessing en 4 Nucleos)
    - Descripcion: Diagrama de 4 procesos independientes en 4 nucleos fisicos sin restriccion del GIL.

CONSEJOS DE FORMATO:
- Se recomiendan formatos SVG, PNG o JPG de alta resolucion con fondo transparente o fondo claro para mantener la armonia con la paleta (#446491, #4B89AC, #ACE6F6, #E4FCF9).
========================================================================
