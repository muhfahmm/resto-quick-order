import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
