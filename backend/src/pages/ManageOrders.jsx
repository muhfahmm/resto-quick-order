import React from 'react';

const ManageOrders = ({ orders, updateOrderStatus, onOpenDeleteModal }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
              Total Orders
            </div>
            <div className="text-3xl font-semibold text-slate-900">{safeOrders.length}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
              Meja Aktif
            </div>
            <div className="text-3xl font-semibold text-slate-900">
              {[...new Set(safeOrders.map((order) => order.table_no))].length}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Pending</div>
            <div className="text-3xl font-semibold text-slate-900">
              {safeOrders.filter((order) => order.status === 'pending').length}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Orders</h3>
        {safeOrders.length === 0 ? (
          <p className="text-slate-500">Tidak ada pesanan saat ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Meja</th>
                  <th className="py-3 px-4 font-semibold">Items</th>
                  <th className="py-3 px-4 font-semibold">Total</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Tindakan</th>
                  <th className="py-3 px-4 font-semibold text-right">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {safeOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-800">{order.id}</td>
                    <td className="py-3 px-4 font-semibold">{order.table_no}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1 text-sm text-slate-700">
                        {(order.items || []).map((item) => (
                          <div
                            key={`${order.id}-${item.menu_id}`}
                            className="flex justify-between gap-3"
                          >
                            <span>
                              {item.qty}x {item.name}
                            </span>
                            <span className="text-slate-500">
                              Rp {Number(item.price).toLocaleString('id-ID')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      Rp {Number(order.total_price).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          order.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : order.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : order.status === 'ready'
                            ? 'bg-sky-100 text-sky-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {order.status === 'pending' ? 'Pending' :
                         order.status === 'confirmed' ? 'Dikonfirmasi' :
                         order.status === 'ready' ? 'Makanan Siap' :
                         order.status === 'completed' ? 'Selesai' : order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2 items-center">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            Konfirmasi
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Makanan Siap
                          </button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="bg-slate-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            Selesai
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <span className="text-slate-500 text-xs font-medium mr-2">Selesai</span>
                        )}
                        <button
                          onClick={() => onOpenDeleteModal(order)}
                          className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-sm text-right">
                      {new Date(order.created_at).toLocaleString()}
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
};

export default ManageOrders;
