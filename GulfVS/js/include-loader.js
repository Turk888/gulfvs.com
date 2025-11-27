// Load Header and Footer from includes folder
// Load Header and Footer from includes folder
async function loadHeaderFooter() {
    try {
        // Load header
        const headerResponse = await fetch('includes/header.html');
        const headerContent = await headerResponse.text();
        const headerElement = document.querySelector('body > nav') || document.querySelector('body').insertAdjacentHTML('afterbegin', '<div id="header-placeholder"></div>');

        if (document.querySelector('body > nav')) {
            document.querySelector('body > nav').outerHTML = headerContent;
        } else {
            document.querySelector('body').insertAdjacentHTML('afterbegin', headerContent);
        }

        // Load CTA section
        const ctaPlaceholder = document.getElementById('cta-placeholder');
        if (ctaPlaceholder) {
            const ctaResponse = await fetch('includes/cta.html');
            const ctaContent = await ctaResponse.text();
            ctaPlaceholder.outerHTML = ctaContent;
        }

        // Load footer
        const footerResponse = await fetch('includes/footer.html');
        const footerContent = await footerResponse.text();

        if (document.querySelector('footer')) {
            document.querySelector('footer').outerHTML = footerContent;
        } else {
            document.body.insertAdjacentHTML('beforeend', footerContent);
        }

        // Reinitialize scripts after loading
        if (typeof languageManager !== 'undefined') {
            languageManager.init();
            languageManager.setLanguage(languageManager.currentLanguage);
        }

        if (typeof mobileNav !== 'undefined') {
            mobileNav.init();
        }

        if (typeof activeNavLink !== 'undefined') {
            activeNavLink.init();
        }
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeaderFooter);
