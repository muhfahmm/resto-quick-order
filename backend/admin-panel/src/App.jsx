import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import DashboardKasir from './pages/DashboardKasir';
import './index.css';

// Guard component to protect dashboard access
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/riwayat" replace />} />
        <Route path="/dashboard/antrean" element={<Navigate to="/dashboard/riwayat" replace />} />
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <DashboardKasir />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
