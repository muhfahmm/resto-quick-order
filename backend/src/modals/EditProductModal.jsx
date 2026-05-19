import React, { useState, useEffect } from 'react';

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  categories,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setCategoryId(product.category_id || '');
      setImageUrl(product.image_url || '');
      setImageFile(null);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('name', name);
      submitData.append('price', price);
      submitData.append('category_id', categoryId);
      
      if (imageFile) {
        submitData.append('image', imageFile);
      } else if (imageUrl) {
        submitData.append('image_url', imageUrl);
      }

      await onSave(product.id, submitData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 animate-zoom-in m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Edit Product</h3>
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
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer file:cursor-pointer"
            />
            {imageUrl && !imageFile && (
              <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
                <span>Current Image:</span>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  View Current
                </a>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
