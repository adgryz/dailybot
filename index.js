const express = require('express');
const bodyParser = require('body-parser');

const { db, closeDb } = require('./db/dbClient');

const verificationController = require('./controllers/verification');
const messageController = require('./controllers/messageWebhook');
const dailyRoutine = require('./helpers/dailyRoutine')

db.run('CREATE TABLE IF NOT EXISTS users(senderId text)');
let sql = `SELECT DISTINCT senderId senderId FROM users`;
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let server = app.listen(3000, () => console.log('Webhook listening at 3000'));

app.get('/', verificationController);
app.post('/', messageController);

dailyRoutine();

process.on('SIGINT', () => {
    closeDb();
    server.close();
});


