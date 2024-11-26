import db from '../db.js';

export const createQuizzesTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating quizzes table:', err);
    }
  });
};
