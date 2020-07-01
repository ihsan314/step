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

function presentQuiz() {
  // create array of quiz questions 

  for (int questionNum = 0; questionNum < questions.length; questionNum++) {
    const q = questions[questionNum];
    const answers = q.getAnswers();
    const correctIndex = q.getCorrectAnswerIndex();
    // display the question in a container
    questionContainer.innerText = q.getQuestion();
    // Display the options
    answersContainer.innerHTML += '<p>Question '+questionNum+':</p><br>';
    answersContainer.innerHTML += '<select id="question-'+questionNum+'>';
    for (int answerIndex = 0; answerIndex < answers.length; answerIndex++) {
      const answer = answers[answerIndex];
      answersContainer.innerHTML += '<option value="' + answer + '">' + answer + '</option>';
    }
    answersContainer.innerHTML += '<option value="" selected></option>';
    answersContainer.innerHTML += '</select>';
  }

  // Have a submit button that validates responses upon clicking
  submitContainer.innerHTML = '<button type="button" onclick="checkSubmission()">Check Your Answer</button>';
}

function checkSubmission() {
  for (int questionNum = 0; questionNum < questions.length; questionNum++) {
    const q = questions[questionNum];
    const answers = q.getAnswers();
    const correctIndex = q.getCorrectAnswerIndex();
    if (answersContainer.getElementById('question-'+questionNum).selectedIndex !== correctIndex) {
      submitContainer.innerText += `Question ${questionNum} is incorrect`
    } else {
      submitContainer.innerText += `Question ${questionNum} is correct`
    }
  }
}
