/**
 * Question data type.
 */
class Question {
  constructor(question, answers, correctAnswerIndex) {
    this.question_ = question;
    this.answers_ = answers;
    this.correctAnswerIndex_ = correctAnswerIndex;
  }

  getQuestion() {
    return this.question_;
  }

  getAnswers() {
    return this.answers_;
  }

  getCorrectAnswerIndex() {
    return this.correctAnswerIndex_;
  }
}

function presentQuiz() {
  // create array of quiz questions 
  const questions = [];
  questions.push(
      new Question('What\'s my GitHub username?',
		  ['iolawale', 'ihsan', 'olawale314', 'ihsan314'], 3));
  questions.push(
      new Question('Where do I reside?',
		  ['San Francisco, CA', 'Vancouver, BC', 'Toronto, ON', 'Palo Alto CA'], 1));
  questions.push(
      new Question('Where do I attend university?',
		  ['University of British Columbia', 'Simon Fraser University',
		    'Stanford University', 'New York University'], 0));
  questions.push(
      new Question('In which of these classes did I receive the highest grade?',
		  ['Principles of Microeconomics', 'Honours Integral Calculus',
		    'Basic Algorithms and Data Structures', 'Introduction to Microcomputers'], 1));
  questions.push(
      new Question('In which of these classes did I receive the lowest grade?',
		  ['Principles of Microeconomics', 'Honours Integral Calculus',
		    'Basic Algorithms and Data Structures', 'Introduction to Microcomputers'], 3));

  const quizContainer = document.getElementById('quiz-container');
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');
  const submitContainer = document.getElementById('submit-container');

  for (const q of questions) {
    const answers = q.getAnswers();
    const correctIndex = q.getCorrectAnswerIndex();
    // display the question in a container
    questionContainer.innerText = q.getQuestion();
    // Display the options
    answersContainer.innerHTML = '<select>';
    for (answer in q.getAnswers()) {
      answersContainer.innerHTML += '<option value="' + answer + '">' + answer + '</option>';
    }
    answersContainer.innerHTML += '<option value="" selected></option>';
    answersContainer.innerHTML += '</select>';
    // Have a submit button
    submitContainer.innerHTML = '<button type="button" onclick="checkSubmission()">Check Your Answer</button>';
    // When user clicks submit button display correct answer
    const numCurrentSubmissions = typeof checkSubmission.numTimesClicked === undefined ? 0 : checkSubmission.numTimesClicked;
    while (numCurrentSubmissions === 0 || numCurrentSubmissions === checkSubmission.numTimesClicked) {
      // wait for the user to submit the response
    }
    const isCorrect = correctIndex === answersContainer.getElementById('select').selectedIndex;
    submitContainer.innerText = isCorrect ? 'Correct' : 'Incorrect: ' + answers[index];
  }
}

function checkSubmission() {
  checkSubmission.numTimesClicked =
      typeof checkSubmission.numTimesClicked === 'undefined' ?  1 : checkSubmission.numTimesClicked + 1;
}
