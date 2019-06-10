const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibmlraGlsYnJpaiIsImEiOiJjandrYXE0eTcwcmJpM3lxazBodXZ2YzE2In0.T8d2KJ7cvbFio0svH6e1VA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try again with different location.");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
