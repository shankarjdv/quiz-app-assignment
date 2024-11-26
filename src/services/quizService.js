import db from '../db.js';

/**
 * Quiz service that handles operations related to quizzes, such as creating quizzes,
 * getting quizzes by ID, submitting answers, and getting results.
 */
const quizService = {
  createQuiz: (title, questions) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO quizzes (title) VALUES (?)', [title], function (err) {
        if (err) return reject(err);
        const quizId = this.lastID;

        const stmt = db.prepare(
          `INSERT INTO questions (quiz_id, text, options, correct_option)
           VALUES (?, ?, ?, ?)`
        );

        questions.forEach((q) => {
          stmt.run(quizId, q.text, JSON.stringify(q.options), q.correct_option);
        });
        stmt.finalize((err) => {
          if (err) return reject(err);
          resolve(quizId);
        });
      });
    });
  },

  getQuizById: (id) => {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT q.id, q.text, q.options
        FROM questions q
        WHERE q.quiz_id = ?
      `,
        [id],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map((r) => ({ ...r, options: JSON.parse(r.options) })));
        }
      );
    });
  },

  submitAnswer: (quizId, questionId, selectedOption, userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `
        SELECT correct_option
        FROM questions
        WHERE id = ? AND quiz_id = ?
      `,
        [questionId, quizId],
        (err, row) => {
          if (err) return reject(err);
          if (!row) return reject(new Error('Question not found'));

          const isCorrect = row.correct_option === selectedOption;
          db.run(
            `
            INSERT INTO answers (quiz_id, question_id, selected_option, is_correct,user_id)
            VALUES (?, ?, ?, ?, ?)
          `,
            [quizId, questionId, selectedOption, isCorrect,userId],
            (err) => {
              if (err) return reject(err);
              resolve({ isCorrect, correctOption: isCorrect ? null : row.correct_option });
            }
          );
        }
      );
    });
  },

  // getResults: (quizId,userId) => {
  //   return new Promise((resolve, reject) => {
  //     db.all(
  //       `
  //       SELECT a.question_id, a.selected_option, a.is_correct
  //       FROM answers a
  //       WHERE a.quiz_id = ? and a.user_id = ?
  //     `,
  //       [quizId,userId],
  //       (err, rows) => {
  //         if (err) return reject(err);

  //         const score = rows.filter((a) => a.is_correct).length;
  //         resolve({ score, answers: rows });
  //       }
  //     );
  //   });
  // },
  getResults: async (quizId, userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.question_id, a.selected_option, a.is_correct
        FROM answers a
        WHERE a.quiz_id = ? AND a.user_id = ?`,
        [quizId, userId],
        (err, rows) => {
          if (err) return reject(err);

          // Count correct and incorrect answers
          const correctAnswers = rows.filter((a) => a.is_correct === 1);
          const incorrectAnswers = rows.filter((a) => a.is_correct === 0);
          // Calculate percentage (round to two decimal places)
          const totalQuestions = rows.length;
          const score = `${totalQuestions > 0 ? ((correctAnswers.length / totalQuestions) * 100).toFixed(2) : 0} %`;

          // Return the results with counts
          resolve({
            correctCount: correctAnswers.length,
            incorrectCount: incorrectAnswers.length,
            score,
            answers: rows,
          });
        }
      );
    });
  },
};

export default quizService;
