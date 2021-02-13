
class SkipMusic {
  async skip(msg) {
    const guild = msg.guild.id;
    const queue = msg.client.queue;
    const serverQueue = queue.get(guild);

    if (!serverQueue) return msg.channel.send("First you have to play a song!");
    serverQueue.connection.dispatcher.end();
    msg.react("↪️");
  }
}

module.exports = SkipMusic;
