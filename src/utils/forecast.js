//'esversion: 6'
const request = require("request");

// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const forecast = (latitude, longitude, callback) => {
    var url = 'https://api.darksky.net/forecast/dce8f49d5efdc0a0d5750ed720e4a9ff/' + latitude + ',' + longitude + "?units=si";
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("There was an error with connecting with the weather service!", undefined);
        } else if (body.code == 400) {
            callback(body.error, undefined);
        } else {
            callback(undefined, {
                summary: body.daily.summary
            });
        }
    });
};

module.exports = forecast;