var TwitterClient = require('../twitterClient');

//TODO: media files should not go from client to our API and then to twitter
//      it would be better if they went from client directly to twitter...
//      1. client sends to twitter then client sends media_ids to Tweet API call
//      Should we consider all call to social media apis to be done via the client?s
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