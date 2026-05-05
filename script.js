// ═══════════════════════════════════════════════
// Dance Fit Revolution — Interactive Logic
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initHeader();
    initMobileMenu();
    initFAQ();
    initAppModal();
    initScrollReveal();
    initSmoothScroll();
});

// ═══ LANGUAGE TOGGLE ═══
function initLanguageToggle() {
    const toggle = document.getElementById('langToggle');
    const options = toggle.querySelectorAll('.lang-option');

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-lang');
        const next = current === 'en' ? 'ru' : 'en';
        switchLanguage(next);
    });
}

function switchLanguage(lang) {
    document.documentElement.setAttribute('data-lang', lang);

    // Update toggle UI
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-ru]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else if (el.tagName === 'OPTION') {
                el.textContent = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update page title
    if (lang === 'ru') {
        document.title = 'Dance Fit Revolution — Виктория М | Фитнес и танцы в South Brooklyn';
    } else {
        document.title = 'Dance Fit Revolution — Victoria M | Fitness & Dance in South Brooklyn';
    }
}

// ═══ HEADER ═══
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        header.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    });
}

// ═══ MOBILE MENU ═══
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

// ═══ FAQ ACCORDION ═══
function initFAQ() {
    document.querySelectorAll('.faq__question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));

            // Toggle current
            if (!isOpen) item.classList.add('open');
        });
    });
}

// ═══ APP MODAL ═══
function initAppModal() {
    const modal = document.getElementById('appModal');
    const openBtn = document.getElementById('openAppPreview');
    const closeBtn = document.getElementById('closeAppPreview');
    const overlay = modal.querySelector('.modal__overlay');

    openBtn.addEventListener('click', () => modal.classList.add('active'));
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    overlay.addEventListener('click', () => modal.classList.remove('active'));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.remove('active');
    });
}

// ═══ SCROLL REVEAL ═══
function initScrollReveal() {
    const reveals = document.querySelectorAll('.section__header, .class-card, .about__grid, .locations__content, .schedule__content, .nutrition__content, .app__content, .gallery__grid, .testimonials__placeholder, .faq__list, .newsletter__card, .contact__grid');

    reveals.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ═══ SMOOTH SCROLL ═══
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ═══ FORM HANDLERS ═══
function handleNewsletter(e) {
    e.preventDefault();
    const lang = document.documentElement.getAttribute('data-lang');
    const msg = lang === 'ru' ? 'Спасибо за подписку!' : 'Thank you for subscribing!';
    alert(msg);
    e.target.reset();
    return false;
}

function handleContact(e) {
    e.preventDefault();
    const form = e.target;
    const lang = document.documentElement.getAttribute('data-lang');

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const language = form.querySelector('[name="language"]').value;
    const interest = form.querySelector('[name="interest"]');
    const interestText = interest.options[interest.selectedIndex]?.text || '';
    const message = form.querySelector('[name="message"]').value.trim();
    const sendVia = form.querySelector('[name="sendvia"]').value;

    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred language: ${language}\nInterested in: ${interestText}\n\nMessage:\n${message}`;

    if (sendVia === 'email' || sendVia === 'both') {
        const subject = encodeURIComponent(`New inquiry from ${name} — Dance Fit Revolution`);
        const mailBody = encodeURIComponent(body);
        window.open(`mailto:vimconsulting90@gmail.com?subject=${subject}&body=${mailBody}`, '_blank');
    }

    if (sendVia === 'whatsapp' || sendVia === 'both') {
        const waText = encodeURIComponent(`Hi Victoria! New inquiry from the website:\n\n${body}`);
        setTimeout(() => {
            window.open(`https://wa.me/13476756236?text=${waText}`, '_blank');
        }, sendVia === 'both' ? 500 : 0);
    }

    const msg = lang === 'ru'
        ? 'Спасибо! Ваше сообщение отправляется Виктории.'
        : 'Thank you! Your message is being sent to Victoria.';
    alert(msg);
    form.reset();
    return false;
}
