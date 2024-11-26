import db from '../db.js';

/**
 * Creates the `questions` table if it does not exist.
 * The table stores questions for quizzes, including their text, options, 
 * and the correct option index.
 */
export const createQuestionsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id INTEGER NOT NULL,
      text TEXT NOT NULL,
      options TEXT NOT NULL, -- JSON string for options
      correct_option INTEGER NOT NULL,
      FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE
    );
  `;

  db.run(query, (err) => {
    if (err) {
      console.error('Error creating `questions` table:', err.message);
    } else {
      console.log('`questions` table ensured to exist.');
    }
  });
};
