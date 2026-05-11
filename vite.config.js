import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configure base path for different deployment environments
// GitHub Pages: '/Noosphere-Research/'
// Docker/Local: '/'
export default defineConfig({
    plugins: [react()],
    base: '/Noosphere-Research/',
})

