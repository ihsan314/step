/**
 * Question data type.
 */
class Question {
  constructor(question, answers, correct) {
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

  for (q in questions) {
    // display the question in a container
    questionContainer.innerText = q.getQuestion();
    // Display the options
    // Use radio buttons
    // Have a submit button
    // When user clicks submit button display correct answer
  }
}
