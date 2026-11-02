# Hero görseli nasıl üretilir

Referans video: Luke Carter, *Stop Building AI Slop Websites (Do This Instead)*
https://youtu.be/uPIIJDmq5OU

Videodaki iş akışı:

1. Bir görüntü modeliyle (videoda GPT Image 2) önce sitenin **hero görselini** üret.
   Görsel, sayfanın sanat yönetmeni gibi çalışır: renkler, ışık, hava oradan gelir.
2. Aynı sahnenin **yazısız, temiz bir arka plan** versiyonunu üret.
3. Sayfayı bu görselin üzerine kodla (bu repoda zaten yapıldı).
4. Arka planı bir video modeliyle (videoda Higgsfield üzerinden Seedance 2.0) hafifçe
   hareketlendir.

Bu sitede hero şu an temsilî bir Unsplash fotoğrafı (`assets/img/hero.jpg`) gösteriyor.
Kendi görseliniz ya da videonuz eklendiğinde onun yerini alır.

## Önce şunu okuyun

Üretilmiş bir görsel sizin yaptığınız bir ev değildir. Hero'da **atmosfer** olarak
kullanmak sorun değil, ama sitede "bizim projemiz" diye sunmayın. Elinizde gerçek bir
yenilenmiş evin iyi bir fotoğrafı varsa (akşamüstü, ışıklar yanıkken), en iyi hero odur.

## 1. Masaüstü arka planı (16:9)

Görüntü modeline şu metni verin (İngilizce daha iyi sonuç veriyor):

```
Cinematic architectural photograph at golden hour. A renovated two-story detached
family house in Konya, Turkey: light lime-plaster upper floor, pale stone-clad ground
floor, dark charcoal tiled hip roof, large dark-framed windows with warm interior light
glowing, a small balcony with a glass railing, a low garden wall in front. Flat Central
Anatolian steppe landscape, low sun near the horizon, long warm shadows, a single
leafy tree. Muted warm palette: deep charcoal shadows, brass and honey highlights.
The house sits in the right half of the frame; the left 45% is calm, dark, empty sky
and ground for text. Shot on a 35mm lens at eye level, shallow haze, film grain,
editorial real-estate photography. No people, no text, no logos, no watermark.
Aspect ratio 16:9.
```

## 2. Telefon arka planı (9:16)

Aynı metin; son iki cümleyi şununla değiştirin:

```
The house sits in the upper 55% of the frame; the bottom 45% is dark, quiet ground
for text. Aspect ratio 9:16.
```

## 3. Hareketlendirme (video modeli)

Masaüstü görselini başlangıç karesi olarak verin:

```
Subtle, almost still cinemagraph. Very slow push-in of the camera. Leaves of the tree
move gently in a light breeze, warm light in the windows flickers softly, faint haze
drifts across the steppe. The sun does not move. No people, no cars, no text.
Seamless 6-second loop.
```

## Siteye eklemek

1. Dosyaları `assets/img/` klasörüne koyun: örneğin `hero.jpg` ve `hero.mp4`.
2. `assets/js/config.js` içinde:
   ```js
   heroGorsel: "assets/img/hero.jpg",
   heroVideo: "assets/img/hero.mp4",
   ```
3. Boyut: görsel 2400px genişlikte, JPG, 400 KB altı; video 1080p, H.264, sessiz,
   4 MB altı. Video, "hareketi azalt" ayarı açık olan ziyaretçilere gösterilmez; onlar
   görseli görür.
