import express, { Request, Response, NextFunction } from 'express';
import config from './config';
import { setupVoiceRoutes } from './voice/routes';

// Initialize Express app
const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add basic logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    environment: config.app.nodeEnv
  });
});

// Set up voice routes
setupVoiceRoutes(app);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.app.nodeEnv === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', message: `Path ${req.path} not found` });
});

// Start server if this file is run directly
if (require.main === module) {
  const port = config.app.port;
  app.listen(port, () => {
    console.log(`Kissan Mitra server is running on port ${port} in ${config.app.nodeEnv} mode`);
  });
}

export default app;
