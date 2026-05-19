import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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

// Force restart Vite dev server
export default defineConfig({
  plugins: [react(), customConsoleLogger()],
  server: {
    host: true, // Exposes the server to the local network so mobile phones can connect
    port: 5173
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom')
    }
  }
})
