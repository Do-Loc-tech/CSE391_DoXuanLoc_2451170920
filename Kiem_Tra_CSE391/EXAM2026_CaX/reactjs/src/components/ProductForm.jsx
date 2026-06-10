import { useState } from 'react'

const initialState = {
  name: '',
  category: '',
  price: '',
  status: 'Còn hàng',
}

export default function ProductForm({ categories, onAddProduct }) {
  const [form, setForm] = useState(initialState)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.category || !form.price) {
      return
    }

    onAddProduct({
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      status: form.status,
    })
    setForm(initialState)
  }

  const handleReset = () => setForm(initialState)

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Tên sản phẩm
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Nhập tên sản phẩm"
        />
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
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Nhập giá"
          min="0"
        />
      </label>

      <label>
        Trạng thái còn hàng
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Còn hàng">Còn hàng</option>
          <option value="Hết hàng">Hết hàng</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Thêm sản phẩm
        </button>
        <button type="button" className="btn-secondary" onClick={handleReset}>
          Làm mới form
        </button>
      </div>
    </form>
  )
}
