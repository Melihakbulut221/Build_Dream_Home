# Kesit Yapı — web sitesi

Konya'da eski iki katlı evleri yenileyen ofisin tek sayfalık sitesi. Derleme adımı yok:
düz HTML, CSS ve biraz JavaScript.

```
index.html              sayfa
assets/css/site.css     stiller
assets/js/config.js     telefon, adres, WhatsApp, fark hesabı rakamları  ← önce burayı düzenleyin
assets/js/main.js       önce/sonra kaydırıcısı, fark hesabı, form
assets/fonts/           Archivo (OFL lisanslı, siteyle birlikte barındırılıyor)
DESIGN.md               tasarım sistemi ve yasak listesi
NOTLAR.md               "AI slop" videosundan çıkarılan notlar
```

## Bilgisayarda açmak

Fontlar `file://` ile açılınca yüklenmez; küçük bir sunucu açın:

```
python3 -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000`.

## Yayına almak (GitHub Pages)

Repo → Settings → Pages → *Deploy from a branch* → `main` / `(root)`.
Birkaç dakika sonra site `https://<kullanıcı>.github.io/build_dream_home/` adresinde açılır.

## Yayından önce yapılacaklar

- [ ] `config.js`: gerçek telefon, WhatsApp numarası, adres, çalışma saatleri
- [ ] `config.js`: durum katsayıları ve m² yenileme maliyetleri ofisin kendi rakamlarıyla
- [ ] Firma adı "Kesit Yapı" geçici; gerçek adla değiştirin (`index.html`, `config.js`)
- [ ] Sözleri kontrol edin: "aynı gün ararız", "statik inceleme yaptırırız",
      "tek sorumlu" gibi cümleler ofisin gerçekten tuttuğu sözler olmalı
- [ ] Keşif sonrası verilen yazılı hesapta ev sahibinin payı ve ödeme zamanı (önden ödeme dahil) açıkça yazmalı; sitedeki "yazılı olarak önünüze koyarız" sözü buna dayanıyor
- [ ] Gerçek projelerin önce/sonra fotoğrafları gelince bir proje bölümü ekleyin
