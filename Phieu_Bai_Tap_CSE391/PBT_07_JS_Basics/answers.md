# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — var / let / const

## Đoạn 1

```javascript
console.log(x);
var x = 5;

Kết quả:

undefined

Giải thích:

var được hoisting lên đầu scope
Biến tồn tại nhưng chưa được gán giá trị nên là undefined
Đoạn 2
console.log(y);
let y = 10;

Kết quả:

ReferenceError

Giải thích:

let có Temporal Dead Zone (TDZ)
Không thể truy cập trước khi khai báo
Đoạn 3
const z = 15;
z = 20;
console.log(z);

Kết quả:

TypeError

Giải thích:

const không cho phép gán lại giá trị
Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

Kết quả:

[1, 2, 3, 4]

Giải thích:

const không cho đổi reference
Nhưng vẫn có thể thay đổi nội dung object/array
Đoạn 5
let a = 1;

{
    let a = 2;
    console.log("Trong block:", a);
}

console.log("Ngoài block:", a);

Kết quả:

Trong block: 2
Ngoài block: 1

Giải thích:

let có block scope
Biến trong block khác biến bên ngoài
Câu A2 — Data Types & Coercion
console.log(typeof null);

Kết quả:

object
console.log(typeof undefined);

Kết quả:

undefined
console.log(typeof NaN);

Kết quả:

number
console.log("5" + 3);

Kết quả:

"53"
console.log("5" - 3);

Kết quả:

2
console.log("5" * "3");

Kết quả:

15
console.log(true + true);

Kết quả:

2
console.log([] + []);

Kết quả:

""
console.log([] + {});

Kết quả:

"[object Object]"
console.log({} + []);

Kết quả:

0
Giải thích "5" + 3 và "5" - 3
"5" + 3

Toán tử + khi gặp string sẽ ưu tiên nối chuỗi.

"5" + 3
→ "53"
"5" - 3

Toán tử - luôn ép kiểu về number.

"5" - 3
→ 5 - 3
→ 2
Câu A3 — So sánh == vs ===
console.log(5 == "5");

Kết quả:

true
console.log(5 === "5");

Kết quả:

false
console.log(null == undefined);

Kết quả:

true
console.log(null === undefined);

Kết quả:

false
console.log(NaN == NaN);

Kết quả:

false
console.log(0 == false);

Kết quả:

true
console.log(0 === false);

Kết quả:

false
console.log("" == false);

Kết quả:

true
Nên dùng == hay ===?

Nên dùng:

===

Vì:

So sánh cả giá trị và kiểu dữ liệu
Tránh lỗi ép kiểu ngoài ý muốn
Dễ debug hơn
Là best practice trong JavaScript hiện đại
Câu A4 — Truthy & Falsy
Tất cả giá trị Falsy trong JavaScript
false
0
-0
0n
""
null
undefined
NaN
Dự đoán kết quả
if ("0") console.log("A");

In:

A
if ("") console.log("B");

Không in.

if ([]) console.log("C");

In:

C
if ({}) console.log("D");

In:

D
if (null) console.log("E");

Không in.

if (0) console.log("F");

Không in.

if (-1) console.log("G");

In:

G
if (" ") console.log("H");

In:

H

Vì chuỗi chứa dấu cách không phải chuỗi rỗng.

Câu A5 — Template Literals
Cách 1
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
Cách 2
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
Cách 3
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
PHẦN C — SUY LUẬN
Câu C1 — Debug JavaScript
Code đã sửa
function tinhGiaGiamGia(giaBan, phanTramGiam) {

    if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
        return "Input không hợp lệ";
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    let giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
Các lỗi và cách sửa
Lỗi 1 — Input là string

Sai:

tinhGiaGiamGia("100000", 20)

Sửa:

tinhGiaGiamGia(100000, 20)
Lỗi 2 — Không kiểm tra kiểu dữ liệu

Thêm:

typeof giaBan !== "number"

để validate input.

Lỗi 3 — Dùng = thay vì ===

Sai:

if (giaSauGiam = 0)

Sửa:

if (giaSauGiam === 0)
Lỗi 4 — Thiếu dấu ;

Nên thêm dấu ; để code rõ ràng hơn.

Lỗi 5 — Dùng var

Sai:

var giamGia

Sửa:

let giamGia
Lỗi 6 — Lỗi var trong vòng lặp

Sai:

for (var i = 0; i < 5; i++)

Kết quả:

Item 5
Item 5
Item 5
Item 5
Item 5
Giải thích

var có function scope.

Sau khi vòng lặp kết thúc:

i = 5

setTimeout chạy sau nên tất cả callback đều dùng chung biến i.

Cách sửa

Dùng:

let i

vì let có block scope.

Mỗi vòng lặp sẽ tạo biến riêng.

Kết quả:

Item 0
Item 1
Item 2
Item 3
Item 4