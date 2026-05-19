import React from 'react';

const ManageCategory = ({
  categories,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
  onOpenEditModal,
  onOpenDeleteModal,
}) => {
  return (
    <div className="grid gap-8 w-full lg:grid-cols-[380px_1fr]">
      {/* Left Column: Pure Add Form */}
      <div className="flex-1 min-w-[300px] max-w-[400px]">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Add New Category
          </h3>
          <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Table */}
      <div className="flex-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Category List</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="py-3 px-6 font-semibold w-24">ID</th>
                  <th className="py-3 px-6 font-semibold">Name</th>
                  <th className="py-3 px-6 font-semibold w-40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-6 font-medium text-slate-500">#{c.id}</td>
                    <td className="py-3 px-6 font-semibold text-slate-800">{c.name}</td>
                    <td className="py-3 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onOpenEditModal(c)}
                          className="text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onOpenDeleteModal(c)}
                          className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500">
                      No categories found. Add one to get started!
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

export default ManageCategory;
