const processMessage = require('../helpers/processMessage');

module.exports = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            if (webhookEvent.message && webhookEvent.message.text) {
                processMessage(webhookEvent);
            }
        });
        res.status(200).end();
    }
};