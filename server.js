const express = require('express');
const path = require('path');
const { securityMiddleware } = require('./src/middleware/security');

const app = express();
const PORT = process.env.PORT || 3000;

// Apply security middleware
app.use(securityMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 