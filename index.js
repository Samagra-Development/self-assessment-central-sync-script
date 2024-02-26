const { getFormSubmissions, sendToDiscord } = require("./api");
const { clickhouse } = require("./clickhouse/index")
const SQL_QUERIES = require('./queries/SQL/index');
const cron = require('node-cron');


const columns = 'SubmissionDate,username,start,end,today,deviceid,subscriberid,A-A1.1,A-A1.10,A-A1.11,D-D1.1,D-D1.2,D-D1.3,D-D1.4,D-D1.5,D-D1.6,D-D1.7,D-D1.8,D-D1.9,D-R1-D1.10,D-R1-D1.11,D-D1.12,D-D1.13,D-D1.14,D-D1.15,D-D1.16,meta-instanceID,KEY,SubmitterID,SubmitterName,AttachmentsPresent,AttachmentsExpected,Status,ReviewState,DeviceID,Edits,FormVersion'.split(',');

const insertDataToClickhouse = async () => {
    try {
        let discordText = '\nTEST CRON Initiating sync to Clickhouse ☁️';

        // Create Database if it doesn't exist
        await clickhouse.query(SQL_QUERIES.CREATE_DATABASE).toPromise();

        // Use self_assessment_databsase
        await clickhouse.query(SQL_QUERIES.USE_DATABASE).toPromise();

        // Create Table if it doesn't exist
        await clickhouse.query(SQL_QUERIES.CREATE_DATA_TABLE).toPromise();

        // Finding submissions for this time period
        const currrentHour = 16 || new Date().getHours();
        const lastHours = currrentHour - 1;
        console.log(`Fetching all submissions between ${lastHours}:00 and ${currrentHour}:00`)
        discordText += `\n Date : ${new Date().toDateString()}`
        discordText += `\n Submissions between ${lastHours}:00 and ${currrentHour}:00 will be synced`

        // Fetching all submissions
        let submissions = await getFormSubmissions();
        submissions = submissions.split('\n').slice(1)


        const submissionsToUpload = submissions.filter(el => {
            let todayDate = new Date().toDateString();
            const s = el.split(',');
            const createdAt = s[0];
            let createdAtDate = new Date(createdAt).toDateString();
            let hour = new Date(createdAt).getHours();
            let minutes = new Date(createdAt).getMinutes();
            let seconds = new Date(createdAt).getSeconds();
            return todayDate == createdAtDate ? hour == lastHours && minutes >= 0 && seconds >= 0 : false;
        })

        console.log("Total submissions to upload: ", submissionsToUpload.length)
        console.log("Uploading Submissions to clickhouse ...")


        // Create insertion Data
        rows = submissionsToUpload.map(el => {
            let data = el.split(',');
            let x = {}
            data.forEach((t, i) => {
                x[columns[i]] = t
            })
            return x;
        })

        console.log(rows);

        discordText += `\n Total submissions uploaded to Clickhouse: ${submissionsToUpload.length}`
        // Uploading filtered submissions to 👆🏻🏠
        await clickhouse.query(SQL_QUERIES.INSERT_DATA_IN_TABLE, rows).toPromise();
        console.log("Done")

        await sendToDiscord(discordText);

    } catch (err) {
        console.log({ err })
    }
}

// Scheduling job for every hour
cron.schedule('0 * * * *', () => {
    insertDataToClickhouse();
});
