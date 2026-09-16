# Computación Paralela y Distribuida (SIS225)
## Unidad 1: Fundamentos del Paralelismo y Rendimiento

**Universidad Nacional del Altiplano - Puno (UNA PUNO)**  
**Facultad de Ingeniería Mecánica Eléctrica, Electrónica y Sistemas (FIMEES)**  
**Escuela Profesional de Ingeniería de Sistemas**  
**Docente:** Dr. Ing. Robert Antonio Romero Flores  
**Ciclo:** VII • 2026-II  

---

## Descripción del Proyecto

Presentación interactiva y material académico de alta definición para la **Unidad 1 (Semanas 1 y 2)** del curso de Computación Paralela y Distribuida. El proyecto está diseñado con arquitectura modular, diagramas vectoriales SVG personalizados, simulador de Speedup en vivo y panel interactivo con notas para el expositor.

---

## Estructura Modular del Proyecto

```
03_Proyectos_y_Codigo/
│
├── index.html                   # Contenedor maestro de la presentación
├── template.html                # Plantilla base (Header institucional, navegación y modales)
├── build_slides.py              # Compilador y observador automático de diapositivas
├── Guia_Expositor.md            # Guion detallado de 16 minutos y preguntas tipo examen
│
├── slides/                      # 16 Diapositivas independientes
│   ├── slide_01.html            # Portada Institucional UNA Puno
│   ├── slide_02.html            # Agenda y Hoja de Ruta (4 Bloques)
│   ├── slide_03.html            # P1: ¿Qué es Concurrencia? (3 Principios)
│   ├── slide_04.html            # P1: Analogía de la Cocina (Chef, I/O y Time-Slicing)
│   ├── slide_05.html            # P1: Modelos de Concurrencia (Hilos, IPC, Actores, Reactivo)
│   ├── slide_06.html            # P2: ¿Qué es Paralelismo? (Hardware 4 Cores y Speedup)
│   ├── slide_07.html            # P2: La Regla de Oro (Concurrencia vs Paralelismo)
│   ├── slide_08.html            # P2: Tipos de Paralelismo & Taxonomía de Flynn
│   ├── slide_09.html            # P3: Métricas de Rendimiento (Speedup y Eficiencia)
│   ├── slide_10.html            # P3: Caso Numérico Práctico (3.33x, 83.3%)
│   ├── slide_11.html            # P3: Ley de Amdahl y Límite Teórico
│   ├── slide_12.html            # P3: Consistencia y Modelos de Memoria
│   ├── slide_13.html            # P4: Concurrencia y Paralelismo en Python (GIL)
│   ├── slide_14.html            # P4: Demostración Interactiva en Vivo (Simulador)
│   ├── slide_15.html            # P4: Síntesis Ejecutiva & 5 Conclusiones
│   └── slide_16.html            # Cierre Institucional & Preguntas Frecuentes
│
├── css/
│   └── styles.css               # Sistema de diseño con paleta UNA Puno
├── js/
│   ├── slides.js                # Motor de presentación + cargador modular
│   └── interactive.js           # Simulador interactivo en tiempo real
└── assets/
    └── images/                  # Diagramas vectoriales SVG y logo oficial
```

---

## 🚀 Ejecución y Uso

### 1. Visualización Local
Para abrir la presentación con recarga en caliente de diapositivas:
```bash
python -m http.server 8000
```
Luego abre tu navegador en `http://localhost:8000`.

### 2. Edición Modular
Puedes modificar cualquier archivo individual en `slides/slide_XX.html`. Al recargar el navegador (`F5`), los cambios se reflejarán inmediatamente.

Para compilar todas las diapositivas en un único archivo `index.html`:
```bash
python build_slides.py
```
O en modo observador continuo:
```bash
python build_slides.py --watch
```

---

## Atajos de Teclado
- **`←` / `→`**: Navegar entre diapositivas.
- **`F`**: Pantalla completa.
- **`N`**: Abrir panel de notas del expositor (guion y cronómetro de 4 min).
- **`O`**: Vista general en mosaico de las 16 diapositivas.
- **`Ctrl + P`**: Imprimir o exportar a formato PDF.
