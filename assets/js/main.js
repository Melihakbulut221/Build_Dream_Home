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

  /* ---------- Önce/sonra karşılaştırması ---------- */
  var compare = document.querySelector("[data-compare]");
  if (compare) {
    var range = compare.querySelector(".compare__range");
    var svgs = compare.querySelectorAll("svg.house");
    var setPos = function (v) { compare.style.setProperty("--pos", v + "%"); };
    range.addEventListener("input", function () { setPos(range.value); });

    // Dar ekranda yalnızca evi göster (notlar altta liste olarak çıkıyor)
    var narrow = window.matchMedia("(max-width: 760px)");
    var fitView = function () {
      var vb = narrow.matches ? "270 95 660 500" : "0 0 1200 640";
      svgs.forEach(function (s) { s.setAttribute("viewBox", vb); });
    };
    fitView();
    if (narrow.addEventListener) narrow.addEventListener("change", fitView);

    // Açılışta tek bir hareket: perde bugünden yenilenmiş hale kayar
    if (!reduceMotion) {
      var from = 92, to = 50, dur = 1400, t0 = null;
      setPos(from); range.value = from;
      var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var v = from + (to - from) * ease(p);
        setPos(v); range.value = Math.round(v);
        if (p < 1 && !userMoved) requestAnimationFrame(step);
      };
      var userMoved = false;
      range.addEventListener("pointerdown", function () { userMoved = true; }, { once: true });
      range.addEventListener("keydown", function () { userMoved = true; }, { once: true });
      setTimeout(function () { requestAnimationFrame(step); }, 450);
    }
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
