/**
 * Question data type.
 */
class Question {
  constructor(question, options, correct) {
    this.question_ = question;
    this.answers_ = answers;
    this.correctAnswerIndex_ = correctAnswerIndex;
  }

  getQuestion() {
    return question_;
  }

  getAnswers() {
    return answers_;
  }

  getCorrectAnswerIndex() {
    return correctAnswerIndex_;
  }
}

function presentQuiz() {
  // create array of quiz questions 
  const questions;

  const quizContainer = document.getElementById('quiz-container');
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');
  const submitContainer = document.getElementById('submit-container');

  for (q in questions) {
    // display the question in a container
    questionContainer.innerText = q.getQuestion();
    // Display the options
    // Use radio buttons
    // Have a submit button
    // When user clicks submit button display correct answer
  }
}
