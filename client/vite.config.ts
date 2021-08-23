import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname, 'nod_modules')
        }
    },
    server: {
        port: 3002
    },
    build: {
        rollupOptions: {
            output: {
                name: 'app',
                entryFileNames: `uiext/[name].js`,
                chunkFileNames: `uiext/[name].js`,
                assetFileNames: `uiext/[name].[ext]`,
            }
        }
    },
    esbuild: {
        globalName: 'app'
    }
})