import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  // Only log API routes and static asset requests if not dev bundle requests
  if (req.path.startsWith('/@') || req.path.startsWith('/node_modules') || req.path.startsWith('/src')) {
    return next();
  }

  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Use colored status code prefix in logs if relevant
    const level = statusCode >= 500 ? 'ERROR' : statusCode >= 400 ? 'WARN' : 'INFO';
    console.log(`[${level}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
  });

  next();
}
