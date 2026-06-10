export default function ProductFilter({ categories, filter, onFilterChange }) {
  return (
    <section className="panel panel-filter">
      <h2>Lọc sản phẩm</h2>
      <div className="filter-controls">
        <label>
          Tìm tên
          <input
            type="text"
            name="query"
            value={filter.query}
            onChange={onFilterChange}
            placeholder="Nhập tên sản phẩm"
          />
        </label>

        <label>
          Danh mục
          <select name="category" value={filter.category} onChange={onFilterChange}>
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
