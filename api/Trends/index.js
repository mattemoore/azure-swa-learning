var TwitterClient = require('../twitterClient');

// TODO: Put this behind a user role

// TODO: Put reply url of staging envs in AAD config
module.exports = async function (context, req) {
    let statusCode = 200;
    let responseMessage = "";
    let twitterClient = TwitterClient.twitterClient();

    try {
        let response = await twitterClient.get('trends/place.json?id=1', {id: 1});
        responseMessage = response[0].trends;
    }
    catch (twitterAPIErrors) {
        console.log(twitterAPIErrors);
        statusCode=400;
        if (twitterAPIErrors.length > 0)
        {
            for(const err of twitterAPIErrors) {
                responseMessage += err.message;
            }
        }
        else {
            responseMessage = twitterAPIErrors
        }
    }

    context.res = {
        status: statusCode,
        body: responseMessage
    };
}