import fs from 'node:fs';
import path from 'node:path';
import { getCanonicalRoutes, ROUTE_ALIASES, renderRouteHtml } from './route-seo-data.mjs';

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

const baseIndexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Create noindex 404.html for SPA fallback without polluting search index as duplicate "/"
const notFoundHtml = baseIndexHtml.replace(
  /<meta\b[^>]*\bname="robots"[^>]*>/i,
  () => '<meta name="robots" content="noindex, follow" />'
);
fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf8');
fs.writeFileSync(path.resolve('public/404.html'), notFoundHtml, 'utf8');
console.log('✔ dist/404.html & public/404.html created with noindex SPA fallback');

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

// 4. Pre-render UNIQUE, self-canonicalized HTML for EVERY canonical subpage & all 18 /library/<slug> articles
const canonicalRoutes = getCanonicalRoutes();
const routeMapByPath = new Map();

for (const routeSpec of canonicalRoutes) {
  routeMapByPath.set(routeSpec.path, routeSpec);
  const relDir = routeSpec.path.replace(/^\/+/, '');
  const routeDir = path.join(DIST_DIR, relDir);
  fs.mkdirSync(routeDir, { recursive: true });

  const renderedHtml = renderRouteHtml(baseIndexHtml, routeSpec);
  fs.writeFileSync(path.join(routeDir, 'index.html'), renderedHtml, 'utf8');
}
console.log(
  `✔ Pre-rendered ${canonicalRoutes.length} unique self-canonicalized subpages & article pages in dist/<route>/index.html`
);

// 5. Pre-render alias routes with canonical tags pointing directly to their canonical destination (never "/")
let aliasCount = 0;
for (const [aliasPath, canonicalTarget] of Object.entries(ROUTE_ALIASES)) {
  const targetSpec = routeMapByPath.get(canonicalTarget);
  if (!targetSpec) continue;

  const relDir = aliasPath.replace(/^\/+/, '');
  const routeDir = path.join(DIST_DIR, relDir);
  fs.mkdirSync(routeDir, { recursive: true });

  // Render target page content + canonical pointing to targetSpec.path (consolidates equity cleanly)
  const renderedHtml = renderRouteHtml(baseIndexHtml, targetSpec);
  fs.writeFileSync(path.join(routeDir, 'index.html'), renderedHtml, 'utf8');
  aliasCount++;
}
console.log(
  `✔ Pre-rendered ${aliasCount} alias routes with clean canonical consolidation to target subpages`
);

// 6. Ensure _redirects is present for Netlify & Cloudflare Pages
const redirectsPath = path.join(DIST_DIR, '_redirects');
fs.writeFileSync(redirectsPath, '/*    /index.html   200\n');
console.log('✔ dist/_redirects verified for Netlify/Cloudflare Pages');

// 7. Ensure .htaccess is present for Apache, LiteSpeed & Hostinger
const htaccessSource = path.resolve('public/.htaccess');
const htaccessDest = path.join(DIST_DIR, '.htaccess');
if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✔ dist/.htaccess verified for Apache/Hostinger static hosting');
}

console.log('[STATIC_PREP_COMPLETE] All subpages & articles pre-rendered with self-referencing canonicals and semantic HTML.');
