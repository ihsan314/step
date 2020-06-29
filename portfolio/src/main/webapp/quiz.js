/**
 * Question data type.
 */
class Question {
  constructor(question, options, correct) {
    this.question = question;
    this.options = options;
    this.correct = correct; // index where correct answer is
  }
}
function presentQuiz() {
  // create array of quiz questions 
  const questions;

  const quizContainer = document.getElementById('quiz-container');
  for (q in questions) {
    // display the question in a container
    quizContainer.innerText = q.question;
    // Display the options
    // Make another container
    // Use radio buttons
    // Have a submit button
    // When user clicks submit button display correct answer
  }
}
