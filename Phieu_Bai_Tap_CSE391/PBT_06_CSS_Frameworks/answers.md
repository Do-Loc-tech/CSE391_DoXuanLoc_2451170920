# PHẦN A — ĐỌC HIỂU

## Câu A1 — Grid System

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|----------|----------------|----------|
| Số cột | 12 cột | 6 cột | 3 cột |
| Box layout | 1 box / hàng | 2 box / hàng | 4 box / hàng |

### Giải thích layout

#### Kích thước < 768px

Class áp dụng:

```html
col-12

Mỗi box chiếm toàn bộ 12 cột nên mỗi hàng chỉ có 1 box.

[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]
Kích thước 768px - 991px

Class áp dụng:

col-md-6

Mỗi box chiếm 6/12 cột nên có 2 box trên 1 hàng.

[ Box 1 ][ Box 2 ]
[ Box 3 ][ Box 4 ]
Kích thước ≥ 992px

Class áp dụng:

col-lg-3

Mỗi box chiếm 3/12 cột nên có 4 box trên 1 hàng.

[ Box 1 ][ Box 2 ][ Box 3 ][ Box 4 ]
col-md-6 nghĩa là gì?
md là breakpoint medium (≥768px)
6 nghĩa là chiếm 6/12 cột

=> Từ màn hình medium trở lên, phần tử chiếm 50% chiều rộng.

Tại sao không cần viết col-sm-12?

Bootstrap sử dụng cơ chế mobile-first.

Class:

col-12

đã áp dụng cho tất cả kích thước màn hình từ nhỏ trở lên, cho đến khi breakpoint lớn hơn ghi đè.

Vì vậy:

Mobile → 12 cột
Tablet → 6 cột
Desktop → 3 cột

Không cần viết thêm col-sm-12.

Câu A2 — Utilities & Components
1. Giải thích d-none d-md-block
d-none d-md-block
d-none → ẩn phần tử (display: none)
d-md-block → từ kích thước md trở lên hiển thị dạng block
Kích thước	Trạng thái
<768px	Ẩn
≥768px	Hiện
2. 5 spacing utilities
mt-3
mt-3
m = margin
t = top
3 = mức spacing

=> Thêm margin-top.

mb-4
mb-4

=> Thêm margin-bottom mức 4.

ms-2
ms-2

=> Thêm margin-left (start).

px-4
px-4
p = padding
x = trái + phải

=> Thêm padding ngang.

mb-auto
mb-auto

=> Margin-bottom tự động (auto).

3. Sự khác nhau giữa .container, .container-fluid, .container-md
.container
<div class="container">
Responsive
Có max-width theo breakpoint
Có khoảng trắng hai bên
.container-fluid
<div class="container-fluid">
Luôn rộng 100%
Full chiều ngang màn hình
.container-md
<div class="container-md">
<768px → full width
≥768px → giống .container
PHẦN C — PHÂN TÍCH
Câu C1 — Tùy biến Bootstrap
1. Đổi màu $primary sang #E63946

Bootstrap hỗ trợ tùy biến thông qua SASS variables.

Bước 1: Cài Bootstrap và Sass
npm install bootstrap sass
Bước 2: Tạo file custom.scss
$primary: #E63946;

@import "bootstrap/scss/bootstrap";
Bước 3: Compile SCSS
sass custom.scss custom.css
Bước 4: Import file CSS vào HTML
<link rel="stylesheet" href="custom.css">

Sau khi compile:

.btn-primary
.bg-primary
.text-primary

đều sử dụng màu mới #E63946.

2. Tại sao không nên override trực tiếp .btn-primary?

Ví dụ:

.btn-primary {
    background: red;
}
Nhược điểm:
Chỉ đổi riêng .btn-primary
Các class khác như:
.bg-primary
.text-primary
.border-primary

vẫn dùng màu cũ.

Khó bảo trì

Khi Bootstrap update có thể bị lỗi hoặc xung đột CSS.

Không đồng bộ theme

Bootstrap tạo hệ thống màu dựa trên SASS variables.

Đổi $primary sẽ tự cập nhật toàn bộ component liên quan.

Câu C2 — So sánh Bootstrap và CSS thuần
1. Số dòng CSS cần viết
CSS thuần

Phải tự viết:

navbar responsive
media queries
flexbox/grid
card styles
spacing
hover effects

Có thể cần hơn 200 dòng CSS.

Bootstrap

Chỉ cần dùng utility classes và component có sẵn.

Ví dụ:

<div class="card shadow">

không cần viết CSS riêng.

2. Thời gian phát triển
CSS thuần
Tốn thời gian xây dựng layout
Phải tự xử lý responsive
Test nhiều kích thước màn hình
Bootstrap
Code nhanh hơn
Có sẵn:
grid system
navbar
modal
cards
spacing utilities

Giúp giảm đáng kể thời gian phát triển.

3. Khả năng tùy biến
CSS thuần
Toàn quyền kiểm soát giao diện
Dễ tạo UI độc đáo
Bootstrap
Tùy biến nhanh
Nhưng dễ tạo cảm giác “giao diện Bootstrap”
Muốn custom sâu cần chỉnh SASS variables
4. Khi nào nên dùng Bootstrap?
NÊN dùng khi:
Làm admin dashboard
Website CRUD
Prototype nhanh
Deadline ngắn
Cần responsive nhanh
KHÔNG nên dùng khi:
Website cần UI độc quyền
Thiết kế animation phức tạp
Muốn tối ưu CSS cực nhỏ
Có design system riêng