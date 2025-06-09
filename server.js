import express from 'express';
import { createServer } from 'vite';
import compression from 'compression';
import { configureSecurity } from './src/middleware/security';

const app = express();
const port = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Configure security middleware
configureSecurity(app);

// Cache control middleware
const cacheControl = (req, res, next) => {
  // Cache static assets
  if (req.url.match(/\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  }
  // Cache HTML files
  else if (req.url.match(/\.html$/)) {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  }
  // No cache for API routes
  else if (req.url.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  // Default cache control
  else {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  }
  next();
};

app.use(cacheControl);

// Development mode
if (process.env.NODE_ENV === 'development') {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use(vite.middlewares);
} else {
  // Production mode
  app.use(express.static('dist', {
    maxAge: '1y',
    etag: true,
    lastModified: true,
  }));
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 