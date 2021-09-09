var Twitter = require('twitter');

// TODO: Put this behind a user role
// TODO: Eventually these keys will be pulled from user data in database
// TODO: Put reply url of staging envs in AAD config
module.exports = async function (context, req) {
    let statusCode = 200;
    let responseMessage = "";
        
    let twitterClient = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

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