import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
  registerType: "autoUpdate",
  manifest: {
    name: "GitHub Repository Analyzer",
    short_name: "Analyzer",
    start_url: ".",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    screenshots: [
      {
        src: "/screenshot1.png",
        sizes: "540x720",
        type: "image/png",
        label: "Home Page"
      }
    ]
  }
})

  ]
});

