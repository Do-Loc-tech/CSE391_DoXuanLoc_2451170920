# Multi-API Dashboard

API đã dùng:
- `https://randomuser.me/api/?results=5`
- `https://dog.ceo/api/breeds/image/random/5`
- `https://restcountries.com/v3.1/name/vietnam`

Cách chạy:
1. Mở `dashboard/index.html` bằng trình duyệt.
2. Nhấn "Refresh All" để tải lại dữ liệu từ cả 3 API.

Chức năng:
- Gọi song song 3 API với `Promise.allSettled()`.
- Hiển thị trạng thái loading chung.
- Mỗi widget có trạng thái riêng: loading/success/error.
- Hiển thị thời gian tải data.
