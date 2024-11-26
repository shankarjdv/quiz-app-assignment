import express from 'express';
import bodyParser from 'body-parser';
import quizRoutes from './routes/quizRoutes.js';
import { initModels } from './models/initModels.js';
import { errorHandler } from './middleware/errorHandler.js';  // Named import


const app = express();
app.use(errorHandler);  // Use the error handler

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Use the quiz routes for all API requests
app.use('/api', quizRoutes); 

// Initialize database schema
initModels();

// Global error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
