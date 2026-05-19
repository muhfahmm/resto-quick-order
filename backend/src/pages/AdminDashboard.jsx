import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import ManageQrcodes from './ManageQrcodes';

// Modal imports
import EditProductModal from '../modals/EditProductModal';
import DeleteProductModal from '../modals/DeleteProductModal';
import EditCategoryModal from '../modals/EditCategoryModal';
import DeleteCategoryModal from '../modals/DeleteCategoryModal';
import DeleteOrderModal from '../modals/DeleteOrderModal';
import DeleteQrcodeModal from '../modals/DeleteQrcodeModal';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  
  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [qrcodes, setQrcodes] = useState([]);
  
  // Form/Utility States
  const [newCategoryName, setNewCategoryName] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '', category_id: '' });
  const [imageFile, setImageFile] = useState(null);
  const [tableInput, setTableInput] = useState('1');
  const [qrItems, setQrItems] = useState([]);
  const [qrError, setQrError] = useState(null);

  // Modal Visibility & Selection States
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);
  
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [selectedProductForDelete, setSelectedProductForDelete] = useState(null);

  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState(null);

  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState(null);

  const [isDeleteOrderOpen, setIsDeleteOrderOpen] = useState(false);
  const [selectedOrderForDelete, setSelectedOrderForDelete] = useState(null);

  const [isDeleteQrcodeOpen, setIsDeleteQrcodeOpen] = useState(false);
  const [selectedQrcodeForDelete, setSelectedQrcodeForDelete] = useState(null);

  const tabMap = {
    produk: 'products',
    kategori: 'categories',
    pesanan: 'orders',
    qrcode: 'qrcodes'
  };

  const revTabMap = {
    products: 'produk',
    categories: 'kategori',
    orders: 'pesanan',
    qrcodes: 'qrcode'
  };

  const [activeTab, setActiveTab] = useState(() => {
    if (tab && tabMap[tab]) {
      return tabMap[tab];
    }
    return localStorage.getItem('adminActiveTab') || 'products';
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchQrcodes();
    fetchOrders();
  }, []);

  // Sync activeTab to URL and localStorage
  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
    const urlTab = revTabMap[activeTab];
    if (tab !== urlTab) {
      navigate(`/admin/dashboard/${urlTab}`, { replace: true });
    }
  }, [activeTab, tab, navigate]);

  // Sync URL tab parameter changes back to state
  useEffect(() => {
    if (tab && tabMap[tab]) {
      setActiveTab(tabMap[tab]);
    } else if (!tab) {
      const urlTab = revTabMap[activeTab];
      navigate(`/admin/dashboard/${urlTab}`, { replace: true });
    }
  }, [tab]);

  // Fetch Actions
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

  // Create/Add Operations
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('category_id', formData.category_id);
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      await fetch(`http://${window.location.hostname}:3005/api/menu`, {
        method: 'POST',
        body: submitData
      });
      setFormData({ name: '', price: '', category_id: '' });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit/Update Callback Operations
  const handleUpdateProduct = async (id, submitData) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/menu/${id}`, {
        method: 'PUT',
        body: submitData
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/category/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      fetchCategories();
      fetchProducts(); // Update products layout mapping
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Callback Operations (confirmed by Modals)
  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/menu/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/category/${id}`, { method: 'DELETE' });
      fetchCategories();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/orders/${id}`, { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQrcode = async (id) => {
    try {
      await fetch(`http://${window.location.hostname}:3005/api/qrcodes/${id}`, { method: 'DELETE' });
      fetchQrcodes();
    } catch (err) {
      console.error(err);
    }
  };

  // Navigations
  const handleLogout = () => {
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="flex justify-between items-center bg-slate-900 text-white px-8 py-4 shadow-md">
        <h2 className="text-xl font-bold tracking-tight">Admin Dashboard</h2>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
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
              onOpenEditModal={(category) => {
                setSelectedCategoryForEdit(category);
                setIsEditCategoryOpen(true);
              }}
              onOpenDeleteModal={(category) => {
                setSelectedCategoryForDelete(category);
                setIsDeleteCategoryOpen(true);
              }}
            />
          )}

          {activeTab === 'products' && (
            <ManageProducts
              products={products}
              categories={categories}
              formData={formData}
              setFormData={setFormData}
              imageFile={imageFile}
              setImageFile={setImageFile}
              handleAddProduct={handleAddProduct}
              onOpenEditModal={(product) => {
                setSelectedProductForEdit(product);
                setIsEditProductOpen(true);
              }}
              onOpenDeleteModal={(product) => {
                setSelectedProductForDelete(product);
                setIsDeleteProductOpen(true);
              }}
              handleInputChange={handleInputChange}
            />
          )}

          {activeTab === 'orders' && (
            <ManageOrders
              orders={orders}
              updateOrderStatus={updateOrderStatus}
              onOpenDeleteModal={(order) => {
                setSelectedOrderForDelete(order);
                setIsDeleteOrderOpen(true);
              }}
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
              onOpenDeleteModal={(qrcode) => {
                setSelectedQrcodeForDelete(qrcode);
                setIsDeleteQrcodeOpen(true);
              }}
            />
          )}
        </div>
      </div>

      {/* RENDER SYSTEM MODALS */}
      <EditProductModal
        isOpen={isEditProductOpen}
        onClose={() => setIsEditProductOpen(false)}
        product={selectedProductForEdit}
        categories={categories}
        onSave={handleUpdateProduct}
      />
      <DeleteProductModal
        isOpen={isDeleteProductOpen}
        onClose={() => setIsDeleteProductOpen(false)}
        product={selectedProductForDelete}
        onConfirm={handleDeleteProduct}
      />

      <EditCategoryModal
        isOpen={isEditCategoryOpen}
        onClose={() => setIsEditCategoryOpen(false)}
        category={selectedCategoryForEdit}
        onSave={handleUpdateCategory}
      />
      <DeleteCategoryModal
        isOpen={isDeleteCategoryOpen}
        onClose={() => setIsDeleteCategoryOpen(false)}
        category={selectedCategoryForDelete}
        onConfirm={handleDeleteCategory}
      />

      <DeleteOrderModal
        isOpen={isDeleteOrderOpen}
        onClose={() => setIsDeleteOrderOpen(false)}
        order={selectedOrderForDelete}
        onConfirm={handleDeleteOrder}
      />

      <DeleteQrcodeModal
        isOpen={isDeleteQrcodeOpen}
        onClose={() => setIsDeleteQrcodeOpen(false)}
        qrcode={selectedQrcodeForDelete}
        onConfirm={handleDeleteQrcode}
      />
    </div>
  );
};

export default AdminDashboard;
