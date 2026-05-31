/* ============================================================
   SYNAPSE707 — interactions
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- GALLERY DATA ---------- */
  const ART = [
    { src: "art-01.jpg", code: "ARCHIVE_001", name: "DATA MONOLITH",  meta: "PROTOCOL: COLLAPSE // SECTOR 07", span: "span8" },
    { src: "art-06.jpg", code: "ARCHIVE_002", name: "THE NEST",       meta: "PROTOCOL: REM_SLEEP // NODE 02", span: "span4" },
    { src: "art-07.jpg", code: "ARCHIVE_003", name: "BLACK TIDE",     meta: "PROTOCOL: FLOOD // SECTOR 11", span: "span4" },
    { src: "art-03.jpg", code: "ARCHIVE_004", name: "VERTICAL DECAY", meta: "PROTOCOL: COLLAPSE // SECTOR 03", span: "span4" },
    { src: "art-09.jpg", code: "ARCHIVE_005", name: "SIGNAL LOSS",    meta: "PROTOCOL: STATIC // NODE 09", span: "span4" },
    { src: "art-05.jpg", code: "ARCHIVE_006", name: "GHOST NODE",     meta: "PROTOCOL: REM_SLEEP // NODE 05", span: "span8" },
    { src: "art-02.jpg", code: "ARCHIVE_007", name: "GRID FAILURE",   meta: "PROTOCOL: COLLAPSE // SECTOR 02", span: "span4" },
    { src: "art-08.jpg", code: "ARCHIVE_008", name: "LAST BROADCAST", meta: "PROTOCOL: FEED // NODE 08", span: "span4" },
    { src: "art-10.jpg", code: "ARCHIVE_009", name: "DEAD CHANNEL",   meta: "PROTOCOL: STATIC // NODE 10", span: "span4" },
    { src: "art-04.jpg", code: "ARCHIVE_010", name: "TERMINAL CITY",  meta: "PROTOCOL: COLLAPSE // SECTOR 04", span: "span12-none" }
  ];

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ============================================================
     MATRIX RAIN
     ============================================================ */
  function matrixRain() {
    const cv = $("#rain");
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const chars = "アイウエオカキクケコサシスセソ0123456789@#$%&SYNAPSE707{}<>=+*".split("");
    let cols, drops, fontSize, w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px";
      cv.style.height = innerHeight + "px";
      fontSize = 16 * dpr;
      cols = Math.floor(w / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -100);
    }
    resize();
    addEventListener("resize", resize);

    let frameSkip = 0;
    function draw() {
      // slower fade trail = fewer bright chars on screen at once
      ctx.fillStyle = "rgba(6,8,6,0.14)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < cols; i++) {
        // skip some columns each frame -> sparser, calmer field
        if (Math.random() > 0.55) continue;
        const txt = chars[(Math.random() * chars.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const lead = Math.random() > 0.99;
        ctx.fillStyle = lead ? "rgba(180,230,150,.7)" : "rgba(55,255,91," + (0.18 + Math.random() * 0.22) + ")";
        ctx.fillText(txt, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    }
    if (reduce) { draw(); return; }
    (function loop() { draw(); requestAnimationFrame(loop); })();
  }

  /* ============================================================
     BOOT SEQUENCE
     ============================================================ */
  function boot() {
    const bootEl = $("#boot");
    const log = $("#boot-log");
    const fill = $("#boot-fill");
    const pct = $("#boot-pct");
    if (!bootEl) return;
    if (reduce) { bootEl.classList.add("done"); start(); return; }

    const lines = [
      "> SYNAPSE707 BIOS v7.07",
      "> initializing neural core .......... OK",
      "> mounting /dev/concrete ........... OK",
      "> decrypting archive .............. OK",
      "> WARNING: civilization not found",
      "> rebooting reality ...............",
      "> ACCESS GRANTED"
    ];
    let li = 0, ci = 0, progress = 0;
    document.body.style.overflow = "hidden";

    function type() {
      if (li < lines.length) {
        log.textContent += lines[li][ci] || "";
        ci++;
        if (ci > lines[li].length) { log.textContent += "\n"; li++; ci = 0; }
        progress = Math.min(99, Math.round((li / lines.length) * 100));
        fill.style.width = progress + "%";
        pct.textContent = String(progress).padStart(3, "0");
        setTimeout(type, ci === 0 ? 130 : 14 + Math.random() * 22);
      } else {
        fill.style.width = "100%";
        pct.textContent = "100";
        setTimeout(() => {
          bootEl.classList.add("done");
          document.body.style.overflow = "";
          start();
        }, 520);
      }
    }
    setTimeout(type, 300);
  }

  /* ============================================================
     TEXT SCRAMBLE / DECODE
     ============================================================ */
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&/<>*";
  function scramble(el) {
    const target = el.dataset.final || (el.dataset.final = el.textContent);
    if (el._anim) cancelAnimationFrame(el._anim);
    let frame = 0;
    const reveal = () => {
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < (frame - 6) / 1.1) out += target[i];
        else if (target[i] === " ") out += " ";
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      frame++;
      if (frame <= target.length + 8) el._anim = requestAnimationFrame(reveal);
      else el.textContent = target;
    };
    reveal();
  }
  function initScramble() {
    $$("[data-scramble]").forEach((el) => {
      el.addEventListener("mouseenter", () => scramble(el));
    });
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function cursor() {
    const c = $("#cursor");
    if (!c || matchMedia("(hover:none)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      c.style.transform = `translate(${cx}px,${cy}px)` + (c.classList.contains("is-hot") ? " scale(1.7) rotate(45deg)" : "");
      requestAnimationFrame(loop);
    })();
    const hot = "a,button,.card,.btn";
    document.addEventListener("mouseover", (e) => { if (e.target.closest(hot)) c.classList.add("is-hot"); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest(hot)) c.classList.remove("is-hot"); });
  }

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */
  function progressBar() {
    const bar = $("#progress");
    addEventListener("scroll", () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (p * 100) + "%";
    }, { passive: true });
  }

  /* ============================================================
     CLOCK
     ============================================================ */
  function clock() {
    const el = $("#clock");
    if (!el) return;
    const t = () => { el.textContent = new Date().toLocaleTimeString("en-GB"); };
    t(); setInterval(t, 1000);
  }

  /* ============================================================
     GALLERY BUILD + LIGHTBOX
     ============================================================ */
  function gallery() {
    const grid = $("#gallery");
    if (!grid) return;
    ART.forEach((a, i) => {
      const span = a.span === "span12-none" ? "" : a.span;
      const card = document.createElement("button");
      card.className = "card " + span;
      card.setAttribute("data-i", i);
      card.innerHTML = `
        <img src="assets/img/${a.src}" alt="${a.name}" loading="lazy" />
        <span class="card__scan"></span>
        <span class="card__frame"></span>
        <i class="card__corner tl"></i><i class="card__corner tr"></i>
        <i class="card__corner bl"></i><i class="card__corner br"></i>
        <span class="card__idx">${String(i + 1).padStart(2, "0")}</span>
        <span class="card__meta">
          <span class="card__code">${a.code}</span>
          <span class="card__name">${a.name}</span>
        </span>`;
      card.addEventListener("click", () => openLB(i));
      grid.appendChild(card);
    });

    /* lightbox */
    const lb = $("#lightbox");
    const img = $("#lb-img");
    let cur = 0;
    function openLB(i) {
      cur = i; render(); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    }
    function render() {
      const a = ART[cur];
      img.src = "assets/img/" + a.src; img.alt = a.name;
      $("#lb-code").textContent = a.code;
      $("#lb-title").textContent = a.name;
      $("#lb-meta").textContent = a.meta;
    }
    function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); }
    function move(d) { cur = (cur + d + ART.length) % ART.length; render(); }
    $("#lb-close").addEventListener("click", close);
    $("#lb-prev").addEventListener("click", () => move(-1));
    $("#lb-next").addEventListener("click", () => move(1));
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb__stage")) close(); });
    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });
  }

  /* ============================================================
     REVEAL ON SCROLL + COUNTERS
     ============================================================ */
  function reveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("reveal"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    $$("[data-reveal], .card").forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target, to = +el.dataset.to, pad = el.textContent.length;
        let n = 0; const step = Math.max(1, Math.floor(to / 40));
        const t = setInterval(() => {
          n += step;
          if (n >= to) { n = to; clearInterval(t); }
          el.textContent = String(n).padStart(pad, "0");
        }, 28);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    $$(".count").forEach((el) => cio.observe(el));
  }

  /* ============================================================
     START
     ============================================================ */
  function start() {
    clock();
    reveals();
  }

  document.addEventListener("DOMContentLoaded", () => {
    matrixRain();
    cursor();
    progressBar();
    initScramble();
    gallery();
    boot();
  });
})();
