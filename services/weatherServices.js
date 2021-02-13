const axios = require("axios");
const API_KEY = process.env.API_KEY;
const { urlApi, country, replyError, query } = require("../config/weatherConfig");
const WeatherEmbed = require("../embeds/weatherEmbed");
const EmbedInstance = new WeatherEmbed();

class WeatherServices {
  async getWeather(city, msg) {
    try {
      const apiWeather = await axios.get(`${urlApi}${API_KEY}${query}${city}${country}`);
      const { temperature, weather_icons } = apiWeather.data.current;
      EmbedInstance.getEmbed(msg, temperature, weather_icons, city);
    } catch (error) {
      msg.reply(`${replyError}`);
    }
  }
}

module.exports = WeatherServices;
