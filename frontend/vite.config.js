import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const customConsoleLogger = () => ({
  name: 'custom-console-logger',
  configureServer(server) {
    server.httpServer?.once('listening', () => {
      setTimeout(() => {
        console.log('\n  ✨ Akses Cepat Aplikasi:');
        console.log('  ➜  Customer Page: http://localhost:5173/');
        console.log('  ➜  Admin Login:   http://localhost:5173/admin/login\n');
      }, 100);
    });
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), customConsoleLogger()],
  server: {
    host: true, // Exposes the server to the local network so mobile phones can connect
    port: 5173
  }
})
