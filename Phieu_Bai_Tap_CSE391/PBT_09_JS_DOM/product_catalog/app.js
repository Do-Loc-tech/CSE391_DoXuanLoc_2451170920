const products = [

    {
        id: 1,
        name: "iPhone 16",
        price: 25990000,
        category: "phone",
        image: "https://placehold.co/200",
        rating: 4.5,
        inStock: true
    },

    {
        id: 2,
        name: "Samsung S24",
        price: 22990000,
        category: "phone",
        image: "https://placehold.co/200",
        rating: 4.4,
        inStock: true
    },

    {
        id: 3,
        name: "MacBook Pro",
        price: 45990000,
        category: "laptop",
        image: "https://placehold.co/200",
        rating: 4.8,
        inStock: true
    },

    {
        id: 4,
        name: "Dell XPS",
        price: 35990000,
        category: "laptop",
        image: "https://placehold.co/200",
        rating: 4.6,
        inStock: true
    },

    {
        id: 5,
        name: "iPad Air",
        price: 16990000,
        category: "tablet",
        image: "https://placehold.co/200",
        rating: 4.5,
        inStock: true
    },

    {
        id: 6,
        name: "Xiaomi Pad",
        price: 7990000,
        category: "tablet",
        image: "https://placehold.co/200",
        rating: 4.2,
        inStock: true
    },

    {
        id: 7,
        name: "AirPods Pro",
        price: 6990000,
        category: "accessory",
        image: "https://placehold.co/200",
        rating: 4.4,
        inStock: true
    },

    {
        id: 8,
        name: "Galaxy Buds",
        price: 3990000,
        category: "accessory",
        image: "https://placehold.co/200",
        rating: 4.1,
        inStock: true
    }
];

let filteredProducts = [...products];

let cartCount = 0;

const app = document.querySelector("#app");

// ===== UI =====

app.innerHTML = `
    <div class="controls">

        <input id="search" placeholder="Search">

        <select id="sort">
            <option value="">Sort</option>
            <option value="priceAsc">Giá tăng</option>
            <option value="priceDesc">Giá giảm</option>
            <option value="name">Tên A-Z</option>
            <option value="rating">Rating cao</option>
        </select>

        <button data-category="all">All</button>
        <button data-category="phone">Phone</button>
        <button data-category="laptop">Laptop</button>
        <button data-category="tablet">Tablet</button>
        <button data-category="accessory">Accessory</button>

        <button id="darkModeBtn">
            Dark Mode
        </button>

    </div>

    <div class="cart-badge">
        🛒 <span id="cartCount">0</span>
    </div>

    <div class="products" id="productList"></div>
`;

// ===== RENDER =====

function renderProducts(data) {

    const productList =
        document.querySelector("#productList");

    productList.innerHTML = "";

    data.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()}đ</p>
            <p>⭐ ${product.rating}</p>
            <button>Add to cart</button>
        `;

        // MODAL

        card.addEventListener("click", (e) => {

            if (e.target.tagName === "BUTTON") {

                cartCount++;

                document.querySelector("#cartCount")
                .textContent = cartCount;

                e.stopPropagation();

                return;
            }

            showModal(product);
        });

        productList.appendChild(card);
    });
}

// ===== SEARCH =====

document.querySelector("#search")
.addEventListener("input", (e) => {

    const keyword =
        e.target.value.toLowerCase();

    filteredProducts = products.filter(product =>
        product.name.toLowerCase()
        .includes(keyword)
    );

    renderProducts(filteredProducts);
});

// ===== CATEGORY =====

document.querySelectorAll("[data-category]")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const category =
            btn.dataset.category;

        if (category === "all") {

            filteredProducts = [...products];

        } else {

            filteredProducts =
                products.filter(product =>
                    product.category === category
                );
        }

        renderProducts(filteredProducts);
    });
});

// ===== SORT =====

document.querySelector("#sort")
.addEventListener("change", (e) => {

    const value = e.target.value;

    if (value === "priceAsc") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );
    }

    if (value === "priceDesc") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );
    }

    if (value === "name") {

        filteredProducts.sort(
            (a, b) => a.name.localeCompare(b.name)
        );
    }

    if (value === "rating") {

        filteredProducts.sort(
            (a, b) => b.rating - a.rating
        );
    }

    renderProducts(filteredProducts);
});

// ===== MODAL =====

function showModal(product) {

    const modal = document.createElement("div");

    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <h2>${product.name}</h2>
            <p>${product.price.toLocaleString()}đ</p>
            <p>⭐ ${product.rating}</p>

            <button id="closeModal">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {

        if (
            e.target.id === "closeModal" ||
            e.target.classList.contains("modal")
        ) {
            modal.remove();
        }
    });
}

// ===== DARK MODE =====

document.querySelector("#darkModeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
});

// ===== INIT =====

renderProducts(products);