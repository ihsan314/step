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
const questionsContainer = document.getElementById('questions-container');
const submitContainer = document.getElementById('submit-container');

function presentQuiz() {
  questionsContainer.innerHTML = '';
  for (const questionNum = 0; questionNum < questions.length; questionNum++) {
    const q = questions[questionNum];
    const answers = q.getAnswers();
    const correctIndex = q.getCorrectAnswerIndex();
    // Display the options
    questionsContainer.innerHTML += '<p>Question '+questionNum+':</p>';
    questionsContainer.innerHTML += `<p>${q.getQuestion()}</p><br>`;
    questionsContainer.innerHTML += '<select id="question-'+questionNum+'>';
    for (const answerIndex = 0; answerIndex < answers.length; answerIndex++) {
      const answer = answers[answerIndex];
      questionsContainer.innerHTML += '<option value="' + answer + '">' + answer + '</option>';
    }
    questionsContainer.innerHTML += '<option value="" selected></option>';
    questionsContainer.innerHTML += '</select>';
  }
}

function checkSubmission() {
  submitContainer.innerText = '';
  for (const questionNum = 0; questionNum < questions.length; questionNum++) {
    const q = questions[questionNum];
    const answers = q.getAnswers();
    const correctIndex = q.getCorrectAnswerIndex();
    if (answersContainer.getElementById('question-'+questionNum).selectedIndex !== correctIndex) {
      submitContainer.innerText += `Question ${questionNum} is incorrect\n`
    } else {
      submitContainer.innerText += `Question ${questionNum} is correct\n`
    }
  }
}
