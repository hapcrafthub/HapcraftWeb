// The previous version of this site (React + Vite) installed a caching service worker at this
// address. Returning visitors' browsers still have it, and it would keep serving the old site.
// This replacement takes over, clears the old caches, removes itself, and reloads open tabs.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
