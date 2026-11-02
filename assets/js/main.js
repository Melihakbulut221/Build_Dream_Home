(function () {
  "use strict";
  var S = window.SITE;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- İletişim bilgilerini config'ten yerleştir ---------- */
  document.querySelectorAll("[data-tel]").forEach(function (a) {
    a.href = "tel:" + S.telefonArama;
    a.textContent = S.telefonGorunen;
  });
  var adres = document.querySelector("[data-adres]");
  if (adres) adres.textContent = S.adres;
  var saat = document.querySelector("[data-saat]");
  if (saat) saat.textContent = S.calismaSaatleri;
  var yil = document.querySelector("[data-yil]");
  if (yil) yil.textContent = new Date().getFullYear();
  var tarih = document.querySelector("[data-tarih]");
  if (tarih) tarih.textContent = S.verininTarihi;

  /* ---------- Hero görseli: config'te verilirse varsayılan fotoğrafın yerini alır ---------- */
  var heroImg = document.querySelector("[data-hero-img]");
  if (heroImg && S.heroGorsel) heroImg.src = S.heroGorsel;
  if (heroImg && S.heroVideo && !reduceMotion) {
    var v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
    v.setAttribute("aria-hidden", "true");
    v.poster = heroImg.src;
    v.src = S.heroVideo;
    v.className = heroImg.className;
    v.addEventListener("loadeddata", function () { heroImg.replaceWith(v); });
    v.load();
  }

  /* ---------- Menü ---------- */
  var menu = document.getElementById("menu");
  var menuBtn = document.querySelector("[data-menu-open]");
  if (menu && menuBtn) {
    var kapat = function (odak) {
      menu.hidden = true;
      document.body.classList.remove("menu-acik");
      menuBtn.setAttribute("aria-expanded", "false");
      if (odak) menuBtn.focus();
    };
    menuBtn.addEventListener("click", function () {
      menu.hidden = false;
      document.body.classList.add("menu-acik");
      menuBtn.setAttribute("aria-expanded", "true");
      menu.querySelector("a").focus();
    });
    menu.querySelector("[data-menu-close]").addEventListener("click", function () { kapat(true); });
    menu.querySelectorAll(".menu__nav a").forEach(function (a) { a.addEventListener("click", function () { kapat(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) kapat(true); });
  }

  /* ---------- Fark hesabı ---------- */
  var calc = document.querySelector("[data-calc]");
  if (calc) {
    var seg = calc.querySelector("[data-ilce]");
    Object.keys(S.ilceler).forEach(function (key, i) {
      var l = document.createElement("label");
      l.innerHTML = '<input type="radio" name="ilce" value="' + key + '"' + (key === "meram" ? " checked" : "") + '><span>' + S.ilceler[key].ad + "</span>";
      seg.appendChild(l);
    });

    var alan = calc.querySelector("#alan");
    var alanOut = calc.querySelector("[data-alan-out]");
    var out = document.querySelector(".calc__out");
    var tl = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
    var yuvarla = function (n) { return Math.round(n / 10000) * 10000; };
    var para = function (n) { return tl.format(yuvarla(n)) + " ₺"; };

    var hesapla = function () {
      var ilce = S.ilceler[calc.querySelector('input[name="ilce"]:checked').value];
      var durum = S.durumlar[calc.querySelector('input[name="durum"]:checked').value];
      var m2 = +alan.value;
      alanOut.textContent = m2 + " m²";

      var yeni = m2 * ilce.m2Fiyat;
      var bugun = yeni * durum.katsayi;
      var masraf = m2 * durum.maliyet;
      var fark = yeni - bugun - masraf;

      out.querySelector('[data-v="bugun"]').textContent = para(bugun);
      out.querySelector('[data-v="masraf"]').textContent = para(masraf);
      out.querySelector('[data-v="yeni"]').textContent = para(yeni);

      var num = out.querySelector('[data-v="fark"]');
      var f = yuvarla(fark);
      num.textContent = (f > 0 ? "+" : f < 0 ? "−" : "") + tl.format(Math.abs(f)) + " ₺";
      num.classList.toggle("is-neg", f <= 0);

      // Çubuk: bugünkü değer + masraf (+ fark), yenilenmiş değerde işaret
      var toplam = Math.max(yeni, bugun + masraf);
      var w = function (n) { return (Math.max(0, n) / toplam * 100) + "%"; };
      out.querySelector('[data-bar="bugun"]').style.width = w(bugun);
      out.querySelector('[data-bar="masraf"]').style.width = w(masraf);
      out.querySelector('[data-bar="fark"]').style.width = w(fark);
      out.querySelector('[data-bar="mark"]').style.left = "calc(" + w(yeni) + " - 1.5px)";

      out.querySelector("[data-verdict]").textContent = f > 0
        ? "Bu senaryoda yenileme kendini çıkarıyor. Gerçek rakamı keşifte, evin içinde çıkarırız."
        : "Bu senaryoda yenileme masrafı, değer artışından büyük. Böyle bir evde size yenileme önermeyiz; neden çıkmadığını keşifte birlikte görürüz.";
    };

    calc.addEventListener("input", hesapla);
    calc.addEventListener("change", hesapla);
    hesapla();
  }

  /* ---------- Keşif formu → WhatsApp ---------- */
  var form = document.querySelector("[data-form]");
  if (form) {
    var err = form.querySelector("[data-err]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ad = form.ad.value.trim();
      var tel = form.tel.value.trim();
      var eksik = [];
      form.ad.removeAttribute("aria-invalid");
      form.tel.removeAttribute("aria-invalid");
      if (!ad) { eksik.push("adınızı"); form.ad.setAttribute("aria-invalid", "true"); }
      if (tel.replace(/\D/g, "").length < 10) { eksik.push("telefon numaranızı"); form.tel.setAttribute("aria-invalid", "true"); }
      if (eksik.length) {
        err.textContent = "Sizi arayabilmemiz için " + eksik.join(" ve ") + " yazın.";
        err.hidden = false;
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }
      err.hidden = true;

      var satirlar = [
        "Merhaba, iki katlı evim için keşif randevusu istiyorum.",
        "Ad: " + ad,
        "Telefon: " + tel
      ];
      if (form.yer.value.trim()) satirlar.push("Yer: " + form.yer.value.trim());
      if (form.yas.value) satirlar.push("Evin yaşı: " + form.yas.value);
      if (form.not.value.trim()) satirlar.push("Not: " + form.not.value.trim());

      window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(satirlar.join("\n")), "_blank", "noopener");
    });
  }
})();
