// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ============ MOBILE MENU ============
const mobileBtn = document.getElementById('mobile-btn');
const navLinks = document.getElementById('nav-links');

mobileBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileBtn.classList.toggle('active', isOpen);
    mobileBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            mobileBtn.classList.remove('active');
            mobileBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});

// ============ SCROLL REVEAL ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ BOOKING FORM ============
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const name = data.get('name');
    const phone = data.get('phone');
    const service = data.get('service');
    const date = data.get('date');
    const time = data.get('time');

    const message =
        `Hi, I want to book an appointment.%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Service:* ${encodeURIComponent(service)}%0A` +
        `*Date:* ${encodeURIComponent(date)}%0A` +
        `*Time:* ${encodeURIComponent(time)}`;

    alert(`Thank you, ${name}! Your booking request has been received.\n\nWe'll redirect you to WhatsApp to confirm with the salon.`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    bookingForm.reset();
});

// ============ DATE INPUT MIN ============
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}
