# Sihirli Bahçe 🌷

Çocuklar için dokunmatik ekranda da çalışan, animasyonlu ve sesli küçük bir web oyunu.

- **Çimenlere dokun** → çiçek büyür. Her çiçek bir nota çalar; soldan sağa doğru notalar incelir, yani bahçe ksilofon gibi çalınır.
- **Kelebeklere dokun** → takla atarlar.
- 🦋 **Kelebek** ekle, 🌙 **Gece / Gündüz** arasında geç (gece çiçekler parlar, yıldızlar çıkar), 🌈 **Gökkuşağı** çiz, 🧹 **Temizle**, 🔊 **Ses** aç/kapat.
- 10, 25, 50 ve 100 çiçekte konfeti ile kutlama.

Canlı adres (Pages açıldıktan sonra): https://yumusss.github.io/Testproject/

## Teknolojiler

[Vite](https://vite.dev) + React + TypeScript, animasyonlar için [Motion](https://motion.dev). Sesler Web Audio API ile üretilir, ses dosyası yok.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173/Testproject/
```

Diğer komutlar:

```bash
npm run build          # dist/ klasörüne üretim build'i
npm run preview        # build'i yerelde önizle
npm run lint           # oxlint
npm run format         # Prettier ile biçimlendir
npm run format:check
```

## GitHub Pages'te yayınlama (ücretsiz)

`.github/workflows/deploy.yml` her `main` push'unda siteyi derleyip GitHub Pages'e yükler. PR'larda sadece lint + build çalışır.

**Bir kereye mahsus ayar:** Repo → **Settings → Pages → Build and deployment → Source** alanını **GitHub Actions** yapın. Sonra `main`'e bir push gelince (veya Actions sekmesinden "Deploy to GitHub Pages" iş akışını elle çalıştırınca) site yukarıdaki adreste yayında olur.

> Repo adını değiştirirseniz `vite.config.ts` içindeki `base: '/Testproject/'` değerini de yeni adla güncelleyin.
