import { createQuizzesTable } from './quizzes.js';
import { createQuestionsTable } from './questions.js';
import { createAnswersTable } from './answers.js';

/**
 * Initializes all tables in the database.
 * This function ensures that the quizzes, questions, and answers tables exist in the database.
 */
export const initModels = () => {
  createQuizzesTable();
  createQuestionsTable();
  createAnswersTable();
};
