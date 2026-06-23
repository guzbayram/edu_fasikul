# EduFasikül

Lise öğrencileri için tablet+kalem destekli, gerçek zamanlı senkronizasyonlu PDF çalışma uygulaması.

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## Build

```bash
npm run build
```

`dist/` klasörüne üretilir, GitHub Pages için hazır.

## Mimari

- **Firebase:** Firestore (gerçek zamanlı sync) + Auth
- **PDF.js:** PDF render (dosyalar sadece lokalinizde, sunucuya gitmez)
- **Fabric.js:** Canvas üzeri çizim
- **Vite:** Build pipeline + HMR

## Deploy

`main` branch'e push → GitHub Actions otomatik build → `gh-pages` branch → canlı site.
