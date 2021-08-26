const { Client } = require('pg');
const fs = require('fs');

module.exports = async function (context, req) {
    const connConfig = {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    };
    if (process.env.PGSSL === '1') {
        connConfig.ssl = true;
    }
    const client = new Client(connConfig);
    await client.connect();
    const res = await client.query(`SELECT *
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND 
            schemaname != 'information_schema';`)
    await client.end()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res.rows
    };
}