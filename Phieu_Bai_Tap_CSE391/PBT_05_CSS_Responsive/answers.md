PHẦN A - KIỂM TRA ĐỌC HIỂU

Câu A1 - Viewport & Mobile-First
1. Thẻ chuẩn:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- `width=device-width`: đặt chiều rộng viewport khớp với chiều rộng thiết bị.
- `initial-scale=1.0`: thiết lập tỷ lệ thu/phóng ban đầu là 100%.

2. Nếu thiếu thẻ này, iPhone sẽ hiển thị trang như một trang desktop thu nhỏ; nội dung sẽ bị co lại và không responsive.

3. Mobile-First vs Desktop-First:
- Mobile-First: CSS mặc định cho mobile, sau đó dùng `@media (min-width: 768px)` cho tablet/desktop.
```css
/* Mobile-first */
.container { padding: 16px; }
@media (min-width: 768px) {
  .container { padding: 32px; }
}
```
- Desktop-First: CSS mặc định cho desktop, sau đó dùng `@media (max-width: 767px)` cho mobile.
```css
/* Desktop-first */
.container { padding: 40px; }
@media (max-width: 767px) {
  .container { padding: 16px; }
}
```
Mobile-First được khuyên dùng vì dễ mở rộng, giữ CSS gọn, ưu tiên tối giản cho thiết bị nhỏ và giảm xung đột override.

Câu A2 - Breakpoints chuẩn
| Breakpoint | Kích thước | Thiết bị đại diện | Cột sản phẩm đề xuất |
|------------|------------|-------------------|----------------------|
| `sm` | 576px | Mobile lớn / small tablet | 1-2 cột |
| `md` | 768px | Tablet | 2 cột |
| `lg` | 992px | Laptop nhỏ | 3 cột |
| `xl` | 1200px | Desktop | 4 cột |
| `xxl` | 1400px | Large desktop | 4-5 cột |

Câu A3 - Media Queries
| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

Câu A4 - SCSS Basics
1. Variables: giúp tái sử dụng màu, font, breakpoint.
```scss
$primary-color: #2563eb;
```
2. Nesting: viết CSS lồng nhau cho cấu trúc rõ ràng.
```scss
.card {
  .card-title { font-size: 1.1rem; }
}
```
3. Mixins: đóng gói nhóm thuộc tính để tái sử dụng.
```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
4. `@extend` / Inheritance: dùng để chia sẻ style chung giữa selectors.
```scss
%btn-base { padding: 12px 20px; }
.button { @extend %btn-base; }
```
Trình duyệt không đọc được file `.scss` vì chỉ hiểu CSS. Cần phải biên dịch SCSS thành CSS bằng Sass.

Lệnh biên dịch SCSS → CSS:
```bash
sass scss/style.scss scss/style.css
```

---

PHẦN C - PHÂN TÍCH

Câu C1 - Phân tích trang web thực
Ví dụ: Shopee
- Mobile (375px): menu chuyển thành biểu tượng hamburger, header gọn, banner và nhiều khối được xếp dọc; nhiều yếu tố sidebar bị ẩn.
- Tablet (768px): menu vẫn gọn, nhiều khối sản phẩm hiển thị 2 cột, phần danh mục và banner lớn hơn.
- Desktop (1440px): menu ngang đầy đủ, lưới sản phẩm 4-5 cột, sidebar quảng cáo và filter xuất hiện cạnh phải/trái.

Thay đổi layout:
- Navigation: mobile dùng hamburger và thanh tìm kiếm đơn giản; desktop hiển thị thanh menu và banner lớn.
- Grid content: mobile 1-2 cột, tablet 2-3 cột, desktop 4-5 cột.
- Ẩn trên mobile: sidebar, banner quảng cáo, nhiều card phụ trợ, block danh mục chi tiết.
- Font size: thường tăng dần nhẹ theo breakpoint để phù hợp màn hình lớn.

Media query thường dùng trên Shopee:
- `@media (max-width: 767px) { ... }` cho mobile.
- `@media (min-width: 768px) and (max-width: 991px) { ... }` cho tablet.
- `@media (min-width: 992px) { ... }` cho desktop.

Câu C2 - Thiết kế Responsive Strategy
Mobile:
- Header: logo + nút gọi/điện thoại.
- Hero: ảnh toàn chiều rộng.
- Grid món ăn: 1 cột.
- Form đặt bàn: nằm dưới hero.
- Bản đồ: nằm dưới form.

Tablet:
- Header rộng hơn, logo + số điện thoại.
- Grid món ăn 2 cột.
- Form đặt bàn nằm dưới hero, bản đồ nằm tiếp theo.

Desktop:
- Layout 2 cột hoặc 3 cột.
- Header menu + số điện thoại.
- Hero bên trái, sidebar form bên phải (hoặc form + bản đồ bên cạnh).
- Grid món ăn 3 cột.

CSS skeleton mobile-first:
```css
.hero { display: block; }
.food-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
.booking-form { margin-top: 24px; }
.map { margin-top: 24px; height: 300px; }

@media (min-width: 768px) {
  .food-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .page-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px; }
  .food-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .map { height: 360px; }
}
```