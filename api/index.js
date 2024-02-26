require('dotenv').config();
const axios = require('axios');

const encoded = Buffer.from(process.env.USERNAME + ':' + process.env.PASSWORD).toString('base64');

const getFormSubmissions = async () => {
    try {
        const res = await axios.get(`${process.env.CENTRAL_URL}/v1/projects/${process.env.PROJECT_ID}/forms/${process.env.FORM_ID}/submissions.csv`, {
            headers: {
                'Authorization': 'Basic ' + encoded
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const sendToDiscord = async (content) => {
    try {
        await axios.post(`${process.env.DISCORD_WEBHOOK_URL}`, { content });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getFormSubmissions,
    sendToDiscord
}