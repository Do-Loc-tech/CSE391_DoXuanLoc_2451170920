const refreshButton = document.getElementById('refresh-button');
const loadTimeEl = document.getElementById('load-time');
const globalLoading = document.getElementById('global-loading');

const statusUsers = document.getElementById('status-users');
const bodyUsers = document.getElementById('body-users');
const statusDogs = document.getElementById('status-dogs');
const bodyDogs = document.getElementById('body-dogs');
const statusCountry = document.getElementById('status-country');
const bodyCountry = document.getElementById('body-country');

function showGlobalLoading() {
    globalLoading.classList.remove('hidden');
}

function hideGlobalLoading() {
    globalLoading.classList.add('hidden');
}

function renderWidgetLoading(statusEl, bodyEl) {
    statusEl.textContent = 'Loading...';
    bodyEl.innerHTML = '<p>Đang tải dữ liệu...</p>';
}

function renderWidgetSuccess(statusEl, bodyEl, content) {
    statusEl.textContent = 'Success';
    bodyEl.innerHTML = content;
}

function renderWidgetError(statusEl, bodyEl, message) {
    statusEl.textContent = `Error: ${message}`;
    bodyEl.innerHTML = '<p>Không thể tải dữ liệu.</p>';
}

async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=5');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

async function fetchDogs() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/5');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

async function fetchCountry() {
    const response = await fetch('https://restcountries.com/v3.1/name/vietnam');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

function renderUsersList(data) {
    const users = data.results || [];
    if (!users.length) return '<p>Không có user.</p>';

    return `<ul>${users.map(user => `
        <li>
            <strong>${user.name.first} ${user.name.last}</strong><br />
            ${user.email}<br />
            ${user.location.country}
        </li>
    `).join('')}</ul>`;
}

function renderDogsList(data) {
    if (!data.message || !data.message.length) return '<p>Không có ảnh dog.</p>';
    return data.message.map(url => `
        <div>
            <img src="${url}" alt="Dog image" />
        </div>
    `).join('');
}

function renderCountryInfo(data) {
    const country = data?.[0];
    if (!country) return '<p>Không có thông tin.</p>';
    return `
        <div class="widget-grid">
            <div><strong>Tên:</strong> ${country.name.common}</div>
            <div><strong>Thủ đô:</strong> ${country.capital?.[0] || 'N/A'}</div>
            <div><strong>Vùng:</strong> ${country.region}</div>
            <div><strong>Dân số:</strong> ${country.population.toLocaleString()}</div>
            <div><strong>Tiền tệ:</strong> ${Object.values(country.currencies || {}).map(currency => currency.name).join(', ')}</div>
            <img src="${country.flags?.svg || country.flags?.png}" alt="Flag" />
        </div>
    `;
}

async function loadDashboard() {
    showGlobalLoading();
    renderWidgetLoading(statusUsers, bodyUsers);
    renderWidgetLoading(statusDogs, bodyDogs);
    renderWidgetLoading(statusCountry, bodyCountry);

    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetchUsers(),
        fetchDogs(),
        fetchCountry()
    ]);

    const duration = Date.now() - startTime;
    loadTimeEl.textContent = `Data loaded in ${duration} ms`;

    results.forEach((result, index) => {
        if (index === 0) {
            if (result.status === 'fulfilled') {
                renderWidgetSuccess(statusUsers, bodyUsers, renderUsersList(result.value));
            } else {
                renderWidgetError(statusUsers, bodyUsers, result.reason.message);
            }
        }
        if (index === 1) {
            if (result.status === 'fulfilled') {
                renderWidgetSuccess(statusDogs, bodyDogs, renderDogsList(result.value));
            } else {
                renderWidgetError(statusDogs, bodyDogs, result.reason.message);
            }
        }
        if (index === 2) {
            if (result.status === 'fulfilled') {
                renderWidgetSuccess(statusCountry, bodyCountry, renderCountryInfo(result.value));
            } else {
                renderWidgetError(statusCountry, bodyCountry, result.reason.message);
            }
        }
    });

    hideGlobalLoading();
}

refreshButton.addEventListener('click', loadDashboard);
loadDashboard();
