// Socket.io handlers for real-time order notifications
module.exports = (io, socket) => {
  socket.on('join_kitchen_room', () => {
    socket.join('kitchen_room');
    console.log(`Socket ${socket.id} joined kitchen updates room.`);
  });
  
  socket.on('update_status', (data) => {
    const { orderId, status } = data;
    console.log(`Order ${orderId} updated to ${status}`);
    // Broadcast status update back to customer client
    io.emit('order_status_updated', { orderId, status });
  });
};
