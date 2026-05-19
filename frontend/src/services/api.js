// Auto-detect Environment: Use local backend for development, and relative path for production
const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:3005/api';

// Fetch all restaurant menu items
export async function getMenuItems() {
  const response = await fetch(`${API_URL}/menu`);
  return await response.json();
}

// Create new food order
export async function placeOrder(orderData) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await response.json();
}
