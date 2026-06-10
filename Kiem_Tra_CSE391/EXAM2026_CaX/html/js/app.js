const state = {
  products: [...window.productAppData.products],
}

const productList = document.getElementById('productList')
const productCount = document.getElementById('productCount')
const categorySelect = document.getElementById('category')
const filterCategory = document.getElementById('filterCategory')
const filterStatus = document.getElementById('filterStatus')
const form = document.getElementById('productForm')
const resetBtn = document.getElementById('resetBtn')

function formatPrice(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function renderCategories() {
  categorySelect.innerHTML = '<option value="">-- Chọn danh mục --</option>'
  window.productAppData.categories.forEach((category) => {
    const option = document.createElement('option')
    option.value = category
    option.textContent = category
    categorySelect.appendChild(option)
  })
}

function renderFilterCategories() {
  filterCategory.innerHTML = '<option value="">Tất cả</option>'
  window.productAppData.categories.forEach((category) => {
    const option = document.createElement('option')
    option.value = category
    option.textContent = category
    filterCategory.appendChild(option)
  })
}

function getFilteredProducts() {
  return state.products.filter((product) => {
    const categoryMatch = filterCategory.value === '' || product.category === filterCategory.value
    const statusMatch = filterStatus.value === '' || product.status === filterStatus.value
    return categoryMatch && statusMatch
  })
}

function renderProducts() {
  productList.innerHTML = ''

  if (state.products.length === 0) {
    const row = document.createElement('tr')
    row.classList.add('no-products')
    row.innerHTML = '<td colspan="5">Chưa có sản phẩm nào. Vui lòng thêm sản phẩm mới.</td>'
    productList.appendChild(row)
  } else {
    state.products.forEach((product, index) => {
      const row = document.createElement('tr')
      const statusClass = product.status === 'Còn hàng' ? 'in-stock' : 'out-of-stock'
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${formatPrice(product.price)} đ</td>
        <td><span class="status-pill ${statusClass}">${product.status}</span></td>
      `
      productList.appendChild(row)
    })
  }

  productCount.textContent = `${state.products.length} sản phẩm`
}

function resetForm() {
  form.reset()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const name = form.name.value.trim()
  const category = form.category.value
  const price = Number(form.price.value)
  const status = form.status.value

  if (!name || !category || price <= 0) {
    return
  }

  state.products.push({
    id: state.products.length + 1,
    name,
    category,
    price,
    status,
  })

  renderProducts()
  resetForm()
})

resetBtn.addEventListener('click', resetForm)

renderCategories()
renderProducts()
