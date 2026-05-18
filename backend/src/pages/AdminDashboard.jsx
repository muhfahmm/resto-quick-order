import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import ManageQrcodes from './ManageQrcodes';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category_id: '' });
  const [imageFile, setImageFile] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [activeTab, setActiveTab] = useState('products');
  const [tableInput, setTableInput] = useState('1');
  const [qrItems, setQrItems] = useState([]);
  const [qrError, setQrError] = useState(null);
  const [qrcodes, setQrcodes] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchQrcodes();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://${window.location.hostname}:3005/api/menu`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`http://${window.location.hostname}:3005/api/category`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQrcodes = async () => {
    try {
      const res = await fetch(`http://${window.location.hostname}:3005/api/qrcodes`);
      const data = await res.json();
      setQrcodes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://${window.location.hostname}:3005/api/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    try {
      await fetch(`http://${window.location.hostname}:3005/api/category`, {
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
        await fetch(`http://${window.location.hostname}:3005/api/menu/${editingId}`, {
          method: 'PUT',
          body: submitData
        });
      } else {
        await fetch(`http://${window.location.hostname}:3005/api/menu`, {
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
          await fetch(`http://${window.location.hostname}:3005/api/menu/${id}`, { method: 'DELETE' });
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
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-8 flex-1">
          {activeTab === 'categories' && (
            <ManageCategory
              categories={categories}
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              handleAddCategory={handleAddCategory}
            />
          )}

          {activeTab === 'products' && (
            <ManageProducts
              products={products}
              categories={categories}
              editingId={editingId}
              setEditingId={setEditingId}
              formData={formData}
              setFormData={setFormData}
              imageFile={imageFile}
              setImageFile={setImageFile}
              handleAddProduct={handleAddProduct}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleInputChange={handleInputChange}
            />
          )}

          {activeTab === 'orders' && (
            <ManageOrders
              orders={orders}
              updateOrderStatus={updateOrderStatus}
            />
          )}

          {activeTab === 'qrcodes' && (
            <ManageQrcodes
              tableInput={tableInput}
              setTableInput={setTableInput}
              qrItems={qrItems}
              setQrItems={setQrItems}
              qrError={qrError}
              setQrError={setQrError}
              qrcodes={qrcodes}
              fetchQrcodes={fetchQrcodes}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
