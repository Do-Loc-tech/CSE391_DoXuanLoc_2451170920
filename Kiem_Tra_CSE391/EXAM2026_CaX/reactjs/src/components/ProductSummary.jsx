export default function ProductSummary({ products }) {
  const totalProducts = products.length
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)
  const inStockCount = products.filter((product) => product.status === 'Còn hàng').length

  return (
    <div className="product-summary">
      <div className="summary-card">
        <span className="summary-label">Tổng sản phẩm</span>
        <strong>{totalProducts}</strong>
      </div>

      <div className="summary-card">
        <span className="summary-label">Số lượng còn hàng</span>
        <strong>{inStockCount}</strong>
      </div>

      <div className="summary-card">
        <span className="summary-label">Tổng giá trị</span>
        <strong>{totalValue.toLocaleString('vi-VN')} đ</strong>
      </div>
    </div>
  )
}
