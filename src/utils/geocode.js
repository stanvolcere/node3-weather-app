const request = require("request");

// this way of setting up the function allows for reusablity because it heavily decoupled from the 
// functionlity that requires it
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + process.env.MAPBOX_KEY;
  
    // usage of property shorthand and object destructuring here
    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback("Unable to connect to location services!", undefined);
      } else if (body.features.length == 0) {
        callback("Sorry we had trouble finding your location", undefined);
      } else {        
        const {center, place_name} = body.features[0];
        //this is the hit for when there is no failure
        callback(undefined, {
          latitude : center[1],
          longitude : center[0],
          location: place_name
        })
      }
    })
  }

module.exports = geocode;