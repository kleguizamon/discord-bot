const Discord = require("discord.js");
const { embedColor } = require("../config/musicConfig");

class MusicEmdeb {
  getEmbed = (msg, songTitle) => {
    const description = songTitle;
    const musicEmdeb = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(description);

    msg.channel.send(musicEmdeb);
  }
}

module.exports = MusicEmdeb;