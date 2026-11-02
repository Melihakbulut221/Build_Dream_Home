# Kesit Yapı — tasarım sistemi

Bu dosya sitenin kural kitabı. Yeni bir sayfa ya da bölüm eklerken (insan da olsa, yapay
zekâ da olsa) önce bunu okuyun. Amaç: site, herhangi bir tadilat firmasının şablonu gibi
değil, Konya'da iki katlı ev yenileyen bu ofisin sitesi gibi görünsün.

## Kime, ne için

- **Okuyan:** Konya merkezde (Selçuklu, Meram, Karatay) eski iki katlı evi olan kişi,
  çoğunlukla 45 yaş üstü; ya da onun adına araştıran çocukları. Telefondan bakıyor.
- **Sayfanın tek işi:** keşif randevusu aldırmak.
- **İnandırması gereken tek şey:** bu ofis, evin yenilenip yenilenmemesi gerektiğini
  rakamla ve dürüstçe söyler.

## Renkler (Konya'dan)

| Ad | Hex | Nereden | Ne için |
|---|---|---|---|
| Kireç | `#F3F5F2` | Kireç badana, serin beyaz | Sayfa zemini |
| Lacivert | `#16294D` | Karatay Medresesi çinisinin koyu mavisi | Metin, çizgiler, koyu bölümler |
| Firuze | `#0E8A80` | Selçuklu çinisinin turkuazı | "Yenilenmiş" hal, kazanç, eylem düğmesi |
| Sille taşı | `#B88D6C` | Sille'nin pembe-kahve andezit taşı | "Bugünkü" hal, eski ev |
| Harç | `#8C95A3` | Çimento harcı grisi | İkincil metin, kılavuz çizgileri |
| Kiremit | `#A8442E` | Eski Konya çatı kiremidi | Yalnızca negatif fark ve hata mesajı |

Kurallar:
- Firuze = iyiye giden şey. Sille = bugünkü/eski hal. Bu anlamı her yerde koruyun.
- Kiremit dekor değildir; sadece "zarar / hata" anlamında kullanılır.
- Gradyan yok. Düz renk ve çizgi.

## Yazı

Tek aile: **Archivo** (değişken, `wght` 100–900, `wdth` 62–125), siteyle birlikte
`assets/fonts/` altında barındırılıyor. Lisans OFL 1.1, ticari kullanım serbest.
Kişiliği genişlik ekseni veriyor: başlıklar inşaat panosu gibi dar ve ağır, metin normal
genişlikte.

| Rol | wdth | wght | Boyut |
|---|---|---|---|
| Büyük başlık (h1) | 62 | 800 | clamp(2.75rem, 8vw, 6.25rem), satır aralığı 0.92 |
| Bölüm başlığı (h2) | 68 | 750 | clamp(2rem, 4.6vw, 3.5rem) |
| Ara başlık (h3) | 85 | 650 | 1.25rem |
| Metin | 100 | 400 | 1.0625rem, satır aralığı 1.55, satır ≤ 68 karakter |
| Büyük rakam | 62 | 700 | `font-variant-numeric: tabular-nums` |
| Küçük not | 100 | 450 | 0.875rem, harç rengi |

- Başlıklar cümle düzeninde. Etiketler BÜYÜK HARF değil.
- Başlıkta tek kelimeyi renklendirme / italik yapma yok.

## Düzen

- Sola hizalı. Ortalanmış blok yalnızca hiçbir yerde.
- İçerik genişliği 1180px, kenar boşluğu en az 20px.
- Köşe yuvarlaklığı hiyerarşiye göre: düğme 999px (hap), form alanı 6px, bölüm kutusu 0.
- Gölge yok. Ayrım çizgiyle ve zemin rengiyle yapılır.
- Kart ızgarası yok. Listeler gerçekten liste, adımlar gerçekten sıra.
- Numara yalnızca gerçek sıralama varsa (süreç adımları).

## Akılda kalan tek şey

Sayfanın cesareti tek bir yere harcanıyor: **önce/sonra ev cephesi çizimi** (hero).
Aynı iki katlı ev, solda bugünkü haliyle (soba borusu, dökülen sıva, tek cam), sağda
yenilenmiş haliyle; arada kaydırıcı. Diğer her şey sakin.

Hareket: yalnızca sayfa açılışında kaydırıcının bir kez kayması. `prefers-reduced-motion`
açıksa o da yok. Kullanıcının yaptığı işe cevap veren hareketler (hesap makinesinin
çubuğu) serbest.

## Bileşenler

- **Eylem düğmesi:** firuze zemin, kireç yazı, hap şekli. Metni her yerde aynı:
  "Keşif randevusu iste".
- **İkincil bağlantı:** altı çizili lacivert metin. Yanına ok eklenmez.
- **Fark hesabı:** girişler solda, sonuç sağda; sonuç yatay bir cetvel çubuğu
  (sille = bugünkü değer, taralı lacivert = masraf, firuze = fark).
- **Soru-cevap:** açılır-kapanır akordeon değil, düz liste. Okuyan her şeyi görsün.

## Yazım kuralları

1. Önce acıyı söyle: evin değeri, görünüşü yüzünden düşük.
2. Her bölüm tek bir şey söyler, sayfa tek bir şey ister.
3. Somut ol: "dökülen sıva", "soba borusu", "tek cam" — "eskimiş yapı" değil.
4. Söz verme, yap: süre, garanti, oran yazılacaksa ofisin gerçekten tuttuğu rakam olsun.
5. Hayır demekten korkma: "Fark çıkmazsa söyleriz" sitenin en güçlü cümlesi.

### Yasaklı kelimeler / kalıplar

Bunlar her tadilat sitesinde var ve hiçbir şey söylemiyor:

- hayalinizdeki ev, hayallerinizi gerçeğe dönüştürüyoruz
- profesyonel ekip, uzman kadro, deneyimli ekibimiz
- kaliteli hizmet, kalite ve güven, güvenilir çözüm ortağınız
- modern çözümler, yenilikçi yaklaşım, sektörde öncü
- müşteri memnuniyeti odaklı, %100 memnuniyet
- "… ile tanışın", "… bir adım önde", "fark yaratıyoruz"
- uydurma sayaçlar: "500+ mutlu müşteri", "20 yıllık tecrübe" (gerçek değilse)
- uydurma yorumlar, yıldızlar, logo duvarı

### Görsel yasak listesi

- Inter, Roboto, Poppins, Montserrat, Space Grotesk
- Mor/indigo gradyan, pastel gökkuşağı vurgular, bulanık renk lekeleri
- Buzlu cam (glassmorphism), yumuşak gri gölgeli özdeş kartlar
- Ortalanmış hero + üstte küçük etiket + iki düğme kalıbı
- Her bölümde aşağıdan kayarak gelen animasyon
- Stok "baret takmış gülümseyen usta" fotoğrafı
- Başlıkların üstünde BÜYÜK HARF etiketler, bağlantıların sonunda "→"

## Gerçek içerik gelince

- **Proje fotoğrafları:** aynı açıdan çekilmiş önce/sonra çiftleri. Hero'daki kaydırıcı
  bileşeni fotoğrafla da çalışacak şekilde genişletilebilir.
- **Rakamlar:** `assets/js/config.js` içindeki ilçe m² fiyatları, durum katsayıları ve
  m² yenileme maliyetleri ofisin kendi rakamlarıyla güncellenmeli.
