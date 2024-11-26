// routes/quizRoutes.js
import express from 'express';
import { createQuiz, getQuiz, submitAnswer, getResults } from '../controllers/quizController.js';
import { validateCreateQuiz, validateSubmitAnswer, validateGetResults, validateGetQuiz } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/quizzes', validateCreateQuiz, createQuiz);  // Apply validation middleware
router.get('/quizzes/:id', validateGetQuiz, getQuiz);     // Apply validation middleware
router.post('/quizzes/submit', validateSubmitAnswer, submitAnswer); // Apply validation middleware
router.post('/quizzes/results', validateGetResults, getResults); // Apply validation middleware

export default router;
