// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/**
 * Adds random fact about me to the page
 */
function addRandomFact() {
  // Keep track of how many times the function has been called, to determine
  // when to reveal the quiz
  if (typeof addRandomFact.numTimesCalled === undefined) {
    addRandomFact.numTimesCalled = 0;
  }
  addRandomFact.numTimesCalled++;

  if (addRandomFact.numTimesCalled === 3) {
    // The last two elements of `facts` are the best indication of trolling.
    // The probability of one of these two showing up is 2/4 = 1/2, and after
    // 3 clicks the expected number of times at least one of these facts show up
    // is 1.5 times. Hence 3 clicks is a good time to show the actual facts.
    document.getElementById('quiz-container').className.replace('hidden', '');
    presentQuiz();
  }

  const facts =
    ['I\'m a fun guy',
     'Obviously I love web development',
     'It\'s just more questions you have to ask me '+
     'in order for me to tell you more about myself',
     'I just can\'t give you the whole spill'];

  // Select a random fact
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add to the page
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}
