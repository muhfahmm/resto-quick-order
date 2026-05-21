import { useState, useEffect } from 'react';

function Kategori() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://192.168.100.3:3001/api/categories');
      const data = await res.json();
      if (res.ok && data.success) setCategories(data.data);
    } catch (err) {
      console.error('Error fetching categories', err);
      setError('Gagal memuat kategori');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return setError('Nama kategori wajib diisi');
    setSaving(true);
    setError('');
    try {
      const res = await fetch('http://192.168.100.3:3001/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        console.error('Non-JSON response while creating category', parseErr);
        setError(`Server returned status ${res.status} ${res.statusText}`);
        setSaving(false);
        return;
      }

      if (res.ok && data.success) {
        setName('');
        setDescription('');
        fetchCategories();
      } else {
        setError(data.message || 'Gagal menambahkan kategori');
      }
    } catch (err) {
      console.error(err);
      setError('Gagal menghubungi server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori ini? Aksi tidak dapat dibatalkan.')) return;
    try {
      const res = await fetch(`http://192.168.100.3:3001/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchCategories();
      } else {
        alert(data.message || 'Gagal menghapus kategori');
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghubungi server');
    }
  };

  return (
    <div className="admin-manage-layout">
      <div className="admin-manage-left">
        <h3>Tambah Kategori</h3>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleCreate} className="simple-form">
          <div className="form-group">
            <label className="form-label">Nama Kategori</label>
            <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Deskripsi (opsional)</label>
            <textarea className="form-input" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <button className="auth-btn" disabled={saving}>{saving ? 'Menyimpan...' : 'Tambah Kategori'}</button>
        </form>
      </div>

      <div className="admin-manage-right">
        <h3>Daftar Kategori</h3>
        {loading ? (
          <div className="spinner" />
        ) : categories.length === 0 ? (
          <div className="empty-state">Belum ada kategori</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.id}>
                    <td>{idx + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description || '-'}</td>
                    <td className="table-actions">
                      <button className="btn-small" onClick={() => handleDelete(cat.id)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Kategori;
