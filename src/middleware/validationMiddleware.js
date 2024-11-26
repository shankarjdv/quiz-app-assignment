// middleware/validationMiddleware.js
import { createQuizSchema, submitAnswerSchema, getResultsSchema, getQuizSchema } from '../utils/validation.js';

/**
 * Middleware function to validate the payload for creating a quiz.
 */
export const validateCreateQuiz = (req, res, next) => {
  const { error } = createQuizSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

/**
 * Middleware function to validate the payload for submitting an answer.
 */
export const validateSubmitAnswer = (req, res, next) => {
  const { error } = submitAnswerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

/**
 * Middleware function to validate the quiz ID for getting quiz results.
 */
export const validateGetResults = (req, res, next) => {
  const { error } = getResultsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

/**
 * Middleware function to validate the quiz ID for getting the quiz.
 */
export const validateGetQuiz = (req, res, next) => {
  const { error } = getQuizSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
