const photoGrid = document.getElementById('photo-grid');
const loadTrigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxButton = document.getElementById('close-lightbox');

let page = 1;
let isLoading = false;
const limit = 20;

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
        lazyObserver.unobserve(img);
    });
}, { rootMargin: '100px' });

const loadObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading) {
        loadMorePhotos();
    }
});

async function fetchPhotos(pageNumber) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-item';
    card.innerHTML = `
        <img data-src="${photo.thumbnailUrl}" alt="${photo.title}" />
        <div class="photo-caption">${photo.title}</div>
    `;

    const img = card.querySelector('img');
    lazyObserver.observe(img);

    card.addEventListener('click', () => openLightbox(photo));
    return card;
}

async function loadMorePhotos() {
    try {
        isLoading = true;
        const photos = await fetchPhotos(page);
        photos.forEach(photo => photoGrid.appendChild(createPhotoCard(photo)));
        page += 1;
    } catch (error) {
        loadTrigger.textContent = `Lỗi tải ảnh: ${error.message}`;
        loadObserver.unobserve(loadTrigger);
    } finally {
        isLoading = false;
    }
}

function openLightbox(photo) {
    lightboxImage.src = photo.url;
    lightboxCaption.textContent = photo.title;
    lightbox.classList.remove('hidden');
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
}

closeLightboxButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
    }
});

loadObserver.observe(loadTrigger);
loadMorePhotos();
