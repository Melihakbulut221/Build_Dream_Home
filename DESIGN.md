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

## Görsel dil

Referans: Luke Carter'ın videosundaki "ATELIER" sitesi (https://youtu.be/uPIIJDmq5OU):
koyu ve sıcak zemin, sinematik hero, ince ve italik serif başlık, pirinç rengi ince
çerçeve, yanda dikey menü, yuvarlak monogram mühür. Bu dili Konya'daki bir yenileme
ofisine uyarladık; içerik (fark hesabı, dürüst metin) aynen kaldı.

## Renkler

| Ad | Hex | Ne için |
|---|---|---|
| Is | `#14120F` | Sayfa zemini (ocak isi gibi sıcak siyah) |
| Kül | `#1C1915` | Dönüşümlü bölüm zemini |
| Pirinç | `#C9A86A` | Çerçeve, çizgi, etiket, eylem düğmesi |
| Kireç | `#EDE6D9` | Metin |
| Duman | `#A69D8F` | İkincil metin |
| Firuze | `#5BB8AC` | Yalnızca kazanç (fark hesabında pozitif sonuç) |
| Kiremit | `#D98A72` | Yalnızca zarar ve hata mesajı |

- Pirinç dekor için değil yapı için: çerçeve, ayırıcı çizgi, etiket.
- Firuze ve kiremit anlam taşır; başka yerde kullanılmaz.
- Çizgiler `rgba(201,168,106,.28)` inceliğinde, 1px.

## Yazı

İki aile, ikisi de siteyle birlikte `assets/fonts/` altında, OFL lisanslı:

- **Cormorant Garamond** (serif): başlıklar italik 300; ara başlıklar ve rakamlar normal 400/500.
- **Archivo** (sans): metin; gezinme ve küçük etiketler geniş (`font-stretch: 115%`),
  büyük harf, harf aralığı `.2em`.

| Rol | Yazı | Boyut |
|---|---|---|
| Hero başlığı | Cormorant italik 300 | clamp(3rem, 7.4vw, 7rem), satır aralığı .98 |
| Bölüm başlığı | Cormorant italik 300 | clamp(2.5rem, 5.4vw, 4.5rem) |
| Ara başlık | Cormorant 500 | 1.625rem |
| Giriş paragrafı | Cormorant 400 | clamp(1.75rem, 3.2vw, 2.75rem) |
| Metin | Archivo 400 | 1.0625rem, satır aralığı 1.6 |
| Etiket | Archivo geniş, büyük harf | .7–.78rem, harf aralığı .2em, pirinç |
| Büyük rakam | Cormorant italik 300 | fark sonucu clamp(3.5rem, 8vw, 6.5rem) |

## Düzen

- Hero: sayfa kenarından 10–20px içeride, 1px pirinç çerçeveli, köşeleri yuvarlak bir
  kart. Solda koyu panel (üstte firma adı, ortada dikey gezinme, altta dönen mühür ve
  "Keşif randevusu iste ↗"), sağda kartı dolduran sıcak ışıklı bir fotoğraf ve üzerinde
  italik başlık. Sağ üstte "Menü".
- Sayfa fotoğrafla ilerler: giriş metni + küçük fotoğraf, "Bir evin üç hali" (Bugün /
  Yenilemede / Sonra), fark hesabı, fotoğraf üstünde dev "KESİT" bandı, kapsam listesi
  + dikey fotoğraf, keşif formu + gece fotoğrafı, altta dev "KESİT YAPI".
- Fotoğraflar sıcak ve loş olmalı: akşamüstü ışığı, lamba ışığı, gece yanan pencereler.
  Gün ortası, soğuk ve beyaz ışıklı fotoğraf kullanmayın.
- Şu anki fotoğraflar Unsplash'ten, temsilî (`assets/img/KAYNAKLAR.md`). Kendi işlerinizin
  fotoğrafları geldikçe aynı dosya adlarıyla değiştirin.
- İçerik sola hizalı, genişlik 1200px. Bölüm başlıkları solda, açıklama sağda.
- Bölümler `Is` ve `Kül` zeminleri arasında dönüşümlü.
- Gölge yok, gradyan yalnızca hero'daki ışıkta.
- Süreç adımları gerçek bir sıra olduğu için Roma rakamıyla numaralı (I–V).

## Hareket

Hareket sitenin parçası; hepsi `assets/js/motion.js` içinde, GSAP + ScrollTrigger +
SplitText ve Lenis (yumuşak kaydırma) ile. Kurallar:

- **Açılış:** perde, mühür halkası çizilir, firma adı harf harf gelir; perde yukarı
  açılır, kart büyür, hero fotoğrafı yakınlaşarak oturur, başlık satır satır yükselir.
- **Hero hep canlı:** fotoğraf 18 saniyede bir nefes alır gibi yakınlaşıp uzaklaşır,
  pencere ışığı titrer, ışık hüzmesinde toz zerrecikleri süzülür. Kaydırınca fotoğraf
  yavaş, başlık hızlı kayar.
- **Kaydırma:** bölüm başlıkları satır satır, fotoğraflar alttan perde gibi açılır,
  giriş metni kelime kelime aydınlanır, dev "KESİT" ve altbilgi harf harf yükselir,
  kayan yazı bantları kaydırma hızıyla hızlanır.
- **Etkileşim:** pirinç halka imleç (fotoğrafların üstünde "Kaydır"), düğmelerde
  mıknatıs etkisi ve dolan renk, fark hesabında rakamlar sayarak değişir.
- Süreler uzun ve yumuşak (`expo.out`, 1–1.6 sn). Zıplayan, sallanan, dönen efekt yok
  (mühür dışında).
- `prefers-reduced-motion` açıksa `motion.js` hiç çalışmaz; JS yüklenmezse içerik yine
  görünür, çünkü başlangıç halleri yalnızca JS tarafından verilir.

## Bileşenler

- **Eylem düğmesi:** pirinç zemin, koyu yazı, hap şekli, geniş büyük harf. Metni her
  yerde aynı: "Keşif randevusu iste".
- **Hero bağlantısı:** büyük harf, altında pirinç çizgi, sonunda ↗ (referanstaki gibi).
- **Fark hesabı:** girişler solda; sonuç sağda büyük italik rakam, altında ince ölçü
  çubuğu (sille = bugünkü değer, taralı pirinç = masraf, firuze = fark).
- **Soru-cevap:** akordeon değil, hepsi açık.
- **Form alanları:** yalnızca alt çizgi; odakta pirinç.

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
- Her başlığın üstünde etiket. Büyük harf etiket yalnızca gezinme, form ve fark
  hesabında kullanılır.

## Gerçek içerik gelince

- **Proje fotoğrafları:** "Bir evin üç hali" bölümündeki bugun.jpg / yenileme.jpg /
  sonra.jpg aynı evden, aynı açıdan çekilmiş fotoğraflarla değiştirilirse bölüm gerçek
  bir önce/sonra hikâyesine dönüşür; o zaman altındaki "temsilî" notu kaldırın.
- **Rakamlar:** `assets/js/config.js` içindeki ilçe m² fiyatları, durum katsayıları ve
  m² yenileme maliyetleri ofisin kendi rakamlarıyla güncellenmeli.
