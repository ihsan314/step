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
  const facts =
    ['I\'m a fun guy',
     'Obviously I love web development',
     'It\'s just more questions you have to ask me in order for me to tell you more about myself',
     'I just can\'t give you the whole spill'];

  // Select a random fact
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add to the page
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

/**
<<<<<<< HEAD
 * Fetches greeting from /data for use as opening greeting
 */
async function getOpeningGreeting() {
  const response = await fetch('/data');
  const greeting = await response.text();
  document.getElementById('opening-greeting').innerHTML = greeting;
=======
 * Fetches messages from the server and adds them to the webpage
 */
function displayMessages() {
  fetch('/data').then(response => response.json()).then((messages) => {
    console.log(messages);
    const messageContainer = document.getElementById('messages-container');
    messageContainer.innerText = '';
    for (const username in messages) {
      messageContainer.innerText += username + ': ' + messages[username] + '\n\n';
      // messageContainer.innerText += username + '\n';
    }
  });
>>>>>>> 27fb121d78e46b35f57241c83d6cd4a4b0714785
}
