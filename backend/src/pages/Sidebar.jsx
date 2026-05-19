import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, pendingOrdersCount = 0, pendingReservationsCount = 0 }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col pt-4 shadow-sm">
      <button
        onClick={() => setActiveTab('products')}
        className={`px-8 py-4 text-left transition-all font-medium cursor-pointer ${
          activeTab === 'products'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        Manage Products
      </button>
      <button
        onClick={() => setActiveTab('categories')}
        className={`px-8 py-4 text-left transition-all font-medium cursor-pointer ${
          activeTab === 'categories'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        Manage Categories
      </button>
      <button
        onClick={() => setActiveTab('orders')}
        className={`px-8 py-4 text-left transition-all font-medium cursor-pointer flex items-center justify-between ${
          activeTab === 'orders'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        <span>Orders</span>
        {pendingOrdersCount > 0 && (
          <span className="bg-rose-500 text-white text-[11px] px-2 py-0.5 rounded-full font-bold animate-pulse">
            {pendingOrdersCount}
          </span>
        )}
      </button>
      <button
        onClick={() => setActiveTab('qrcodes')}
        className={`px-8 py-4 text-left transition-all font-medium cursor-pointer ${
          activeTab === 'qrcodes'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        QR Codes (Tables)
      </button>
      <button
        onClick={() => setActiveTab('reservations')}
        className={`px-8 py-4 text-left transition-all font-medium cursor-pointer flex items-center justify-between ${
          activeTab === 'reservations'
            ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
        }`}
      >
        <span>Reservasi Meja</span>
        {pendingReservationsCount > 0 && (
          <span className="bg-indigo-600 text-white text-[11px] px-2 py-0.5 rounded-full font-bold animate-pulse">
            {pendingReservationsCount}
          </span>
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
