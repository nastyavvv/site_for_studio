// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '20px';
            navLinks.style.borderBottom = '1px solid #e0e0e0';
            navLinks.style.zIndex = '999';
        }
    });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Галерея
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

if (galleryItems.length && modal && modalImage) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                modal.style.display = 'flex';
            }
        });
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// ========== МОДАЛЬНОЕ ОКНО ДЛЯ ЦЕН ==========
const priceModal = document.getElementById('priceModal');
const modalContent = document.getElementById('modalPriceContent');
const closeModalBtn = document.getElementById('closeModalBtn');

// Данные для каждой услуги
const priceData = {
    laser: {
        title: 'Лазерная эпиляция',
        content: `
            <div class="price-category">
                <h3><i class="fas fa-female"></i> Женская эпиляция</h3>
                <div class="prices-grid">
                    <div class="price-card"><span>Подмышки</span><strong>1000₽</strong></div>
                    <div class="price-card"><span>Бикини (лобок)</span><strong>1300₽</strong></div>
                    <div class="price-card"><span>Бикини (контур)</span><strong>1800₽</strong></div>
                    <div class="price-card"><span>Бикини (глубокое)</span><strong>2600₽</strong></div>
                    <div class="price-card"><span>Ноги полностью</span><strong>4500₽</strong></div>
                    <div class="price-card"><span>Голени с коленом</span><strong>2000₽</strong></div>
                    <div class="price-card"><span>Бёдра</span><strong>2600₽</strong></div>
                    <div class="price-card"><span>Ягодицы</span><strong>2600₽</strong></div>
                    <div class="price-card"><span>Руки полностью</span><strong>2500₽</strong></div>
                    <div class="price-card"><span>Руки до локтя</span><strong>1700₽</strong></div>
                    <div class="price-card"><span>Лицо полностью</span><strong>7000₽</strong></div>
                    <div class="price-card"><span>Усы, подбородок</span><strong>900₽</strong></div>
                    <div class="price-card"><span>Межбровье</span><strong>300₽</strong></div>
                    <div class="price-card"><span>Белая линия живота</span><strong>600₽</strong></div>
                    <div class="price-card"><span>Живот полностью</span><strong>1800₽</strong></div>
                    <div class="price-card"><span>Спина</span><strong>2500₽</strong></div>
                    <div class="price-card"><span>Грудь</span><strong>1900₽</strong></div>
                    <div class="price-card"><span>Шея</span><strong>900₽</strong></div>
                </div>
            </div>
            <div class="price-category">
                <h3><i class="fas fa-male"></i> Мужская эпиляция</h3>
                <div class="prices-grid">
                    <div class="price-card"><span>Спина</span><strong>2500₽</strong></div>
                    <div class="price-card"><span>Грудь</span><strong>1900₽</strong></div>
                    <div class="price-card"><span>Живот полностью</span><strong>1800₽</strong></div>
                    <div class="price-card"><span>Борода полностью</span><strong>1600₽</strong></div>
                    <div class="price-card"><span>Контур бороды</span><strong>1200₽</strong></div>
                    <div class="price-card"><span>Подмышки</span><strong>1000₽</strong></div>
                    <div class="price-card"><span>Руки полностью</span><strong>2500₽</strong></div>
                    <div class="price-card"><span>Ноги полностью</span><strong>4500₽</strong></div>
                </div>
            </div>
            <div class="price-category">
                <h3><i class="fas fa-star"></i> Комплексы</h3>
                <div class="prices-grid complexes">
                    <div class="price-card"><span>Подмышки + бикини (лобок)</span><strong>2500₽</strong></div>
                    <div class="price-card"><span>Подмышки + глубокое бикини</span><strong>3500₽</strong></div>
                    <div class="price-card highlight"><span>КОМПЛЕКС ВСЕ ТЕЛО</span><strong>6400₽</strong></div>
                    <div class="price-card highlight"><span>КОМПЛЕКС ВСЁ ТЕЛО TOTAL</span><strong>9000₽</strong></div>
                </div>
            </div>
        `
    },
    massage: {
        title: 'Сферический массаж',
        content: `
            <div class="price-category">
                <div class="prices-grid">
                    <div class="price-card"><span>30 минут</span><strong>1200₽</strong></div>
                    <div class="price-card"><span>40 минут</span><strong>1500₽</strong></div>
                    <div class="price-card"><span>50 минут</span><strong>1800₽</strong></div>
                    <div class="price-card"><span>Сферический массаж лица</span><strong>1100₽</strong></div>
                </div>
                <div class="massage-info">
                    <p><i class="fas fa-info-circle"></i> Уменьшение объёмов тела, повышение тонуса кожи, снижение веса, избавление от целлюлита, лимфодренаж, релакс.</p>
                </div>
            </div>
        `
    },
    tanning: {
        title: 'Солярий',
        content: `
            <div class="price-category">
                <div class="prices-grid">
                    <div class="price-card"><span>1 минута</span><strong>40₽</strong></div>
                    <div class="price-card"><span>Крем «Sun Luxe»</span><strong>160₽</strong></div>
                    <div class="price-card"><span>Стикини</span><strong>10₽</strong></div>
                    <div class="price-card"><span>Шапочка</span><strong>10₽</strong></div>
                    <div class="price-card highlight"><span>Абонемент на 50 минут</span><strong>1750₽</strong></div>
                    <div class="price-card highlight"><span>Абонемент на 100 минут</span><strong>3000₽</strong></div>
                </div>
                <div class="massage-info">
                    <p><i class="fas fa-info-circle"></i> Немецкие лампы. Абонементы — отличная экономия!</p>
                </div>
            </div>
        `
    },
    permanent: {
        title: 'Перманентный макияж',
        content: `
            <div class="price-category">
                <div class="prices-grid">
                    <div class="price-card"><span>Перманент губ</span><strong>8000₽</strong></div>
                    <div class="price-card"><span>Перманент бровей</span><strong>6000₽</strong></div>
                    <div class="price-card"><span>Перманент стрелок</span><strong>7000₽</strong></div>
                </div>
                <div class="massage-info">
                    <p><i class="fas fa-info-circle"></i> Естественный контур, насыщенный цвет, стойкость до нескольких лет.</p>
                </div>
            </div>
        `
    },
    lamination: {
        title: 'Ламинирование',
        content: `
            <div class="price-category">
                <div class="prices-grid">
                    <div class="price-card"><span>Ламинирование ресниц</span><strong>1500₽</strong></div>
                    <div class="price-card"><span>Ламинирование бровей</span><strong>1200₽</strong></div>
                </div>
                <div class="massage-info">
                    <p><i class="fas fa-info-circle"></i> Изгиб, длина, насыщенный цвет. Стойкость до месяца.</p>
                </div>
            </div>
        `
    },
    cosmetology: {
        title: 'Косметология',
        content: `
            <div class="price-category">
                <div class="prices-grid">
                    <div class="price-card"><span>Консультация косметолога</span><strong>Бесплатно</strong></div>
                    <div class="price-card"><span>Аппаратная чистка лица</span><strong>2500₽</strong></div>
                    <div class="price-card"><span>Уходовые процедуры</span><strong>от 2000₽</strong></div>
                </div>
                <div class="massage-info">
                    <p><i class="fas fa-info-circle"></i> Точную стоимость уточняйте у администратора.</p>
                </div>
            </div>
        `
    }
};

// Открытие модального окна при клике на карточку
const serviceCards = document.querySelectorAll('.service-card');

if (serviceCards.length) {
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            const data = priceData[serviceType];
            
            if (data && priceModal) {
                modalContent.innerHTML = `
                    <h2>${data.title}</h2>
                    ${data.content}
                `;
                priceModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Закрытие модального окна цен
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

// ========== КНОПКА "ОСТАВИТЬ ОТЗЫВ" ==========
const openReviewBtn = document.getElementById('openReviewBtn');

if (openReviewBtn) {
    openReviewBtn.addEventListener('click', () => {
        const text = `Здравствуйте! Хочу оставить отзыв о студии LASERHAUS68%0A%0AМой отзыв: `;
        const phoneNumber = '79537229057';
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    });
}

// ========== ОТПРАВКА ФОРМЫ ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        if (!name || !phone) {
            alert('Пожалуйста, заполните имя и телефон');
            return;
        }
        
        const text = `НОВАЯ ЗАЯВКА С САЙТА%0A%0AИмя: ${encodeURIComponent(name)}%0AТелефон: ${encodeURIComponent(phone)}%0AСообщение: ${encodeURIComponent(message || '-')}`;
        const phoneNumber = '79537229057';
        
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        
        alert('Спасибо! Перейдите в WhatsApp для отправки заявки.');
        contactForm.reset();
    });
}