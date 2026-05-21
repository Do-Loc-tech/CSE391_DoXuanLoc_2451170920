function generateBill(items, isWednesday = false, tipPercent = 5) {
    let subtotal = 0;

    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG           ║");
    console.log("╠══════════════════════════════════════╣");

    items.forEach((item, index) => {
        let total = item.price * item.qty;
        subtotal += total;

        console.log(
            `║ ${index + 1}. ${item.name} x${item.qty} @${item.price} = ${total} ║`
        );
    });

    console.log("╠══════════════════════════════════════╣");

    let discount = 0;

    if (subtotal > 1000000) {
        discount = subtotal * 0.15;
    } else if (subtotal > 500000) {
        discount = subtotal * 0.10;
    }

    if (isWednesday) {
        discount += subtotal * 0.05;
    }

    let vat = subtotal * 0.08;
    let tip = subtotal * (tipPercent / 100);

    let totalPayment = subtotal - discount + vat + tip;

    console.log(`║ Tổng cộng: ${subtotal}đ ║`);
    console.log(`║ Giảm giá: ${discount}đ ║`);
    console.log(`║ VAT (8%): ${vat}đ ║`);
    console.log(`║ Tip: ${tip}đ ║`);

    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN: ${totalPayment}đ ║`);
    console.log("╚══════════════════════════════════════╝");
}

// Test
generateBill(
    [
        { name: "Phở bò", price: 65000, qty: 2 },
        { name: "Trà đá", price: 5000, qty: 3 },
        { name: "Bún chả", price: 55000, qty: 1 }
    ],
    true,
    5
);