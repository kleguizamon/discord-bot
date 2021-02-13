const { prefix, weatherReply, weather } = require("../config/weatherConfig");

class WeatherController {
  constructor(weatherServices) {
    this.weatherServices = weatherServices;
  }
  getWeather = (msg) => {
    const content = msg.content;
    if (content.startsWith(`${prefix}${weather}`)) {
      const city = content.substring(7);
      if (city) {
        this.weatherServices.getWeather(city, msg);
      } else {
        msg.reply(`${weatherReply} ${prefix}${weather} + city`);
      }
    }
  };
}

module.exports = WeatherController;
