import { useState } from 'react'
import Header from './components/Header.jsx'
import ProductForm from './components/ProductForm.jsx'
import ProductTable from './components/ProductTable.jsx'
import { categories, initialProducts } from './data/data.js'
import './styles/app.css'

function App() {
  const [products, setProducts] = useState(initialProducts)

  const handleAddProduct = (product) => {
    const nextId = products.length > 0 ? products[products.length - 1].id + 1 : 1
    setProducts((current) => [...current, { ...product, id: nextId }])
  }

  return (
    <div className="app-container">
      <Header />
      <div className="content-grid">
        <section className="panel panel-form">
          <h2>Thêm sản phẩm mới</h2>
          <p>Nhập đầy đủ thông tin để thêm sản phẩm vào danh sách.</p>
          <ProductForm categories={categories} onAddProduct={handleAddProduct} />
        </section>

        <section className="panel panel-table">
          <div className="panel-title">
            <div>
              <h2>Danh sách sản phẩm</h2>
              <p>Danh sách sản phẩm mẫu được hiển thị theo dữ liệu hệ thống.</p>
            </div>
          </div>
          <ProductTable products={products} />
        </section>
      </div>
    </div>
  )
}

export default App
