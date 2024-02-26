require('dotenv').config();
/*
* Utility file containing SQL queries for DM
*/

const TABLE_NAME = process.env.TABLE_NAME;
const DB_NAME = process.env.DB_NAME;

const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const USE_DATABASE = `USE ${DB_NAME}`;

const CREATE_DATA_TABLE = `CREATE TABLE IF NOT EXISTS ${DB_NAME}.${TABLE_NAME} (
    SubmissionDate Nullable(String),
    username Nullable(String),
    start Nullable(String),
    end Nullable(String),
    today Nullable(String),
    deviceid Nullable(String),
    subscriberid Nullable(String),
    A_A1_1 Nullable(String),
    A_A1_10 Nullable(String),
    A_A1_11 Nullable(String),
    D_D1_1 Nullable(String),
    D_D1_2 Nullable(String),
    D_D1_3 Nullable(String),
    D_D1_4 Nullable(String),
    D_D1_5 Nullable(String),
    D_D1_6 Nullable(String),
    D_D1_7 Nullable(String),
    D_D1_8 Nullable(String),
    D_D1_9 Nullable(String),
    D_D1_12 Nullable(String),
    D_D1_13 Nullable(String),
    D_D1_14 Nullable(String),
    D_D1_15 Nullable(String),
    D_D1_16 Nullable(String),
    meta_instanceID String NOT NULL,
    KEY Nullable(String),
    SubmitterID Nullable(String),
    SubmitterName Nullable(String),
    AttachmentsPresent Nullable(String),
    AttachmentsExpected Nullable(String),
    Status Nullable(String),
    ReviewState Nullable(String),
    DeviceID Nullable(String),
    Edits Nullable(String),
    FormVersion Nullable(String)
) ENGINE = MergeTree ORDER BY (meta_instanceID)
    PRIMARY KEY meta_instanceID;`

const SELECT_DATA = `SELECT * FROM ${DB_NAME}.${TABLE_NAME}`

const INSERT_DATA_IN_TABLE = `INSERT INTO ${DB_NAME}.${TABLE_NAME} ( SubmissionDate, username, start, end, today, deviceid, subscriberid, A_A1_1, A_A1_10, A_A1_11, D_D1_1, D_D1_2, D_D1_3, D_D1_4, D_D1_5, D_D1_6, D_D1_7, D_D1_8, D_D1_9, D_D1_12, D_D1_13, D_D1_14, D_D1_15, D_D1_16, meta_instanceID, KEY, SubmitterID, SubmitterName, AttachmentsPresent, AttachmentsExpected, Status, ReviewState, DeviceID, Edits, FormVersion )`

module.exports = Object.freeze({
    CREATE_DATABASE,
    USE_DATABASE,
    CREATE_DATA_TABLE,
    SELECT_DATA,
    INSERT_DATA_IN_TABLE
});