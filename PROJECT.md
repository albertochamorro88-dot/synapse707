# SYNAPSE707 — estado del proyecto

Sitio web one-page de arte distópico IA. Estética terminal/CRT verde fósforo, HUD estilo "OVERRIDE", katakana japonés. Estático puro (HTML/CSS/JS), sin build.

## 🌐 Links en vivo
- **Principal (en bio de IG):** https://synapse707.netlify.app
- Respaldo GitHub Pages: https://albertochamorro88-dot.github.io/synapse707/
- Repo: https://github.com/albertochamorro88-dot/synapse707
- Panel Netlify: https://app.netlify.com/projects/synapse707

## 📁 Dónde está todo
- Código fuente del sitio: `marketing team/synapse707/pages/synapse707/`
- Arte original (MidJourney): `marketing team/synapse707/photo art/`
- Referencias de diseño: `marketing team/synapse707/website references/`
- Imágenes optimizadas del sitio: `pages/synapse707/assets/img/` (art-01..10 + logo.svg)

## 🚀 Cómo publicar cambios (la próxima vez)

### Netlify (link principal) — requiere token nuevo cada vez
```
export NETLIFY_AUTH_TOKEN="<token nuevo de netlify.com/user/applications>"
NETLIFY=~/.npm-global/bin/netlify
cd "marketing team/synapse707/pages/synapse707"
# deploy desde dir limpio (evita que .git confunda al CLI)
rm -rf /tmp/syn_deploy && mkdir -p /tmp/syn_deploy
cp -R index.html css js assets README.md /tmp/syn_deploy/
$NETLIFY deploy --prod --dir /tmp/syn_deploy --site 46f9e832-8f5f-49d4-969b-750779776236
rm -rf /tmp/syn_deploy
```
- Netlify Site ID: `46f9e832-8f5f-49d4-969b-750779776236`
- Cuenta Netlify usada: `betiko198819@gmail.com`
- ⚠️ El token de Netlify NO se guarda (es de un solo uso por seguridad). Genera uno nuevo en
  https://app.netlify.com/user/applications#personal-access-tokens y revócalo al terminar.
- 💡 Para no repetir tokens: en el panel de Netlify se puede conectar el repo de GitHub →
  deploy automático en cada push (pendiente de configurar).

### GitHub (respaldo, ya autenticado con gh CLI)
```
cd "marketing team/synapse707/pages/synapse707"
git add -A && git commit -m "update" && git push origin main
```

## 🎨 Cómo editar
- **Textos:** `index.html` (todo en inglés)
- **Obras de la galería:** array `ART` al inicio de `js/main.js` + poner el `.jpg` en `assets/img/`
- **Colores:** variables `:root` en `css/style.css` (`--lime`, `--green`, `--red`)
- **Logo:** `assets/img/logo.svg` — panel HUD estilo "OVERRIDE", letras finas (no saturadas),
  katakana シナプス (= "synapse"), tags D-707 / LIMITER OFF / COMPLY (non) PH-33
- **Email contacto:** placeholder `hello@synapse707.art` (cambiar por el real)

## ✅ Pendientes / ideas
- [ ] Poner email de contacto real (ahora es placeholder)
- [ ] Nombres reales de las obras (ahora inventados: "Data Monolith", "Black Tide"…)
- [ ] (Opcional) Conectar deploy automático GitHub→Netlify para no usar tokens manuales
- [ ] (Opcional) Dominio propio synapse707.art (~$10/año)
