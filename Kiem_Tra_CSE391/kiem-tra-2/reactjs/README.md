# Quản lý sản phẩm React

Ứng dụng này là bản mẫu React với giao diện quản lý danh sách sản phẩm theo yêu cầu.

## Cấu trúc chính

- `src/App.jsx` - container chính cho giao diện.
- `src/main.jsx` - entry point của Vite.
- `src/components/` - chứa các component tái sử dụng.
  - `Header.jsx`
  - `ProductForm.jsx`
  - `ProductTable.jsx`
  - `ProductRow.jsx`
- `src/data/data.js` - dữ liệu mẫu cho sản phẩm và danh mục.
- `src/styles/app.css` - style cho giao diện.

## Chạy dự án

1. Mở terminal trong `reactjs/`.
2. Chạy `npm install` nếu chưa cài dependencies.
3. Chạy `npm run dev`.
4. Mở `http://localhost:5173` trong trình duyệt.

## Tính năng

- Thêm sản phẩm mới với tên, danh mục, giá và trạng thái.
- Hiển thị danh sách sản phẩm theo bảng.
- Giao diện responsive trên nhiều kích thước màn hình.
