var Twitter = require('twitter');
let tweetLength = 280;

// TODO: Put this behind a user role
// TODO: Combine all posts to all social media platforms into one method?
// TODO: Eventually these keys will be pulled from user data in database
module.exports = async function (context, req) {
    let postContent = req.body.status;
    let statusCode = 200;
    let responseMessage = "";
        
    // TODO: Test this
    if (!postContent) {
        context.res = {
            status: 400,
            body: "Empty post."
        };
        return
    } 
        
    let twitterContent = postContent.substring(0, tweetLength);
    let twitterClient = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    // TODO: Return tweet id
    try {
        let response = await twitterClient.post('statuses/update', { status: twitterContent });
        responseMessage = response.entities.urls[0].url;
    }
    catch (twitterAPIErrors) {
        statusCode=400;
        for(const error of twitterAPIErrors) {
            responseMessage += error.message;
        }
    }
    
    context.res = {
        status: statusCode,
        body: responseMessage
    };
}