# Infinite Scroll Gallery

API đã dùng:
- `https://jsonplaceholder.typicode.com/photos?_page={page}&_limit=20`

Cách chạy:
1. Mở `gallery/index.html` bằng trình duyệt.
2. Kéo xuống để load thêm ảnh tự động.
3. Click ảnh để mở lightbox.

Chức năng:
- Tải 20 ảnh đầu tiên.
- Infinite scroll tự động khi gần đáy.
- Lazy load ảnh bằng IntersectionObserver.
- Modal xem ảnh lớn.
