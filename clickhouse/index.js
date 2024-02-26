require('dotenv').config();
const { ClickHouse } = require('clickhouse');

const clickhouse = new ClickHouse({
    url: process.env.CLICKHOUSE_SERVER_URL,
    port: process.env.CLICKHOUSE_SERVER_PORT,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    trimQuery: false,
    usePost: false,
    format: "json",
    raw: false,
});

module.exports = { clickhouse };