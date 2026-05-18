import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category_id: '' });
  const [imageFile, setImageFile] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/menu');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:3005/api/category');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    try {
      await fetch('http://localhost:3005/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      });
      setNewCategoryName('');
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('category_id', formData.category_id);
      
      if (imageFile) {
        submitData.append('image', imageFile);
      } else if (editingId && formData.image_url) {
        submitData.append('image_url', formData.image_url);
      }

      if (editingId) {
        await fetch(`http://localhost:3005/api/menu/${editingId}`, {
          method: 'PUT',
          body: submitData
        });
      } else {
        await fetch('http://localhost:3005/api/menu', {
          method: 'POST',
          body: submitData
        });
      }
      setEditingId(null);
      setFormData({ name: '', price: '', category_id: '' });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, price: product.price, category_id: product.category_id, image_url: product.image_url });
    setImageFile(null);
    setActiveTab('products');
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')){
        try {
          await fetch(`http://localhost:3005/api/menu/${id}`, { method: 'DELETE' });
          fetchProducts();
        } catch (err) {
          console.error(err);
        }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="flex justify-between items-center bg-slate-900 text-white px-8 py-4 shadow-md">
        <h2 className="text-xl font-bold tracking-tight">Admin Dashboard</h2>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </nav>

      <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col pt-4 shadow-sm">
          <button 
            onClick={() => setActiveTab('products')} 
            className={`px-8 py-4 text-left transition-all font-medium ${activeTab === 'products' ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
          >
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('categories')} 
            className={`px-8 py-4 text-left transition-all font-medium ${activeTab === 'categories' ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
          >
            Manage Categories
          </button>
        </aside>

        <div className="p-8 flex-1 flex flex-col items-center sm:items-start">
          {activeTab === 'categories' && (
            <div className="w-full max-w-2xl">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Manage Categories</h3>
                <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
                  <input 
                    type="text" 
                    placeholder="New Category Name" 
                    value={newCategoryName} 
                    onChange={e => setNewCategoryName(e.target.value)} 
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                  />
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Add</button>
                </form>
                <div className="flex gap-2 flex-wrap">
                  {categories.length === 0 ? <p className="text-slate-500 text-sm">No categories yet.</p> : null}
                  {categories.map(c => (
                    <span key={c.id} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="flex gap-8 flex-wrap w-full">
              <div className="flex-1 min-w-[300px] max-w-[400px]">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                  <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Product Name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input 
                      type="number" 
                      name="price" 
                      placeholder="Price" 
                      step="0.01" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <select 
                      name="category_id" 
                      value={formData.category_id} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="" className="text-slate-500">Select Category</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])} 
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                    {editingId && formData.image_url && !imageFile && (
                      <div className="text-xs text-slate-500">
                        Current Image: <a href={formData.image_url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">View</a>
                      </div>
                    )}
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors">
                      {editingId ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingId && (
                      <button 
                        type="button" 
                        onClick={() => { setEditingId(null); setFormData({ name: '', price: '', category_id: '' }); setImageFile(null); }} 
                        className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </form>
                </div>
              </div>

              <div className="flex-[2] min-w-[400px]">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Product List</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                          <th className="py-3 px-4 font-semibold">Image</th>
                          <th className="py-3 px-4 font-semibold">Name</th>
                          <th className="py-3 px-4 font-semibold">Category</th>
                          <th className="py-3 px-4 font-semibold">Price</th>
                          <th className="py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4">
                              {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                              ) : (
                                <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500">No Img</div>
                              )}
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-800">{product.name}</td>
                            <td className="py-3 px-4">
                              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">{product.category_name}</span>
                            </td>
                            <td className="py-3 px-4 font-medium text-green-600">${Number(product.price).toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <button onClick={() => handleEdit(product)} className="text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md text-sm font-medium transition-colors mr-2">Edit</button>
                              <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors">Delete</button>
                            </td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr>
                            <td colSpan="5" className="py-8 text-center text-slate-500">No products found. Add one to get started!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
