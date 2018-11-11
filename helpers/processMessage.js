const dialogflow = require('dialogflow');
const request = require('request');

const { db } = require('../db/dbClient')
const { FB_ACCESS_TOKEN, FB_APP_ID } = require('../secrets')

const LANGUAGE_CODE = 'en-US';
const dfQuery = 'hello';

const fbSendTextMessage = (senderId, text) => {
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

function checkIfUserAlreadyInDb(senderId) {
    const query = `SELECT senderId senderId
                FROM users
                WHERE senderId = ?`;
    db.get(query, [senderId], (err, row) => {
        if (err) {
            console.error("Error : ", err.message);
        }
        if (row) {
            console.log(`${row.senderId} already in DB`);
        } else {
            console.log(`${senderId} not yet in DB`);
            insertUserToDb(senderId);
        }
    })
}

function insertUserToDb(senderId) {
    db.run('INSERT INTO users(senderId) VALUES(?)', [senderId], function (err) {
        console.error(err)
    })
    console.log(`A row has been inserted with rowId ${this.lastID} and snederId ${senderId}`);
}

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    console.log(senderId, message)
    checkIfUserAlreadyInDb(senderId)
    fbSendTextMessage(senderId, 'O kurwa ale ze mnie mondry chatbot 8)')
};