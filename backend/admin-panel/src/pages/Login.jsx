import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('%c[ADMIN ACCESS] Mengakses Halaman Login Admin', 'color: #00bcd4; font-weight: bold; font-size: 12px;');
    // If already logged in, redirect to dashboard
    if (localStorage.getItem('adminToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Harap isi semua kolom!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Username atau password salah!');
      }
    } catch (err) {
      console.error('Error saat login:', err);
      setError('Gagal terhubung ke server backend (port 3001).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🔑</span>
          <h1 className="auth-title">QuickOrder Resto</h1>
          <p className="auth-subtitle">Masuk ke Panel Kasir / Admin</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Menghubungkan...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
