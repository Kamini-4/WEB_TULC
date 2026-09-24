import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export function createApiError(message: string, statusCode: number = 400, details?: any): ApiError {
  const err = new Error(message) as ApiError;
  err.statusCode = statusCode;
  err.details = details;
  return err;
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[API_EXCEPTION] ${req.method} ${req.originalUrl}:`, {
    status: statusCode,
    message: message,
    stack: err.stack,
    details: err.details
  });

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(err.details ? { details: err.details } : {})
  });
}
