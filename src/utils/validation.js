// utils/validation.js
import Joi from 'joi';

/**
 * Validation schema for creating a new quiz.
 */
export const createQuizSchema = Joi.object({
  title: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  questions: Joi.array().items(
    Joi.object({
      text: Joi.string().trim().min(1).required().messages({
        'string.empty': 'Question text is required',
        'any.required': 'Question text is required',
      }),
      options: Joi.array()
      .items(Joi.string().trim().required())
      .length(4)  // Ensure there are exactly 4 options
      .required()
      .messages({
        'array.length': 'There must be exactly 4 options for each question',
        'array.min': 'At least 4 options are required for each question',
        'any.required': 'Options are required',
      }),
    correct_option: Joi.number()
      .integer()
      .min(1)
      .max(4)  // Ensure the correct_option is between 1 and 4 (inclusive)
      .required()
      .messages({
        'number.base': 'Correct option must be a number between 1 and 4',
        'number.min': 'Correct option must be a number between 1 and 4',
        'number.max': 'Correct option must be a number between 1 and 4',
        'any.required': 'Correct option is required',
      })
      .custom((value, helpers) => {
        // Ensure correct_option is a valid index based on the options array
        if (value < 1 || value > 4) {
          return helpers.message('Correct option must be a number between 1 and 4');
        }
        return value;
      }),
    })
  ).min(1).required().messages({
    'array.min': 'At least one question is required',
    'any.required': 'Questions are required',
  }),
});

/**
 * Validation schema for submitting an answer.
 */
export const submitAnswerSchema = Joi.object({
  quizId: Joi.number().integer().required().messages({
    'number.base': 'Quiz ID must be a number',
    'any.required': 'Quiz ID is required',
  }),
  questionId: Joi.number().integer().required().messages({
    'number.base': 'Question ID must be a number',
    'any.required': 'Question ID is required',
  }),
  selectedOption: Joi.number()
  .integer()
  .min(1)
  .max(4)  // Ensures the selectedOption is between 1 and 4 (inclusive)
  .required()
  .messages({
    'number.base': 'Selected option must be a number',
    'number.min': 'Selected option must be between 1 and 4',
    'number.max': 'Selected option must be between 1 and 4',
    'any.required': 'Selected option is required',
  }),
  userId: Joi.number().integer().required().messages({
    'number.base': 'userId ID must be a number',
    'any.required': 'userId ID is required',
  }),
});

/**
 * Validation schema for getting quiz results.
 */
export const getResultsSchema = Joi.object({
    quizeId: Joi.number().integer().required().messages({
    'number.base': 'Quiz ID must be a number',
    'any.required': 'Quiz ID is required',
  }),
  userId: Joi.number().integer().required().messages({
    'number.base': 'userId ID must be a number',
    'any.required': 'userId ID is required',
  }),
});

/**
 * Validation schema for getting a quiz.
 */
export const getQuizSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'Quiz ID must be a number',
    'any.required': 'Quiz ID is required',
  }),
});
