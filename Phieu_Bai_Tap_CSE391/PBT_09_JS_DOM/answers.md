# PHẦN A — KIỂM TRA ĐỌC HIỂU

# Câu A1 — DOM Tree

## 1. DOM Tree

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        │
        └── li.todo-item.completed
            └── "Learn CSS"
2. querySelector
Chọn thẻ <h1>
document.querySelector("h1");
Chọn input trong form
document.querySelector("#todoForm input");
Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");
Chọn link đang active
document.querySelector("nav a.active");
Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");
Chọn tất cả <a> trong <nav>
document.querySelectorAll("nav a");
Câu A2 — innerHTML vs textContent
Khác nhau
innerHTML	textContent
Đọc/ghi HTML	Chỉ đọc/ghi text
Có parse HTML	Không parse HTML
Có thể tạo tags	Hiển thị đúng text
Nguy cơ XSS	An toàn hơn
Ví dụ dùng innerHTML
document.querySelector("#app").innerHTML =
    "<h1>Hello</h1>";

Kết quả:

<h1>Hello</h1>
Ví dụ dùng textContent
document.querySelector("#app").textContent =
    "<h1>Hello</h1>";

Kết quả hiển thị:

<h1>Hello</h1>
XSS là gì?

XSS (Cross Site Scripting) là lỗ hổng cho phép user inject JavaScript độc hại vào website.

Ví dụ:

const userInput =
    `<img src=x onerror="alert('Hacked!')">`;

document.querySelector("#result").innerHTML =
    userInput;

Khi render:

<img src=x onerror="alert('Hacked!')">

Trình duyệt sẽ chạy:

alert("Hacked!");

→ Đây là XSS.

Cách sửa an toàn

Dùng textContent:

const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").textContent =
    userInput;

Khi đó HTML sẽ không được execute.

Câu A3 — Event Bubbling
Code
document.querySelector("#outer").addEventListener("click", () => {
    console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
    console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
});
Khi click button
Output:
BUTTON
INNER
OUTER
Giải thích

Event bubbling:

button → inner → outer

Event đi từ element nhỏ nhất lên cha.

Nếu dùng stopPropagation()
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
Output:
BUTTON
Giải thích

stopPropagation() chặn event bubbling.

Event không nổi lên inner và outer.

PHẦN C — DEBUG & PHÂN TÍCH
Câu C1 — Debug DOM Code
Các lỗi trong code
Lỗi 1
document.querySelector("#decrementBtn")
.addEventListener("onclick", ...)

❌ Sai:

"onclick"

✅ Đúng:

"click"
Lỗi 2
countDisplay = count;

❌ Sai vì countDisplay là DOM element.

✅ Đúng:

countDisplay.textContent = count;
Lỗi 3
historyList.innerHTML = null;

❌ Không nên dùng null.

✅ Đúng:

historyList.innerHTML = "";
Lỗi 4
item.remove;

❌ Thiếu ().

✅ Đúng:

item.remove();
Lỗi 5
count = localStorage.getItem("count");

❌ localStorage trả về string.

✅ Đúng:

count = Number(localStorage.getItem("count")) || 0;
Lỗi 6

Không load lại history từ localStorage.

❌ Thiếu:

historyList.innerHTML =
    localStorage.getItem("history") || "";
Lỗi 7

Mỗi <li> bind event riêng → không tối ưu.

Nên dùng Event Delegation.

Lỗi 8

Dùng innerHTML cho count không cần thiết.

✅ Nên dùng:

textContent
Code đã sửa
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn")
.addEventListener("click", () => {

    count++;

    countDisplay.textContent = count;

    const li = document.createElement("li");

    li.textContent = "Count changed to " + count;

    historyList.append(li);
});

document.querySelector("#decrementBtn")
.addEventListener("click", () => {

    count--;

    countDisplay.textContent = count;
});

document.querySelector("#resetBtn")
.addEventListener("click", () => {

    count = 0;

    countDisplay.textContent = count;

    historyList.innerHTML = "";
});

historyList.addEventListener("click", (e) => {

    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#clearHistory")
.addEventListener("click", () => {

    historyList.innerHTML = "";
});

window.addEventListener("beforeunload", () => {

    localStorage.setItem("count", count);

    localStorage.setItem(
        "history",
        historyList.innerHTML
    );
});

window.addEventListener("load", () => {

    count =
        Number(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
Câu C2 — Performance
1. Vì sao bind event lên 1000 elements là BAD PRACTICE?

Ví dụ:

items.forEach(item => {
    item.addEventListener("click", handler);
});
Vấn đề
Tốn RAM
Tạo nhiều event listeners
Chậm khi render
Khó maintain
Performance kém
Event Delegation giải quyết thế nào?

Chỉ bind 1 listener lên parent:

list.addEventListener("click", (e) => {

    if (e.target.matches("li")) {
        console.log(e.target.textContent);
    }
});
Ưu điểm
Chỉ 1 listener
Nhẹ hơn
Hỗ trợ dynamic elements
Dễ maintain
2. Refactor bằng DocumentFragment
Code cũ
for (let i = 0; i < 1000; i++) {

    const div = document.createElement("div");

    div.textContent = `Item ${i}`;

    document.body.appendChild(div);
}

❌ 1000 lần reflow/repaint.

Code tối ưu
const fragment =
    document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {

    const div = document.createElement("div");

    div.textContent = `Item ${i}`;

    fragment.appendChild(div);
}

document.body.appendChild(fragment);
Tại sao nhanh hơn?

DocumentFragment là DOM ảo trong memory.

Browser chưa render ngay.

Sau khi append fragment vào DOM:

chỉ reflow 1 lần
chỉ repaint 1 lần

→ Performance tốt hơn rất nhiều.