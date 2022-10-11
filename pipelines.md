# default

## main
nlp.train console.say "Say something!"

## onIntent(joke.chucknorris)
// compiler=javascript
const request = require('request')
const response = request.get('https://api.chucknorris.io/jokes/random')
if (response && response.value) {
  input.answer = response.value
}

## onIntent(schedule.start)
// compiler=javascript
const request = require('request')
const response = request.get('https://jsonplaceholder.typicode.com/todos')
if (response) {
  input.answer = response
} else {
  input.answer = "Project not found"
}

## console.hear
// compiler=javascript
if (message === 'quit') {
  return console.exit();
}
nlp.process();
this.say();