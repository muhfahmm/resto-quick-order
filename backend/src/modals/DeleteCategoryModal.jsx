import React from 'react';

const DeleteCategoryModal = ({ isOpen, onClose, category, onConfirm }) => {
  if (!isOpen || !category) return null;

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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Category</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">
            Are you sure you want to delete category <strong>{category.name}</strong>?
            <span className="block mt-2 text-xs text-red-500 font-bold uppercase">
              ⚠️ Warning: Products under this category will lose their reference!
            </span>
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
                onConfirm(category.id);
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

export default DeleteCategoryModal;
