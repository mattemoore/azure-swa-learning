var TwitterClient = require('../twitterClient');
let tweetLength = 280;

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
    let twitterClient = TwitterClient.twitterClient();
    
    try {
        let response = await twitterClient.post('statuses/update', { status: twitterContent });
        console.log(response);
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