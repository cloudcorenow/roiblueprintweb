import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

const routes = [
  {
    path: '/',
    title: 'Strategic Tax Partners | Expert R&D Tax Credit & Business Tax Solutions',
    description: 'Maximize your business savings with expert R&D tax credits, healthcare tax solutions, and strategic consulting. Free assessments available nationwide.',
    canonical: 'https://strategictaxpartners.com/'
  },
  {
    path: '/services',
    title: 'Tax Services | R&D Credits, Healthcare & ABA Practice Solutions',
    description: 'Comprehensive tax services including R&D tax credits, healthcare tax planning, ABA practice optimization, and strategic business consulting.',
    canonical: 'https://strategictaxpartners.com/services'
  },
  {
    path: '/about',
    title: 'About Strategic Tax Partners | Expert Tax Consultants',
    description: 'Meet our team of expert CPAs and tax consultants specializing in R&D credits, healthcare, and business tax optimization nationwide.',
    canonical: 'https://strategictaxpartners.com/about'
  },
  {
    path: '/contact',
    title: 'Contact Us | Free Tax Consultation | Strategic Tax Partners',
    description: 'Get a free consultation with our tax experts. Discover how much you can save with R&D credits and strategic tax planning.',
    canonical: 'https://strategictaxpartners.com/contact'
  },
  {
    path: '/resources',
    title: 'Tax Resources & Insights | Strategic Tax Partners Blog',
    description: 'Expert insights on R&D tax credits, healthcare tax planning, and business tax strategies. Latest news and resources for tax optimization.',
    canonical: 'https://strategictaxpartners.com/resources'
  },
  {
    path: '/industries',
    title: 'Industries We Serve | Healthcare & ABA Practice Tax Solutions',
    description: 'Specialized tax services for healthcare providers, ABA practices, medical clinics, and various industries. Maximize your tax savings.',
    canonical: 'https://strategictaxpartners.com/industries'
  },
  {
    path: '/industries/medical-practices',
    title: 'Medical Practice Tax Solutions | Healthcare Tax Credits',
    description: 'Specialized tax solutions for medical practices, clinics, and healthcare providers. Maximize deductions and optimize cash flow.',
    canonical: 'https://strategictaxpartners.com/industries/medical-practices'
  },
  {
    path: '/industries/aba-practices',
    title: 'ABA Practice Tax Solutions | Behavioral Health Tax Credits',
    description: 'Expert tax services for ABA therapy practices. Maximize R&D credits, optimize operations, and improve profitability.',
    canonical: 'https://strategictaxpartners.com/industries/aba-practices'
  },
  {
    path: '/rd-tax-credit-guide',
    title: 'Complete R&D Tax Credit Guide | Maximize Your Innovation Savings',
    description: 'Comprehensive guide to R&D tax credits. Learn eligibility, qualifying activities, documentation, and how to claim up to $500,000 in credits.',
    canonical: 'https://strategictaxpartners.com/rd-tax-credit-guide'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Strategic Tax Partners',
    description: 'Our commitment to protecting your privacy and data. Learn how we collect, use, and safeguard your information.',
    canonical: 'https://strategictaxpartners.com/privacy-policy'
  },
  {
    path: '/faq',
    title: 'FAQ | Common Questions About R&D Tax Credits & Tax Services',
    description: 'Answers to frequently asked questions about R&D tax credits, eligibility, claiming process, and our tax services.',
    canonical: 'https://strategictaxpartners.com/faq'
  }
];

function generateHTML(route) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/ABAICON-min.png" />

    <!-- Primary Meta Tags -->
    <title>${route.title}</title>
    <meta name="title" content="${route.title}" />
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonical}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="https://strategictaxpartners.com/roi_blueprint_v2h_w1200.png" />
    <meta property="og:site_name" content="Strategic Tax Partners" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${route.canonical}" />
    <meta property="twitter:title" content="${route.title}" />
    <meta property="twitter:description" content="${route.description}" />
    <meta property="twitter:image" content="https://strategictaxpartners.com/roi_blueprint_v2h_w1200.png" />

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    <meta name="author" content="Strategic Tax Partners" />

    <!-- Preload Critical Assets -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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

console.log('\n✅ Prerendering complete! Generated static HTML for all routes.\n');
