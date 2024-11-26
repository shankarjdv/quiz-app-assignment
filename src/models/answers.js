import db from '../db.js';

/**
 * Creates the `answers` table if it does not exist.
 * This table stores user answers for quiz questions, including their selection
 * and whether the answer was correct.
 */
export const createAnswersTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      selected_option INTEGER NOT NULL,
      is_correct INTEGER NOT NULL, -- 1 for true, 0 for false
      FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
    );
  `;

  db.run(query, (err) => {
    if (err) {
      console.error('Error creating `answers` table:', err.message);
    } else {
      console.log('`answers` table ensured to exist.');
    }
  });
};
