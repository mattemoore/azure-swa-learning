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
        connConfig.ssl = {
            rejectUnauthorized : false,
            ca   : fs.readFileSync(process.env.PGSSLKEY).toString(),
            key  : fs.readFileSync(process.env.PGSSLKEY).toString(),
            cert : fs.readFileSync(process.env.PGSSLKEY).toString(),
        }
    }
    const client = new Client(connConfig);
    await client.connect();
    const res = await client.query('SELECT NOW()')
    await client.end()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res.rows
    };
}