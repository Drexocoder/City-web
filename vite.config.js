import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset URLs so the build also works when served from a subpath
  // (GitHub Pages project sites, a reverse-proxied /game/ prefix, file://).
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5180,
    strictPort: true,
    hmr: { overlay: false },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    // Let browsers fetch the app shell quickly and load modules on demand.
    modulePreload: { polyfill: false },
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/')) return 'three-core';
        },
      },
    },
  },
  assetsInclude: ['**/*.hdr', '**/*.exr', '**/*.glb', '**/*.gltf', '**/*.ktx2', '**/*.bin'],
});
