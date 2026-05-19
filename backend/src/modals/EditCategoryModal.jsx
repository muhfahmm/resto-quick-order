import React, { useState, useEffect } from 'react';

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
    }
  }, [category, isOpen]);

  if (!isOpen || !category) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(category.id, name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 animate-zoom-in m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Edit Category</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-colors cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
