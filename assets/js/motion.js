/*
 * Kesit Yapı — hareket sistemi.
 * GSAP + ScrollTrigger + SplitText ve Lenis (yumuşak kaydırma) kullanır.
 * "Hareketi azalt" ayarı açık olan ziyaretçilerde hiçbiri çalışmaz; sayfa durağan
 * ama eksiksiz görünür. JS yüklenmezse de içerik görünür kalır: başlangıç halleri
 * yalnızca bu dosya çalışınca verilir.
 */
(function () {
  "use strict";
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(window.SplitText);
  var ST = window.ScrollTrigger;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;
  root.classList.add("anim");

  /* ---------- Yumuşak kaydırma ---------- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, anchors: { offset: 0 } });
    lenis.on("scroll", ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    // Menü açıkken sayfa kaymasın
    var menu = document.getElementById("menu");
    if (menu) new MutationObserver(function () { menu.hidden ? lenis.start() : lenis.stop(); })
      .observe(menu, { attributes: true, attributeFilter: ["hidden"] });
  }

  var split = function (el, type, extra) {
    if (!window.SplitText) return null;
    return new window.SplitText(el, Object.assign({ type: type, mask: type.indexOf("lines") > -1 ? "lines" : (type.indexOf("chars") > -1 ? "chars" : undefined) }, extra || {}));
  };

  /* ---------- Açılış perdesi ---------- */
  var curtain = document.createElement("div");
  curtain.className = "curtain";
  curtain.setAttribute("aria-hidden", "true");
  curtain.innerHTML =
    '<div class="curtain__in">' +
      '<svg class="curtain__seal" viewBox="0 0 160 160"><circle cx="80" cy="80" r="77" fill="none" stroke="#C9A86A" stroke-opacity=".6"/>' +
      '<circle class="curtain__ring" cx="80" cy="80" r="77" fill="none" stroke="#E3C98F" stroke-width="1.5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>' +
      '<text x="80" y="99" text-anchor="middle">K</text></svg>' +
      '<p class="curtain__word">Kesit Yapı</p>' +
    "</div>";
  document.body.appendChild(curtain);
  if (lenis) lenis.stop();
  window.scrollTo(0, 0);

  var heroImg = document.querySelector(".hero__img");
  var heroTitle = document.querySelector('[data-anim="hero-title"]');
  var titleSplit = heroTitle ? split(heroTitle, "lines") : null;
  var curtainWord = split(curtain.querySelector(".curtain__word"), "chars");

  var intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro
    .from(curtain.querySelector(".curtain__seal"), { scale: 0.6, opacity: 0, duration: 1 })
    .to(curtain.querySelector(".curtain__ring"), { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.1)
    .from(curtainWord ? curtainWord.chars : ".curtain__word", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.035 }, 0.25)
    .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "expo.inOut" }, 1.45)
    .from(".frame", { scale: 0.94, borderRadius: 40, duration: 1.6 }, 1.55)
    .fromTo(heroImg, { scale: 1.32 }, { scale: 1.08, duration: 2.6, ease: "expo.out" }, 1.55)
    .from(titleSplit ? titleSplit.lines : heroTitle, { yPercent: 115, duration: 1.4, stagger: 0.12 }, 1.95)
    .from(".panel .word, .hero__bar > *, .hero__foot", { y: -14, opacity: 0, duration: 1, stagger: 0.06 }, 2.1)
    .from(".rail a", { x: -18, opacity: 0, duration: 1, stagger: 0.08 }, 2.2)
    .from(".seal", { rotate: -90, scale: 0.7, opacity: 0, duration: 1.4 }, 2.25)
    .from(".panel__cta, .hero__cta-mobile", { y: 16, opacity: 0, duration: 1 }, 2.45)
    .add(function () {
      curtain.remove();
      if (lenis) lenis.start();
      startHeroLoop();
    });

  /* ---------- Hero: yavaş nefes alan fotoğraf, ışık ve kaydırma ---------- */
  function startHeroLoop() {
    gsap.to(heroImg, { scale: 1.0, xPercent: -1.5, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".hero__glow", { opacity: 0.85, scale: 1.12, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }
  gsap.to(".hero__img", { yPercent: 14, ease: "none", scrollTrigger: { trigger: ".stage", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__title", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".stage", start: "top top", end: "70% top", scrub: true } });

  /* ---------- Güneş ışığında süzülen toz ---------- */
  var canvas = document.querySelector(".hero__dust");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, parts = [], running = true;
    var resize = function () {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var spawn = function (anywhere) {
      // Işık hüzmesinin olduğu yere (fotoğrafta pencerenin önü) yoğunlaşır
      var cx = W * 0.5, cy = H * 0.4;
      return {
        x: cx + (Math.random() - 0.5) * W * 0.7,
        y: anywhere ? cy + (Math.random() - 0.5) * H * 0.8 : H * (0.75 + Math.random() * 0.3),
        r: 0.5 + Math.random() * 1.8,
        vy: -(0.08 + Math.random() * 0.28),
        ph: Math.random() * Math.PI * 2,
        a: 0.25 + Math.random() * 0.6
      };
    };
    resize();
    for (var i = 0; i < 90; i++) parts.push(spawn(true));
    window.addEventListener("resize", resize);
    new IntersectionObserver(function (e) { running = e[0].isIntersecting; }).observe(canvas);
    var t = 0;
    gsap.ticker.add(function () {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      for (var j = 0; j < parts.length; j++) {
        var p = parts[j];
        p.y += p.vy;
        p.x += Math.sin(t * 0.6 + p.ph) * 0.18;
        if (p.y < -10) parts[j] = p = spawn(false);
        var tw = 0.55 + 0.45 * Math.sin(t * 1.4 + p.ph * 3);
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, "rgba(255,226,170," + (p.a * tw) + ")");
        g.addColorStop(1, "rgba(255,226,170,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  /* ---------- Bölüm başlıkları: satır satır yükselir ---------- */
  document.querySelectorAll('[data-anim="lines"]').forEach(function (el) {
    var s = split(el, "lines");
    gsap.from(s ? s.lines : el, {
      yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 85%" }
    });
  });
  // Başlığın yanındaki açıklama ve etiketler
  gsap.utils.toArray(".sec-head p, .kicker, .story__note").forEach(function (el) {
    gsap.from(el, { y: 24, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });

  /* ---------- Giriş metni: kaydırdıkça kelime kelime aydınlanır ---------- */
  document.querySelectorAll('[data-anim="words"]').forEach(function (el) {
    var s = split(el, "words");
    if (!s) return;
    gsap.fromTo(s.words, { opacity: 0.14 }, {
      opacity: 1, ease: "none", stagger: 0.05,
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true }
    });
  });

  /* ---------- Fotoğraflar: perde açılır gibi ---------- */
  document.querySelectorAll('[data-anim="img"]').forEach(function (fig, i) {
    var img = fig.querySelector("img");
    var tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 88%" } });
    tl.fromTo(fig, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" })
      .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.1);
    // Kaydırırken hafif paralaks
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
  });
  // Hikâye: başlık ve metin fotoğraftan sonra gelir; orta sütun farklı hızda kayar
  gsap.utils.toArray(".story__item").forEach(function (item, i) {
    gsap.from(item.querySelectorAll("h3, p"), { y: 30, opacity: 0, duration: 1.1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 70%" }, delay: 0.4 });
    if (window.innerWidth > 900) gsap.to(item, { yPercent: i === 1 ? -10 : 4, ease: "none", scrollTrigger: { trigger: ".story__list", start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* ---------- Dev isimler: harf harf ---------- */
  document.querySelectorAll('[data-anim="chars"]').forEach(function (el) {
    var s = split(el, "chars");
    gsap.from(s ? s.chars : el, {
      yPercent: 105, rotate: 4, duration: 1.6, ease: "expo.out", stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 85%" }
    });
  });
  gsap.fromTo(".band__img", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".band", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".band__card", { clipPath: "inset(8% 6% 8% 6% round 22px)" }, { clipPath: "inset(0% 0% 0% 0% round 22px)", ease: "none", scrollTrigger: { trigger: ".band", start: "top 95%", end: "top 25%", scrub: true } });
  gsap.from(".band__line", { opacity: 0, letterSpacing: "1em", duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: ".band__line", start: "top 85%" } });

  /* ---------- Kayan yazı: kaydırma hızıyla hızlanır ---------- */
  document.querySelectorAll(".marquee__track").forEach(function (track) {
    var ters = track.parentElement.classList.contains("marquee--ters");
    var loop = gsap.to(track, { xPercent: ters ? 50 : -50, ease: "none", duration: 38, repeat: -1 });
    if (ters) gsap.set(track, { xPercent: -50 });
    ST.create({
      trigger: track, start: "top bottom", end: "bottom top",
      onUpdate: function (self) {
        var v = Math.min(Math.abs(self.getVelocity()) / 400, 5);
        gsap.to(loop, { timeScale: 1 + v, duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: 1, duration: 1.4, delay: 0.3 });
      }
    });
  });

  /* ---------- Listeler, adımlar, form ---------- */
  gsap.utils.toArray(".scope__list > div, .fit__list li, .ledger__row").forEach(function (el) {
    gsap.from(el, { y: 26, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
  });
  var steps = document.querySelector(".steps__list");
  if (steps) {
    var stl = gsap.timeline({ scrollTrigger: { trigger: steps, start: "top 80%" } });
    stl.from(".steps__list li", { "--cizgi-olcek": 0, duration: 1.2, ease: "expo.inOut", stagger: 0.12 })
       .from(".steps__list li > *", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.05 }, 0.3);
    gsap.from(".steps__list li", { "--rakam-y": "60%", "--rakam-o": 0, duration: 1.2, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: steps, start: "top 80%" } });
  }
  gsap.from(".qa", { y: 30, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".faq__list", start: "top 85%" } });
  gsap.from(".cond__opt, .seg, .range", { y: 22, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: ".calc__form", start: "top 85%" } });
  gsap.from(".result", { y: 30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".calc__out", start: "top 85%" } });
  gsap.from(".form .field, .form .btn, .cta__tel", { y: 22, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: ".form", start: "top 88%" } });

  /* ---------- Menü: bağlantılar sırayla gelir ---------- */
  var menuEl = document.getElementById("menu");
  if (menuEl) {
    var menuLinks = menuEl.querySelectorAll(".menu__nav a");
    new MutationObserver(function () {
      if (!menuEl.hidden) {
        gsap.fromTo(menuEl, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" });
        gsap.fromTo(menuLinks, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.35 });
        gsap.fromTo(".menu__tel, .menu__top", { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.6 });
      }
    }).observe(menuEl, { attributes: true, attributeFilter: ["hidden"] });
  }

  /* ---------- Düğmeler: mıknatıs etkisi ---------- */
  if (finePointer) {
    document.querySelectorAll(".btn, .menu-btn, .panel__cta").forEach(function (b) {
      var xTo = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      var yTo = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      b.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
    });
  }

  /* ---------- İmleç: pirinç halka ---------- */
  if (finePointer) {
    var cur = document.createElement("div");
    cur.className = "cursor";
    cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = '<span class="cursor__label"></span>';
    document.body.appendChild(cur);
    root.classList.add("has-cursor");
    var cx = gsap.quickTo(cur, "x", { duration: 0.45, ease: "power3.out" });
    var cy = gsap.quickTo(cur, "y", { duration: 0.45, ease: "power3.out" });
    window.addEventListener("mousemove", function (e) { cx(e.clientX); cy(e.clientY); });
    var label = cur.querySelector(".cursor__label");
    document.addEventListener("mouseover", function (e) {
      var t = e.target;
      var link = t.closest && t.closest("a, button, label, input, select, textarea, [data-anim='img']");
      cur.classList.toggle("is-link", !!(link && !link.matches("[data-anim='img']")));
      var fig = t.closest && t.closest("[data-anim='img'], .band__card");
      cur.classList.toggle("is-view", !!fig);
      label.textContent = fig ? "Kaydır" : "";
    });
    document.addEventListener("mouseleave", function () { gsap.to(cur, { opacity: 0, duration: 0.3 }); });
    document.addEventListener("mouseenter", function () { gsap.to(cur, { opacity: 1, duration: 0.3 }); });
  }

  window.addEventListener("load", function () { ST.refresh(); });
})();
