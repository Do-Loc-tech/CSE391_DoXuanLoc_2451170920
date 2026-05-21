# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — Function Declaration vs Expression vs Arrow

### 1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
}
2. Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
3. Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
Hoisting khác nhau như thế nào?
Function Declaration

Được hoisting toàn bộ nên có thể gọi trước khi khai báo.

hello();

function hello() {
    console.log("Hello");
}

✅ Chạy bình thường.

Function Expression

Chỉ biến được hoisting, chưa có giá trị function.

hello();

const hello = function() {
    console.log("Hello");
};

❌ Lỗi:

Cannot access 'hello' before initialization
Arrow Function

Tương tự Function Expression.

hello();

const hello = () => {
    console.log("Hello");
};

❌ Lỗi tương tự.

Câu A2 — Scope & Closure
Đoạn 1
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const c = counter();

console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount());  // 2
Giải thích

Biến count nằm trong scope của counter().

Các hàm con vẫn “nhớ” được biến này dù counter() đã chạy xong → đây là Closure.

Đoạn 2
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
Output sau 200ms
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
Giải thích
Với var

var có function scope.

Toàn bộ vòng lặp dùng chung một biến i.

Sau khi loop kết thúc:

i = 3

Nên cả 3 callback đều in 3.

Với let

let có block scope.

Mỗi vòng lặp tạo ra một biến j riêng:

vòng 1 → j = 0
vòng 2 → j = 1
vòng 3 → j = 2

Nên callback nhớ đúng giá trị từng vòng.

Câu A3 — Array Methods
const nums = [1,2,3,4,5,6,7,8,9,10];
1. Lấy số chẵn
nums.filter(n => n % 2 === 0);
2. Nhân mỗi số với 3
nums.map(n => n * 3);
3. Tính tổng
nums.reduce((sum, n) => sum + n, 0);
4. Tìm số đầu tiên > 7
nums.find(n => n > 7);
5. Có số > 10 không
nums.some(n => n > 10);
6. Tất cả đều > 0
nums.every(n => n > 0);
7. Tạo chuỗi chẵn/lẻ
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
8. Đảo ngược mảng không mutate
[...nums].reverse();
Câu A4 — Object Destructuring & Spread
Output
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);
Output
iPhone 16 25990000 8 Titan
console.log(specs);
Output
ReferenceError: specs is not defined

Vì destructuring chỉ lấy ram và color, không tạo biến specs.

Spread
const updated = { ...product, price: 23990000, sale: true };

console.log(updated.price);
Output
23990000
console.log(updated.sale);
Output
true
console.log(product.price);
Output
25990000

Object gốc không đổi.

Spread gotcha
const copy = { ...product };

copy.specs.ram = 16;

console.log(product.specs.ram);
Output
16
Tại sao?

Spread chỉ copy shallow copy.

specs vẫn tham chiếu cùng object trong memory.

Muốn deep copy phải dùng:

structuredClone(product)

hoặc

JSON.parse(JSON.stringify(product))
PHẦN C — SUY LUẬN
Câu C1 — Refactor Code
Refactor
const processOrders = (orders) =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => {
            const discount = total * 0.1;
            return {
                id,
                customer,
                total,
                discount,
                finalTotal: total - discount
            };
        })
        .sort((a, b) => b.finalTotal - a.finalTotal);
Câu C2 — Thiết kế API miniArray
const miniArray = {

    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};
Test
console.log(
    miniArray.map([1,2,3], x => x * 2)
);
// [2,4,6]

console.log(
    miniArray.filter([1,2,3,4], x => x > 2)
);
// [3,4]

console.log(
    miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)
);
// 10