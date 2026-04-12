// Мобильное меню
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '80px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'white';
            navMenu.style.padding = '30px';
            navMenu.style.gap = '20px';
            navMenu.style.borderBottom = '1px solid #e0e0e0';
            navMenu.style.zIndex = '999';
            navMenu.style.textAlign = 'center';
        }
    });
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.style.display = 'none';
            }
        }
    });
});

// ========== КАРУСЕЛЬ УСЛУГ ==========
const servicesCarousel = document.getElementById('servicesCarousel');
const servicesPrevBtn = document.getElementById('servicesPrev');
const servicesNextBtn = document.getElementById('servicesNext');
const servicesDotsContainer = document.getElementById('servicesDots');

let servicesCurrentIndex = 0;
let servicesTotalItems = 0;
let servicesItemWidth = 0;

function updateServicesCarousel() {
    if (!servicesCarousel) return;
    const scrollAmount = servicesCurrentIndex * (servicesItemWidth + 30);
    servicesCarousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    updateServicesDots();
    updateServicesButtons();
}

function updateServicesDots() {
    if (!servicesDotsContainer) return;
    const items = document.querySelectorAll('.service-item');
    servicesTotalItems = items.length;
    servicesItemWidth = items[0]?.offsetWidth || 300;
    if (servicesDotsContainer.children.length === 0) {
        for (let i = 0; i < servicesTotalItems; i++) {
            const dot = document.createElement('span');
            dot.classList.add('services-dot');
            dot.addEventListener('click', () => {
                servicesCurrentIndex = i;
                updateServicesCarousel();
            });
            servicesDotsContainer.appendChild(dot);
        }
    }
    const dots = document.querySelectorAll('.services-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === servicesCurrentIndex);
    });
}

function updateServicesButtons() {
    if (!servicesCarousel) return;
    const maxScroll = servicesCarousel.scrollWidth - servicesCarousel.clientWidth;
    const currentScroll = servicesCarousel.scrollLeft;
    if (servicesPrevBtn) servicesPrevBtn.classList.toggle('disabled', currentScroll <= 5);
    if (servicesNextBtn) servicesNextBtn.classList.toggle('disabled', currentScroll >= maxScroll - 5);
}

if (servicesNextBtn) {
    servicesNextBtn.addEventListener('click', () => {
        if (servicesCurrentIndex < servicesTotalItems - 1) {
            servicesCurrentIndex++;
            updateServicesCarousel();
        }
    });
}

if (servicesPrevBtn) {
    servicesPrevBtn.addEventListener('click', () => {
        if (servicesCurrentIndex > 0) {
            servicesCurrentIndex--;
            updateServicesCarousel();
        }
    });
}

if (servicesCarousel) {
    servicesCarousel.addEventListener('scroll', () => {
        const scrollPos = servicesCarousel.scrollLeft;
        const newIndex = Math.round(scrollPos / (servicesItemWidth + 30));
        if (newIndex !== servicesCurrentIndex && !isNaN(newIndex)) {
            servicesCurrentIndex = newIndex;
            updateServicesDots();
        }
        updateServicesButtons();
    });
    window.addEventListener('resize', () => {
        setTimeout(() => {
            servicesItemWidth = document.querySelector('.service-item')?.offsetWidth || 300;
            updateServicesCarousel();
            updateServicesDots();
        }, 100);
    });
}

setTimeout(() => {
    updateServicesDots();
    updateServicesButtons();
}, 100);

// ========== МОДАЛЬНОЕ ОКНО ДЛЯ ЦЕН ==========
const priceModal = document.getElementById('priceModal');
const modalContent = document.getElementById('modalPriceContent');
const closeModalBtn = document.getElementById('closeModalBtn');

const priceData = {
    massage: {
        title: 'Сферический массаж',
        categories: [{ name: 'Стоимость сеанса', items: [{ name: '30 минут', price: '1200₽' }, { name: '40 минут', price: '1500₽' }, { name: '50 минут', price: '1800₽' }, { name: 'Сферический массаж лица', price: '1100₽' }] }],
        info: 'Уменьшение объёмов тела, повышение тонуса кожи, снижение веса, избавление от целлюлита, лимфодренаж, релакс.'
    },
    tanning: {
        title: 'Солярий',
        categories: [{ name: 'Услуги', items: [{ name: '1 минута', price: '40₽' }, { name: 'Крем «Sun Luxe»', price: '160₽' }, { name: 'Стикини', price: '10₽' }, { name: 'Шапочка', price: '10₽' }, { name: 'Абонемент на 50 минут', price: '1750₽' }, { name: 'Абонемент на 100 минут', price: '3000₽' }] }],
        info: 'Немецкие лампы. Абонементы — отличная экономия!'
    },
    permanent: {
        title: 'Перманентный макияж',
        categories: [{ name: 'Услуги', items: [{ name: 'Перманент губ', price: '8000₽' }, { name: 'Перманент бровей', price: '6000₽' }, { name: 'Перманент стрелок', price: '7000₽' }] }],
        info: 'Естественный контур, насыщенный цвет, стойкость до нескольких лет.'
    },
    lamination: {
        title: 'Ламинирование',
        categories: [{ name: 'Услуги', items: [{ name: 'Ламинирование ресниц', price: '1500₽' }, { name: 'Ламинирование бровей', price: '1200₽' }] }],
        info: 'Изгиб, длина, насыщенный цвет. Стойкость до месяца.'
    },
    cosmetology: {
        title: 'Косметология',
        categories: [{ name: 'Услуги', items: [{ name: 'Консультация косметолога', price: 'Бесплатно' }, { name: 'Аппаратная чистка лица', price: '2500₽' }, { name: 'Уходовые процедуры', price: 'от 2000₽' }] }],
        info: 'Точную стоимость уточняйте у администратора.'
    },
    laser: {
        title: 'Лазерная эпиляция',
        categories: [
            { name: 'Женская эпиляция', items: [{ name: 'Подмышки', price: '1000₽' }, { name: 'Бикини (лобок)', price: '1300₽' }, { name: 'Бикини (контур)', price: '1800₽' }, { name: 'Бикини (глубокое)', price: '2600₽' }, { name: 'Ноги полностью', price: '4500₽' }, { name: 'Голени с коленом', price: '2000₽' }, { name: 'Бёдра', price: '2600₽' }, { name: 'Ягодицы', price: '2600₽' }, { name: 'Руки полностью', price: '2500₽' }, { name: 'Руки до локтя', price: '1700₽' }, { name: 'Лицо полностью', price: '7000₽' }, { name: 'Усы, подбородок', price: '900₽' }, { name: 'Межбровье', price: '300₽' }, { name: 'Живот полностью', price: '1800₽' }, { name: 'Спина', price: '2500₽' }] },
            { name: 'Мужская эпиляция', items: [{ name: 'Спина', price: '2500₽' }, { name: 'Грудь', price: '1900₽' }, { name: 'Живот полностью', price: '1800₽' }, { name: 'Борода полностью', price: '1600₽' }, { name: 'Подмышки', price: '1000₽' }] },
            { name: 'Комплексы', items: [{ name: 'Подмышки + бикини (лобок)', price: '2500₽' }, { name: 'Подмышки + глубокое бикини', price: '3500₽' }, { name: 'КОМПЛЕКС ВСЕ ТЕЛО', price: '6400₽', highlight: true }, { name: 'КОМПЛЕКС ВСЁ ТЕЛО TOTAL', price: '9000₽', highlight: true }] }
        ],
        info: 'Диодный лазер 2400 Вт. Безопасно, эффективно, безболезненно.'
    }
};

function buildPriceHTML(serviceType) {
    const data = priceData[serviceType];
    if (!data) return '<p>Информация временно недоступна</p>';
    let html = `<h2>${data.title}</h2>`;
    data.categories.forEach(category => {
        html += `<div class="price-category"><h3>${category.name}</h3><div class="price-list">`;
        category.items.forEach(item => {
            html += `<div class="price-item ${item.highlight ? 'highlight' : ''}"><span>${item.name}</span><strong>${item.price}</strong></div>`;
        });
        html += `</div></div>`;
    });
    html += `<div class="price-info"><i class="fas fa-info-circle"></i> ${data.info}</div>`;
    html += `<button class="btn-primary price-book-btn" onclick="document.getElementById('priceModal').style.display='none'; document.getElementById('contact').scrollIntoView({behavior:'smooth'});">Записаться</button>`;
    return html;
}

const serviceItems = document.querySelectorAll('.service-item');
if (serviceItems.length) {
    serviceItems.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            if (serviceType && priceData[serviceType]) {
                modalContent.innerHTML = buildPriceHTML(serviceType);
                priceModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

if (closeModalBtn && priceModal) {
    closeModalBtn.addEventListener('click', () => {
        priceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    priceModal.addEventListener('click', (e) => {
        if (e.target === priceModal) {
            priceModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && priceModal && priceModal.style.display === 'flex') {
        priceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Отправка формы
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const message = document.getElementById('message')?.value || '';
        if (!name || !phone) {
            alert('Пожалуйста, заполните имя и телефон');
            return;
        }
        const text = `НОВАЯ ЗАЯВКА С САЙТА%0A%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AСообщение: ${encodeURIComponent(message || '-')}`;
        window.open(`https://wa.me/79537229057?text=${text}`, '_blank');
        alert('Спасибо! Перейдите в WhatsApp для отправки заявки.');
        contactForm.reset();
    });
}

// Галерея
const galleryCards = document.querySelectorAll('.gallery-card');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

if (galleryCards.length && imageModal && modalImage) {
    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                imageModal.style.display = 'flex';
            }
        });
    });
    imageModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });
}

// ========== ПОДАРОЧНЫЕ СЕРТИФИКАТЫ ==========
const certCards = document.querySelectorAll('.cert-card');
const certValueHidden = document.getElementById('certValue');
const certForm = document.getElementById('certForm');
const phoneInput = document.getElementById('certPhone');
const phoneError = document.getElementById('phoneError');
const submitBtn = document.getElementById('certSubmitBtn');

let selectedNominalText = '';

function validatePhone(phone) {
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const pattern1 = /^\+7\d{10}$/;
    const pattern2 = /^8\d{10}$/;
    const pattern3 = /^7\d{10}$/;
    return pattern1.test(cleaned) || pattern2.test(cleaned) || pattern3.test(cleaned);
}

function normalizePhone(phone) {
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('8')) cleaned = '+7' + cleaned.slice(1);
    else if (cleaned.startsWith('7') && !cleaned.startsWith('+7')) cleaned = '+' + cleaned;
    else if (!cleaned.startsWith('+')) cleaned = '+' + cleaned;
    return cleaned;
}

if (certCards.length) {
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            certCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const value = card.getAttribute('data-value');
            if (certValueHidden) certValueHidden.value = value;
            const valueElement = card.querySelector('.cert-value');
            if (valueElement) selectedNominalText = valueElement.textContent;
        });
    });
}

if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        const phone = this.value;
        if (phone.length > 0 && !validatePhone(phone)) {
            this.classList.add('error');
            phoneError.style.display = 'block';
        } else {
            this.classList.remove('error');
            phoneError.style.display = 'none';
        }
    });
    phoneInput.addEventListener('blur', function() {
        const phone = this.value;
        if (phone.length > 0 && validatePhone(phone)) {
            this.value = normalizePhone(phone);
        }
    });
}

if (certForm) {
    certForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('certName')?.value.trim();
        let phone = document.getElementById('certPhone')?.value.trim();
        const recipient = document.getElementById('certRecipient')?.value.trim();
        const personalMessage = document.getElementById('certMessage')?.value.trim();
        const certValue = certValueHidden?.value;
        
        if (!name) { alert('❌ Пожалуйста, введите ваше имя'); document.getElementById('certName')?.focus(); return; }
        if (!phone) { alert('❌ Пожалуйста, введите номер телефона'); document.getElementById('certPhone')?.focus(); return; }
        if (!validatePhone(phone)) { alert('❌ Введите корректный номер телефона'); document.getElementById('certPhone')?.focus(); return; }
        if (!certValue) { alert('❌ Пожалуйста, выберите номинал сертификата'); return; }
        
        phone = normalizePhone(phone);
        let valueText = selectedNominalText || `${certValue} ₽`;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправляем...';
        
        let text = `🎁 *НОВАЯ ЗАЯВКА НА СЕРТИФИКАТ* 🎁%0A%0A`;
        text += `👤 *От кого:* ${encodeURIComponent(name)}%0A`;
        text += `📞 *Телефон:* ${encodeURIComponent(phone)}%0A`;
        text += `💰 *Номинал:* ${encodeURIComponent(valueText)}%0A`;
        if (recipient) text += `🎀 *Получатель:* ${encodeURIComponent(recipient)}%0A`;
        if (personalMessage) text += `💌 *Пожелание:* ${encodeURIComponent(personalMessage)}%0A`;
        text += `%0A_📅 Сообщение отправлено с сайта НЕ ХАОС_`;
        
        window.open(`https://wa.me/79537229057?text=${text}`, '_blank');
        alert('✅ Заявка открыта в WhatsApp!\n\nНажмите кнопку "Отправить", чтобы завершить оформление.');
        
        certForm.reset();
        if (certValueHidden) certValueHidden.value = '';
        certCards.forEach(c => c.classList.remove('selected'));
        selectedNominalText = '';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Отправить заявку в WhatsApp';
        if (phoneInput) { phoneInput.classList.remove('error'); phoneError.style.display = 'none'; }
    });
}

// ========== СИСТЕМА ОТЗЫВОВ (LOCALSTORAGE) ==========
let reviews = [];
let pendingReviews = [];

function loadReviews() {
    const saved = localStorage.getItem('nehaos_reviews');
    if (saved) reviews = JSON.parse(saved);
    const savedPending = localStorage.getItem('nehaos_pending_reviews');
    if (savedPending) pendingReviews = JSON.parse(savedPending);
    renderReviews();
    renderPendingReviews();
}

function saveReviews() {
    localStorage.setItem('nehaos_reviews', JSON.stringify(reviews));
    localStorage.setItem('nehaos_pending_reviews', JSON.stringify(pendingReviews));
}

function renderReviews() {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    if (reviews.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-light);">Пока нет отзывов. Будьте первыми! ✨</div>';
        return;
    }
    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-quote">“</div>
            <p class="review-text">${escapeHtml(review.text)}</p>
            <div class="review-author">
                <div class="author-avatar">${review.name.charAt(0).toUpperCase()}</div>
                <div class="author-info">
                    <h4>${escapeHtml(review.name)}</h4>
                    <div class="author-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPendingReviews() {
    const container = document.getElementById('pendingReviewsList');
    if (!container) return;
    if (pendingReviews.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-light);">Нет отзывов на модерации</div>';
        return;
    }
    container.innerHTML = pendingReviews.map((review, idx) => `
        <div class="admin-review-item pending">
            <div class="review-info">
                <div class="review-name">${escapeHtml(review.name)}</div>
                <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                <div class="review-text">${escapeHtml(review.text)}</div>
            </div>
            <div class="admin-review-actions">
                <button class="approve-btn" data-idx="${idx}" title="Одобрить"><i class="fas fa-check-circle"></i></button>
                <button class="delete-btn" data-idx="${idx}" data-pending="true" title="Удалить"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const approved = pendingReviews[idx];
            if (approved) {
                reviews.unshift(approved);
                pendingReviews.splice(idx, 1);
                saveReviews();
                renderReviews();
                renderPendingReviews();
                alert('Отзыв опубликован!');
            }
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const isPending = btn.getAttribute('data-pending') === 'true';
            if (isPending) {
                pendingReviews.splice(idx, 1);
            } else {
                reviews.splice(idx, 1);
            }
            saveReviews();
            renderReviews();
            renderPendingReviews();
            alert('Отзыв удалён');
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}

const reviewForm = document.getElementById('siteReviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName')?.value.trim();
        const text = document.getElementById('reviewText')?.value.trim();
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        
        if (!name) { alert('Пожалуйста, введите ваше имя'); return; }
        if (!text) { alert('Пожалуйста, введите текст отзыва'); return; }
        if (!ratingInput) { alert('Пожалуйста, оцените нас звездочками'); return; }
        
        const rating = parseInt(ratingInput.value);
        
        pendingReviews.push({ name, text, rating, date: new Date().toISOString() });
        saveReviews();
        renderPendingReviews();
        
        reviewForm.reset();
        document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
        alert('Спасибо за отзыв! Он появится после проверки администратором.');
    });
}

const openAdminBtn = document.getElementById('openAdminBtn');
const adminPanel = document.getElementById('adminPanel');
const toggleAdminBtn = document.getElementById('toggleAdminBtn');

if (openAdminBtn && adminPanel) {
    openAdminBtn.addEventListener('click', () => {
        const password = prompt('Введите пароль администратора:');
        if (password === 'admin123') {
            adminPanel.style.display = 'block';
            renderPendingReviews();
        } else if (password !== null) {
            alert('Неверный пароль');
        }
    });
}

if (toggleAdminBtn) {
    toggleAdminBtn.addEventListener('click', () => {
        adminPanel.style.display = 'none';
    });
}

loadReviews();

// Добавляем начальные отзывы, если их нет
if (reviews.length === 0 && pendingReviews.length === 0) {
    reviews.push(
        { name: 'Анна К.', text: 'Наконец-то нашла место, где можно по-настоящему расслабиться. Сферический массаж — это что-то невероятное! Ушли отёки, тело стало лёгким. Обязательно вернусь!', rating: 5 },
        { name: 'Екатерина М.', text: 'Делала перманент губ — результат превзошёл ожидания! Цвет насыщенный, контур ровный. Мастер — золотые руки. Спасибо за красоту!', rating: 5 },
        { name: 'Ольга В.', text: 'Солярий с немецкими лампами — загар ровный и красивый. Всё чисто, аккуратно, есть крем и стикини. Рекомендую!', rating: 5 }
    );
    saveReviews();
    renderReviews();
}
