// Blog Post JavaScript
// This script handles blog post specific functionality

// Blog Posts Data
const blogPostsData = {
    1: {
        title: {
            en: "The Future of Remote Work in Saudi Arabia",
            ar: "مستقبل العمل عن بعد في المملكة العربية السعودية"
        },
        category: {
            en: "HR",
            ar: "الموارد البشرية"
        },
        date: "Nov 16, 2024",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop",
        excerpt: {
            en: "Explore how remote work is transforming the Saudi business landscape and what strategies companies should adopt.",
            ar: "اكتشف كيف يحول العمل عن بعد مشهد الأعمال السعودي والاستراتيجيات التي يجب على الشركات اعتمادها."
        }
    },
    2: {
        title: {
            en: "Financial Planning for Business Growth",
            ar: "التخطيط المالي لنمو الأعمال"
        },
        category: {
            en: "Finance",
            ar: "المالية"
        },
        date: "Nov 14, 2024",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=600&fit=crop",
        excerpt: {
            en: "Essential financial planning strategies to ensure sustainable growth and profitability for your organization.",
            ar: "استراتيجيات التخطيط المالي الأساسية لضمان النمو والربحية المستدامة لمؤسستك."
        }
    },
    3: {
        title: {
            en: "Streamlining Operations: Best Practices",
            ar: "تبسيط العمليات: أفضل الممارسات"
        },
        category: {
            en: "Admin",
            ar: "الإدارة"
        },
        date: "Nov 12, 2024",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
        excerpt: {
            en: "Learn how to optimize your operational efficiency through effective administrative management and process automation.",
            ar: "تعلم كيفية تحسين كفاءتك التشغيلية من خلال الإدارة الإدارية الفعالة وأتمتة العمليات."
        }
    },
    4: {
        title: {
            en: "Building a Strong Organizational Culture",
            ar: "بناء ثقافة تنظيمية قوية"
        },
        category: {
            en: "HR",
            ar: "الموارد البشرية"
        },
        date: "Nov 10, 2024",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
        excerpt: {
            en: "Discover how to foster employee engagement and build a positive organizational culture that drives performance.",
            ar: "اكتشف كيفية تعزيز مشاركة الموظفين وبناء ثقافة تنظيمية إيجابية تدفع الأداء."
        }
    },
    5: {
        title: {
            en: "Tax Compliance & Optimization Strategies",
            ar: "استراتيجيات الامتثال الضريبي والتحسين"
        },
        category: {
            en: "Finance",
            ar: "المالية"
        },
        date: "Nov 8, 2024",
        image: "https://images.unsplash.com/photo-1565514020176-dbf227791634?w=800&h=500&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
        excerpt: {
            en: "Understanding Saudi Arabia's evolving tax landscape and how to optimize your tax strategy for maximum efficiency.",
            ar: "فهم المشهد الضريبي المتطور في المملكة العربية السعودية وكيفية تحسين استراتيجيتك الضريبية للحصول على أقصى كفاءة."
        }
    },
    6: {
        title: {
            en: "Digital Transformation in Business Administration",
            ar: "التحول الرقمي في إدارة الأعمال"
        },
        category: {
            en: "Admin",
            ar: "الإدارة"
        },
        date: "Nov 5, 2024",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=500&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
        excerpt: {
            en: "How digital tools and automation are revolutionizing administrative processes and improving business outcomes.",
            ar: "كيف تحول الأدوات الرقمية والأتمتة العمليات الإدارية وتحسن نتائج الأعمال."
        }
    }
};

// Load blog post data based on URL parameter
function loadBlogPost() {
    // Get post ID from URL parameter or default to 1
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id') || 1;

    const post = blogPostsData[postId];

    if (!post) {
        console.error('Blog post not found');
        return;
    }

    const currentLang = languageManager.currentLanguage;

    // Update page title
    document.title = `${post.title[currentLang]} - GulfVS`;

    // Update hero section
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.blog-post-title');
    const postDate = document.getElementById('postDate');
    const postCategory = document.getElementById('postCategory');
    const postImage = document.getElementById('postImage');
    const postExcerpt = document.getElementById('postExcerpt');

    if (heroSection && post.heroImage) {
        heroSection.style.backgroundImage = `url('${post.heroImage}')`;
    }

    if (heroTitle) {
        heroTitle.textContent = post.title[currentLang];
        heroTitle.setAttribute('data-en', post.title.en);
        heroTitle.setAttribute('data-ar', post.title.ar);
    }

    if (postDate) {
        postDate.textContent = post.date;
    }

    if (postCategory) {
        postCategory.textContent = post.category[currentLang];
        postCategory.setAttribute('data-en', post.category.en);
        postCategory.setAttribute('data-ar', post.category.ar);
    }

    if (postImage) {
        postImage.style.backgroundImage = `url('${post.image}')`;
    }

    if (postExcerpt) {
        postExcerpt.textContent = post.excerpt[currentLang];
        postExcerpt.setAttribute('data-en', post.excerpt.en);
        postExcerpt.setAttribute('data-ar', post.excerpt.ar);
    }
}

// Update blog post content when language changes
const originalSetLanguage = languageManager.setLanguage;
languageManager.setLanguage = function (lang) {
    originalSetLanguage.call(this, lang);
    loadBlogPost(); // Reload blog post with new language
};

// Initialize blog post on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPost();
});
