const dialogflow = require('dialogflow');
const request = require('request');

const dfQuery = 'hello';

// const dialogFlowSessionClient = new dialogflow.SessionsClient();
// const dfSessionPath = dialogFlowSessionClient.sessionPath(PROJECT_ID, SESSION_ID);
// const dfRequest = {
//     session: dfSessionPath,
//     queryInput: {
//         text: {
//             text: dfQuery,
//             languageCode: LANGUAGE_CODE,
//         },
//     },
// };
// dialogFlowSessionClient
//     .detectIntent(dfRequest)
//     .then(responses => {
//         console.log('Detected intent');
//         const result = responses[0].queryResult;
//         console.log(`  Query: ${result.queryText}`);
//         console.log(`  Response: ${result.fulfillmentText}`);
//         if (result.intent) {
//             console.log(`  Intent: ${result.intent.displayName}`);
//         } else {
//             console.log(`  No intent matched.`);
//         }
//     })
//     .catch(err => {
//         console.error('ERROR:', err);
//     });

const fbSendTextMessage = (senderId, text) => {

    request.post({
        url: `https://graph.facebook.com/v2.6/me/messages`,
        qs: { access_token: FB_ACCESS_TOKEN },
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: "O kurła, ale jestem czadbod odpowiadający!"
            }
        }
    },
        function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        }
    )
    // request({
    //     url: `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_CLIENT_TOKEN}`,
    //     // qs: { access_token: FB_CLIENT_TOKEN },
    //     method: 'POST',
    //     json: {
    //         recipient: {
    //             id: senderId
    //         },
    //         message: {
    //             text: "hello, world!"
    //         }
    //     }
    // });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    console.log(senderId, message)
    fbSendTextMessage(senderId, 'O kurwa ale ze mnie mondry chatbot 8)')
    // const apiaiSession = apiAiClient.textRequest(message, { sessionId: ‘crowdbotics_bot’ });
    // apiaiSession.on(‘response’, (response) => {
    //     const result = response.result.fulfillment.speech;
    //     fbSendTextMessage(senderId, result);
    // });
    // apiaiSession.on(‘error’, error => console.log(error));
    // apiaiSession.end();
};