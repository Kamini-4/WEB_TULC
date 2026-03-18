// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3e3;
  const isProd = process.env.NODE_ENV === "production" || process.env.K_SERVICE !== void 0;
  console.log(`SERVER STARTING V2 - PORT: ${PORT} - IS_PROD: ${isProd}`);
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  if (!isProd) {
    console.log("Starting in DEVELOPMENT mode");
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Vite failed to load, falling back to static serving", e);
      serveStatic(app);
    }
  } else {
    console.log("Starting in PRODUCTION mode");
    serveStatic(app);
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
function serveStatic(app) {
  const distPath = path.join(process.cwd(), "dist");
  console.log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error sending index.html from ${indexPath}:`, err);
        res.status(404).send("Application is still building or files are missing. Please refresh in a few moments.");
      }
    });
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
