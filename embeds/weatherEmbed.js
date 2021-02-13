const Discord = require("discord.js");
const { embedDescription, embedColor } = require("../config/weatherConfig");

class WeatherEmbed {
  getEmbed = (msg, temp, icon, city) => {
    const weatherEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(`${city}`.toUpperCase())
      .setDescription(`${embedDescription} ${temp} °C`)
      .setThumbnail(`${icon}`);

    msg.reply(weatherEmbed);
  };
}

module.exports = WeatherEmbed;
