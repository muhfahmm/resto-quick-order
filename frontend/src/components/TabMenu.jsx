function TabMenu({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="tab-menu" id="category-tabs" role="tablist">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`tab-item ${activeCategory === category.id ? 'active' : ''}`}
          id={`tab-${category.id}`}
          role="tab"
          aria-selected={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.id === 0 && '🍴 '}
          {category.id === 1 && '🍛 '}
          {category.id === 2 && '🥤 '}
          {category.id === 3 && '🍿 '}
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default TabMenu;
