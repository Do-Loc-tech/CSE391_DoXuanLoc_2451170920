# Exercise 0 — Hello JavaScript! (Làm quen với JavaScript)

## 🎬 Opening Scenario

*Đây là bài tập đầu tiên của bạn với JavaScript. Bạn sẽ học cách khai báo biến, sử dụng các kiểu dữ liệu, thực hiện phép tính, và in kết quả ra console — nền tảng cho mọi bài tập sau.*

---

## 🎯 Mục tiêu học tập

- Hiểu JavaScript là gì và chạy JS trong trình duyệt
- Khai báo biến với `let`, `const`, `var`
- Nhận biết các kiểu dữ liệu cơ bản: `string`, `number`, `boolean`, `null`, `undefined`
- Sử dụng toán tử số học, chuỗi, so sánh
- In kết quả ra console với `console.log()`

---

## 🪜 Bài tập chi tiết

### Bài 0.1 — Chào thế giới (5 phút)

**Yêu cầu:** Tạo file HTML đầu tiên có JavaScript.

**Bước 1:** Tạo file `hello.html`:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hello JavaScript</title>
</head>
<body>
    <h1>Bài tập đầu tiên với JavaScript</h1>
    <p>Mở Console (F12 → Console) để xem kết quả</p>

    <script>
        // Bài 1: In ra console
        console.log("Xin chào thế giới!");
        console.log("Tôi đang học JavaScript");
        console.log(2026);
    </script>
</body>
</html>
```

**Bước 2:** Mở file trong trình duyệt → nhấn `F12` → chọn tab **Console** → thấy 3 dòng output.

**Kết quả mong đợi:**
```
Xin chào thế giới!
Tôi đang học JavaScript
2026
```

**Câu hỏi:** `console.log()` khác gì so với `document.write()`?

**Trả lời:**
- `console.log()`: In kết quả ra Console (F12), không hiển thị trên trang web. Dùng để debug.
- `document.write()`: Viết kết quả trực tiếp lên trang web. Nếu gọi sau khi DOM đã load, nó sẽ xóa toàn bộ nội dung trang.

---

### Bài 0.2 — Khai báo biến (10 phút)

**Yêu cầu:** Thực hành khai báo biến với `let`, `const`, `var`.

```javascript
// ===== LET — biến có thể thay đổi =====
let ten = "Minh";
let tuoi = 20;
let laSinhVien = true;

console.log("Tên:", ten);        // "Tên: Minh"
console.log("Tuổi:", tuoi);      // "Tuổi: 20"
console.log("Sinh viên:", laSinhVien); // "Sinh viên: true"

// Thay đổi giá trị
tuoi = 21;
console.log("Tuổi mới:", tuoi);  // "Tuổi mới: 21"

// ===== CONST — hằng số, KHÔNG thể thay đổi =====
const PI = 3.14159;
const TEN_TRUONG = "Đại học Thủy Lợi";

console.log("PI =", PI);
console.log("Trường:", TEN_TRUONG);

// ❌ Thử thay đổi const sẽ bị lỗi:
// PI = 3.14;  // TypeError: Assignment to constant variable

// ===== VAR — cách cũ, ít dùng =====
var monHoc = "CSE391";
console.log("Môn:", monHoc);
```

**Thử nghiệm:** Mở Console, gõ trực tiếp:
```javascript
> let x = 10;
> x        // → 10
> x = 20;  // → 20
> const Y = 100;
> Y = 200; // → ❌ Error!
```

**Câu hỏi phân biệt:**
| Câu hỏi | `let` | `const` | `var` |
|---------|-------|---------|-------|
| Có thể thay đổi giá trị? | ✅ Có | ❌ Không | ✅ Có |
| Có thể khai báo lại? | ❌ Không | ❌ Không | ✅ Có |
| Phạm vi (Scope) | Block-level | Block-level | Function-level |
| Nên dùng trong code mới? | ✅ | ✅ | ❌ Tránh |

**🚨 Tại sao tránh `var`?**
- ❌ Scope function-level (khó kiểm soát)
- ❌ Hoisting (khai báo tự động lên đầu → gây bug)
- ❌ Cho phép khai báo lại (dễ ghi đè không cẩn thận)
- ❌ Ô nhiễm global object

**✅ Quy tắc sử dụng:**
- Dùng **`const`** mặc định
- Dùng **`let`** khi cần thay đổi giá trị
- Không dùng **`var`**

---

### Bài 0.3 — Các kiểu dữ liệu (10 phút)

**Yêu cầu:** Nhận biết và kiểm tra kiểu dữ liệu với `typeof`.

```javascript
// ===== STRING — Chuỗi =====
let hoTen = "Nguyễn Văn A";     // Dùng dấu ""
let diaChi = 'Hà Nội';          // Dùng dấu ''
let loiChao = `Xin chào ${hoTen}`; // Dùng backtick (template literal)

console.log(typeof hoTen);      // "string"
console.log(loiChao);           // "Xin chào Nguyễn Văn A"

// ===== NUMBER — Số =====
let soNguyen = 42;
let soThuc = 3.14;
let am = -10;
let voCuc = Infinity;

console.log(typeof soNguyen);   // "number"

// ===== BOOLEAN — Đúng/Sai =====
let laTrue = true;
let laFalse = false;

console.log(typeof laTrue);     // "boolean"

// ===== NULL & UNDEFINED =====
let giaTriNull = null;          // "không có gì" (cố tình)
let chuaGanGiaTri;              // undefined (chưa gán)

console.log(typeof giaTriNull);   // "object" (bug nổi tiếng của JS!)
console.log(typeof chuaGanGiaTri); // "undefined"

// ===== Kiểm tra kiểu =====
console.log("42 là:", typeof 42);          // number
console.log("'42' là:", typeof "42");      // string
console.log("true là:", typeof true);      // boolean
```

**Bài tập con:** Khai báo biến cho các thông tin sau và in ra console:

**GIẢI PHÁP:**
```javascript
// Khai báo các biến
let monHoc = "Lập trình Web";          // 1. Tên môn học (string)
let tinChi = 3;                         // 2. Số tín chỉ (number)
let laBatBuoc = true;                  // 3. Có phải bắt buộc không? (boolean)
let diemSo;                             // 4. Điểm số (number, chưa có → undefined)

console.log("Môn học:", typeof monHoc);     // string
console.log("Tín chỉ:", typeof tinChi);     // number
console.log("Bắt buộc:", typeof laBatBuoc); // boolean
console.log("Điểm số:", typeof diemSo);    // undefined
console.log("Giá trị điểm:", diemSo);      // undefined
```

---

### Bài 0.4 — Template Literal (10 phút)

**Yêu cầu:** Nối chuỗi và chèn biến vào chuỗi.

```javascript
let ho = "Nguyễn";
let ten = "Minh";
let tuoi = 20;
let diem = 8.5;

// ❌ Cách cũ — nối chuỗi bằng dấu +
let cau1 = "Tên: " + ho + " " + ten + ", Tuổi: " + tuoi;
console.log(cau1);

// ✅ Cách mới — Template Literal (backtick `)
let cau2 = `Tên: ${ho} ${ten}, Tuổi: ${tuoi}`;
console.log(cau2);

// Tính toán trong template literal
let cau3 = `${ho} ${ten} được ${diem} điểm. Năm sau ${ten} sẽ ${tuoi + 1} tuổi.`;
console.log(cau3);

// In nhiều dòng
let thongBao = `
=== THÔNG TIN SINH VIÊN ===
Họ tên : ${ho} ${ten}
Tuổi    : ${tuoi}
Điểm    : ${diem}
Xếp loại: ${diem >= 8 ? "Giỏi" : diem >= 6.5 ? "Khá" : "Trung bình"}
===========================
`;
console.log(thongBao);
```

**Bài tập con:** Tạo chuỗi template hiển thị hóa đơn mua hàng:

**GIẢI PHÁP:**
```javascript
let sanPham = "Laptop";
let soLuong = 2;
let donGia = 15000000;

// Tạo chuỗi template hiển thị hóa đơn
let hoaDon = `Hóa đơn: ${soLuong} x ${sanPham} = ${soLuong * donGia}.000 VNĐ`;
console.log(hoaDon);  // Hóa đơn: 2 x Laptop = 30000000 VNĐ

// Hoặc định dạng đẹp hơn:
let hoaDonDep = `
========== HÓA ĐƠN ==========
Sản phẩm: ${sanPham}
Số lượng: ${soLuong}
Đơn giá: ${donGia.toLocaleString()} VNĐ
Tổng cộng: ${(soLuong * donGia).toLocaleString()} VNĐ
=============================
`;
console.log(hoaDonDep);
```

---

### Bài 0.5 — Toán tử số học (10 phút)

**Yêu cầu:** Thực hành các phép tính cơ bản.

```javascript
let a = 15;
let b = 4;

// Phép cộng, trừ, nhân, chia
console.log(`${a} + ${b} =`, a + b);    // 19
console.log(`${a} - ${b} =`, a - b);    // 11
console.log(`${a} * ${b} =`, a * b);    // 60
console.log(`${a} / ${b} =`, a / b);    // 3.75
console.log(`${a} % ${b} =`, a % b);    // 3 (chia lấy dư)
console.log(`${a} ** ${b} =`, a ** b);  // 50625 (lũy thừa)

// Phép gán kết hợp
let x = 10;
x += 5;   // x = x + 5 → 15
x -= 3;   // x = x - 3 → 12
x *= 2;   // x = x * 2 → 24
x /= 4;   // x = x / 4 → 6
console.log("x =", x);  // 6

// Tăng/giảm 1
let dem = 0;
dem++;     // dem = dem + 1 → 1
dem++;     // → 2
dem--;     // dem = dem - 1 → 1
console.log("dem =", dem);  // 1
```

**Bài tập con — Tính diện tích hình tròn:**

**GIẢI PHÁP:**
```javascript
const PI = 3.14159;
let banKinh = 5;

// Tính diện tích = PI * r^2
let dienTich = PI * (banKinh ** 2);
console.log(`Diện tích hình tròn (r=${banKinh}): ${dienTich.toFixed(2)}`);

// Tính chu vi = 2 * PI * r
let chuVi = 2 * PI * banKinh;
console.log(`Chu vi hình tròn (r=${banKinh}): ${chuVi.toFixed(2)}`);

// In kết quả đầy đủ
console.log(`
====== HÌNH TRÒN ======
Bán kính: ${banKinh}
Diện tích: ${dienTich.toFixed(2)}
Chu vi: ${chuVi.toFixed(2)}
======================
`);
```

---

### Bài 0.6 — Toán tử so sánh (10 phút)

**Yêu cầu:** So sánh giá trị và hiểu sự khác biệt `==` vs `===`.

```javascript
// ==  (so sánh giá trị, ÉP KIỂU)
// === (so sánh giá trị + kiểu, KHÔNG ép kiểu)

console.log(5 == "5");      // true  (ép "5" thành 5)
console.log(5 === "5");     // false (number ≠ string)
console.log(true == 1);     // true  (ép true thành 1)
console.log(true === 1);    // false

// ❌ Luôn dùng === trong code thực tế!
// == có thể gây bug khó tìm

// Các toán tử so sánh
console.log(10 > 5);        // true
console.log(10 < 5);        // false
console.log(10 >= 10);      // true
console.log(10 <= 9);       // false
console.log(10 != 5);       // true
console.log(10 !== "10");   // true

// Toán tử logic
console.log(true && true);   // true  (AND — cả hai đều đúng)
console.log(true && false);  // false
console.log(true || false);  // true  (OR — một trong hai đúng)
console.log(false || false); // false
console.log(!true);          // false (NOT — đảo ngược)
```

**Bài tập con — Kiểm tra điều kiện:**

**GIẢI PHÁP:**
```javascript
let diem = 7.5;
let diemChuyenCan = 9;

// 1. Kiểm tra: Điểm >= 5 VÀ điểm chuyên cần >= 8 → "Đạt", ngược lại → "Không đạt"
if (diem >= 5 && diemChuyenCan >= 8) {
    console.log("Kết quả: Đạt");
} else {
    console.log("Kết quả: Không đạt");
}

// 2. Xếp loại dựa trên điểm
if (diem >= 8.5) {
    console.log("Xếp loại: Giỏi");
} else if (diem >= 7) {
    console.log("Xếp loại: Khá");
} else if (diem >= 5) {
    console.log("Xếp loại: Trung bình");
} else {
    console.log("Xếp loại: Yếu");
}

// Hoặc dùng ternary operator (gọn hơn):
let xepLoai = diem >= 8.5 ? "Giỏi" : diem >= 7 ? "Khá" : diem >= 5 ? "Trung bình" : "Yếu";
console.log("Xếp loại (ternary):", xepLoai);
```

---

### Bài 0.7 — Kiểu dữ liệu Array (10 phút)

**Yêu cầu:** Làm quen với mảng — cấu trúc dữ liệu quan trọng nhất.

```javascript
// ===== KHAI BÁO MẢNG =====
let monHoc = ["Toán", "Lý", "Hóa", "Sinh"];
let diemSo = [8, 7, 9, 6.5, 8.5];
let honHop = ["Minh", 20, true, null]; // Mảng hỗn hợp

// ===== TRUY CẬP PHẦN TỬ =====
console.log(monHoc[0]);    // "Toán" (chỉ số bắt đầu từ 0)
console.log(monHoc[1]);    // "Lý"
console.log(monHoc.length); // 4 (độ dài mảng)
console.log(monHoc[monHoc.length - 1]); // "Sinh" (phần tử cuối)

// ===== THÊM / XÓA =====
monHoc.push("Anh");        // Thêm vào cuối → ["Toán","Lý","Hóa","Sinh","Anh"]
monHoc.pop();               // Xóa cuối → ["Toán","Lý","Hóa","Sinh"]
monHoc.unshift("GDCD");    // Thêm vào đầu → ["GDCD","Toán","Lý","Hóa","Sinh"]
monHoc.shift();             // Xóa đầu → ["Toán","Lý","Hóa","Sinh"]

// ===== DUYỆT MẢNG =====
// Cách 1: for loop
for (let i = 0; i < diemSo.length; i++) {
    console.log(`Môn ${i + 1}: ${diemSo[i]} điểm`);
}

// Cách 2: forEach (hay dùng hơn)
diemSo.forEach((diem, index) => {
    console.log(`Môn ${index + 1}: ${diem} điểm`);
});

// ===== TÌM KIẾM =====
console.log(monHoc.includes("Lý"));   // true
console.log(monHoc.indexOf("Hóa"));   // 2 (vị trí)
console.log(monHoc.indexOf("Anh"));   // -1 (không tìm thấy)

// ===== SẮP XẾP =====
let so = [3, 1, 4, 1, 5, 9, 2, 6];
so.sort((a, b) => a - b);  // Tăng dần → [1,1,2,3,4,5,6,9]
console.log(so);
```

**Bài tập con:**

**GIẢI PHÁP:**
```javascript
// TODO: Tạo mảy 5 món ăn yêu thích
let monAn = ["Phở", "Bún chả", "Gỏi cuốn", "Bánh mì", "Cơm tấm"];

// 1. In ra món đầu tiên và cuối cùng
console.log("Món đầu tiên:", monAn[0]);
console.log("Món cuối cùng:", monAn[monAn.length - 1]);

// 2. Thêm 1 món vào đầu
monAn.unshift("Cà phê");
console.log("Sau khi thêm vào đầu:", monAn);

// 3. Xóa món cuối cùng
monAn.pop();
console.log("Sau khi xóa cuối cùng:", monAn);

// 4. Duyệt mảng và in "Món i: ten mon"
monAn.forEach((mon, index) => {
    console.log(`Món ${index + 1}: ${mon}`);
});

// 5. Kiểm tra "Phở" có trong mảng không?
if (monAn.includes("Phở")) {
    console.log("✓ Phở có trong mảng");
} else {
    console.log("✗ Phở không có trong mảng");
}
```

---

### Bài 0.8 — Kiểu dữ liệu Object (10 phút)

**Yêu cầu:** Làm quen với object — lưu trữ dữ liệu có cấu trúc.

```javascript
// ===== KHAI BÁO OBJECT =====
let sinhVien = {
    hoTen: "Nguyễn Văn Minh",
    tuoi: 20,
    mssv: "20240001",
    diem: [8, 7.5, 9],
    laSinhVien: true
};

// ===== TRUY CẬP THUỘC TÍNH =====
console.log(sinhVien.hoTen);        // "Nguyễn Văn Minh" (dấu chấm)
console.log(sinhVien["tuoi"]);      // 20 (dấu ngoặc vuông)
console.log(sinhVien.diem[0]);      // 8 (truy cập mảy lồng)

// ===== THÊM / SỬA THUỘC TÍNH =====
sinhVien.email = "minh@example.com"; // Thêm mới
sinhVien.tuoi = 21;                  // Sửa
delete sinhVien.laSinhVien;          // Xóa

// ===== DUYỆT OBJECT =====
for (let key in sinhVien) {
    console.log(`${key}: ${sinhVien[key]}`);
}

// ===== OBJECT METHODS =====
console.log(Object.keys(sinhVien));   // ["hoTen", "tuoi", "mssv", "diem", "email"]
console.log(Object.values(sinhVien)); // ["Nguyễn Văn Minh", 21, "20240001", ...]
```

**Bài tập con — Tạo hồ sơ cá nhân:**

**GIẢI PHÁP:**
```javascript
// Tạo object "hoSo" chứa:
let hoSo = {
    hoTen: "Đỗ Xuân Lộc",                           // hoTen (string)
    tuoi: 20,                                       // tuoi (number)
    nganh: "Công nghệ Thông tin",                  // nganh (string)
    soThich: ["Lập trình", "Chơi game", "Đọc sách"], // soThich (array: 3 sở thích)
    diaChi: {                                       // diaChi (object lồng)
        tinh: "Hà Nội",
        quan: "Hoàn Kiếm",
        duong: "Đường Lý Thường Kiệt"
    }
};

// 1. In ra: "Tôi là [hoTen], [tuoi] tuổi, học ngành [nganh]"
console.log(`Tôi là ${hoSo.hoTen}, ${hoSo.tuoi} tuổi, học ngành ${hoSo.nganh}`);

// 2. In ra sở thích đầu tiên
console.log("Sở thích đầu tiên:", hoSo.soThich[0]);

// 3. In ra địa chỉ đầy đủ
let diaChiDayDu = `${hoSo.diaChi.duong}, ${hoSo.diaChi.quan}, ${hoSo.diaChi.tinh}`;
console.log("Địa chỉ đầy đủ:", diaChiDayDu);

// 4. Thêm thuộc tính "email"
hoSo.email = "doxuanloc@student.edu.vn";
console.log("Email đã thêm:", hoSo.email);

// 5. In toàn bộ thông tin
console.log("Hồ sơ đầy đủ:", hoSo);

// 6. In tất cả key
console.log("Các thông tin:", Object.keys(hoSo));
```

---

### Bài 0.9 — Hàm cơ bản (10 phút)

**Yêu cầu:** Viết và gọi hàm — khối xây dựng cơ bản của lập trình.

```javascript
// ===== KHAI BÁO HÀM =====
function chaoHoi(ten) {
    return `Xin chào, ${ten}! Chào mừng đến với JavaScript!`;
}

console.log(chaoHoi("Minh"));
console.log(chaoHoi("Lan"));

// ===== HÀM CÓ NHIỀU THAM SỐ =====
function tinhTong(a, b) {
    return a + b;
}

function tinhDTChuNhat(dai, rong) {
    return dai * rong;
}

console.log("Tổng:", tinhTong(10, 20));           // 30
console.log("Diện tích:", tinhDTChuNhat(5, 3));   // 15

// ===== HÀM CÓ GIÁ TRỊ MẶC ĐỊNH =====
function tinhDiemTB(diem1, diem2, diem3, heSo = 1) {
    return (diem1 + diem2 + diem3) / 3 * heSo;
}

console.log("Điểm TB:", tinhDiemTB(8, 7, 9));       // 8
console.log("Điểm TB x1.1:", tinhDiemTB(8, 7, 9, 1.1)); // 8.8

// ===== ARROW FUNCTION (ES6) =====
const binhPhuong = (so) => so * so;
const laChan = (so) => so % 2 === 0;

console.log("5² =", binhPhuong(5));       // 25
console.log("4 chẵn?", laChan(4));        // true
console.log("7 chẵn?", laChan(7));        // false
```

**Bài tập con:**

**GIẢI PHÁP:**
```javascript
// 1. maxHaiSo(a, b) → trả về số lớn hơn
function maxHaiSo(a, b) {
    return a > b ? a : b;
}

console.log("Max(10, 20):", maxHaiSo(10, 20));  // 20
console.log("Max(5, 3):", maxHaiSo(5, 3));      // 5

// 2. laNamNhuan(nam) → true nếu năm nhuận
// (chia hết cho 4, không chia hết cho 100, hoặc chia hết cho 400)
function laNamNhuan(nam) {
    return (nam % 4 === 0 && nam % 100 !== 0) || (nam % 400 === 0);
}

console.log("2024 năm nhuận?", laNamNhuan(2024));  // true
console.log("2023 năm nhuận?", laNamNhuan(2023));  // false
console.log("2000 năm nhuận?", laNamNhuan(2000));  // true
console.log("1900 năm nhuận?", laNamNhuan(1900));  // false

// 3. gioiThieu(hoTen, tuoi, nganh) → "Tôi là ..., ... tuổi, học ..."
function gioiThieu(hoTen, tuoi, nganh) {
    return `Tôi là ${hoTen}, ${tuoi} tuổi, học ngành ${nganh}`;
}

console.log(gioiThieu("Nguyễn Minh", 20, "CNTT"));

// 4. tinhGiaBan(giaGoc, giamGia = 0) → giá sau giảm (%)
function tinhGiaBan(giaGoc, giamGia = 0) {
    return giaGoc * (1 - giamGia / 100);
}

console.log("Giá ban đầu 100.000:", tinhGiaBan(100000));           // 100000
console.log("Giá sau giảm 10%:", tinhGiaBan(100000, 10));         // 90000
console.log("Giá sau giảm 20%:", tinhGiaBan(100000, 20));         // 80000

// Hoặc dùng Arrow Function:
const tinhGiaBanArrow = (giaGoc, giamGia = 0) => giaGoc * (1 - giamGia / 100);
console.log("Giá sau giảm 15% (arrow):", tinhGiaBanArrow(100000, 15)); // 85000
```

---

## ✅ Checklist tổng hợp

### Biến & Kiểu dữ liệu
- [x] Khai báo biến với `let` và `const`
- [x] Phân biệt `string`, `number`, `boolean`, `null`, `undefined`
- [x] Dùng `typeof` để kiểm tra kiểu
- [x] Template literal với backtick `` ` ``

### Toán tử
- [x] Toán tử số học: `+`, `-`, `*`, `/`, `%`, `**`
- [x] Toán tử so sánh: `===`, `!==`, `>`, `<`, `>=`, `<=`
- [x] Toán tử logic: `&&`, `||`, `!`
- [x] Toán tử gán kết hợp: `+=`, `-=`, `*=`, `/=`

### Cấu trúc dữ liệu
- [x] Mảng: khai báo, truy cập, push/pop, forEach
- [x] Object: khai báo, truy cập, thêm/sửa/xóa thuộc tính

### Hàm
- [x] Function declaration: `function tenHam() {}`
- [x] Arrow function: `const tenHam = () => {}`
- [x] Tham số mặc định

---

## 📚 Kiến thức cần nhớ

| Khái niệm | Ví dụ | Ghi chú |
|-----------|-------|---------|
| `let` | `let x = 10;` | Có thể thay đổi giá trị |
| `const` | `const PI = 3.14;` | Không thể thay đổi |
| `typeof` | `typeof "hello"` → `"string"` | Kiểm tra kiểu dữ liệu |
| Template literal | `` `${a} + ${b}` `` | Nối chuỗi dễ dàng |
| `===` | `5 === "5"` → `false` | So sánh strict (luôn dùng cái này!) |
| `Array.push()` | `arr.push(42)` | Thêm vào cuối mảng |
| `Object.keys()` | `Object.keys(obj)` | Lấy tất cả key |

---

**← [Quay lại Session 3](../README.md) | [Bài tiếp theo: DOM Basics →](00b_dom_basics.md)**
