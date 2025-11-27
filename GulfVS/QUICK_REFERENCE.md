# GulfVS Website - Quick Reference Guide

## 🎯 Quick Navigation

### Pages
- **Home**: `index.html` - Main landing page with hero and services preview
- **About**: `about.html` - Company information and team
- **Services**: `services.html` - Detailed service offerings
- **Contact**: `contact.html` - Contact form and information
- **Blog**: `blog.html` - Blog posts and news

### Styling
- **Main CSS**: `css/styles.css` - All styles, responsive design, animations
- **Key Classes**:
  - `.container` - Max-width wrapper (1200px)
  - `.hero` - Full-width hero section
  - `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` - Buttons
  - `.section-title` - Section headings with underline
  - `.card` - Card components (service-card, blog-card, etc.)

### JavaScript
- **Main JS**: `js/main.js` - All functionality
- **Key Functions**:
  - `languageManager.setLanguage()` - Switch languages
  - `formHandler.handleContactForm()` - Process contact form
  - `mobileNav.init()` - Mobile menu functionality

## 🌍 Language System

### Adding Translations
Add `data-en` and `data-ar` attributes to HTML elements:
```html
<h1 data-en="English Text" data-ar="النص العربي">English Text</h1>
<button data-en="Click Me" data-ar="اضغط هنا">Click Me</button>
```

For form placeholders:
```html
<input data-placeholder-en="Enter name" data-placeholder-ar="أدخل الاسم">
```

### Current Translations Included
- Navigation menu
- All page headings
- Service descriptions
- Contact information
- Footer content
- Form labels and buttons

## 🎨 Design Customization

### Colors (in `css/styles.css`)
```css
--color-primary: #1b5e20;        /* Green */
--color-primary-dark: #0d3f1a;   /* Dark Green */
--color-primary-light: #2e7d32;  /* Light Green */
--color-secondary: #d4af37;      /* Gold */
--color-accent: #1e3a8a;         /* Blue */
--color-accent-light: #3b82f6;   /* Light Blue */
```

### Typography
- **Main Font**: Poppins (Headings & Body)
- **Secondary Font**: Sora (Elegant text)
- Font sizes from 0.75rem to 3.5rem
- 1.6 line-height for readability

### Spacing System
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
--spacing-2xl: 4rem;
```

## 📝 Editing Content

### Company Information
Update in all files (use Find & Replace):
- Email: `info@gulfvs.com`
- Phone: `+966 XX XXX XXXX`
- Address: `Riyadh, Saudi Arabia`
- Hours: `Saturday - Thursday: 9:00 AM - 6:00 PM`

### Services List
Edit in:
- `index.html` - Services preview section
- `services.html` - Detailed service items

### Team Members
Edit in `about.html`:
```html
<div class="team-member">
    <div class="member-image" style="background-image: url('IMAGE_URL');"></div>
    <h3 data-en="Name" data-ar="الاسم">Name</h3>
    <p class="member-title" data-en="Title" data-ar="الوظيفة">Title</p>
</div>
```

### Blog Posts
Edit in `blog.html`:
```html
<article class="blog-card">
    <div class="blog-image" style="background-image: url('IMAGE_URL');"></div>
    <div class="blog-content">
        <div class="blog-meta">
            <span class="blog-date">DATE</span>
            <span class="blog-category" data-en="Category" data-ar="الفئة">Category</span>
        </div>
        <h3 data-en="Title" data-ar="العنوان">Title</h3>
        <p data-en="Description" data-ar="الوصف">Description</p>
        <a href="#" class="blog-link" data-en="Read More" data-ar="اقرأ المزيد">Read More →</a>
    </div>
</article>
```

## 🔧 Form Configuration

### Contact Form
Currently logs to browser console. To make functional:

**Option 1: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: EmailJS**
Add to `js/main.js`:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
// Then use emailjs.send() in handleContactForm()
```

**Option 3: Backend API**
Change form submission to POST to your API endpoint

### Newsletter Forms
Same implementation options as contact form.

## 📱 Responsive Breakpoints

```css
Desktop:   1024px and above
Tablet:    768px - 1024px
Mobile:    Below 768px
Small:     Below 480px
```

## 🎬 Animation Classes

Add to elements for auto-animation on scroll:
```html
<div data-aos="fade-up">Content</div>
```

Available animations defined in JavaScript:
- `fadeInUp` - Fade in with upward motion
- Custom animations can be added

## 🚀 Performance Tips

1. **Images**: Use optimized formats (WebP with PNG fallback)
2. **Fonts**: Already using Google Fonts CDN
3. **CSS**: Minified CSS for production (optional)
4. **JavaScript**: Minimal, no unnecessary libraries
5. **Caching**: Configure server-side caching

## 📊 Analytics Setup

Add Google Analytics (in each page head):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🔍 SEO Improvements

### Add Meta Tags (in `<head>`)
```html
<meta name="description" content="Description">
<meta name="keywords" content="keywords">
<meta property="og:title" content="Title">
<meta property="og:description" content="Description">
<meta property="og:image" content="image.jpg">
```

### Structured Data (JSON-LD)
Add before closing `</head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GulfVS",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Street",
    "addressLocality": "Riyadh",
    "addressCountry": "SA"
  }
}
</script>
```

## 🐛 Debugging

### Check Browser Console
Press F12 or Right-click → Inspect → Console tab

### Common Issues
1. **Language not switching**: Check `js/main.js` loaded, localStorage enabled
2. **Images not showing**: Verify URLs in browser Network tab
3. **Forms not working**: Check console for errors, verify form action
4. **Menu not responsive**: Check viewport meta tag, test on mobile

### Useful Debug Commands
```javascript
// Check current language
console.log(languageManager.currentLanguage);

// Check localStorage
localStorage.getItem('gulfvs-lang');

// Test form validation
formHandler.isValidEmail('test@example.com');
```

## 📦 Deployment Files

Essential files for deployment:
- ✅ `index.html`, `about.html`, `services.html`, `contact.html`, `blog.html`
- ✅ `css/styles.css`
- ✅ `js/main.js`
- ✅ `.htaccess` (for Apache servers, optional)
- ✅ `sitemap.xml` (optional, for SEO)

Not needed:
- ❌ `node_modules/` (no dependencies)
- ❌ Source maps
- ❌ Config files

## 🔐 Security Considerations

1. **Form Validation**: Already implemented in JavaScript
2. **HTTPS**: Always use SSL/TLS for production
3. **CORS**: If using external APIs, configure properly
4. **Input Sanitization**: Sanitize form inputs on backend
5. **Environment Variables**: Keep API keys in backend, never in JavaScript

## 📞 Maintenance Schedule

### Monthly
- Review analytics
- Update blog content
- Check for broken links

### Quarterly
- Update company information
- Refresh team photos/bios
- Review testimonials/case studies

### Annually
- Update copyright year
- Review and update terms/privacy
- Security audit
- Performance optimization

## 🎓 Learning Resources

- MDN Web Docs: https://developer.mozilla.org
- CSS-Tricks: https://css-tricks.com
- Web.dev: https://web.dev
- Accessibility Guidelines: https://www.w3.org/WAI/

---

**Quick Copy-Paste Updates:**

Find & Replace throughout all HTML files:
- `info@gulfvs.com` → Your actual email
- `+966 XX XXX XXXX` → Your actual phone
- `Riyadh, Saudi Arabia` → Your actual location
- Copyright year (2024) → Current year
