const CACHE_NAME = "inovtek-pwa-v6";
const APP_SHELL = [
  "/manifest.webmanifest",
  "/assets/inovtek-app-icon.svg",
  "/assets/inovtek-logo-mark.svg",
  "/assets/inovtek-lms-icon.png",
  "/assets/inovtek-lms-cover.png",
  "/assets/inovtek-lms-screen-1.png",
  "/assets/inovtek-lms-screen-2.png",
  "/assets/inovtek-lms-screen-3.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate" || event.request.destination === "document") {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request).then((response) => {
      if (!response || response.status !== 200 || response.type !== "basic") return response;
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return Response.error();
    }))
  );
});
