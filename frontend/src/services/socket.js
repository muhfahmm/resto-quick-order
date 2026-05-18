import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3005';

// Initialize WebSocket client connection to backend
export const socket = io(SOCKET_URL, {
  autoConnect: false
});
