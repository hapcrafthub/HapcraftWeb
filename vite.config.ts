import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Only precache small critical assets (JS, CSS, HTML, tiny images)
        globPatterns: ["**/*.{js,css,html,ico,svg,woff2}"],
        // Runtime-cache images and videos on first request, serve from cache after
        runtimeCaching: [
          {
            // All local images served by Vercel
            urlPattern: /\/assets\/.*\.(?:png|jpg|jpeg|webp|gif|svg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "local-images",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cloudinary-media",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: "Hapcraft Media",
        short_name: "Hapcraft",
        start_url: "/",
        scope: "/",
        id: "/",
        theme_color: "#0a0a0a",
        background_color: "#0a0a0a",
        display: "standalone",
        icons: [
          { src: "/assets/logo.png", sizes: "192x192", type: "image/png" },
          { src: "/assets/logo.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "react-router-dom"],
  },
});
