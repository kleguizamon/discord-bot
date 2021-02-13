const { prefix, commandPlay, commandStop, commandSkip } = require("../config/musicConfig");

class MusicController {
  constructor(musicService) {
    this.musicService = musicService;
  }

  getMusic = (msg) => {
    const { content } = msg;
    const song = content.substring(6);
    const play = content.startsWith(`${prefix}${commandPlay}`);
    const stop = content.startsWith(`${prefix}${commandStop}`);
    const skip = content.startsWith(`${prefix}${commandSkip}`);

    if (play) {
      this.musicService.playMusic(msg, song);
    } else if (stop) {
      this.musicService.stopMusic(msg);
    } else if (skip) {
      this.musicService.skipMusic(msg);
    }
  }
}

module.exports = MusicController;
