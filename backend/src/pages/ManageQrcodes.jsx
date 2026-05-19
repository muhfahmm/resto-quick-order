import React from 'react';

const ManageQrcodes = ({
  tableInput,
  setTableInput,
  qrItems,
  setQrItems,
  qrError,
  setQrError,
  qrcodes,
  fetchQrcodes,
  onOpenDeleteModal,
}) => {
  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Generate QR Codes for Tables</h3>
        <p className="text-sm text-slate-500 mb-4">
          Masukkan meja seperti <strong>1,2,3</strong> atau rentang <strong>1-5</strong>. QR akan
          menautkan pelanggan ke frontend dengan parameter <code>?table=</code>.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_0.8fr] gap-3 mb-4">
          <input
            type="text"
            value={tableInput}
            onChange={(e) => setTableInput(e.target.value)}
            placeholder="Contoh: 1,2,3 atau 1-5"
            className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
          <button
            onClick={async () => {
              if (!tableInput.trim()) return;
              setQrError(null);
              try {
                const tableNames = new Set();
                const segments = tableInput
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);

                for (const segment of segments) {
                  if (/^\d+-\d+$/.test(segment)) {
                    const [start, end] = segment.split('-').map(Number);
                    if (start > end) throw new Error('Rentang meja harus naik, misal 1-5');
                    for (let i = start; i <= end; i += 1) {
                      tableNames.add(String(i));
                    }
                  } else {
                    tableNames.add(segment);
                  }
                }

                const getApiUrl = (path) => import.meta.env.PROD ? path : `http://localhost:3005${path}`;
                for (const table of Array.from(tableNames)) {
                  const res = await fetch(
                    getApiUrl(`/api/qrcode/${encodeURIComponent(table)}`)
                  );
                  if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Generate QR gagal untuk meja ${table}`);
                  }
                }

                setTableInput('');
                fetchQrcodes();
              } catch (err) {
                console.error(err);
                setQrError(err.message || 'Gagal membuat QR code.');
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg cursor-pointer"
          >
            Generate
          </button>
        </div>
        {qrError && <div className="text-sm text-red-600 mb-4">{qrError}</div>}

        <div className="mt-10">
          <h4 className="text-base font-semibold text-slate-800 mb-6">Stored QR Codes</h4>
          {qrcodes.length > 0 ? (
            <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
              {qrcodes.map((qr) => (
                <div
                  key={qr.id}
                  className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm w-full"
                >
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-base font-semibold text-slate-800">Meja {qr.table_no}</div>
                      <div className="text-xs text-slate-500">
                        {new Date(qr.created_at).toLocaleString()}
                      </div>
                    </div>
                    <a
                      href={qr.qr_image_path}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 hover:underline cursor-pointer font-semibold"
                    >
                      View
                    </a>
                  </div>
                  <div className="overflow-hidden rounded-[24px] bg-slate-100 p-4 flex justify-center">
                    <img
                      src={qr.qr_image_path}
                      alt={`Saved QR meja ${qr.table_no}`}
                      className="max-w-full max-h-[260px] object-contain"
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <a
                        href={import.meta.env.PROD 
                          ? `${window.location.origin}/?table=${encodeURIComponent(qr.table_no)}` 
                          : `http://${window.location.hostname}:5173/?table=${encodeURIComponent(qr.table_no)}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex justify-center items-center rounded-full border border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
                      >
                        Lihat Meja
                      </a>
                      <a
                        href={qr.qr_image_path}
                        download={`qr_table_${qr.table_no}.png`}
                        className="flex-1 inline-flex justify-center items-center rounded-full bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer text-center"
                      >
                        Download
                      </a>
                    </div>
                    <button
                      onClick={() => onOpenDeleteModal(qr)}
                      className="w-full text-center rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 py-2 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Delete QR Meja
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-400">
              Belum ada QR code tersimpan di database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQrcodes;
