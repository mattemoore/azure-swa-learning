var Twitter = require('twitter');
let tweetLength = 280;

// TODO: Put this behind a user role
// TODO: Combine all posts to all social media platforms into one method?
// TODO: Eventually these keys will be pulled from user data in database
// TODO: Put reply url of staging envs in AAD config
module.exports = async function (context, req) {
    if (!req.body) {
        context.res = {
            status: 400,
            body: "Malformed request: Body is empty or invalid format."
        };
        return
    }

    let postContent = req.body.status;
    if (!postContent) {
        context.res = {
            status: 400,
            body: "Status parameter cannot be empty."
        };
        return
    } 

    let statusCode = 200;
    let responseMessage = "";
        
    let twitterContent = postContent.substring(0, tweetLength);
    let twitterClient = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    try {
        let response = await twitterClient.post('statuses/update', { status: twitterContent });
        responseMessage = "https://twitter.com/redirect/status/" + response.id_str;
    }
    catch (twitterAPIErrors) {
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