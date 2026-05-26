import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget = env.VITE_API_BASE_URL || 'http://localhost:3001';

  return {
    plugins: [react()],
    server: {
      host: true, // Listen on all local IP addresses (LAN)
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
  };
});
