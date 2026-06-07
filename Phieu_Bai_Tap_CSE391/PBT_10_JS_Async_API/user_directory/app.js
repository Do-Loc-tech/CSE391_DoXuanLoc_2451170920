const api = {
    baseURL: 'https://jsonplaceholder.typicode.com',

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
    }
};

const ui = {
    usersContainer: document.getElementById('users-container'),
    loadingState: document.getElementById('loading-state'),
    toast: document.getElementById('toast'),

    renderUsers(users) {
        if (!users.length) {
            this.usersContainer.innerHTML = '<p>Không có user nào.</p>';
            return;
        }

        this.usersContainer.innerHTML = users.map(user => `
            <div class="user-card" data-id="${user.id}">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <div class="user-actions">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            </div>
        `).join('');
    },

    showLoading() {
        this.loadingState.innerHTML = Array.from({ length: 5 }, () => '<div class="skeleton"></div>').join('');
        this.loadingState.classList.remove('hidden');
        this.usersContainer.classList.add('hidden');
    },

    hideLoading() {
        this.loadingState.classList.add('hidden');
        this.usersContainer.classList.remove('hidden');
    },

    showError(message) {
        this.showToast(message, true);
    },

    showSuccess(message) {
        this.showToast(message, false);
    },

    showToast(message, isError = false) {
        this.toast.textContent = message;
        this.toast.style.background = isError ? 'rgba(220, 38, 38, 0.92)' : 'rgba(15, 23, 42, 0.92)';
        this.toast.classList.remove('hidden');
        clearTimeout(this.toast.timeoutId);
        this.toast.timeoutId = setTimeout(() => this.toast.classList.add('hidden'), 3000);
    }
};

const userForm = document.getElementById('user-form');
const searchInput = document.getElementById('search-input');
const refreshButton = document.getElementById('refresh-button');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');
const formTitle = document.getElementById('form-title');
const cancelEditButton = document.getElementById('cancel-edit');

let users = [];
let currentEditId = null;

function displayUsers(filteredUsers) {
    ui.renderUsers(filteredUsers);
    attachUserActions();
}

function attachUserActions() {
    document.querySelectorAll('.user-card').forEach(card => {
        const userId = Number(card.dataset.id);
        card.querySelector('.edit').addEventListener('click', () => startEdit(userId));
        card.querySelector('.delete').addEventListener('click', () => confirmDelete(userId));
    });
}

async function loadUsers() {
    ui.showLoading();
    try {
        users = await api.getUsers();
        displayUsers(users);
    } catch (error) {
        ui.showError(`Lỗi khi tải user: ${error.message}`);
    } finally {
        ui.hideLoading();
    }
}

function filterUsers() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        displayUsers(users);
        return;
    }
    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    displayUsers(filtered);
}

function startEdit(id) {
    const user = users.find(item => item.id === id);
    if (!user) return;
    currentEditId = id;
    formTitle.textContent = 'Chỉnh sửa user';
    nameInput.value = user.name;
    emailInput.value = user.email;
    phoneInput.value = user.phone;
    cancelEditButton.classList.remove('hidden');
}

function resetForm() {
    currentEditId = null;
    formTitle.textContent = 'Thêm user mới';
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    cancelEditButton.classList.add('hidden');
}

async function confirmDelete(id) {
    const confirmed = window.confirm('Bạn có chắc muốn xóa user này?');
    if (!confirmed) return;

    try {
        await api.deleteUser(id);
        users = users.filter(item => item.id !== id);
        displayUsers(users);
        ui.showSuccess('Xóa user thành công.');
    } catch (error) {
        ui.showError(`Xóa thất bại: ${error.message}`);
    }
}

userForm.addEventListener('submit', async event => {
    event.preventDefault();
    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    if (!userData.name || !userData.email || !userData.phone) {
        ui.showError('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    try {
        if (currentEditId) {
            const updated = await api.updateUser(currentEditId, userData);
            users = users.map(item => item.id === currentEditId ? { ...item, ...updated } : item);
            ui.showSuccess('Cập nhật user thành công.');
        } else {
            const created = await api.createUser(userData);
            users.unshift(created);
            ui.showSuccess('Thêm user thành công.');
        }
        resetForm();
        displayUsers(users);
    } catch (error) {
        ui.showError(`Lưu thất bại: ${error.message}`);
    }
});

cancelEditButton.addEventListener('click', resetForm);
searchInput.addEventListener('input', filterUsers);
refreshButton.addEventListener('click', loadUsers);

loadUsers();
