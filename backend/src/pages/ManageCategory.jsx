import React from 'react';

const ManageCategory = ({
  categories,
  newCategoryName,
  setNewCategoryName,
  handleAddCategory,
}) => {
  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Manage Categories</h3>
        <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="New Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </form>
        <div className="flex gap-2 flex-wrap">
          {categories.length === 0 ? (
            <p className="text-slate-500 text-sm">No categories yet.</p>
          ) : null}
          {categories.map((c) => (
            <span
              key={c.id}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
