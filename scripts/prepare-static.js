import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('[STATIC_PREP_ERROR] dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const indexHtmlPath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('[STATIC_PREP_ERROR] dist/index.html not found.');
  process.exit(1);
}

// 1. Ensure 404.html exists for SPA fallback routing (GitHub Pages, etc.)
const notFoundPath = path.join(DIST_DIR, '404.html');
fs.copyFileSync(indexHtmlPath, notFoundPath);
console.log('✔ dist/404.html created for SPA fallback routing');

// 2. Ensure .nojekyll exists so GitHub Pages serves all assets verbatim
const nojekyllPath = path.join(DIST_DIR, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '# Disable Jekyll processing on GitHub Pages\n');
}
console.log('✔ dist/.nojekyll verified for GitHub Pages compatibility');

// 3. Ensure CNAME exists for custom domain mapping
const cnamePath = path.join(DIST_DIR, 'CNAME');
if (!fs.existsSync(cnamePath)) {
  fs.writeFileSync(cnamePath, 'theunboundedleadership.com\n');
}
console.log('✔ dist/CNAME verified with domain theunboundedleadership.com');

// 4. Pre-generate directory index files for all primary routes so static servers serve HTTP 200 directly
const staticRoutes = [
  'library',
  'products',
  'shop',
  'toolkits',
  'assessment',
  'cognitive-tax',
  'services',
  'mandates',
  'methodology',
  'about',
  'intake',
  'article',
  'dispatch'
];

for (const route of staticRoutes) {
  const routeDir = path.join(DIST_DIR, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  const routeIndexPath = path.join(routeDir, 'index.html');
  fs.copyFileSync(indexHtmlPath, routeIndexPath);
}
console.log(`✔ Pre-rendered directory index.html entries for ${staticRoutes.length} primary routes (HTTP 200 native serving)`);

// 5. Ensure _redirects is present for Netlify & Cloudflare Pages
const redirectsPath = path.join(DIST_DIR, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/*    /index.html   200\n');
}
console.log('✔ dist/_redirects verified for Netlify/Cloudflare Pages');

// 6. Ensure .htaccess is present for Apache & Hostinger
const htaccessSource = path.resolve('public/.htaccess');
const htaccessDest = path.join(DIST_DIR, '.htaccess');
if (fs.existsSync(htaccessSource) && !fs.existsSync(htaccessDest)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✔ dist/.htaccess verified for Apache/Hostinger static hosting');
}

console.log('[STATIC_PREP_COMPLETE] Static distribution bundle successfully configured in dist/');
