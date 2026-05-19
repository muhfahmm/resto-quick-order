import { io } from 'socket.io-client';

// Auto-detect Environment: Use local backend for development, and relative root for production
const SOCKET_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:3005';

// Initialize WebSocket client connection to backend
export const socket = io(SOCKET_URL, {
  autoConnect: false
});
