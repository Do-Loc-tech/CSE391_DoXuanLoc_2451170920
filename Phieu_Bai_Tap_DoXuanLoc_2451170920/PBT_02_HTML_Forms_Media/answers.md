PHẦN A - KIỂM TRA ĐỌC HIỂU

Câu A1 - Input Types
1. type="email" → Ô nhập văn bản, tự kiểm tra định dạng email (có @ và domain) → Dùng cho form đăng ký tài khoản hoặc đăng ký nhận tin khuyến mãi.
2. type="password" → Ô nhập ẩn ký tự (hiển thị dấu chấm/sao) → Dùng khi khách hàng nhập mật khẩu đăng nhập hoặc mã PIN thanh toán.
3. type="number" → Ô nhập số kèm nút tăng/giảm, tự chặn ký tự chữ → Dùng để chọn số lượng sản phẩm (quantity) trong giỏ hàng.
4. type="tel" → Ô nhập văn bản, trên mobile tự hiện bàn phím số → Dùng để nhập số điện thoại người mua khi điền thông tin giao hàng.
5. type="date" → Hiển thị bảng chọn lịch (Calendar) để chọn ngày/tháng/năm → Dùng để khách hàng chọn ngày mong muốn nhận hàng hoặc nhập ngày sinh nhận ưu đãi.
6. type="range" → Thanh trượt kéo từ trái sang phải để chọn giá trị → Dùng làm bộ lọc tìm kiếm sản phẩm theo khoảng giá (Price Range).
7. type="color" → Ô màu, khi bấm vào sẽ mở bảng chọn màu (Color Picker) → Dùng cho nhà bán hàng chọn màu sắc đặc trưng khi tùy chỉnh giao diện gian hàng.
8. type="url" → Ô nhập văn bản, tự kiểm tra định dạng đường dẫn (phải có http://...) → Dùng khi khách hàng dán link video đánh giá sản phẩm từ YouTube hoặc TikTok.
9. type="search" → Ô nhập văn bản có nút "x" để xóa nhanh nội dung → Dùng cho thanh tìm kiếm sản phẩm trên thanh điều hướng (Header).
10. type="file" → Nút bấm để chọn tệp từ máy tính/điện thoại → Dùng để khách hàng tải ảnh thực tế của sản phẩm khi viết bài đánh giá (Review).

Câu A2 - Validation Atributes
<!-- Trường hợp 1 -->
<input type="text" required value="">   <!-- User để trống -->
- Dự đoán: Trình duyệt báo lỗi "Please fill out this field" (Vui lòng điền vào trường này). Form không được gửi đi.
- Tại sao: Thuộc tính required yêu cầu trường nhập liệu không được phép để trống. Vì value="" nên trình duyệt xác định dữ liệu bị thiếu.
<!-- Trường hợp 2 -->
<input type="email" value="abc">        <!-- User gõ "abc" -->
Dự đoán: Trình duyệt báo lỗi nội dung không phải là một địa chỉ email (thiếu dấu @). Form bị chặn lại.
Tại sao: type="email" kích hoạt bộ lọc định dạng mặc định. Chuỗi "abc" không tuân thủ cấu trúc của một email hợp lệ.
<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->
Dự đoán: Trình duyệt báo lỗi giá trị phải nhỏ hơn hoặc bằng 10. Form bị chặn lại.
Tại sao: Thuộc tính max="10" giới hạn ngưỡng trên của dữ liệu. Giá trị 15 vượt quá giới hạn này nên vi phạm điều kiện range.
<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->
Dự đoán: Trình duyệt báo lỗi nội dung không khớp với định dạng yêu cầu. Form bị chặn lại.
Tại sao: Thuộc tính pattern sử dụng biểu thức chính quy (Regex). [0-9]{10} yêu cầu chính xác 10 chữ số, trong khi "abc123" vừa chứa chữ cái, vừa không đủ độ dài.
<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->
Dự đoán: Trình duyệt báo lỗi yêu cầu tăng độ dài văn bản lên 8 ký tự (hiện tại chỉ có 3). Form bị chặn lại.
Tại sao: Thuộc tính minlength="8" thiết lập giới hạn số ký tự tối thiểu. "123" chỉ có 3 ký tự, chưa đạt ngưỡng an toàn tối thiểu mà code yêu cầu.

Câu A3 — Accessibility
1. <label for="email"> quan trọng cho người dùng screen reader vì:
    - Định danh cho Screen Reader: Khi người dùng khiếm thị tab vào ô nhập liệu, trình đọc sẽ đọc to nội dung thẻ label. Nếu không có for khớp với id, người dùng sẽ không biết ô đó dùng để nhập thông tin gì.
    - Mở rộng vùng bấm (Clickable Area): Cho phép người dùng nhấn vào dòng chữ để kích hoạt ô nhập. Điều này hỗ trợ đắc lực cho người bị run tay hoặc người dùng thiết bị di động có màn hình nhỏ.
    - Chỉ dẫn ngữ nghĩa: Tạo mối liên kết chặt chẽ về mặt mã nguồn giữa tên gọi và dữ liệu, giúp trình duyệt hỗ trợ tính năng tự động điền (Autofill) chính xác hơn.
2. Khi nào dùng <fieldset> + <legend>? 
    - Mục đích: Dùng để nhóm các câu hỏi hoặc ô nhập liệu có cùng chủ đề lại với nhau.
    - Vai trò của <legend>: Cung cấp tiêu đề/ngữ cảnh cho cả nhóm. Screen Reader sẽ đọc tiêu đề này trước khi đọc từng lựa chọn bên trong.
    - Ví dụ cụ thể:
        + Nhóm Phương thức thanh toán: Gồm các nút Radio (Ví MoMo, Thẻ tín dụng, COD).    
        + Nhóm Kích cỡ sản phẩm: Gồm các lựa chọn S, M, L, XL.
        +Nhóm Địa chỉ: Phân biệt giữa "Địa chỉ nhận hàng" và "Địa chỉ thanh toán".
3. Thuộc tính aria-label
    - Khi nào dùng:
        + Dùng khi một phần tử có chức năng nhưng không có văn bản hiển thị (Ví dụ: Nút đóng có biểu tượng "X", nút tìm kiếm chỉ có icon kính lúp).
        + Dùng để cung cấp thông tin mô tả ẩn mà chỉ trình đọc màn hình mới thấy được.
    - Tại sao KHÔNG dùng chung với <label>:
        + Gây nhiễu: Screen Reader có thể đọc cả hai hoặc bị rối loạn ưu tiên, khiến người dùng nghe thông tin bị lặp lại.
        + Ghi đè dữ liệu: aria-label sẽ "nuốt chửng" (override) nội dung của thẻ label thuần túy, có thể gây sai lệch giữa cái người dùng nhìn thấy và cái họ nghe thấy.
        + Ưu tiên HTML thuần: Quy tắc hàng đầu của Accessibility là luôn ưu tiên các thẻ HTML có sẵn (label) trước khi dùng đến các thuộc tính ARIA bổ trợ.

Câu A4 - Media
1. Thuộc tính loading="lazy" trên thẻ <img>
    - Giải thích: Là kỹ thuật "tải lười", chỉ cho phép trình duyệt tải hình ảnh khi người dùng cuộn trang đến gần vị trí của ảnh đó thay vì tải tất cả ngay khi vừa mở trang.
    - Cải thiện điều gì?
        + Tốc độ tải trang (Initial Load Time): Giảm dung lượng dữ liệu cần tải lúc đầu, giúp trang hiện ra nhanh hơn.
        + Tiết kiệm băng thông: Người dùng không cuộn xuống thì ảnh không tải, đỡ tốn tiền 4G/5G của khách.
        + Hiệu năng thiết bị: Giảm tải cho bộ nhớ (RAM) và CPU của trình duyệt.
    - Khi nào KHÔNG nên dùng?
        + Ảnh ở đầu trang (Above the Fold): Những ảnh đập vào mắt người dùng ngay khi vừa load (như Banner, Logo) cần dùng loading="eager" để hiện ra ngay lập tức, tránh hiện tượng trắng trang.
2. 
    - Tại sao nên cung cấp nhiều <source> trong thẻ <video>?
        + Khả năng tương thích: Mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ các định dạng video khác nhau. Cung cấp nhiều source giúp trình duyệt tự chọn file nó "đọc" được.
        + Tối ưu dung lượng: Bạn có thể ưu tiên các định dạng nén tốt (nhẹ hơn) trước, nếu trình duyệt cũ không đọc được mới nhảy sang định dạng phổ biến (nặng hơn).
    - 3 format video web phổ biến:
        + MP4 (H.264): "Ông vua" phổ biến, chạy được trên hầu hết mọi thiết bị.
        + WebM: Định dạng của Google, nén cực tốt, dung lượng nhẹ, chất lượng cao.
        + Ogg/Theora: Mã nguồn mở, thường dùng làm phương án dự phòng cho các trình duyệt cũ.
3. 
    - Thuộc tính alt trên thẻ <img> dùng để
        + Cung cấp văn bản thay thế nếu ảnh bị lỗi không hiển thị được.
        + Hỗ trợ Screen Reader đọc mô tả ảnh cho người khiếm thị.
        + Giúp Google hiểu nội dung ảnh để làm SEO tốt hơn.
    - Viết alt tốt cho 3 trường hợp:
        + Ảnh sản phẩm iPhone 16: alt="Điện thoại iPhone 16 màu xanh Mint, mặt lưng kính nhám, cụm camera kép đặt dọc" (Mô tả chi tiết đặc điểm).
        + Ảnh trang trí (Decorative): alt="" (Để trống để Screen Reader tự động bỏ qua, tránh làm phiền người dùng bằng những thông tin vô nghĩa như "hình nền hoa lá").
        + Ảnh biểu đồ doanh thu Q1/2026: alt="Biểu đồ cột cho thấy doanh thu Quý 1 năm 2026 tăng trưởng 15% so với cùng kỳ năm trước, đạt mốc 2 tỷ VNĐ" (Tóm tắt thông tin quan trọng nhất của biểu đồ).

Câu A5 — So sánh <figure> vs <img>
<!-- Cách 1 -->
<img src="product.jpg" alt="iPhone">
<!-- Cách 2 -->
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>

1. Dùng Cách 1:
    - Mục đích: Chèn ảnh như một phần bổ trợ cho dòng văn bản (inline).
    - Đặc điểm: Ảnh không cần tiêu đề hay chú thích riêng biệt; nếu tách khỏi đoạn văn xung quanh, ảnh có thể trở nên khó hiểu.
    - Ví dụ thực tế:
        + Icons/Biểu tượng: Các icon nhỏ (xe tải, tấm khiên bảo hành, ngôi sao đánh giá) nằm ngay cạnh các dòng chữ giới thiệu dịch vụ.
        + Ảnh minh họa trong bài Blog: Một tấm ảnh nhỏ chèn giữa đoạn văn để làm người đọc đỡ mỏi mắt, không cần giải thích gì thêm.
2. Dùng Cách 2:
    - Mục đích: Tạo ra một đơn vị nội dung độc lập, trang trọng (thường gồm ảnh + chú thích).
    - Đặc điểm: 
        + Giúp trình đọc màn hình và Google hiểu rõ "đây là một bộ tư liệu hoàn chỉnh".
        + Dù di chuyển cả khối <figure> này xuống cuối trang hay sang lề bên, nội dung của nó vẫn giữ nguyên giá trị thông tin.
    - Ví dụ thực tế:
        + Thẻ sản phẩm (Product Card): Một khối gồm ảnh sản phẩm ở trên, tên và giá tiền nằm trong <figcaption> ở dưới.
        + Ảnh minh họa có nguồn/tác giả: Một bức ảnh nghệ thuật trong bài báo, phía dưới có chú thích "Nguồn: Getty Images" hoặc "Hình 1: Sơ đồ cấu tạo phần cứng".


PHẦN C — PHÂN TÍCH & SUY LUẬN
Câu C1 - Debug Form
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility.
-> Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input "Email" thiếu thẻ <label> (dùng placeholder thay label là sai chuẩn accessibility) và thiếu thuộc tính name.
-> Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>

Lỗi 3: Dòng 6 & 7 — Hai input "Password" không có thẻ <label> và thiếu thuộc tính name để gửi dữ liệu về server.
-> Sửa: <label for="pw">Mật khẩu:</label> <input type="password" id="pw" name="password" required>

Lỗi 4: Dòng 9 — Input "Phone" dùng type="text". Nên dùng type="tel" để hỗ trợ bàn phím số trên mobile và thiếu <label for="...">.
-> Sửa: <label for="tel">Phone:</label> <input type="tel" id="tel" name="phone" pattern="[0-9]{10}">

Lỗi 5: Dòng 11 — Thẻ <select> thiếu thuộc tính name và các <option> thiếu thuộc tính value để định danh giá trị khi submit.
-> Sửa: <select name="city" id="city"><option value="hanoi">Hà Nội</option><option value="hcm">TP.HCM</option></select>

Lỗi 6: Dòng 16 — Thiếu thẻ <input type="checkbox"> cho điều khoản; nội dung Text nằm trong <label> nhưng không gắn với ID nào.
-> Sửa: <input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>

Lỗi 7: Dòng 1 — Thẻ <form> thiếu thuộc tính action (nơi gửi dữ liệu) và method (phương thức gửi, ví dụ: POST cho bảo mật).
-> Sửa: <form action="/register" method="POST">

Lỗi 8: Toàn form — Thiếu tính nhất quán về dữ liệu. Các trường quan trọng như Email, Mật khẩu cần có thuộc tính required để chặn submit rỗng.
-> Sửa: Thêm required vào tất cả các input bắt buộc.

Câu C2 - Thiết kế chiến lược Validation
1. 
    - pattern regex cho CMND/CCCD và Số tài khoản
        CMND/CCCD (12 chữ số): pattern="[0-9]{12}"
        Số tài khoản (10-15 chữ số): pattern="[0-9]{10,15}"
        Mã PIN (6 chữ số, ẩn): type="password" pattern="[0-9]{6}"   
2. 
    - HTML5 Validation không đủ an toàn cho ứng dụng ngân hàng
    - Lý do:
        + Dễ bị vô hiệu hóa: Người dùng chỉ cần mở Developer Tools (F12) để xóa bỏ các thuộc tính required hay pattern ngay trên trình duyệt.
        + Không qua mặt được Tool: Kẻ tấn công có thể dùng Postman hoặc cURL để gửi dữ liệu trực tiếp tới Server mà không cần thông qua Form HTML.
        + Phụ thuộc trình duyệt: Một số trình duyệt cũ hoặc trình duyệt tùy chỉnh có thể không hỗ trợ hoặc thực thi sai các thuộc tính validation này.
3. 
    - 3 loại validation HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
        + Kiểm tra tính duy nhất (Uniqueness): Kiểm tra xem Email/Số điện thoại đã tồn tại trong cơ sở dữ liệu chưa (cần gọi API).
        + So khớp dữ liệu (Matching): Xác nhận tính trùng khớp giữa hai trường (ví dụ: "Nhập lại mật khẩu" phải giống "Mật khẩu").
        + Logic phụ thuộc (Dependencies): Ví dụ: Nếu chọn loại thẻ là "Visa" thì mới yêu cầu nhập số CVV, còn "ATM nội địa" thì không.
4. 
    - 2 rủi ro bảo mật nếu chỉ validate trên Frontend
        + Bị tấn công mã độc (Injection): Kẻ tấn công có thể chèn các đoạn mã phá hoại (SQL Injection, XSS) vào ô nhập liệu để đánh cắp dữ liệu hoặc chiếm quyền điều khiển server.
        + Sai lệch logic tài chính: Người dùng có thể can thiệp request để gửi các con số bất hợp lý (ví dụ: chuyển số tiền âm hoặc vượt hạn mức) gây thất thoát tài sản nếu Backend không kiểm soát lại.