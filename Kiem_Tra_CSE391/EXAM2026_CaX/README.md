# EXAM2026_CaX - Quản lý sản phẩm

## Mô tả
Giao diện quản lý sản phẩm với các chức năng chính:
- Nhập thông tin sản phẩm
- Chọn danh mục và trạng thái
- Hiển thị danh sách sản phẩm
- Hiển thị tổng số lượng sản phẩm

## Cấu trúc dự án
EXAM2026_CaX
├── html/
│ ├── index.html
│ ├── css/style.css
│ ├── js/app.js
│ └── data/data.js
├── reactjs/
│ ├── package.json
│ └── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── ProductForm.jsx
│ │ ├── ProductTable.jsx
│ │ └── ProductRow.jsx
│ ├── data/data.js
│ └── styles/app.css
└── README.md

## Hướng dẫn chạy
1. Mở file `html/index.html` trong trình duyệt.
2. Hoặc chạy server cục bộ nếu muốn (Ví dụ: Live Server trong VS Code).
3. Thêm sản phẩm mới bằng form và kiểm tra danh sách cập nhật tự động.

## Cải thiện so với ban đầu
- Tối ưu cấu trúc HTML với `main`, label rõ ràng và input `required`
- Thêm hiển thị số lượng sản phẩm hiện có
- Hiển thị thông báo khi chưa có sản phẩm
- Mã CSS và JS được tổ chức tốt hơn, dễ bảo trì

## Ghi chú GitHub
- Nên commit từng phần rõ ràng: `Cập nhật HTML`, `Cập nhật CSS`, `Cải thiện JS`.
- Message commit nên ngắn gọn, rõ ý và đúng chuẩn.
- README này giúp tăng điểm phần documentation mà không xoá file hiện có.
