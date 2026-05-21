function createCart() {

    let items = [];
    let discount = 0;
    let shippingDiscount = 0;

    return {

        // Thêm sản phẩm
        addItem(product, quantity = 1) {

            const existing = items.find(
                item => item.id === product.id
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        // Xóa sản phẩm
        removeItem(productId) {
            items = items.filter(
                item => item.id !== productId
            );
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {

            const item = items.find(
                item => item.id === productId
            );

            if (!item) return;

            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        },

        // Tổng tiền trước giảm
        getSubtotal() {
            return items.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );
        },

        // Tổng tiền cuối
        getTotal() {

            const subtotal = this.getSubtotal();

            const afterDiscount =
                subtotal - subtotal * discount;

            return afterDiscount - shippingDiscount;
        },

        // Áp mã giảm giá
        applyDiscount(code) {

            switch (code) {

                case "SALE10":
                    discount = 0.1;
                    shippingDiscount = 0;
                    break;

                case "SALE20":
                    discount = 0.2;
                    shippingDiscount = 0;
                    break;

                case "FREESHIP":
                    shippingDiscount = 30000;
                    break;

                default:
                    console.log("Mã giảm giá không hợp lệ");
            }
        },

        // In giỏ hàng
        printCart() {

            console.log("\n===== SHOPPING CART =====");

            console.table(
                items.map(item => ({
                    ID: item.id,
                    "Sản phẩm": item.name,
                    "SL": item.quantity,
                    "Đơn giá":
                        item.price.toLocaleString("vi-VN") + "đ",
                    "Tổng":
                        (
                            item.price * item.quantity
                        ).toLocaleString("vi-VN") + "đ"
                }))
            );

            console.log(
                "Tổng cộng:",
                this.getTotal().toLocaleString("vi-VN") + "đ"
            );
        },

        // Tổng số lượng SP
        getItemCount() {
            return items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );
        },

        // Xóa toàn bộ
        clearCart() {
            items = [];
            discount = 0;
            shippingDiscount = 0;
        }
    };
}

// ===== TEST =====

const cart = createCart();

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.addItem(
    { id: 3, name: "AirPods Pro", price: 6990000 },
    2
);

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.printCart();

cart.applyDiscount("SALE10");

cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());

cart.printCart();