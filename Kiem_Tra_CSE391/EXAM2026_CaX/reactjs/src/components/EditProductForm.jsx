import { useState, useEffect } from 'react'

const initialState = {
  name: '',
  category: '',
  price: '',
  status: 'Còn hàng',
}

export default function EditProductForm({ categories, product, onCancel, onSave }) {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: product.price,
        status: product.status,
      })
      setError('')
    }
  }, [product])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: name === 'price' ? Number(value) : value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.category || !form.price) {
      setError('Vui lòng điền đầy đủ thông tin hợp lệ.')
      return
    }
    onSave({ ...product, ...form })
  }

  if (!product) {
    return null
  }

  return (
    <div className="overlay">
      <form className="product-form edit-form" onSubmit={handleSubmit}>
        <h3>Chỉnh sửa sản phẩm</h3>

        <label>
          Tên sản phẩm
          <input name="name" type="text" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Danh mục
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">-- Chọn danh mục --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Giá
          <input name="price" type="number" value={form.price} onChange={handleChange} min="0" />
        </label>

        <label>
          Trạng thái
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="btn-primary">Lưu thay đổi</button>
          <button type="button" className="btn-secondary" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  )
}
