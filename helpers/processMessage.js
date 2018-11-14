const { db } = require('../db/dbClient')
const fbSendTextMessage = require('./fbSendTextMessage')
const getResponseFromDF = require('./NLU')

function checkIfUserAlreadyInDb(senderId, message) {
    const query = `SELECT senderId senderId
                FROM users
                WHERE senderId = ?`;
    db.get(query, [senderId], (err, row) => {
        if (err) {
            console.error("Error : ", err.message);
        }
        if (row) {
            console.log(`${row.senderId} already in DB`);
            getResponseFromDF(message, senderId, fbSendTextMessage)
        } else {
            console.log(`${senderId} not yet in DB`);
            getResponseFromDF(message, senderId)
            fbSendTextMessage(senderId, `Hi, I'm  DailyRoutineBot.
My purpose is to deliver valuable content to you - daily.
This is what you can do : 
- list content i send
- contact with my maker
- subscribe my services
- unsubscribe my services
Just ask me in english ;)`);
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

function processMessage(event) {
    const senderId = event.sender.id;
    const message = event.message.text;
    console.log(senderId, message)
    checkIfUserAlreadyInDb(senderId, message)
};

module.exports = processMessage
