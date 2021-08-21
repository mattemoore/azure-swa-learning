const { Client } = require('pg');

module.exports = async function (context, req) {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT NOW()')
    await client.end()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: res.rows
    };
}