/**
 * Question data type.
 */
class Question {
  /**
   * @param {string} question The question that shall be posed
   * @param {!Array<string>} answers The potential responses to the question
   * @param {number} correctAnswerIndex The index in answers that leads to the correct response
   */
  constructor(question, answers, correctAnswerIndex) {
    /**
     * @private @const {string}
     */
    this.question_ = question;
    /**
     * @private @const {Array<string>}
     */
    this.answers_ = answers;
    /**
     * @private @const {number}
     */
    this.correctAnswerIndex_ = correctAnswerIndex;
  }

  /**
   * @return {string}
   */
  getQuestion() {
    return this.question_;
  }

  /**
   * @return {!Array<string>}
   */
  getAnswers() {
    return this.answers_;
  }

  /**
   * @return {number}
   */
  getCorrectAnswerIndex() {
    return this.correctAnswerIndex_;
  }
}

const questionsArray = [];
questionsArray.push(
    new Question(question=`What's my GitHub username?`,
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

/**
 * Display the questions on the webpage, using dropdown boxes for the answers
 */
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

/**
 * Verify the correctness of the user's responses to the questions when the "Check your answer"
 * button is pressed.
 */
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

/**
 * Create an id for each question for labeling the dropdown answer boxes.
 * @param questionNum the question number to generate the id for
 * @return {string}
 */
function generateId(questionNum) {
  return `question-${questionNum}`;
}
