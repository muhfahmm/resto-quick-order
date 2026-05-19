import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import ManageQrcodes from './ManageQrcodes';
import ManageReservations from './ManageReservations';

// Modal imports
import EditProductModal from '../modals/EditProductModal';
import DeleteProductModal from '../modals/DeleteProductModal';
import EditCategoryModal from '../modals/EditCategoryModal';
import DeleteCategoryModal from '../modals/DeleteCategoryModal';
import DeleteOrderModal from '../modals/DeleteOrderModal';
import DeleteQrcodeModal from '../modals/DeleteQrcodeModal';

const getApiUrl = (path) => import.meta.env.PROD ? path : `http://localhost:3005${path}`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  
  // Admin Session State
  const [adminUser, setAdminUser] = useState(() => {
    const stored = localStorage.getItem('adminUser');
    return stored ? JSON.parse(stored) : null;
  });
  
  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [qrcodes, setQrcodes] = useState([]);
  const [reservations, setReservations] = useState([]);
  
  // Form/Utility States
  const [newCategoryName, setNewCategoryName] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '', category_id: '' });
  const [imageFile, setImageFile] = useState(null);
  const [tableInput, setTableInput] = useState('1');
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
    qrcode: 'qrcodes',
    reservasi: 'reservations'
  };

  const revTabMap = {
    products: 'produk',
    categories: 'kategori',
    orders: 'pesanan',
    qrcodes: 'qrcode',
    reservations: 'reservasi'
  };

  const [activeTab, setActiveTab] = useState(() => {
    if (tab && tabMap[tab]) {
      return tabMap[tab];
    }
    return localStorage.getItem('adminActiveTab') || 'products';
  });

  useEffect(() => {
    if (!adminUser) {
      alert('Silakan login terlebih dahulu');
      navigate('/admin/login');
      return;
    }
    fetchProducts();
    fetchCategories();
    fetchQrcodes();
    fetchOrders();
    fetchReservations();
  }, [adminUser, navigate]);

  // Sync activeTab to URL and localStorage
  useEffect(() => {
    if (!adminUser) return;
    localStorage.setItem('adminActiveTab', activeTab);
    const urlTab = revTabMap[activeTab];
    if (tab !== urlTab) {
      navigate(`/admin/dashboard/${urlTab}`, { replace: true });
    }
  }, [activeTab, tab, navigate, adminUser]);

  // Sync URL tab parameter changes back to state
  useEffect(() => {
    if (!adminUser) return;
    if (tab && tabMap[tab]) {
      setActiveTab(tabMap[tab]);
    } else if (!tab) {
      const urlTab = revTabMap[activeTab];
      navigate(`/admin/dashboard/${urlTab}`, { replace: true });
    }
  }, [tab, adminUser]);

  // Fetch Actions
  const fetchProducts = async () => {
    try {
      const res = await fetch(getApiUrl('/api/menu'));
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(getApiUrl('/api/category'));
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQrcodes = async () => {
    try {
      const res = await fetch(getApiUrl('/api/qrcodes'));
      const data = await res.json();
      setQrcodes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(getApiUrl('/api/orders'));
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch(getApiUrl('/api/reservations'));
      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(getApiUrl(`/api/orders/${orderId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const updateReservationStatus = async (resId, status) => {
    try {
      await fetch(getApiUrl(`/api/reservations/${resId}/status`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReservation = async (resId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data reservasi ini secara permanen dari database?')) {
      try {
        await fetch(getApiUrl(`/api/reservations/${resId}`), {
          method: 'DELETE'
        });
        fetchReservations();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Create/Add Operations
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName) return;
    try {
      await fetch(getApiUrl('/api/category'), {
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

      await fetch(getApiUrl('/api/menu'), {
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
      await fetch(getApiUrl(`/api/menu/${id}`), {
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
      await fetch(getApiUrl(`/api/category/${id}`), {
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
      await fetch(getApiUrl(`/api/menu/${id}`), { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetch(getApiUrl(`/api/category/${id}`), { method: 'DELETE' });
      fetchCategories();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await fetch(getApiUrl(`/api/orders/${id}`), { method: 'DELETE' });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQrcode = async (id) => {
    try {
      await fetch(getApiUrl(`/api/qrcodes/${id}`), { method: 'DELETE' });
      fetchQrcodes();
    } catch (err) {
      console.error(err);
    }
  };

  // Navigations
  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <nav className="flex justify-between items-center bg-slate-900 text-white px-8 py-4 shadow-md">
        <h2 className="text-xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          {adminUser && (
            <span className="text-slate-300 font-medium">
              Logged in as: <strong className="text-white">{adminUser.username}</strong>
            </span>
          )}
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          pendingOrdersCount={orders.filter(o => o.status === 'pending').length}
          pendingReservationsCount={reservations.filter(r => r.status === 'pending').length}
        />

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

          {activeTab === 'reservations' && (
            <ManageReservations
              reservations={reservations}
              updateReservationStatus={updateReservationStatus}
              onDeleteReservation={handleDeleteReservation}
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
