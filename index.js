const dotenv = require("dotenv");
dotenv.config();
const TOKEN = process.env.TOKEN;
const Discord = require("./config/client")
const client = new Discord();
const Module = require("./config/module");
const MusicInstances = new Module.MusicController(new Module.MusicServices());
const WeatherInstances = new Module.WeatherController(new Module.WeatherServices());


client.on("message", (msg) => {
  WeatherInstances.getWeather(msg);
});

client.on("message", (msg) => {
  MusicInstances.getMusic(msg);
});

client.login(TOKEN);