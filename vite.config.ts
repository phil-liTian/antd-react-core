import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
const root = process.cwd();
// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
	},
	resolve: {
		alias: {
      '@': resolve(root, 'src'),
      '@c': resolve(root, 'src/components'),
		},
	},
});
