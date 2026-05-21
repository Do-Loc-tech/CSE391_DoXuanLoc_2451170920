const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countText = document.querySelector("#count");
const clearCompletedBtn =
    document.querySelector("#clearCompleted");

const filterButtons =
    document.querySelectorAll("[data-filter]");

let todos = JSON.parse(
    localStorage.getItem("todos")
) || [];

let currentFilter = "all";

// ===== SAVE =====

function saveTodos() {
    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}

// ===== COUNT =====

function updateCount() {

    const activeCount =
        todos.filter(todo => !todo.completed).length;

    countText.textContent =
        `${activeCount} items left`;
}

// ===== RENDER =====

function renderTodos() {

    todoList.innerHTML = "";

    let filtered = todos;

    if (currentFilter === "active") {

        filtered = todos.filter(
            todo => !todo.completed
        );
    }

    if (currentFilter === "completed") {

        filtered = todos.filter(
            todo => todo.completed
        );
    }

    filtered.forEach(todo => {

        const li = document.createElement("li");

        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = todo.id;

        const span = document.createElement("span");

        span.textContent = todo.text;

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "❌";

        li.appendChild(span);

        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateCount();

    saveTodos();
}

// ===== ADD TODO =====

todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const text = todoInput.value.trim();

    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed: false
    });

    todoInput.value = "";

    renderTodos();
});

// ===== EVENT DELEGATION =====

todoList.addEventListener("click", (e) => {

    const li = e.target.closest(".todo-item");

    if (!li) return;

    const id = Number(li.dataset.id);

    const todo = todos.find(todo => todo.id === id);

    // DELETE

    if (e.target.tagName === "BUTTON") {

        todos = todos.filter(
            todo => todo.id !== id
        );
    }

    // TOGGLE

    if (e.target.tagName === "SPAN") {

        todo.completed = !todo.completed;
    }

    renderTodos();
});

// ===== EDIT TODO =====

todoList.addEventListener("dblclick", (e) => {

    if (e.target.tagName !== "SPAN") return;

    const span = e.target;

    const li = span.closest(".todo-item");

    const id = Number(li.dataset.id);

    const todo =
        todos.find(todo => todo.id === id);

    const input = document.createElement("input");

    input.value = todo.text;

    li.replaceChild(input, span);

    input.focus();

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            todo.text = input.value.trim();

            renderTodos();
        }
    });
});

// ===== FILTER =====

filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        currentFilter = btn.dataset.filter;

        renderTodos();
    });
});

// ===== CLEAR COMPLETED =====

clearCompletedBtn.addEventListener("click", () => {

    todos = todos.filter(
        todo => !todo.completed
    );

    renderTodos();
});

// ===== INIT =====

renderTodos();