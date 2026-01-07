import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

const routes = [
  {
    path: '/',
    title: 'ROI Blueprint - Healthcare R&D Tax Credit Consultants | Research, Optimize, Innovate',
    description: 'Transform your healthcare practice through documented R&D activities. ROI Blueprint helps medical and ABA practices optimize operations and qualify for federal and state tax credits.',
    canonical: 'https://www.roiblueprint.com/',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/services',
    title: 'Services | Healthcare R&D Tax Credits & Practice Optimization',
    description: 'Comprehensive R&D tax credit services for healthcare practices. Expert consulting to help medical and ABA practices document innovation and maximize tax benefits.',
    canonical: 'https://www.roiblueprint.com/services',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/about',
    title: 'About ROI Blueprint | Healthcare R&D Tax Credit Experts',
    description: 'Meet our team of healthcare specialists, Enrolled Agents, and technology experts dedicated to helping practices optimize operations and qualify for R&D tax credits.',
    canonical: 'https://www.roiblueprint.com/about',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/contact',
    title: 'Contact Us | Free R&D Tax Credit Consultation | ROI Blueprint',
    description: 'Get a free consultation to discover how your healthcare practice can qualify for R&D tax credits. Expert guidance for medical and ABA practices.',
    canonical: 'https://www.roiblueprint.com/contact',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/resources',
    title: 'Resources & Insights | Healthcare R&D Tax Credits | ROI Blueprint',
    description: 'Expert insights on R&D tax credits for healthcare practices. Latest resources on practice optimization, innovation documentation, and tax strategies.',
    canonical: 'https://www.roiblueprint.com/resources',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/industries',
    title: 'Industries We Serve | Healthcare & ABA Practice Solutions',
    description: 'Specialized R&D tax credit services for healthcare providers and ABA practices. Expert guidance for documenting innovation and maximizing tax benefits.',
    canonical: 'https://www.roiblueprint.com/industries',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/industries/medical-practices',
    title: 'Medical Practice R&D Tax Credits | Healthcare Innovation Documentation',
    description: 'Specialized R&D tax credit services for medical practices. Document clinical innovations, optimize operations, and qualify for federal tax benefits.',
    canonical: 'https://www.roiblueprint.com/industries/medical-practices',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/industries/aba-practices',
    title: 'ABA Practice R&D Tax Credits | Behavioral Health Innovation',
    description: 'Expert R&D tax credit services for ABA therapy practices. Document treatment innovations, qualify for tax benefits, and optimize operations.',
    canonical: 'https://www.roiblueprint.com/industries/aba-practices',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/rd-tax-credit-guide',
    title: 'Complete R&D Tax Credit Guide for Healthcare Practices | ROI Blueprint',
    description: 'Comprehensive guide to R&D tax credits for healthcare practices. Learn eligibility, qualifying activities, documentation requirements, and how to maximize benefits.',
    canonical: 'https://www.roiblueprint.com/rd-tax-credit-guide',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | ROI Blueprint',
    description: 'Our commitment to protecting your privacy and data. Learn how ROI Blueprint collects, uses, and safeguards your information.',
    canonical: 'https://www.roiblueprint.com/privacy',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  },
  {
    path: '/faq',
    title: 'FAQ | R&D Tax Credits for Healthcare Practices | ROI Blueprint',
    description: 'Answers to frequently asked questions about R&D tax credits for healthcare practices. Learn about eligibility, documentation, and benefits.',
    canonical: 'https://www.roiblueprint.com/faq',
    image: 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png'
  }
];

async function fetchBlogPosts() {
  try {
    console.log('📚 Fetching blog posts from D1 database...');

    const result = execSync(
      'npx wrangler d1 execute roi-blueprint-db --remote --command "SELECT * FROM blog_posts WHERE published = 1 ORDER BY published_at DESC" --json',
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }
    );

    const data = JSON.parse(result);

    if (data && data[0] && data[0].results) {
      const posts = data[0].results;
      console.log(`  Found ${posts.length} published blog posts`);
      return posts;
    }

    console.log('  No published blog posts found');
    return [];
  } catch (error) {
    console.warn('  ⚠️  Could not fetch blog posts from D1 (authentication may be required)');
    console.warn('  Skipping blog post prerendering. Blog posts will use client-side rendering.');
    return [];
  }
}

function generateHTML(route) {
  const ogImage = route.image || 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png';
  const ogType = route.type || 'website';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/Favicon (1).png" />
    <meta name="theme-color" content="#004aad" />

    <!-- Primary Meta Tags -->
    <title>${route.title}</title>
    <meta name="title" content="${route.title}" />
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonical}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="ROI Blueprint" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${route.canonical}" />
    <meta property="twitter:title" content="${route.title}" />
    <meta property="twitter:description" content="${route.description}" />
    <meta property="twitter:image" content="${ogImage}" />

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    <meta name="author" content="${route.author || 'ROI Blueprint'}" />
    ${route.publishedTime ? `<meta property="article:published_time" content="${route.publishedTime}" />` : ''}
    ${route.modifiedTime ? `<meta property="article:modified_time" content="${route.modifiedTime}" />` : ''}
    ${route.category ? `<meta property="article:section" content="${route.category}" />` : ''}

    <!-- Organization Structured Data (Global) -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ROI Blueprint",
        "url": "https://www.roiblueprint.com/",
        "logo": "https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png",
        "description": "ROI Blueprint helps healthcare practices optimize operations and document innovation to qualify for federal Research & Development (R&D) tax credits, improve efficiency, and realize financial benefits. Their team of Enrolled Agents, healthcare specialists, and technology experts works with medical, specialty, and ABA practices to implement compliant R&D documentation processes that can unlock significant tax incentives while supporting practice growth and operational excellence.",
        "sameAs": [
          "https://www.facebook.com/roiblueprint",
          "https://www.linkedin.com/company/roiblueprint"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "telephone": "+1-855-764-2583",
            "areaServed": "US"
          }
        ]
      }
    </script>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P53LM6ES7X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-P53LM6ES7X');
    </script>

    <!-- DNS Prefetch & Preconnect for performance -->
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Optimized font loading with font-display=swap for better performance -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Montserrat:wght@400;700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Montserrat:wght@400;700&display=swap" media="print" onload="this.media='all'" />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&family=Montserrat:wght@400;700&display=swap" />
    </noscript>

    <!-- Cloudflare Turnstile -->
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

console.log('🚀 Starting static route prerendering...\n');

routes.forEach(route => {
  let outputPath;

  if (route.path === '/') {
    outputPath = path.join(distDir, 'index.html');
  } else {
    outputPath = path.join(distDir, route.path, 'index.html');
  }

  ensureDirectoryExists(outputPath);
  const html = generateHTML(route);
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`✓ Generated: ${route.path}`);
});

const blogPosts = await fetchBlogPosts();

if (blogPosts.length > 0) {
  console.log('\n📝 Pre-rendering blog posts...\n');

  blogPosts.forEach(post => {
    const postRoute = {
      path: `/resources/${post.slug}`,
      title: `${post.title} | ROI Blueprint`,
      description: post.excerpt || post.title,
      canonical: `https://www.roiblueprint.com/resources/${post.slug}`,
      image: post.image || 'https://www.roiblueprint.com/roi_blueprint_v2h_w1200.png',
      type: 'article',
      author: post.author || 'ROI Blueprint',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      category: post.category
    };

    const outputPath = path.join(distDir, 'resources', post.slug, 'index.html');
    ensureDirectoryExists(outputPath);
    const html = generateHTML(postRoute);
    fs.writeFileSync(outputPath, html, 'utf8');

    console.log(`  ✓ Generated: /resources/${post.slug}`);
  });

  console.log(`\n  Generated ${blogPosts.length} blog post pages`);
}

console.log('\n✅ Prerendering complete! Generated static HTML for all routes.\n');
