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

    // TODO: Change from bool in string to 0 and 1
    if (process.env.PGSSL == 'true') {
        connConfig.ssl = {
            rejectUnauthorized : false,
            ca   : fs.readFileSync("DigiCertGlobalRootCA.crt.pem").toString(),
            key  : fs.readFileSync("DigiCertGlobalRootCA.crt.pem").toString(),
            cert : fs.readFileSync("DigiCertGlobalRootCA.crt.pem").toString(),
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