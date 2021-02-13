
class StopMusic {
  async stop(msg) {
    const { react } = msg;
    const { queue } = msg.client;
    const guild = msg.guild.id;    
    const serverQueue = queue.get(guild);
    
    if(serverQueue) {
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      msg.channel.send("Bye, Bye!");
      msg.react("👋");
    } else  {
        msg.channel.send("First you have to play a song!");
    } 
  }
}

module.exports = StopMusic;
