// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Set the build output directory to 'build'
    outDir: 'dist', // Vercel expects the output directory to be 'build'
    // Public directory configuration
    assetsDir: 'assets', // You can choose to customize the assets directory
    emptyOutDir: true, // Clears the output directory before building
  },
});
