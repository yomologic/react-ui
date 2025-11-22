import { defineConfig } from 'tsup';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles.css'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  async onSuccess() {
    // Copy base.css to dist
    const baseCssSrc = path.join(__dirname, 'src/styles/base.css');
    const baseCssDest = path.join(__dirname, 'dist/base.css');
    
    if (fs.existsSync(baseCssSrc)) {
      fs.copyFileSync(baseCssSrc, baseCssDest);
      console.log('✅ Copied base.css to dist/');
    }
    
    // Ensure themes directory exists (generated theme CSS will be created by script)
    const themesDir = path.join(__dirname, 'dist/themes');
    if (!fs.existsSync(themesDir)) {
      fs.mkdirSync(themesDir, { recursive: true });
    }
  },
});
