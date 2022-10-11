const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'] });

const fs = require('fs');

const files = fs.readdirSync('./intents');

files.forEach((file) => {
  let data = fs.readFileSync(`./intents/${file}`);
  data = JSON.parse(data);

  const intent = file.replace('.json', '');

  data.questions.forEach((question) => {
    manager.addDocument('en', question, intent);
  });

  data.answers.forEach((answer) => {
    manager.addAnswer('en', intent, answer);
  });
});

const trainSave = async () => {
  manager.addCorpus('./corpus/schedules.json');
  await manager.train();
  manager.save();
};

trainSave();
