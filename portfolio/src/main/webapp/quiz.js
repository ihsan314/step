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

function presentQuiz() {
  const questionsContainer = document.getElementById('questions-container');
  for (let questionNum = 0; questionNum < questions.length; questionNum++) {
    const question = questions[questionNum];
    const answers = question.getAnswers();
    const correctIndex = question.getCorrectAnswerIndex();
    // Display the options
    const questionStatementElement = document.createElement('p');
    const questionStatementText = document.createTextNode(`Question ${questionNum}: ${q.getQuestion()}`);
    questionStatementElement.appendChild(questionStatementText);

    const quizArea = document.createElement('select');
    quizArea.setAttribute('id', generateId(questionNum));
    for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
      const option = document.createElement('option');
      option.setAttribute('value', answerIndex);
      const answer = document.createTextNode(answers[answerIndex]);
      option.appendChild(answer);
      quizArea.appendChild(option);
    }

    const emptyAnswer = document.createElement('option');
    emptyAnswer.setAttribute('selected', '');
    emptyAnswer.setAttribute('value', '');
    quizArea.appendChild(emptyAnswer);

    questionsContainer.appendChild(questionStatement);
    questionsContainer.appendChild(quizArea);
  }
}

function checkSubmission() {
  const submitContainer = document.getElementById('submit-container');
  submitContainer.innerText = '';
  for (let questionNum = 0; questionNum < questions.length; questionNum++) {
    const question = questions[questionNum];
    const correctIndex = question.getCorrectAnswerIndex();
    if (document.getElementById(generateId(questionNum)).selectedIndex !== correctIndex) {
      submitContainer.innerText += `Question ${questionNum} is incorrect\n`
    } else {
      submitContainer.innerText += `Question ${questionNum} is correct\n`
    }
  }
}

function generateId(questionNum) {
  return `question-${questionNum}`;
}
