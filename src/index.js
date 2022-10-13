const { NlpManager } = require('node-nlp/src/nlp');

const manager = new NlpManager({ languages: ['en'] });
manager.load();

const express = require('express');
const { json } = require('express');
const axios = require('axios');

const app = express();
app.use(json());

app.post('/message', async (req, res) => {
  try {
    const { message } = req.body;

    const token = req.header('Authorization');
    const response = await manager.process('en', message);
    let data = null;

    if (response.intent === 'schedule.start') {
      const schedulesResponse = await axios.get('http://dev-capacitor.atech.software/v1/schedule', {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `jwt=${token}`,
        },
      });

      data = schedulesResponse.data.data;
    } else if (response.intent === 'schedule.day') {
      // Add some logic
    } else if (response.intent === 'schedule.time') {
      // Add some logic
    } else if (response.intent === 'schedule.project') {
      // Add some logic
    }

    return res.status(200).json({
      status: true,
      message: 'Success send message',
      data: {
        intent: response.intent,
        answers: response.answers.map((answer) => answer.answer),
        answer: response.answer,
        data: data ?? null,
      },
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      status: false,
      message: `Failed to send message ${e.message}`,
    });
  }
});

app.listen(8080, () => {
  console.log('Listening on :8080');
});