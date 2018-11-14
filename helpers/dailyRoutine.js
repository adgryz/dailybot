const { db } = require('../db/dbClient')
const fbSendTextMessage = require('./fbSendTextMessage')

const monday = [`
Lew zakazał srania w swoim lesie.
Idzie sobie niedźwiedź i czuje, że ma potrzebę i że popuszcza. 
Nie wie, co zrobić ze swoim problemem, więc zakrywa go łapami. 
Idzie lew i pyta się niedźwiedzia: 
- Co chowasz za łapami?
- Yyy... nic... 
- Kłamiesz! Pokaż, co masz! 
- No, motylka mam.
- Więc mi go pokaż. 
- Nie, bo odleci..
Lew się niecierpliwi. 
- Pokazuj do jasnej cholery! 
Niedźwiedź odkrywa łapy i mówi: 

- Ooo... nie ma, odleciał. Ale jak się zesrał!
`
]

const tuesday = [
`
Kto chce - szuka sposobów.
Kto nie chce - szuka powodów.
`
]

const wednesday = [
`
Pot hipopotamów jest oleisty i działa jak nawilżający krem do opalania.
`
]

const thursday = []
const friday = []
const saturday = []
const sunday = []

let day = 0
let kindOrder = 0

const content = [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
const contentType = ['Dowcipny Poniedziałek', 'Motywacyjny Wtorek', 'Przyrodnicza Środa', 'Suchy Czwartek', 'Piątek', 'Sobota', 'Niedziela']

const dailyRoutine = () => {
    const query = `SELECT DISTINCT senderId senderId FROM users`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err)
        }
        rows.forEach((row) => {
            dailyContentDelivery(row.senderId)
        })
        incrementDays();
    });
}

function dailyContentDelivery(snederId) {
    const header = contentType[day]
    const todayContent = content[day][kindOrder]
    const finalContent = `# ${header} #
                            ${todayContent}`
    fbSendTextMessage(snederId, finalContent)
}


function incrementDays() {
    if (day === 6) {
        kindOrder = (kindOrder + 1) % 10
    }
    day = (day + 1) % 7;
    if (day < 3) {
        setTimeout(dailyRoutine, 10 * 1000);
    }
}

module.exports = dailyRoutine