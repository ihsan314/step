/**
 * Question data type.
 */
function Question(question, options, correct) {
  this.question = question;
  this.options = options;
  this.correct = correct; // index where correct answer is
}
function presentQuiz() {
  // create array of quiz questions 
  let questions;

  for (q in questions) {
    let quizContainer = document.getElementById('quiz-container');
    // display the question in a container
    quizContainer.innerText = q.question;
    // Display the options
    // When user answers display correct answer
  }
}
