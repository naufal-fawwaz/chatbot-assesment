/* eslint-disable no-console */
/**
 * Dialogflow Configurations
 */
const dialogFlow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const runSample = async (projectId = 'appointmentscheduler-obap') => {
  const sessionId = uuid.v4();

  const sessionClient = new dialogFlow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId,
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: 'I want to make appointment for 3pm next week',
        languageCode: 'en-US',
      },
    },
  };

  const response = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = response[0].queryResult;
  console.log(`Query ${result.queryText}`);
  console.log(`Response ${result.fulfillmentText}`);

  if (result.intent) {
    console.log(`Intent matches ${result.intent.displayName}`);
  } else {
    console.log('No intent matched');
  }
};

runSample();
