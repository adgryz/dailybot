const dialogflow = require('dialogflow');

const { db } = require('../db/dbClient')
const fbSendTextMessage = require('./fbSendTextMessage')
const LANGUAGE_CODE = 'en-US';
const dfQuery = 'hello';

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
            fbSendTextMessage(senderId, `If you want to  : 
- change your content,
- contact with my papa
- unsubscribe my services 

Just ask me ;)`);
        } else {
            console.log(`${senderId} not yet in DB`);
            fbSendTextMessage(senderId, `Hi, I'm  DailyRoutineBot.
My purpose is to deliver valuable content to you - daily.
If you want to subscribe to my services or want me to say more about content I send - just ask me ;)`);
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
    checkIfUserAlreadyInDb(senderId)
};

module.exports = processMessage

// 1 query all users
// 2 foreach user in users
//       setTimeout(24*60*60*1000, fbSendTextMessage(user.senderId,))
// 