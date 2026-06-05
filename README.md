# Inovtek Cipta Digital

Frontend website Inovtek Cipta Digital berbasis Next.js, React, dan PWA.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Lalu buka `http://127.0.0.1:3000/#home`.

## Build

```bash
npm run build
```

## Catatan

- Asset logo Inovtek tersimpan di `public/assets` dan `assets`.
- PWA manifest tersedia di `public/manifest.webmanifest`.
- Service worker memakai strategi network-first untuk dokumen agar cache lokal tidak membuat layar blank saat development.
