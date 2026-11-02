# Video notları: "AI slop olmayan web sitesi"

Kaynak: Jack Roberts, *Claude Design Now Builds Beautiful $10,000 Websites (NO AI Slop)*
https://youtu.be/VwGrXe2ricE

Videonun kendisi bu ortamdan açılamadı (YouTube bulut sunucularını engelliyor). Notlar,
videonun bölüm bölüm transkript özetinden çıkarıldı.

## 1. Sorun neden çıkıyor

- Herkes benzer prompt yazıyor, model de benzer sonuç veriyor: aynı gradyan, üç özellik
  kartı, buzlu cam kartlar, genel geçer başlıklar.
- En çok gözden kaçan ipucu yazı tipi. Varsayılan font, siteyi hemen "yapay zekâ yaptı"
  diye ele veriyor.
- Çözüm tek bir prompt değil, bir **tasarım sistemi**: model "iyi tasarım nedir" bilmiyor,
  ona referans ve kural vermek gerekiyor.

## 2. Referans bul, kopyalama

- İyi tasarlanmış siteleri toplayan bir galeriden işe yakın 2-3 referans seç.
- Bir referansın tasarım sistemini ilham olarak al, kendi markana uyarla (videoda
  Duolingo'nun yeşili maviye çevriliyor).
- Tek siteyi kopyalama; birkaç referansı karıştır ve kendi markana göre değiştir.

## 3. Tasarım döngüsü

- "Altın standart" bir referans ver, ondan ilham alan ama kopyalamayan **özgün** bir
  karakter / görsel dil iste.
- Döngüde geçti/kaldı diyen "hakemler" olsun; kalırsa tekrar dene. Böylece model sonsuz
  "iyileştirme" önermiyor.
- Önce küçük bir pilot yap, tarzı gör, sonra tamamını kur.
- Yaratıcı kararlar insanda kalsın: yapay zekâ tekrarı azaltır, yaratıcılığı değil.
- Görsel ve video üretimi (videoda Higgsfield) siteye canlılık katıyor.

## 4. Tipografi

- Font seçimi algılanan kaliteyi en çok değiştiren şey.
- Fontları gerçek düzende önizleyerek seç; markanın konumuna uyanı bul (güven, sağlamlık vb.).
- **Lisansı kontrol et.** Bazı fontlar yalnızca kişisel kullanım için ücretsiz.

## 5. Metin (en az tasarım kadar önemli)

Kötü metin iyi tasarımı da batırır. Metni şu süzgeçten geçir:

- Yapay zekâ yazısı kalıplarını sil (yasaklı kelime listesi kullan).
- Sektördeki en iyi örneklerin ne yaptığına bak.
- Beş ilke:
  1. Ziyaretçiyi düşündürme (Steve Krug).
  2. Önce acıyı adlandır (Daniel Priestley).
  3. Her ekranda tek istek, tek düşünce.
  4. Somut, belirli kelimeler kullan.
  5. Mesaj bir bakışta anlaşılacak kadar basit olsun.
- Videodaki örnekler: "Get started" → "Start your first lesson"; "5 minutes wherever you
  are" → "5 minutes on the train counts". Yani genel ifadeyi, ne olacağını söyleyen somut
  ifadeyle değiştir.

## 6. Kapanış uyarıları

- Font lisanslarını ticari kullanımdan önce doğrula.
- Tasarım sistemini bir dosyada tut ki yeni sayfalar tutarlı kalsın (bu repoda: `DESIGN.md`).

## Bu siteye nasıl uyguladık

| Videodaki kural | Bu sitede |
|---|---|
| Tasarım sistemi ver | `DESIGN.md`: renkler, yazı, bileşenler, yasak listesi |
| Kopyalama, kendi markanı kur | (İlk sürüm) Renkler Konya'dan; ikinci sürümde görsel dil ATELIER referansına geçti |
| Varsayılan font kullanma | Tek aile: Archivo, genişlik ekseniyle (dar başlık, normal metin); siteyle birlikte barındırılıyor, OFL lisanslı |
| Önce acıyı adlandır | Başlık: eski ev, olduğundan ucuza gidiyor |
| Her ekranda tek istek | Tek eylem her yerde aynı adla: "Keşif randevusu iste" |
| Somut dil | Hesap makinesi gerçek ilçe m² ortalamalarıyla çalışıyor; "fark çıkmazsa söyleriz" |
| Görsel üretim | Stok fotoğraf yerine elle çizilmiş SVG ev cephesi, önce/sonra kaydırıcısı |
| Sahte sosyal kanıt yok | Uydurma yorum, sayaç, "500+ mutlu müşteri" yok; gerçek projeler gelince eklenecek |

---

# İkinci video: "Stop Building AI Slop Websites"

Kaynak: Luke Carter, https://youtu.be/uPIIJDmq5OU (açıklama, bölüm başlıkları ve
video karelerinden çıkarıldı; transkripte ulaşılamadı).

- Yapay zekâ sitelerinin hepsi aynı görünüyor çünkü tasarım kodla başlıyor. Bunun
  yerine **önce görsel**: bir görüntü modeli (GPT Image 2) sanat yönetmeni olur,
  hero görselini o üretir; kod (Codex) bu görsele sadık kalır.
- İki prompt: (1) hero için referans görsel, (2) aynı sahnenin yazısız temiz arka plan
  versiyonu.
- "Fidelity pass": kodlanan sayfa görselle piksel piksel karşılaştırılır, özellikle mobilde.
- Arka plan, Higgsfield üzerinden Seedance 2.0 ile hafifçe hareketlendirilir.
- Bütün sayfalar için bir "art bible" (sanat kitabı) prompt'u: renk, ışık, yazı, ton.
- Videodaki örnek site "ATELIER": koyu sıcak zemin, sinematik iç mekân fotoğrafı,
  ince italik serif başlık ("Homes with a point of view"), aralıklı büyük harf
  gezinme, dikey yan menü, yuvarlak monogram mühür, pirinç rengi ince çerçeve.

Bu repoda: görsel dil bu siteye göre yeniden kuruldu (`DESIGN.md`), hero görseli
üretme talimatı `HERO-GORSEL.md` içinde.
