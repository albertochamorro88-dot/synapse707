# SYNAPSE707 — sitio web

Portfolio one-page estático de arte distópico IA. Estética terminal / CRT / Matrix verde fósforo, tipografía pixel brutalista e interfaces HUD (basado en tus 3 referencias y tu feed @synapse707).

## Cómo verlo

Servidor local (recomendado, las fuentes/imágenes cargan mejor):
```
cd "pages/synapse707"
python3 -m http.server 8777
# abre http://localhost:8777
```
O abre `index.html` directamente en el navegador.

## Estructura
```
synapse707/
├─ index.html         # marcado de todas las secciones
├─ css/style.css      # estilos + animaciones
├─ js/main.js         # lluvia Matrix, boot, glitch, lightbox, reveals
└─ assets/img/        # tu arte optimizado (art-01..10) + logo.png
```

## Secciones
1. Boot — secuencia de arranque tipo terminal ("ACCESS GRANTED").
2. Hero — título glitch SYNAPSE707, HUD, lluvia de código, scanlines.
3. Manifiesto — bloque editorial "ENTER THE VOID".
4. Archivo — galería de 10 piezas con frames HUD + lightbox navegable.
5. Stats — contadores animados.
6. Portal — CTA a Instagram / email.

## Animaciones
Lluvia Matrix (canvas) · boot tipeado · glitch RGB · scanlines + grain CRT · cursor crosshair · texto que se "decodifica" al pasar el mouse · reveal al hacer scroll · contadores · scan en galería · ticker marquee · barra de progreso.

## Editar
- Textos: `index.html`.
- Añadir/quitar obras: edita el array `ART` al inicio de `js/main.js` y pon el `.jpg` en `assets/img/`.
- Colores: variables `:root` en `css/style.css` (`--lime`, `--green`, `--red`…).
- Email de contacto: busca `hello@synapse707.art` en `index.html`.

## Publicar
100% estático: súbelo a Netlify, Vercel, GitHub Pages o Cloudflare Pages (arrastra la carpeta). Sin build ni dependencias.
