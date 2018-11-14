const dialogflow = require('dialogflow');
const request = require('request');
const { DF_PROJECT_ID } = require('../secrets')

const LANGUAGE_CODE = 'en-US';

const respondWithDF = (query, sessionId, fbCallback) => {
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(DF_PROJECT_ID, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: LANGUAGE_CODE,
            },
        },
    };

    sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
            } else {
                console.log(`  No intent matched.`);
            }
            fbCallback(sessionId, result.fulfillmentText) 
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

module.exports = respondWithDF