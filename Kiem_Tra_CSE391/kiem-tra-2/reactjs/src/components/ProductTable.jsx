import ProductRow from './ProductRow.jsx'

export default function ProductTable({ products }) {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductRow key={product.id} product={product} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
