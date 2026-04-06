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

// ========== МОДАЛЬНОЕ ОКНО ДЛЯ ЦЕН ==========
const priceModal = document.getElementById('priceModal');
const modalContent = document.getElementById('modalPriceContent');
const closeModalBtn = document.getElementById('closeModalBtn');

// Данные для каждой услуги
const priceData = {
    massage: {
        title: 'Сферический массаж',
        categories: [
            {
                name: 'Стоимость сеанса',
                items: [
                    { name: '30 минут', price: '1200₽' },
                    { name: '40 минут', price: '1500₽' },
                    { name: '50 минут', price: '1800₽' },
                    { name: 'Сферический массаж лица', price: '1100₽' }
                ]
            }
        ],
        info: 'Уменьшение объёмов тела, повышение тонуса кожи, снижение веса, избавление от целлюлита, лимфодренаж, релакс.'
    },
    tanning: {
        title: 'Солярий',
        categories: [
            {
                name: 'Услуги',
                items: [
                    { name: '1 минута', price: '40₽' },
                    { name: 'Крем «Sun Luxe»', price: '160₽' },
                    { name: 'Стикини', price: '10₽' },
                    { name: 'Шапочка', price: '10₽' },
                    { name: 'Абонемент на 50 минут', price: '1750₽' },
                    { name: 'Абонемент на 100 минут', price: '3000₽' }
                ]
            }
        ],
        info: 'Немецкие лампы. Абонементы — отличная экономия!'
    },
    permanent: {
        title: 'Перманентный макияж',
        categories: [
            {
                name: 'Услуги',
                items: [
                    { name: 'Перманент губ', price: '8000₽' },
                    { name: 'Перманент бровей', price: '6000₽' },
                    { name: 'Перманент стрелок', price: '7000₽' }
                ]
            }
        ],
        info: 'Естественный контур, насыщенный цвет, стойкость до нескольких лет.'
    },
    lamination: {
        title: 'Ламинирование',
        categories: [
            {
                name: 'Услуги',
                items: [
                    { name: 'Ламинирование ресниц', price: '1500₽' },
                    { name: 'Ламинирование бровей', price: '1200₽' }
                ]
            }
        ],
        info: 'Изгиб, длина, насыщенный цвет. Стойкость до месяца.'
    },
    cosmetology: {
        title: 'Косметология',
        categories: [
            {
                name: 'Услуги',
                items: [
                    { name: 'Консультация косметолога', price: 'Бесплатно' },
                    { name: 'Аппаратная чистка лица', price: '2500₽' },
                    { name: 'Уходовые процедуры', price: 'от 2000₽' }
                ]
            }
        ],
        info: 'Точную стоимость уточняйте у администратора.'
    },
    laser: {
        title: 'Лазерная эпиляция',
        categories: [
            {
                name: 'Женская эпиляция',
                items: [
                    { name: 'Подмышки', price: '1000₽' },
                    { name: 'Бикини (лобок)', price: '1300₽' },
                    { name: 'Бикини (контур)', price: '1800₽' },
                    { name: 'Бикини (глубокое)', price: '2600₽' },
                    { name: 'Ноги полностью', price: '4500₽' },
                    { name: 'Голени с коленом', price: '2000₽' },
                    { name: 'Бёдра', price: '2600₽' },
                    { name: 'Ягодицы', price: '2600₽' },
                    { name: 'Руки полностью', price: '2500₽' },
                    { name: 'Руки до локтя', price: '1700₽' },
                    { name: 'Лицо полностью', price: '7000₽' },
                    { name: 'Усы, подбородок', price: '900₽' },
                    { name: 'Межбровье', price: '300₽' },
                    { name: 'Живот полностью', price: '1800₽' },
                    { name: 'Спина', price: '2500₽' }
                ]
            },
            {
                name: 'Мужская эпиляция',
                items: [
                    { name: 'Спина', price: '2500₽' },
                    { name: 'Грудь', price: '1900₽' },
                    { name: 'Живот полностью', price: '1800₽' },
                    { name: 'Борода полностью', price: '1600₽' },
                    { name: 'Подмышки', price: '1000₽' }
                ]
            },
            {
                name: 'Комплексы',
                items: [
                    { name: 'Подмышки + бикини (лобок)', price: '2500₽' },
                    { name: 'Подмышки + глубокое бикини', price: '3500₽' },
                    { name: 'КОМПЛЕКС ВСЕ ТЕЛО', price: '6400₽', highlight: true },
                    { name: 'КОМПЛЕКС ВСЁ ТЕЛО TOTAL', price: '9000₽', highlight: true }
                ]
            }
        ],
        info: 'Диодный лазер 2400 Вт. Безопасно, эффективно, безболезненно.'
    }
};

// Функция создания HTML для прайса с каруселью
function buildPriceHTML(serviceType) {
    const data = priceData[serviceType];
    if (!data) return '<p>Информация временно недоступна</p>';
    
    let html = `<h2>${data.title}</h2>`;
    html += `<div class="price-carousel-container">`;
    html += `<button class="carousel-arrow prev"><i class="fas fa-chevron-left"></i></button>`;
    html += `<div class="price-carousel">`;
    html += `<div class="price-carousel-track">`;
    
    data.categories.forEach((category, idx) => {
        html += `<div class="price-slide" data-slide="${idx}">`;
        html += `<h3>${category.name}</h3>`;
        html += `<div class="price-list">`;
        category.items.forEach(item => {
            const highlightClass = item.highlight ? 'highlight' : '';
            html += `
                <div class="price-item ${highlightClass}">
                    <span>${item.name}</span>
                    <strong>${item.price}</strong>
                </div>
            `;
        });
        html += `</div>`;
        html += `</div>`;
    });
    
    html += `</div>`;
    html += `</div>`;
    html += `<button class="carousel-arrow next"><i class="fas fa-chevron-right"></i></button>`;
    html += `</div>`;
    html += `<div class="price-dots"></div>`;
    html += `<div class="price-info"><i class="fas fa-info-circle"></i> ${data.info}</div>`;
    html += `<button class="btn-primary price-book-btn" onclick="document.getElementById('priceModal').style.display='none'; document.getElementById('contact').scrollIntoView({behavior:'smooth'});">Записаться</button>`;
    
    return html;
}

// Переменные для карусели ПРАЙСА (в модалке)
let priceCarouselTrack = null;
let priceCurrentSlide = 0;
let priceTotalSlides = 0;
let priceDotsContainer = null;

function initPriceCarousel() {
    priceCarouselTrack = document.querySelector('.price-carousel-track');
    const slides = document.querySelectorAll('.price-slide');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    priceDotsContainer = document.querySelector('.price-dots');
    
    if (!priceCarouselTrack || slides.length === 0) return;
    
    priceTotalSlides = slides.length;
    priceCurrentSlide = 0;
    
    // Создаём точки
    if (priceDotsContainer) {
        priceDotsContainer.innerHTML = '';
        for (let i = 0; i < priceTotalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('price-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToPriceSlide(i));
            priceDotsContainer.appendChild(dot);
        }
    }
    
    function updatePriceCarousel() {
        const slideWidth = slides[0]?.offsetWidth || 0;
        priceCarouselTrack.style.transform = `translateX(-${priceCurrentSlide * slideWidth}px)`;
        
        document.querySelectorAll('.price-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === priceCurrentSlide);
        });
    }
    
    function goToPriceSlide(index) {
        if (index < 0) index = 0;
        if (index >= priceTotalSlides) index = priceTotalSlides - 1;
        priceCurrentSlide = index;
        updatePriceCarousel();
    }
    
    if (prevBtn) {
        prevBtn.onclick = () => {
            if (priceCurrentSlide > 0) {
                priceCurrentSlide--;
                updatePriceCarousel();
            }
        };
    }
    if (nextBtn) {
        nextBtn.onclick = () => {
            if (priceCurrentSlide < priceTotalSlides - 1) {
                priceCurrentSlide++;
                updatePriceCarousel();
            }
        };
    }
    
    window.addEventListener('resize', () => {
        updatePriceCarousel();
    });
    
    updatePriceCarousel();
}

// Открытие модального окна
const serviceItems = document.querySelectorAll('.service-item');

if (serviceItems.length) {
    serviceItems.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            if (serviceType && priceData[serviceType]) {
                modalContent.innerHTML = buildPriceHTML(serviceType);
                priceModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                setTimeout(initPriceCarousel, 50);
            }
        });
    });
}

// Закрытие модального окна
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

// ========== КАРУСЕЛЬ УСЛУГ (ГОРИЗОНТАЛЬНАЯ) ==========
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
    servicesItemWidth = items[0]?.offsetWidth || 320;
    
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
    
    if (servicesPrevBtn) {
        servicesPrevBtn.classList.toggle('disabled', currentScroll <= 5);
    }
    if (servicesNextBtn) {
        servicesNextBtn.classList.toggle('disabled', currentScroll >= maxScroll - 5);
    }
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
            servicesItemWidth = document.querySelector('.service-item')?.offsetWidth || 320;
            updateServicesCarousel();
            updateServicesDots();
        }, 100);
    });
}

setTimeout(() => {
    updateServicesDots();
    updateServicesButtons();
}, 100);

// Кнопка "Оставить отзыв"
const openReviewBtn = document.getElementById('openReviewBtn');
if (openReviewBtn) {
    openReviewBtn.addEventListener('click', () => {
        const text = `Здравствуйте! Хочу оставить отзыв о студии НЕ ХАОС%0A%0AМой отзыв: `;
        window.open(`https://wa.me/79537229057?text=${text}`, '_blank');
    });
}

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