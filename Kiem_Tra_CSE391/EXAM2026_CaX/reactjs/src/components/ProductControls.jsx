import { useMemo } from 'react'

export default function ProductControls({
  categories,
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange,
  sortKey,
  sortDirection,
  onSortChange,
}) {
  const statusOptions = useMemo(
    () => ['Tất cả', 'Còn hàng', 'Hết hàng'],
    [],
  )

  return (
    <section className="panel panel-controls">
      <div className="panel-title">
        <div>
          <h2>Bộ lọc và tìm kiếm</h2>
          <p>Giảm thiểu danh sách theo tên, danh mục, trạng thái hoặc sắp xếp theo giá.</p>
        </div>
      </div>

      <div className="controls-grid">
        <label>
          Tìm kiếm sản phẩm
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Nhập tên sản phẩm"
          />
        </label>

        <label>
          Danh mục
          <select value={filterCategory} onChange={(event) => onCategoryChange(event.target.value)}>
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Trạng thái
          <select value={filterStatus} onChange={(event) => onStatusChange(event.target.value)}>
            {statusOptions.map((status) => (
              <option key={status} value={status === 'Tất cả' ? '' : status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sắp xếp
          <select
            value={`${sortKey}:${sortDirection}`}
            onChange={(event) => {
              const [key, direction] = event.target.value.split(':')
              onSortChange(key, direction)
            }}
          >
            <option value=":">Mặc định</option>
            <option value="name:asc">Tên: A → Z</option>
            <option value="name:desc">Tên: Z → A</option>
            <option value="price:asc">Giá: Thấp → Cao</option>
            <option value="price:desc">Giá: Cao → Thấp</option>
          </select>
        </label>
      </div>
    </section>
  )
}
