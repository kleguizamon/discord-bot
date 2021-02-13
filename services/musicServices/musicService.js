const Play = require("./play");
const PlayInstance = new Play();
const Stop = require("./stop");
const StopInstance = new Stop();
const Skip = require("./skip");
const SkipInstance = new Skip();

class MusicServices {
  async playMusic(msg, song) {
    try {
      PlayInstance.play(msg, song);
    } catch (e) {
      console.log(e);
    }
  }
  async stopMusic(msg) {
    try {
      StopInstance.stop(msg);
    } catch (e) {
      console.log(e);
    }
  }
  async skipMusic(msg) {
    try {
      SkipInstance.skip(msg);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = MusicServices;
