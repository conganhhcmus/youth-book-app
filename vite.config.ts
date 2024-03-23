import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        exclude: ['js-big-decimal'],
        esbuildOptions: {
            target: "esnext",
        },
    },
    build: {
        target: 'esnext'
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: { postcss: './postcss.config.js' },
});
