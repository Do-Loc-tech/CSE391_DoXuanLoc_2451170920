PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1 - 5 loại Positioning
| Position  | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|-----------|----------------------------|-------------------|------------------|----------|
| static    | Có                         | Theo normal flow  | Có               | Default layout |
| relative  | Có                         | Vị trí ban đầu của chính nó | Có | Dịch chuyển nhẹ, tạo context cho absolute |
| absolute  | Không                      | nearest positioned ancestor (hoặc body nếu không có) | Có (không theo flow) | Tooltip, dropdown, overlay |
| fixed     | Không                      | viewport          | Không            | Navbar cố định, chat bubble |
| sticky    | Có (đến khi dính)          | nearest scroll container | Có (sau khi sticky) | Header dính khi scroll |