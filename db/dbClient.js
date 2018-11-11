const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./dailybot.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the DailyRoutineBot database');
});

function closeDb() {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

module.exports = {
    db,
    closeDb
}
