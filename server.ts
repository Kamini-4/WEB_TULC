import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production' || process.env.K_SERVICE !== undefined;

  app.use(express.json());

  console.log(`SERVER STARTING V4 - PORT: ${PORT} - IS_PROD: ${isProd}`);

  // Diagnostic: Check if dist folder exists and list files
  const distPath = path.join(process.cwd(), 'dist');
  import('fs').then(fs => {
    if (fs.existsSync(distPath)) {
      console.log(`Diagnostic: dist folder found at ${distPath}`);
      const files = fs.readdirSync(distPath);
      console.log(`Diagnostic: Files in dist: ${files.join(', ')}`);
    } else {
      console.error(`Diagnostic: dist folder NOT FOUND at ${distPath}`);
    }
  }).catch(err => console.error('Diagnostic: Failed to run file check', err));

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Gemini Proxy Endpoint
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { model, contents, config } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: model || 'gemini-2.0-flash',
        contents,
        config
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini Proxy Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate content' });
    }
  });

  if (!isProd) {
    // Vite middleware for development
    console.log('Starting in DEVELOPMENT mode');
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error('Vite failed to load, falling back to static serving', e);
      serveStatic(app);
    }
  } else {
    // Serve static files in production
    console.log('Starting in PRODUCTION mode');
    serveStatic(app);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function serveStatic(app: express.Express) {
  // Use __dirname for more reliable path resolution in containers
  const distPath = path.resolve(__dirname, 'dist');
  console.log(`Diagnostic: Attempting to serve static files from: ${distPath}`);
  
  // Check if directory exists
  import('fs').then(fs => {
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      console.log(`Diagnostic: Found ${files.length} files in dist: ${files.slice(0, 5).join(', ')}...`);
    } else {
      console.error(`Diagnostic: dist directory NOT FOUND at ${distPath}`);
      // Try fallback to process.cwd()
      const fallbackPath = path.join(process.cwd(), 'dist');
      console.log(`Diagnostic: Trying fallback path: ${fallbackPath}`);
    }
  }).catch(err => console.error('Diagnostic: FS check failed', err));

  app.use(express.static(distPath));
  
  // SPA fallback: serve index.html for all other routes
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error sending index.html from ${indexPath}:`, err);
        res.status(404).send(`
          <html>
            <body style="font-family: sans-serif; padding: 2rem; line-height: 1.5;">
              <h1>Application Loading...</h1>
              <p>The server is running, but the frontend files (dist/index.html) were not found at: <code>${indexPath}</code></p>
              <p>Please check your Cloud Build logs to ensure the build step completed successfully.</p>
              <hr/>
              <p><small>Diagnostic: __dirname is ${__dirname}</small></p>
            </body>
          </html>
        `);
      }
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
