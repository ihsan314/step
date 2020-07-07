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

const questionsArray = [];
questionsArray.push(
    new Question(question='What\'s my GitHub username?',
		answers=['iolawale', 'ihsan', 'olawale314', 'ihsan314'], correctAnswerIndex=3));
questionsArray.push(
    new Question(question='Where do I reside?',
		answers=['San Francisco, CA', 'Vancouver, BC', 'Toronto, ON', 'Palo Alto CA'], correctAnswerIndex=1));
questionsArray.push(
    new Question(question='Where do I attend university?',
		answers=['University of British Columbia', 'Simon Fraser University',
		  'Stanford University', 'New York University'], correctAnswerIndex=0));
questionsArray.push(
    new Question(question='In which of these classes did I receive the highest grade?',
		answers=['Principles of Microeconomics', 'Honours Integral Calculus',
		  'Basic Algorithms and Data Structures', 'Introduction to Microcomputers'], correctAnswerIndex=1));
questionsArray.push(
    new Question(question='In which of these classes did I receive the lowest grade?',
		answers=['Principles of Microeconomics', 'Honours Integral Calculus',
		  'Basic Algorithms and Data Structures', 'Introduction to Microcomputers'], correctAnswerIndex=3));

function presentQuiz() {
  const questionsContainer = document.getElementById('questions-container');
  for (let questionNum = 0; questionNum < questionsArray.length; questionNum++) {
    const question = questionsArray[questionNum];
    const answers = question.getAnswers();
    const correctIndex = question.getCorrectAnswerIndex();
    // Display the options
    const questionStatementElement = document.createElement('p');
    const questionStatementText = document.createTextNode(`Question ${questionNum}: ${question.getQuestion()}`);
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
  for (let questionNum = 0; questionNum < questionsArray.length; questionNum++) {
    const question = questionsArray[questionNum];
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
