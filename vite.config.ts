import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { getCanonicalRoutes, ROUTE_ALIASES, renderRouteHtml } from './scripts/route-seo-data.mjs';

function devSubpageSeoPlugin() {
  return {
    name: 'tulc-dev-subpage-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const rawUrl = ctx?.originalUrl || ctx?.path || '/';
        const cleanPath = rawUrl.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
        if (cleanPath === '/' || cleanPath === '/index.html') return html;

        const canonicalTarget = ROUTE_ALIASES[cleanPath.toLowerCase()] || cleanPath.toLowerCase();
        const routes = getCanonicalRoutes();
        const match = routes.find((r) => r.path.toLowerCase() === canonicalTarget);
        if (!match) return html;

        return renderRouteHtml(html, match);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devSubpageSeoPlugin()],
  define: {
    'process.env.ADMIN_EMAIL': JSON.stringify(process.env.VITE_ADMIN_EMAIL || 'suchita@theunboundedleadership.com'),
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
