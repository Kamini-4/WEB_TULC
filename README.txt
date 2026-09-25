================================================================================
THE UNBOUNDED LEADERSHIP CO.
Executive Consultancy & Leadership Architecture
Founder: Suchita Sancheti
Website: https://theunboundedleadership.com
================================================================================

1. OVERVIEW
--------------------------------------------------------------------------------
The Unbounded Leadership Co. is a high-stakes executive advisory platform designed 
for founders, CEOs, and holding chairs ($10M–$100M+). It transforms leadership 
from reactive daily firefighting into an autonomous, self-executing system, 
reclaiming 15+ hours per week of cognitive bandwidth.


2. PROJECT STRUCTURE
--------------------------------------------------------------------------------
├── components/          Primary UI components (Hero, WhatWeDo, Header, Footer, etc.)
├── src/
│   ├── pages/           Route pages (Home, About, Services, Assessment, Library, etc.)
│   ├── lib/             Article registries, utilities, and helper functions
│   └── firebase.ts      Firebase client initialization
├── server/              Full-stack Express backend (SEO routing, APIs, proxy)
├── public/              Static assets (favicons, images, robots.txt, sitemap.xml, .htaccess)
├── dist/                Compiled production distribution build
├── server.ts            Main server entry point (Vite dev middleware + Express)
├── index.html           Main HTML entry point with JSON-LD SEO schemas
└── package.json         Project dependencies and lifecycle scripts


3. LOCAL DEVELOPMENT
--------------------------------------------------------------------------------
Prerequisites: Node.js 20+

1. Install dependencies:
   npm install

2. Start the development server (runs on port 3000):
   npm run dev

3. Open in browser:
   http://localhost:3000


4. PRODUCTION BUILD
--------------------------------------------------------------------------------
To compile a fresh production build:
   npm run build

This command executes:
- Vite build: compiles all React / TypeScript assets into the "dist/" folder.
- esbuild: bundles the Node/Express backend into "server.js".


5. HOSTINGER DEPLOYMENT INSTRUCTIONS (STEP-BY-STEP)
--------------------------------------------------------------------------------
If you are hosting this application on Hostinger (Shared, Cloud, or VPS Web Hosting):

Step 1: Build the Application
- Run "npm run build" to create the latest "dist" directory.

Step 2: Upload to Hostinger File Manager
- Log in to your Hostinger hPanel.
- Navigate to Websites -> Manage -> File Manager (Files -> File Manager).
- Open the "public_html" directory of your domain.
- Upload all files and folders located inside the "dist" directory directly into 
  "public_html" (or upload "hostinger-build.zip" and click "Extract").

Step 3: SPA Routing (.htaccess)
- The build includes a ".htaccess" file in "dist/".
- Ensure ".htaccess" is present in "public_html" so subpages like /services, 
  /assessment, /library, /intake, etc., do not return 404 errors when reloaded.
- Standard .htaccess rewrite rules used:
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>

Step 4: Verification
- Visit your domain (e.g., https://theunboundedleadership.com).
- Perform a hard refresh:
  - Mac: Cmd + Shift + R
  - Windows/Linux: Ctrl + F5
- Verify navigation between pages and forms.


6. CONTACT & SUPPORT
--------------------------------------------------------------------------------
Office of the Principal Architect:
Email: suchita@theunboundedleadership.com
Website: https://theunboundedleadership.com
================================================================================
