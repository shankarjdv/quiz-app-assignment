
To Run the Application

Install Dependencies
1. Run "npm install" to install all the necessary packages.
2. Run "npm start" to start the application.

Access the APIs:
The server will be available at http://localhost:3000.

========================================================================================================
Quiz App - Documentation
1. Overview
The Quiz App is an online quiz application that allows users to:

Create quizzes with questions and options.
Submit answers for each quiz.
View results based on the answers submitted.
It is designed following RESTful principles, using a Node.js backend with SQLite as the database. The app includes essential validation and error handling.

-------------------------------------------------------------------------------------
2. Technologies Used
Backend: Node.js
Database: SQLite (for storing quizzes, questions, and answers)
API Validation: Joi
Middleware: Custom error handling and validation middleware
RESTful APIs for all operations
--------------------------------------------------------------------------------------

3. Database Structure
The app uses an SQLite database with the following tables:

quizzes table:
id: Integer (Primary Key, Auto Increment)
title: String (Title of the quiz)

questions table:
id: Integer (Primary Key, Auto Increment)
quiz_id: Integer (Foreign Key referencing quizzes table)
text: String (The question text)
options: JSON (An array of options for the question)
correct_option: Integer (The index of the correct option)

answers table:
id: Integer (Primary Key, Auto Increment)
quiz_id: Integer (Foreign Key referencing quizzes table)
user_id: storing dummy user Id
question_id: Integer (Foreign Key referencing questions table)
selected_option: Integer (The option selected by the user)
is_correct: Boolean (True if the selected option is correct)

---------------------------------------------------------------------------------- 

4. Key Features
Create a Quiz: Create a new quiz with questions and options.
Get Quiz by ID: Retrieve questions for a specific quiz by quiz ID.
Submit Answer: Submit an answer for a specific question within a quiz.
Get Results: Get results of the quiz after submission.
Error Handling: Appropriate error messages and HTTP status codes (e.g., 400 for invalid input, 404 for not found, 500 for server error).
Input Validation: Validate inputs using Joi for both user and quiz data.


---------------------------------------------------------------------------------
5. API Endpoints:

 A. Get Quiz(GET):  http://localhost:3000/api/quizzes/1
    payload: {
         "title": "General Knowledge Quiz",
         "questions": [
            {
                "text": "What is the capital of France?",
                "options": ["Berlin", "Madrid", "Paris", "Rome"],
                "correct_option": 3
            },
            {
                "text": "Who wrote 'Romeo and Juliet'?",
                "options": ["Shakespeare", "Dickens", "Hemingway", "Austen"],
                "correct_option": 1
            }
        ]
    }
    ------------------------------------------------------------------

    B. Create Quiz(POST): http://localhost:3000/api/quizzes
    ------------------------------------------------------------------

    C. Submit Answer(POST): http://localhost:3000/api/quizzes/submit
    payload: {
        "quizId": 1,
        "questionId": 1,
        "selectedOption":4,
        "userId":2
    }
    ---------------------------------------------------------------------
    d. Get Results(Post): http://localhost:3000/api/quizzes/results
    payload: {
        "userId": 2,
        "quizeId":1
    }
    -----------------------------------------------------------------------
Please refer to the API screenshot found in the "PostManAPIScreenShot" folder located in the root directory of the project.
-------------------------------------------------------------------------------------


6. Project Structure
quiz-app/
│
├── node_modules/
├── src/
│   ├── controllers/           # Controller logic to handle API requests
│   │   ├── quizController.js
│   ├── middlewares/           # Middleware functions for validation, error handling
│   │   └── errorHandler.js
│   │   └── validationMiddleware.js
│   ├── models/                # database table schema
│   │   └── answer.js
│   │   └── initModel.js
│   │   └── questions.js
│   │   └── quizzes.js
│   ├── routes/                # API route definitions
│   │   └── quizRoutes.js
│   ├── utils/                 # Utility functions for request payload validation (Joi)
│   │   └── validation.js
│   ├── db.js                  # SQLite Database connection
│   ├── app.js                 # Application entry point (server setup)
│
├── database.sqlite             # in memory database
├── package.json                # Dependencies and scripts
└── README.md                   # Project Documentation

In this project, I’ve created a modular and organized structure by separating the application into distinct layers such as controller, service, utility (util), database models (db), and routes. Each layer has its own responsibility to ensure the code is clean, maintainable, and scalable. Here's why I chose this approach:

1. Controller
Purpose: The controller handles the incoming HTTP requests and responses. It serves as the intermediary between the client and the service layer.
Reason: By separating the controller, we can easily manage the request-response flow and error handling before passing the logic to the service layer. It also improves testing, as the controller can be mocked during testing of the service layer.
2. Service
Purpose: The service layer contains the core business logic and interacts directly with the database. It processes the data, applies the necessary transformations, and returns the result to the controller.
Reason: Keeping business logic in the service layer ensures that controllers stay lightweight and focused on HTTP-specific tasks. This separation allows for easier maintenance, as any changes to the core logic will be contained in the service layer and not affect the HTTP communication code.
3. Utility (Util)
Purpose: The util layer contains helper functions, such as validation or data transformation logic, that can be shared across multiple parts of the application.
Reason: By separating common utility functions into a single place, I can avoid code duplication, and the application becomes more modular and reusable. It also makes it easier to update or change shared logic without having to touch multiple parts of the app.
4. Database Models (db)
Purpose: The database models represent the structure of the data and define the relationships between different tables. This is where I define the schema and queries that interact directly with the database.
Reason: By separating the database logic into its own module, it allows for better control over data manipulation and abstraction. It ensures that changes in the database structure are isolated and don't impact other layers directly. It also provides a centralized location to manage data operations, making the codebase cleaner and easier to maintain.
5. Routes
Purpose: The routes layer defines the URL paths for the different API endpoints and maps them to the corresponding controller functions and we can also use it to apply middleware for validation, authentication, etc.. .
Reason: The routes module ensures that each route is clearly defined and can easily be modified or extended. It separates the URL handling from the application logic, making the routing structure clearer and more manageable, especially when scaling the application.
Benefits of This Structure:
Separation of Concerns: Each layer has a single responsibility, making the codebase easier to understand and maintain.
Scalability: The modular structure allows new features or changes to be implemented without affecting unrelated parts of the application.
Testability: Isolating the business logic in services and utility functions makes the application easier to test at different levels (unit, integration, and end-to-end testing).
Maintainability: This structure helps in quickly identifying and fixing bugs or adding new features, since each part of the codebase is clearly organized and modular.
Readability: It improves code readability for developers, making it easier for teams to work collaboratively and contribute effectively.
In summary, this architecture follows best practices, ensures a clean and modular design, and facilitates long-term maintainability.






