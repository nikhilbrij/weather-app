const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/0c4f6f868172b0a25fc27012260f4799/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees out.This high today is ${
          body.daily.data[0].temperatureHigh
        } with low of ${body.daily.data[0].temperatureLow}. There is a ${
          body.currently.precipIntensity
        }% chance of rain`
      );
    }
  });
};

module.exports = forecast;
