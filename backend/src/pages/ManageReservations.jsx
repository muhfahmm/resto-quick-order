import React, { useState } from 'react';

const ManageReservations = ({ reservations, updateReservationStatus, onDeleteReservation }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const safeReservations = Array.isArray(reservations) ? reservations : [];

  // Filter logic
  const filteredReservations = safeReservations.filter(res => {
    if (statusFilter === 'all') return true;
    return res.status === statusFilter;
  });

  // Calculate metrics
  const totalBookings = safeReservations.length;
  const pendingCount = safeReservations.filter(res => res.status === 'pending').length;
  const confirmedCount = safeReservations.filter(res => res.status === 'confirmed').length;
  const cancelledCount = safeReservations.filter(res => res.status === 'cancelled').length;

  return (
    <div className="w-full">
      {/* 1. Summary Cards */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Summary Reservasi</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">
              Total Reservasi
            </div>
            <div className="text-3xl font-semibold text-slate-900">{totalBookings}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-amber-50/60 border-amber-200">
            <div className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-3">
              Pending
            </div>
            <div className="text-3xl font-semibold text-amber-700">{pendingCount}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-sky-50/60 border-sky-200">
            <div className="text-xs uppercase tracking-[0.2em] text-sky-600 mb-3">
              Dikonfirmasi
            </div>
            <div className="text-3xl font-semibold text-sky-700">{confirmedCount}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-rose-50/60 border-rose-200">
            <div className="text-xs uppercase tracking-[0.2em] text-rose-600 mb-3">
              Dibatalkan
            </div>
            <div className="text-3xl font-semibold text-rose-700">{cancelledCount}</div>
          </div>
        </div>
      </div>

      {/* 2. Filters & List Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Daftar Reservasi Tempat</h3>
          
          {/* Status Filter Tab Buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {status === 'all' ? 'Semua' : status}
              </button>
            ))}
          </div>
        </div>

        {filteredReservations.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Tidak ada reservasi dengan status ini saat ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="py-3 px-4 font-semibold">ID</th>
                  <th className="py-3 px-4 font-semibold">Nama</th>
                  <th className="py-3 px-4 font-semibold">WhatsApp</th>
                  <th className="py-3 px-4 font-semibold">No Meja</th>
                  <th className="py-3 px-4 font-semibold">Tanggal</th>
                  <th className="py-3 px-4 font-semibold">Jam</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((res) => (
                  <tr
                    key={res.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-500">#{res.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{res.name}</td>
                    <td className="py-3 px-4">
                      <a 
                        href={`https://wa.me/${res.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        {res.phone}
                      </a>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm">
                        Meja {res.table_no}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{res.reservation_date}</td>
                    <td className="py-3 px-4 text-slate-700 font-bold">{res.reservation_time} WIB</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          res.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : res.status === 'confirmed'
                            ? 'bg-sky-100 text-sky-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2 items-center">
                        {res.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateReservationStatus(res.id, 'confirmed')}
                              className="bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
                            >
                              ✓ Konfirmasi
                            </button>
                            <button
                              onClick={() => updateReservationStatus(res.id, 'cancelled')}
                              className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                            >
                              ✕ Batal
                            </button>
                          </>
                        )}
                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => updateReservationStatus(res.id, 'cancelled')}
                            className="bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-200 transition-colors cursor-pointer"
                          >
                            ✕ Batalkan
                          </button>
                        )}
                        {res.status === 'cancelled' && (
                          <button
                            onClick={() => updateReservationStatus(res.id, 'confirmed')}
                            className="bg-sky-100 text-sky-700 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-sky-200 transition-colors cursor-pointer"
                          >
                            ✓ Aktifkan Kembali
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteReservation(res.id)}
                          className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors cursor-pointer ml-1"
                          title="Hapus Reservasi"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
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

export default ManageReservations;
