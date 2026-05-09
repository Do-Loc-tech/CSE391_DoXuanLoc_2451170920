PHẦN A - KIỂM TRA ĐỌC HIỂU

Câu A1 - 5 loại Positioning
| Position  | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|-----------|----------------------------|-------------------|------------------|----------|
| static    | Có                         | Theo normal flow  | Có               | Default layout |
| relative  | Có                         | Vị trí ban đầu của chính nó | Có | Dịch chuyển nhẹ, tạo context cho absolute |
| absolute  | Không                      | nearest positioned ancestor (hoặc body nếu không có) | Có (không theo flow) | Tooltip, dropdown, overlay |
| fixed     | Không                      | viewport          | Không            | Navbar cố định, chat bubble |
| sticky    | Có (đến khi dính)          | nearest scroll container | Có (sau khi sticky) | Header dính khi scroll |

Câu A2 - Flexbox vs Grid
1. Trường hợp 1: Flex GrowCSS
    .container { display: flex; }
    .item { flex: 1; } /* 4 items */
- Dự đoán: 4 items sẽ nằm trên 1 hàng duy nhất. Vì có flex: 1, mỗi item sẽ giãn ra và chiếm diện tích bằng nhau (mỗi cái chiếm 25% chiều rộng container).
- Text art: [  Item 1  ][  Item 2  ][  Item 3  ][  Item 4  ]
2. Trường hợp 2: Flex Wrap & WidthCSS
    .container { display: flex; flex-wrap: wrap; }
    .item { width: 45%; margin: 2.5%; } /* 6 items */
- Dự đoán: 6 items sẽ chia thành 3 hàng, mỗi hàng 2 cột.Tại sao: Tổng chiều rộng 1 item (cả margin) là $45\% + 2.5\% \times 2 = 50\%$. Do đó, mỗi hàng vừa đủ chỗ cho 2 items.
- Text art: 
    [ Item 1 ] [ Item 2 ]
    [ Item 3 ] [ Item 4 ]
    [ Item 5 ] [ Item 6 ]
3. Trường hợp 3: Flex AlignmentCSS
    .container { display: flex; justify-content: space-between; align-items: center; } /* 3 items */
- Dự đoán: 3 items nằm trên 1 hàng. Item 1 sát lề trái, Item 2 ở chính giữa, Item 3 sát lề phải. Tất cả đều căn giữa theo chiều dọc.
- Text art: | [Item 1]      [Item 2]      [Item 3] |  <-- Căn giữa dọc
4. Trường hợp 4: Grid Fixed & FractionCSS
    .container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; } /* 3 items */
- Dự đoán: 3 items nằm trên 1 hàng. Cột trái và phải cố định 200px, cột giữa tự động giãn ra chiếm hết phần không gian còn lại. Có khoảng trống 20px giữa các cột.
- Text art: [ 200px ] --20px-- [   1fr (Giãn)   ] --20px-- [ 200px ]
5. Trường hợp 5: Grid Repeat & Auto RowsCSS
    .container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } /* 7 items */
- Dự đoán: 7 items sẽ chia thành 3 hàng. Hàng 1 và 2 có đầy đủ 3 cột. Hàng 3 chỉ có 1 item nằm ở cột đầu tiên bên trái.
- Text art: 
    [ Item 1 ] [ Item 2 ] [ Item 3 ]
        (gap 10px)
    [ Item 4 ] [ Item 5 ] [ Item 6 ]
        (gap 10px)
    [ Item 7 ] [ Trống  ] [ Trống  ]


PHẦN C — SUY LUẬN

Chào bạn Lộc! Với tư cách là một sinh viên Kỹ thuật phần mềm (KTPM), việc hiểu rõ bản chất của Flexbox và Grid sẽ giúp bạn xây dựng giao diện ShopTLU cực kỳ chuyên nghiệp.

Dưới đây là lời giải chi tiết cho Câu C1:

Câu C1: Flexbox vs Grid — Khi nào dùng gì?
1. Navigation bar ngang (Logo + Menu + Buttons)
    - Lựa chọn: Flexbox.
    - Vì: Navbar là bố cục 1 chiều (hàng ngang). Flexbox rất mạnh trong việc căn chỉnh các phần tử theo trục (ví dụ dùng justify-content: space-between để đẩy Logo về trái và Buttons về phải).
2. Lưới ảnh Instagram (3 cột đều nhau)
    - Lựa chọn: Grid.
    - Vì: Đây là bố cục 2 chiều (hàng và cột) dạng lưới. Grid giúp bạn cố định 3 cột cực kỳ dễ dàng với grid-template-columns: repeat(3, 1fr), bất kể số lượng ảnh là bao nhiêu thì chúng vẫn luôn thẳng hàng.
3. Layout blog (Main content + Sidebar)
    - Lựa chọn: Grid (hoặc Flexbox).
    - Vì: Thông thường dùng Grid cho khung lớn (Layout chính) của trang web vì nó định nghĩa được các vùng cố định (Sidebar 300px, Main content chiếm phần còn lại) một cách rõ ràng và mạch lạc hơn.
4. Footer với 4 cột thông tin
    - Lựa chọn: Flexbox.
    - Vì: Mặc dù trông giống lưới nhưng các cột ở Footer thường có độ rộng linh hoạt tùy theo nội dung bên trong. Flexbox cho phép các cột này co giãn tự nhiên hoặc xuống hàng trên mobile thuận tiện hơn.
5. Card sản phẩm (Ảnh trên, Text giữa, Nút dính đáy)
    - Lựa chọn: Kết hợp cả hai.
    - Vì:
        + Sử dụng Grid hoặc Flexbox bên ngoài để xếp các Cards thành hàng.
        + Sử dụng Flexbox (flex-direction: column) bên trong mỗi Card. Để nút "luôn dính đáy", ta đặt margin-top: auto cho nút đó, giúp nó đẩy lên trên và bám chặt vào cạnh dưới của Card bất kể đoạn text dài hay ngắn.

Câu C2 
Câu C2: Debug Flexbox
Mình sẽ đi vào từng lỗi theo yêu cầu của bạn:

Lỗi 1: Cards không đều chiều cao — Nút "Mua" bị nhảy
Nguyên nhân: Do nội dung (h3, mô tả) của mỗi card dài ngắn khác nhau, dẫn đến chiều cao card không đồng nhất. Mặc định các card trong flex container có chiều cao bằng nhau (align-items: stretch), nhưng các thành phần bên trong card lại không "biết" để đẩy nút xuống cuối.

Cách sửa: Biến chính .card thành một flex container theo chiều dọc.

Code sửa:

CSS
.card {
    display: flex;
    flex-direction: column; /* Xếp nội dung theo cột */
    width: 30%;
    margin: 1.5%;
}
.card .btn {
    margin-top: auto; /* Chiêu thức quan trọng: Đẩy nút xuống đáy card */
    padding: 10px;
}
Lỗi 2: Items không nằm giữa (Căn giữa cả ngang lẫn dọc)
Nguyên nhân: Bạn mới chỉ khai báo display: flex mà chưa ra lệnh cho nó phải căn chỉnh các phần tử con như thế nào. text-align: center chỉ có tác dụng với nội dung văn bản bên trong, không có tác dụng căn giữa chính cái block .hero-content.

Cách sửa: Thêm thuộc tính căn chỉnh trục chính và trục phụ cho container.

Code sửa:

CSS
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center;     /* Căn giữa theo chiều dọc */
}
Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân: Trong Flexbox, thuộc tính flex-shrink mặc định là 1. Khi phần .content quá dài, trình duyệt sẽ cố gắng co các phần tử khác lại để "nhét" vừa vào hàng, khiến .sidebar bị mất chiều rộng 250px đã thiết lập.

Cách sửa: Thiết lập flex-shrink: 0 để ngăn Sidebar bị co lại.

Code sửa:

CSS
.sidebar {
    width: 250px;
    flex-shrink: 0; /* Tuyệt đối không cho phép co lại */
}