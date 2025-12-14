import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace "acidgreenservers" with your GitHub username if needed
export default defineConfig({
    plugins: [react()],
    base: '/the-lucid-engine/',
})
