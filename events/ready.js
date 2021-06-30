const Discord = require("discord.js");
const config = require('../config.json');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `そ Deuslra Developed by VOXİ`}, status: 'online' })
  console.log(`───────────────────────────────────────────── \n ${client.user.username} Bot Başarı İle Başlatıldı! \n ────────────────────────────────────────────── `)
};
