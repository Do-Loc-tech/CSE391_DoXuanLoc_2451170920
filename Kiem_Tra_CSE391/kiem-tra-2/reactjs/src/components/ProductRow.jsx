export default function ProductRow({ product, index }) {
  const formattedPrice = product.price.toLocaleString('vi-VN')

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{formattedPrice} đ</td>
      <td>
        <span className={`status-pill ${product.status === 'Còn hàng' ? 'in-stock' : 'out-of-stock'}`}>
          {product.status}
        </span>
      </td>
    </tr>
  )
}
