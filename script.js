// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const siteNav = document.getElementById('siteNav');

const updateNav = () => {
    siteNav.classList.toggle('scrolled', window.scrollY > 40);
};

updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

const revealGroups = [
    '.hero-top',
    '.hero-name',
    '.hero-bottom',
    '.about .section-marker',
    '.about-body',
    '.skills .section-marker',
    '.skills-body',
    '.skills-focus',
    '.contact .section-marker',
    '.contact-heading',
    '.contact-links',
    '.footer'
];

const revealItems = document.querySelectorAll(revealGroups.join(', '));
const revealChildren = document.querySelectorAll('.skill-col, .focus-items span, .contact-link');

revealItems.forEach((element) => element.classList.add('reveal'));
revealChildren.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
        document.body.style.overflow = '';
    });
});

// Close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
        document.body.style.overflow = '';
        menuToggle.focus();
    }
});
