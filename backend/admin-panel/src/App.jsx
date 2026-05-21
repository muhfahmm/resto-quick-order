import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
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
        <Route 
          path="/dashboard" 
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
