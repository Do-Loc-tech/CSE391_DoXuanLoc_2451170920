const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const statusEl = document.getElementById('status');
const weatherCard = document.getElementById('weather-card');
const weatherCity = document.getElementById('weather-city');
const weatherDesc = document.getElementById('weather-desc');
const weatherTemp = document.getElementById('weather-temp');
const weatherHumidity = document.getElementById('weather-humidity');
const weatherIcon = document.getElementById('weather-icon');
const historyList = document.getElementById('history-list');

const STORAGE_KEY = 'weather_app_search_history';
let historyCities = [];

function showStatus(message, type = 'loading') {
    statusEl.textContent = message;
    statusEl.className = `status ${type}`;
    statusEl.classList.remove('hidden');
}

function hideStatus() {
    statusEl.classList.add('hidden');
}

function showWeather(data, city) {
    weatherCity.textContent = city;
    weatherDesc.textContent = data.description;
    weatherTemp.textContent = `${data.tempC}°C`;
    weatherHumidity.textContent = `${data.humidity}%`;
    weatherIcon.src = data.icon;
    weatherIcon.alt = data.description;
    weatherCard.classList.remove('hidden');
}

function hideWeather() {
    weatherCard.classList.add('hidden');
}

function saveHistory(city) {
    city = city.trim();
    if (!city) return;

    historyCities = historyCities.filter(item => item.toLowerCase() !== city.toLowerCase());
    historyCities.unshift(city);
    historyCities = historyCities.slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyCities));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    if (historyCities.length === 0) {
        historyList.innerHTML = '<li>Chưa có lịch sử tìm kiếm.</li>';
        return;
    }

    historyCities.forEach(city => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = city;
        button.addEventListener('click', () => {
            cityInput.value = city;
            searchWeather(city);
        });
        const li = document.createElement('li');
        li.appendChild(button);
        historyList.appendChild(li);
    });
}

function loadHistory() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            historyCities = JSON.parse(saved);
        } catch (error) {
            historyCities = [];
        }
    }
    renderHistory();
}

async function fetchWeather(city) {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
}

function parseWeather(data) {
    const current = data.current_condition?.[0];
    if (!current) {
        throw new Error('Không tìm được dữ liệu thời tiết.');
    }

    return {
        tempC: current.temp_C,
        humidity: current.humidity,
        description: current.weatherDesc?.[0]?.value || 'Không rõ',
        icon: current.weatherIconUrl?.[0]?.value || ''
    };
}

async function searchWeather(city) {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
        showStatus('Vui lòng nhập tên thành phố.', 'error');
        hideWeather();
        return;
    }

    showStatus('Đang tải...', 'loading');
    hideWeather();

    try {
        const weatherData = await fetchWeather(trimmedCity);
        const parsed = parseWeather(weatherData);
        showWeather(parsed, trimmedCity);
        hideStatus();
        saveHistory(trimmedCity);
    } catch (error) {
        showStatus(`Lỗi: ${error.message}`, 'error');
        hideWeather();
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();
    searchWeather(cityInput.value);
});

loadHistory();
