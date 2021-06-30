const { MessageEmbed } = require("discord.js");
const ayar = require("../config.json")

module.exports.run = async (client, message, args) => {
  
  if (!message.member.roles.cache.has(ayar.mute) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author},**Bu Komutu Kullanmaya Yetkin Yok!**`)

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send(`<a:onaysz:787289292137431040> ${message.author}, Bir kullanıcı etiketlemelisin.`)
 
  let embed = new MessageEmbed()
 .setColor(client.randomrenk())
 .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
 .setDescription(`${uye} üyesinin, ${message.author} tarafından Mutesi Açıldı!`)
 .setFooter(`Deuslra ❤️ Voxi`)
 message.channel.send(embed)
 
uye.roles.remove(ayar.muterol);
  
  
};

exports.config = {
  name: "unmute",
  guildOnly: true, 
  aliases: ["umute"], 
};
