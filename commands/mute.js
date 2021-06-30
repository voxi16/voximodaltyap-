const Discord = require("discord.js")
const ayarlar = require("../config.json")
const moment = require('moment')
require("moment-duration-format")
 moment.locale("tr")

const ms = require('ms')
const db = require('quick.db')

    module.exports.run = async (client, message, args) => {
        
    if (!message.member.roles.cache.has(ayarlar.mute) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)
        
    const muteRole = message.guild.roles.cache.get('813798244907221003')

 let voxitimee = moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
      return message.channel.send(`<a:onaysz:787289292137431040> ${message.author}, Bir kullanıcı etiketlemelisin.`)
    if (member === message.member)
      return message.channel.send('Kendini susturamazsın.');
    if (member === message.guild.me) return message.channel.send(message, 0, 'Beni susturamazsın akıllı !');
    if (!args[1])
      return message.channel.send('Lütfen 14 gün veya daha kısa bir süre girin (1s/m/h/d)');
    let time = ms(args[1]);
    if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
      return message.channel.send('Lütfen 14 gün veya daha kısa bir süre girin (1s/m/h/d)');

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`Sebeb Belirtilmemiş`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

  

    if (member.roles.cache.has(muteRole))
      return message.channel.send('Kullanıcı zaten susturulduğu için tekrar susturamam.');

    // Mute member
    try {
      await member.roles.add(muteRole);
    } catch (err) {
      console.log(err)
      return message.channel.send(`Hata oluştu ! <@&812383821378617354>`, err.message);
    }

    message.channel.send(`**${member}** Adlı Kullanıcı Metin Kanallarından Uzaklaştırıldı.`).then(msg => msg.delete(9000))

    message.react('<a:tiksar:788288799296847872>')

    const mutelendi = new Discord.MessageEmbed()
    .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
    .setColor(message.guild.me.displayHexColor)
    .setDescription(`
\`•\` Mutelenen Üye: ${member}  (\`${member.id}\`)
\`•\` Muteleyen Yetkili: ${message.author} (\`${message.author.id}\`)
\`•\` Mute Sebebi: \ [\`${reason}\`]
                                                                         `)
     .setTimestamp()
    .setFooter("Voxi ❤️ Deuslra")
    client.channels.cache.get("841691424068337694").send(mutelendi)  

    // Unmute member
    member.timeout = message.client.setTimeout(async () => {
      try {
        await member.roles.remove(muteRole);
        const unmuteEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
          .setDescription(`
\`•\` Mutesi Biten Üye: ${member}  (\`${member.id}\`)
\`•\` Muteleyen Yetkili: ${message.author}  (\`${message.author.id}\`)
\`•\` Mute Sebebi: \ [\`${reason}\`] 
                                                                        `)
          .setTimestamp()
          .setFooter("Voxi ❤️ Deuslra")
          .setColor(message.guild.me.displayHexColor);
          client.channels.cache.get("841691424068337694").send(unmuteEmbed);
      } catch (err) {
        console.log(err)
        return message.channel.send(`Hata oluştu ! <@&812383821378617354>`, err.message);
      }
    }, time);
  }



exports.config = {
  name: "mute",  
  guildOnly: true, 
  aliases: ["tempmute","chatmute"],  
};
