/*
 * Sitedeki değişken bilgilerin tek yeri.
 * Telefon, adres ve hesap varsayımlarını yalnızca burada değiştirin;
 * sayfadaki tüm bağlantılar ve fark hesabı buradan okur.
 */
window.SITE = {
  firma: "Kesit Yapı",

  // DÜZENLE: gerçek iletişim bilgileri
  telefonGorunen: "0 (332) 000 00 00",
  telefonArama: "+903320000000",      // tel: bağlantısı için, boşluksuz
  whatsapp: "905000000000",           // wa.me için: ülke kodu + numara, + ve boşluk yok
  adres: "Selçuklu, Konya",
  calismaSaatleri: "Pazartesi–Cumartesi, 08.30–18.30",

  /*
   * Hero görseli. Boş bırakılırsa assets/img/hero.jpg (temsilî Unsplash fotoğrafı)
   * görünür. Kendi işinizin fotoğrafını eklemek için dosyayı assets/img/ altına
   * koyup yolunu yazın. Video verilirse görsel, video yüklenene kadar kapak olarak
   * kullanılır. (Görsel/video üretmek için: HERO-GORSEL.md)
   */
  heroGorsel: "",   // örnek: "assets/img/hero.jpg"
  heroVideo: "",    // örnek: "assets/img/hero.mp4"

  /*
   * Fark hesabı varsayımları.
   *
   * m2Fiyat: ilçedeki ortalama satılık konut m² fiyatı (TL). Yenilenmiş evin
   * piyasaya bu fiyattan çıkabileceği varsayılıyor. Başlangıç değerleri emlakjet'in
   * Eylül 2026 Konya satılık daire verisinden yuvarlandı:
   * https://www.emlakjet.com/emlak-piyasasi/satilik-daire/konya
   *
   * durumlar: evin bugünkü hali.
   *   katsayi  → bugünkü değer = alan × m2Fiyat × katsayi
   *   maliyet  → o haldeki bir evi yenilemenin m² başına tahmini maliyeti (TL)
   * DÜZENLE: bu iki satırı ofisin kendi geçmiş işlerine göre güncelleyin.
   */
  verininTarihi: "Eylül 2026",
  ilceler: {
    selcuklu: { ad: "Selçuklu", m2Fiyat: 34700 },
    meram:    { ad: "Meram",    m2Fiyat: 32900 },
    karatay:  { ad: "Karatay",  m2Fiyat: 29900 }
  },
  durumlar: {
    bakimli:   { ad: "Bakımlı ama eski",  katsayi: 0.86, maliyet: 4500 },
    yipranmis: { ad: "Yıpranmış",         katsayi: 0.64, maliyet: 9000 },
    agir:      { ad: "Ağır yıpranmış",    katsayi: 0.55, maliyet: 13000 }
  }
};
