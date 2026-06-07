# PBT10 — Answers

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

Output dự đoán:
1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `7 - Nested timeout`
7. `5 - Timeout 100ms`

Giải thích:
- `console.log("1 - Start")` chạy đồng bộ đầu tiên.
- `setTimeout(..., 0)` đẩy callback vào macrotask queue.
- `Promise.resolve().then(...)` tạo microtask; microtask luôn chạy trước khi event loop chuyển sang macrotask.
- `console.log("4 - End")` chạy đồng bộ tiếp.
- Sau stack rỗng, event loop xử lý microtasks: in `3 - Promise`, rồi `6 - Promise 2`.
- `6 - Promise 2` tạo thêm một `setTimeout(..., 0)`, callback này vào cuối macrotask queue.
- Sau microtask hết, macrotask queue chạy: `2 - Timeout 0ms`, `7 - Nested timeout`, rồi sau 100ms `5 - Timeout 100ms`.

### Câu A2 — Fetch API

```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

1. `await fetch(...)` — `fetch` trả về một `Promise` chứa đối tượng `Response`. Ta cần `await` để đợi network request hoàn thành và lấy đối tượng `Response` trước khi tiếp tục.
2. `response.ok` — false khi status code không nằm trong khoảng 200–299. Ví dụ: `404` (Not Found), `500` (Internal Server Error), `429` (Too Many Requests).
3. `response.json()` — trả về một `Promise` vì việc chuyển đổi body từ JSON sang object cũng là bất đồng bộ. Do đó cần `await` lần nữa để nhận dữ liệu đã parse.
4. `try...catch` — bắt các lỗi như network error (mất mạng, DNS lỗi), lỗi HTTP do ta tự `throw` khi `response.ok === false`, và lỗi parse JSON nếu server trả về dữ liệu không hợp lệ.

### Câu A3 — Promise States

Sơ đồ trạng thái Promise:
- `Pending` → `Fulfilled`
- `Pending` → `Rejected`

Callback Hell là tình trạng callback lồng nhau sâu, khó đọc và khó bảo trì.

Ví dụ callback hell 4 cấp:

```javascript
loadUser(userId, function(user) {
    loadOrders(user.id, function(orders) {
        loadOrderDetails(orders[0].id, function(details) {
            saveOrder(details, function(result) {
                console.log('Done', result);
            });
        });
    });
});
```

Refactor bằng async/await:

```javascript
async function processFirstOrder(userId) {
    try {
        const user = await loadUser(userId);
        const orders = await loadOrders(user.id);
        const details = await loadOrderDetails(orders[0].id);
        const result = await saveOrder(details);
        console.log('Done', result);
    } catch (error) {
        console.error(error);
    }
}
```

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

1. Network errors:
   - Xử lý bằng thông báo lỗi rõ ràng cho user.
   - Hiển thị trạng thái `Error` và cho phép thử lại.
   - Nếu có thể, dùng retry tự động trong vài lần với backoff nhẹ.

2. API errors:
   - `400` / `422`: lỗi dữ liệu đầu vào, hiển thị validation message.
   - `404`: resource không tồn tại, hiển thị "Không tìm thấy".
   - `429`: giới hạn request, hiển thị "Bạn gửi quá nhiều yêu cầu, vui lòng thử lại sau".
   - `500`: lỗi server, hiển thị "Lỗi máy chủ, vui lòng thử lại sau".

3. Timeout:

```javascript
function fetchWithTimeout(url, ms, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);

    return fetch(url, {
        ...options,
        signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
}
```

4. Retry logic:

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response;
        } catch (error) {
            attempt += 1;
            const isNetworkError = error.name === 'TypeError' || error.name === 'AbortError';
            if (!isNetworkError || attempt >= maxRetries) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 500 * attempt));
        }
    }
}
```

Giải thích:
- `fetchWithTimeout` đảm bảo request không treo quá lâu.
- `fetchWithRetry` thử lại khi lỗi mạng, nhưng không retry nếu server trả lỗi HTTP rõ ràng.

### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|---|---|---|---|
| `Promise.all()` | Khi tất cả promise fulfilled | Ngay khi 1 promise rejected | Khi cần tất cả dữ liệu cùng lúc, ví dụ tải nhiều API bắt buộc |
| `Promise.allSettled()` | Khi tất cả promise hoàn thành (fulfilled hoặc rejected) | Không bao giờ reject | Khi muốn xử lý từng kết quả độc lập, và 1 API lỗi không làm hỏng toàn bộ |
| `Promise.race()` | Khi promise đầu tiên settled (fulfilled hoặc rejected) | Khi promise đầu tiên rejected | Khi cần response nhanh nhất, ví dụ timeout hoặc lựa chọn nguồn dữ liệu ưu tiên |
| `Promise.any()` | Khi ít nhất 1 promise fulfilled | Khi tất cả promise rejected | Khi cần lấy kết quả thành công đầu tiên, bỏ qua lỗi của nguồn khác |

Ví dụ thực tế:

- `Promise.all()`:
  - Tải dữ liệu user, orders, settings cùng lúc trước khi render dashboard.
- `Promise.allSettled()`:
  - Gọi nhiều widget API trong dashboard; vẫn hiển thị widget khác khi 1 widget lỗi.
- `Promise.race()`:
  - Chờ kết quả API chính hoặc timeout để hủy và báo lỗi sớm.
- `Promise.any()`:
  - Gọi nhiều mirror API cùng data; chọn API đầu tiên trả về thành công.

Ví dụ code:

```javascript
// all
async function loadDashboardData() {
    const [user, orders, settings] = await Promise.all([
        fetch('/api/user').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
    ]);
    return { user, orders, settings };
}

// allSettled
async function loadWidgets() {
    const results = await Promise.allSettled([
        fetch('/api/weather').then(r => r.json()),
        fetch('/api/news').then(r => r.json()),
        fetch('/api/stock').then(r => r.json())
    ]);
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
}

// race
async function fetchWithTimeout(url, ms) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), ms)
    );
    return Promise.race([
        fetch(url).then(r => r.json()),
        timeout
    ]);
}

// any
async function fetchFromMirrors() {
    const urls = [
        'https://api1.example.com/data',
        'https://api2.example.com/data',
        'https://api3.example.com/data'
    ];
    const data = await Promise.any(urls.map(url => fetch(url).then(r => {
        if (!r.ok) throw new Error('Bad response');
        return r.json();
    })));
    return data;
}
```
