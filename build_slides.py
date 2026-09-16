import os
import glob
import time
import sys

def build(template_path='template.html', slides_dir='slides', output_path='index.html'):
    if not os.path.exists(template_path):
        print(f"Error: Template '{template_path}' no encontrado.")
        return False
    
    if not os.path.exists(slides_dir):
        print(f"Error: Directorio '{slides_dir}' no encontrado.")
        return False

    with open(template_path, 'r', encoding='utf-8') as tf:
        template_content = tf.read()

    slide_files = sorted(glob.glob(os.path.join(slides_dir, 'slide_*.html')))
    if not slide_files:
        print(f"Advertencia: No se encontraron archivos 'slide_*.html' en '{slides_dir}'.")
        return False

    slides_combined = []
    for sf_path in slide_files:
        with open(sf_path, 'r', encoding='utf-8') as sf:
            slide_content = sf.read().strip()
            slides_combined.append(f"      <!-- {os.path.basename(sf_path)} -->\n      {slide_content}")

    all_slides_html = "\n\n".join(slides_combined)
    final_html = template_content.replace('<!-- SLIDES_PLACEHOLDER -->', all_slides_html)

    with open(output_path, 'w', encoding='utf-8') as out_f:
        out_f.write(final_html)

    print(f"Compilación exitosa: {len(slide_files)} diapositivas ensambladas en '{output_path}'.")
    return True

def watch():
    print("Modo observador (watch) iniciado. Editando diapositivas en 'slides/'...")
    last_mtimes = {}
    while True:
        try:
            slide_files = sorted(glob.glob(os.path.join('slides', '*.html'))) + ['template.html']
            changed = False
            for f in slide_files:
                mtime = os.path.getmtime(f)
                if f not in last_mtimes or last_mtimes[f] != mtime:
                    last_mtimes[f] = mtime
                    changed = True
            
            if changed:
                build()
            
            time.sleep(1)
        except KeyboardInterrupt:
            print("\nObservador detenido.")
            break

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] in ['--watch', '-w']:
        watch()
    else:
        build()
