# Kesit Yapı — web sitesi

Konya'da eski iki katlı evleri yenileyen ofisin tek sayfalık sitesi. Derleme adımı yok:
düz HTML, CSS ve biraz JavaScript.

```
index.html              sayfa
assets/css/site.css     stiller
assets/js/config.js     telefon, adres, WhatsApp, fark hesabı rakamları  ← önce burayı düzenleyin
assets/js/main.js       menü, fark hesabı, form
assets/js/motion.js     animasyonlar (GSAP, Lenis; assets/js/vendor/ altında, lisanslar orada)
assets/fonts/           Archivo ve Cormorant Garamond (OFL lisanslı, siteyle birlikte)
assets/img/             fotoğraflar (temsilî, Unsplash; kaynaklar KAYNAKLAR.md)
DESIGN.md               tasarım sistemi ve yasak listesi
HERO-GORSEL.md          hero görselini/videosunu üretme talimatı
NOTLAR.md               "AI slop" videosundan çıkarılan notlar
```

## Bilgisayarda açmak

Fontlar `file://` ile açılınca yüklenmez; küçük bir sunucu açın:

```
python3 -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000`.

## Yayın

Site GitHub Pages'te yayında: https://melihakbulut221.github.io/Build_Dream_Home/
`main` dalına her push bir iki dakika içinde siteye yansır.

## Yayından önce yapılacaklar

- [ ] `config.js`: gerçek telefon, WhatsApp numarası, adres, çalışma saatleri
- [ ] `config.js`: durum katsayıları ve m² yenileme maliyetleri ofisin kendi rakamlarıyla
- [ ] Firma adı "Kesit Yapı" geçici; gerçek adla değiştirin (`index.html`, `config.js`)
- [ ] Sözleri kontrol edin: "aynı gün ararız", "statik inceleme yaptırırız",
      "tek sorumlu" gibi cümleler ofisin gerçekten tuttuğu sözler olmalı
- [ ] Keşif sonrası verilen yazılı hesapta ev sahibinin payı ve ödeme zamanı (önden ödeme dahil) açıkça yazmalı; sitedeki "yazılı olarak önünüze koyarız" sözü buna dayanıyor
- [ ] Temsilî Unsplash fotoğraflarını zamanla kendi işlerinizin fotoğraflarıyla değiştirin (aynı dosya adlarıyla, `assets/img/`)
- [ ] Gerçek projelerin önce/sonra fotoğrafları gelince bir proje bölümü ekleyin
