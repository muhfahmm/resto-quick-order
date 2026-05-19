import React from 'react';

const DeleteQrcodeModal = ({ isOpen, onClose, qrcode, onConfirm }) => {
  if (!isOpen || !qrcode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-50 p-3 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Table QR Code</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">
            Are you sure you want to delete the QR Code for <strong>Meja {qrcode.table_no}</strong>?
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(qrcode.id);
                onClose();
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteQrcodeModal;
