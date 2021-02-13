const { prefix, commandPlay, InvalidCommand } = require("../../config/musicConfig");
const ytdl = require("ytdl-core");
const MusicEmbed = require("../../embeds/musicEmbed");
const EmbedInstance = new MusicEmbed();

class PlayMusic {
  async play(msg, song) {
    try {
      const songList = song.split(" ");
      const guild = msg.guild.id;
      const queue = msg.client.queue;
      const serverQueue = queue.get(guild);
      const voiceChannel = msg.member.voice.channel;

      if(!voiceChannel) {
        const messageSend = 
          "You have to be connected to a voice channel before you can use this command!";
        return EmbedInstance.getEmbed(msg,messageSend);
      }      
      const songInfo = await ytdl.getInfo(songList[0]);      
      const songObj = 
      {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };

      if (!serverQueue) {
        const queueContruct = 
          {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 6,
            playing: true
          };

        queue.set(guild, queueContruct)
        queueContruct.songs.push(songObj)

        try {
          const connection = await voiceChannel.join();
          queueContruct.connection = connection;
          
          this.playSong(msg, queueContruct.songs[0]);
          const songTitle = (`Start playing: ${songObj.title}`)
          EmbedInstance.getEmbed(msg,songTitle);
          msg.react("😎");
        } catch (error) {
          queue.delete(guild);
        }
      } else {
        serverQueue.songs.push(songObj);
        const songTitle = (`${songObj.title} was added to playing queue!`)
        EmbedInstance.getEmbed(msg,songTitle);
      }
    } catch (error) {
        msg.channel.send(`${InvalidCommand} ${prefix}${commandPlay} + url`)
    }
  }

  playSong(msg, song) {
    const guild = msg.guild.id;
    const queue = msg.client.queue;
    const serverQueue = queue.get(guild);

    if(!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.playSong(msg, serverQueue.songs[0]);
      })
      .on("error", (error) => console.log(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  }
}

module.exports = PlayMusic;