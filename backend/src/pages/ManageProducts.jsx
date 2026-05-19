import React from 'react';

const ManageProducts = ({
  products,
  categories,
  formData,
  setFormData,
  imageFile,
  setImageFile,
  handleAddProduct,
  onOpenEditModal,
  onOpenDeleteModal,
  handleInputChange,
}) => {
  return (
    <div className="grid gap-8 w-full lg:grid-cols-[380px_1fr]">
      {/* Left Column: Pure Add Form */}
      <div className="flex-1 min-w-[300px] max-w-[400px]">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Add New Product
          </h3>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="" className="text-slate-500">
                Select Category
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                } else {
                  setImageFile(null);
                }
              }}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer file:cursor-pointer"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Expanded Table */}
      <div className="flex-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Product List</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="py-3 px-4 font-semibold w-20">Image</th>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold w-32">Category</th>
                  <th className="py-3 px-4 font-semibold w-32">Price</th>
                  <th className="py-3 px-4 font-semibold w-40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-500">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {product.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-semibold">
                        {product.category_name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onOpenEditModal(product)}
                          className="text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onOpenDeleteModal(product)}
                          className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No products found. Add one to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
