import { useState, useEffect } from 'react';

function Produk() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: '', category_id: '', price: '', description: '', is_available: true });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://192.168.100.3:3001/api/menu'); // existing endpoint
      const data = await res.json();
      if (res.ok && data.success) setProducts(data.data);
    } catch (err) {
      console.error('Error fetching products', err);
      setError('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://192.168.100.3:3001/api/categories');
      const data = await res.json();
      if (res.ok && data.success) setCategories(data.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleFileChange = (file) => {
    setImageFile(file);
    if (!file) { setImagePreview(''); return; }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category_id || !form.price) return setError('Nama, kategori, dan harga wajib diisi');
    setSaving(true); setError('');
    try {
      let imageUrl = null;
      if (imageFile) {
        const fd = new FormData();
        fd.append('file', imageFile);
        const up = await fetch('http://192.168.100.3:3001/api/upload', { method: 'POST', body: fd });
        const upData = await up.json();
        if (!up.ok || !upData.success) {
          setError(upData.message || `Gagal mengunggah gambar (${up.status})`);
          setSaving(false);
          return;
        }
        imageUrl = upData.url;
      }

      const res = await fetch('http://192.168.100.3:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category_id: parseInt(form.category_id),
          price: parseFloat(form.price),
          description: form.description,
          image_url: imageUrl,
          is_available: !!form.is_available
        })
      });
        let data;
        try {
          data = await res.json();
        } catch (parseErr) {
          console.error('Non-JSON response while creating product', parseErr);
          setError(`Server returned status ${res.status} ${res.statusText}`);
          setSaving(false);
          return;
        }

        if (res.ok && data.success) {
          setForm({ name: '', category_id: '', price: '', description: '', is_available: true });
          setImageFile(null);
          setImagePreview('');
          fetchProducts();
        } else {
          setError(data.message || 'Gagal menambahkan produk');
        }
    } catch (err) {
      console.error(err);
      setError('Gagal menghubungi server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus produk ini?')) return;
    try {
      const res = await fetch(`http://192.168.100.3:3001/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) fetchProducts(); else alert(data.message || 'Gagal menghapus produk');
    } catch (err) {
      console.error(err);
      alert('Gagal menghubungi server');
    }
  };

  return (
    <div className="admin-manage-layout">
      <div className="admin-manage-left">
        <h3>Tambah Produk</h3>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleCreate} className="simple-form">
          <div className="form-group">
            <label className="form-label">Nama Produk</label>
            <input className="form-input" value={form.name} onChange={e => handleChange('name', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Kategori</label>
            <select className="form-input" value={form.category_id} onChange={e => handleChange('category_id', e.target.value)}>
              <option value="">-- Pilih Kategori --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Harga (IDR)</label>
            <input type="number" className="form-input" value={form.price} onChange={e => handleChange('price', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Deskripsi</label>
            <textarea className="form-input" value={form.description} onChange={e => handleChange('description', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Gambar</label>
            <input type="file" accept="image/*" className="form-input" onChange={e => handleFileChange(e.target.files[0])} />
            {imagePreview && (
              <div style={{ marginTop: 8 }}>
                <img src={imagePreview} alt="preview" style={{ width: 140, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.03)' }} />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Tersedia</label>
            <select className="form-input" value={form.is_available ? '1' : '0'} onChange={e => handleChange('is_available', e.target.value === '1')}>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>

          <button className="auth-btn" disabled={saving}>{saving ? 'Menyimpan...' : 'Tambah Produk'}</button>
        </form>
      </div>

      <div className="admin-manage-right">
        <h3>Daftar Produk</h3>
        {loading ? (
          <div className="spinner" />
        ) : products.length === 0 ? (
          <div className="empty-state">Belum ada produk</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Gambar</th>
                  <th>Nama</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Tersedia</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>
                      {p.image_url ? (
                        <img
                          src={p.image_url.replace('localhost:3001', '192.168.100.3:3001')}
                          alt={p.name}
                          style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}
                        />
                      ) : (
                        <div style={{ width: 80, height: 60, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                          No Image
                        </div>
                      )}
                    </td>
                    <td style={{ minWidth: 220 }}>{p.name}</td>
                    <td>{p.category_name || (p.category && p.category.name) || '-'}</td>
                    <td>Rp {Number(p.price).toLocaleString('id-ID')}</td>
                    <td>{p.is_available ? 'Ya' : 'Tidak'}</td>
                    <td className="table-actions">
                      <button className="btn-small" onClick={() => handleDelete(p.id)}>Hapus</button>
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

export default Produk;
