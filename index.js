const { NlpManager } = require('node-nlp/src/nlp');

console.log('Starting chatbot...');

const manager = new NlpManager({ languages: ['en'] });
manager.load();

const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('> ');
rl.prompt();

rl.on('line', async (line) => {
  const response = await manager.process('en', line, null);
  console.log(response);
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});
