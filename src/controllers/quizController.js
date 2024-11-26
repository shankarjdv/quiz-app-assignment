import quizService from '../services/quizService.js';

/**
 * Create a new quiz
 */
export const createQuiz = async (req, res, next) => {
  try {
    const { title, questions } = req.body;

    // Input validation
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Invalid input: Title and questions are required.' });
    }

    // Create quiz
    const quizId = await quizService.createQuiz(title, questions);

    // Respond with status 201 (Created)
    res.status(201).json({ id: quizId });
  } catch (err) {
    // Handle errors
    next(err);
  }
};

/**
 * Get quiz details by ID
 */
export const getQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get questions by quiz ID
    const questions = await quizService.getQuizById(id);

    // Return 404 if quiz not found
    if (!questions.length) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Return quiz questions
    res.json({ id, questions });
  } catch (err) {
    // Handle errors
    next(err);
  }
};

/**
 * Submit an answer for a specific question
 */
export const submitAnswer = async (req, res, next) => {
  try {
    const { quizId, questionId, selectedOption,userId } = req.body;

    // // Input validation
    // if (!quizId || !questionId || selectedOption === undefined || userId) {
    //   return res.status(400).json({ error: 'Invalid input: quizId, questionId, and selectedOption are required.' });
    // }

    // Submit answer
    const result = await quizService.submitAnswer(quizId, questionId, selectedOption,userId);

    // Return the result of the answer submission
    res.json(result);
  } catch (err) {
    // Handle errors (e.g., Question not found)
    if (err.message === 'Question not found') {
      return res.status(404).json({ error: err.message });
    }
    next(err);  // For other errors, pass to global error handler
  }
};

/**
 * Get quiz results
 */
export const getResults = async (req, res, next) => {
  try {
    const { quizeId,userId } = req.body;

    // Get results for the quiz
    const results = await quizService.getResults(quizeId,userId);

    // Return 404 if no results found
    if (!results.answers || results.answers.length === 0) {
      return res.status(404).json({ error: 'No results found' });
    }

    // Return the quiz results
    res.json(results);
  } catch (err) {
    // Handle errors
    next(err);
  }
};
