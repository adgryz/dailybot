const { FB_ACCESS_TOKEN } = require('../secrets')
const request = require('request');

module.exports = (senderId, text) => {
    request.post({
        url: `https://graph.facebook.com/v2.6/me/messages`,
        qs: { access_token: FB_ACCESS_TOKEN },
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: text
            }
        }
    },
        function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
        }
    )
};