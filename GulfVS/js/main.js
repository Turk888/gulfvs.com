// ====================================
// GULFVS WEBSITE - MAIN JAVASCRIPT
// ====================================

// Language Management
const languageManager = {
    currentLanguage: localStorage.getItem('gulfvs-lang') || 'en',
    
    init() {
        this.setLanguage(this.currentLanguage);
        this.setupLanguageToggle();
    },
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('gulfvs-lang', lang);
        
        // Update body direction and class
        document.body.classList.remove('en', 'ar');
        document.body.classList.add(lang);
        
        if (lang === 'ar') {
            document.body.classList.add('rtl');
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
        } else {
            document.body.classList.remove('rtl');
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
        
        // Update all elements with data attributes
        this.updateContent();
        this.updateFormPlaceholders();
        
        // Update toggle button text
        const toggleBtn = document.getElementById('langToggle');
        if (toggleBtn) {
            toggleBtn.querySelector('.lang-text').textContent = lang === 'en' ? 'عربي' : 'English';
        }
    },
    
    updateContent() {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(el => {
            const text = this.currentLanguage === 'en' 
                ? el.getAttribute('data-en') 
                : el.getAttribute('data-ar');
            
            // For buttons and links, update text content only if no children
            if (el.children.length === 0 || el.tagName === 'A' || el.tagName === 'BUTTON') {
                el.textContent = text;
            } else {
                // For elements with children, update innerHTML carefully
                const innerHTML = el.innerHTML;
                if (!innerHTML.includes('<')) {
                    el.textContent = text;
                }
            }
        });
    },
    
    updateFormPlaceholders() {
        const inputs = document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]');
        inputs.forEach(input => {
            const placeholder = this.currentLanguage === 'en'
                ? input.getAttribute('data-placeholder-en')
                : input.getAttribute('data-placeholder-ar');
            input.placeholder = placeholder;
        });
    },
    
    setupLanguageToggle() {
        const toggleBtn = document.getElementById('langToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const newLang = this.currentLanguage === 'en' ? 'ar' : 'en';
                this.setLanguage(newLang);
                // Smooth page transition
                document.body.style.opacity = '0.7';
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 100);
            });
        }
    }
};

// Mobile Navigation
const mobileNav = {
    init() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.toggleHamburgerAnimation(hamburger);
            });
            
            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    },
    
    toggleHamburgerAnimation(hamburger) {
        hamburger.classList.toggle('active');
        const bars = hamburger.querySelectorAll('.bar');
        
        if (hamburger.classList.contains('active')) {
            // Transform to X
            bars[0].style.transform = 'rotate(45deg) translateY(11px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-11px)';
        } else {
            // Reset to hamburger
            bars[0].style.transform = 'rotate(0) translateY(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translateY(0)';
        }
    }
};

// Form Handling
const formHandler = {
    init() {
        // Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }
        
        // Newsletter Forms
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleNewsletterForm(e));
        });
    },
    
    handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const formMessage = document.getElementById('formMessage');
        
        // Basic validation
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');

        if (!name || !email || !service || !message) {
            this.showFormMessage(formMessage, 'Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        if (!this.isValidEmail(email)) {
            this.showFormMessage(formMessage, 'Please enter a valid email address', 'error');
            return;
        }
        
        // Submit to Netlify via AJAX
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            console.log('Contact form submitted successfully');
            
            // Show success message
            this.showFormMessage(formMessage, 'Thank you! We will get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('success', 'error');
                formMessage.style.display = 'none';
            }, 5000);
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            this.showFormMessage(formMessage, 'Something went wrong. Please try again later.', 'error');
        });
    },
    
    handleNewsletterForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const email = form.querySelector('.newsletter-input').value;
        
        if (!this.isValidEmail(email)) {
            alert(languageManager.currentLanguage === 'en' 
                ? 'Please enter a valid email address' 
                : 'يرجى إدخال عنوان بريد إلكتروني صحيح');
            return;
        }
        
        console.log('Newsletter subscription:', { email });
        
        // Show success message
        const message = languageManager.currentLanguage === 'en'
            ? 'Thank you for subscribing!'
            : 'شكراً لاشتراكك!';
        
        alert(message);
        form.reset();
    },
    
    showFormMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    },
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Smooth Scrolling
const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 80;
                    
                    this.smoothScrollTo(targetPosition, 800);
                }
            });
        });
    },
    
    smoothScrollTo(target, duration) {
        const startPosition = window.scrollY;
        const distance = target - startPosition;
        let start = null;
        
        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease_progress = ease(progress);
            
            window.scrollTo(0, startPosition + distance * ease_progress);
            
            if (elapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
};

// Scroll Animations
const scrollAnimations = {
    init() {
        this.observeElements();
        this.setupScrollHandler();
    },
    
    setupScrollHandler() {
        let scrollRAF;
        const navbar = document.querySelector('.navbar');
        let lastScrollY = 0;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY !== lastScrollY) {
                lastScrollY = currentScrollY;
                
                if (currentScrollY > 50) {
                    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
                } else {
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
            }
        };
        
        window.addEventListener('scroll', () => {
            if (scrollRAF) cancelAnimationFrame(scrollRAF);
            scrollRAF = requestAnimationFrame(handleScroll);
        }, { passive: true });
    },
    
    observeElements() {
        const elements = document.querySelectorAll('[data-aos]');
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-in-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        elements.forEach(el => observer.observe(el));
    }
};

// Active Navigation Link
const activeNavLink = {
    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// Page Transition Effects
const pageTransition = {
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.opacity = '1';
        });
        
        document.querySelectorAll('a').forEach(link => {
            if (!link.target && link.href && !link.href.includes('#')) {
                link.addEventListener('click', (e) => {
                    if (!link.href.includes('http') || link.href.includes(window.location.host)) {
                        document.body.style.opacity = '0.7';
                    }
                });
            }
        });
    }
};

// Initialize All Modules
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        document.body.style.opacity = '1';
    });
    
    // Initialize modules
    languageManager.init();
    mobileNav.init();
    formHandler.init();
    smoothScroll.init();
    scrollAnimations.init();
    activeNavLink.init();
    pageTransition.init();
    
    console.log('GulfVS Website Initialized');
});

// Add CSS transition to body for fade effects
const style = document.createElement('style');
style.textContent = `
    body {
        transition: opacity 0.3s ease-in-out;
    }
    
    .nav-menu.active {
        transition: left 0.3s ease-in-out;
    }
    
    .bar {
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);
