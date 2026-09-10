import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function copyDataPlugin() {
  return {
    name: 'copy-data',
    apply: 'build',
    buildStart() {
      const src = path.resolve(__dirname, 'data', 'data.json');
      const destDir = path.resolve(__dirname, 'public', 'data');
      const dest = path.join(destDir, 'data.json');
      if (fs.existsSync(src)) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(src, dest);
      }
    },
    closeBundle() {
      const src = path.resolve(__dirname, 'data', 'data.json');
      const destDir = path.resolve(__dirname, 'dist', 'data');
      const dest = path.join(destDir, 'data.json');
      if (fs.existsSync(src)) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(src, dest);
        const nojekyll = path.resolve(__dirname, 'dist', '.nojekyll');
        if (!fs.existsSync(nojekyll)) fs.writeFileSync(nojekyll, '');
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [copyDataPlugin()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
