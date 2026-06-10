# Task List React Application

## Giới thiệu

Ứng dụng quản lý công việc (Task List) được xây dựng bằng ReactJS và Bootstrap.

Dự án được thực hiện theo yêu cầu bài kiểm tra môn Nền tảng phát triển Web.

## Công nghệ sử dụng

- ReactJS
- Vite
- JavaScript (ES6+)
- Bootstrap 5

## Chức năng

### Hiển thị danh sách Task

- Hiển thị tên công việc
- Hiển thị mức độ ưu tiên:
  - High
  - Medium
  - Low
- Hiển thị trạng thái:
  - To Do
  - In Progress
  - Done

### Thêm Task mới

- Nhập tên công việc
- Chọn mức độ ưu tiên
- Thêm vào danh sách

### Kiểm tra dữ liệu đầu vào

- Không cho phép để trống tên Task
- Tên Task không vượt quá 100 ký tự

### Xóa Task

- Xóa công việc khỏi danh sách

## Cấu trúc thư mục

```text
src/
│
├── components/
│   ├── AddTask.jsx
│   ├── TaskList.jsx
│   └── TaskItem.jsx
│
├── data/
│   └── data.json
│
├── App.jsx
├── App.css
└── main.jsx
```

## Dữ liệu mẫu

Dữ liệu được lưu trong file:

```text
src/data/data.json
```

Bao gồm tối thiểu 5 công việc theo yêu cầu đề bài.

## Cài đặt và chạy dự án

### Bước 1: Clone source code

```bash
git clone <repository-url>
```

### Bước 2: Cài đặt thư viện

```bash
npm install
```

### Bước 3: Cài Bootstrap

```bash
npm install bootstrap
```

### Bước 4: Chạy ứng dụng

```bash
npm run dev
```

### Bước 5: Truy cập

```text
http://localhost:5173
```

## Hình ảnh giao diện

- Danh sách Task
- Form thêm Task
- Chức năng quản lý công việc

## Tác giả

- Họ và tên: Đỗ Xuân Lộc
- Mã sinh viên: 2451170920

## Kết quả đạt được

✅ Xây dựng giao diện bằng ReactJS và Bootstrap

✅ Hiển thị dữ liệu từ file JSON

✅ Thêm mới Task

✅ Xóa Task

✅ Validate dữ liệu nhập

✅ Tổ chức source code theo component
