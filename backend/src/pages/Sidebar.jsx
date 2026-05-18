import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col pt-4 shadow-sm">
      <button
        onClick={() => setActiveTab('products')}
        className={`px-8 py-4 text-left transition-all font-medium ${
          activeTab === 'products'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        Manage Products
      </button>
      <button
        onClick={() => setActiveTab('categories')}
        className={`px-8 py-4 text-left transition-all font-medium ${
          activeTab === 'categories'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        Manage Categories
      </button>
      <button
        onClick={() => setActiveTab('orders')}
        className={`px-8 py-4 text-left transition-all font-medium ${
          activeTab === 'orders'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        Orders
      </button>
      <button
        onClick={() => setActiveTab('qrcodes')}
        className={`px-8 py-4 text-left transition-all font-medium ${
          activeTab === 'qrcodes'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        QR Codes (Tables)
      </button>
    </aside>
  );
};

export default Sidebar;
