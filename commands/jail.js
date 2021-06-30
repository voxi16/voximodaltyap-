const Discord = require("discord.js")
const ayar = require('../config.json')
const db = require("quick.db")
const dbs = require('../ss/Voxi.js')
const moment = require('moment')
const ms = require('ms')

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.get(ayar.jail) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)
let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send(`<a:onaysz:787289292137431040> ${message.author}, Bir kullanıcı etiketlemelisin.`)

if(uye.roles.cache.has(ayar.cezalırol)) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Üyeyi Bir Daha Cezalıya Atamazsın!"))

    if(message.author.id === uye.user.id) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Kendini Jail'e atamazsın.")).then(msg => msg.delete(9000))

let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi";
if(!reason) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Sebep Girmelsin!"))

message.channel.send(`Jaile atıldı !`)



  message.guild.members.cache.get(uye.id).roles.cache.forEach(r => {
message.guild.members.cache.get(uye.id).roles.remove(r) 

uye.roles.add(ayar.cezalırol);
  })
  
const jaillog = new Discord.WebhookClient(ayar.jaillog)

 message.react('<a:tiksar:788288799296847872>')


let jailid = db.fetch('id')
let embed1 = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
.setDescription(`
\`•\` Ceza ID: (\`#${jailid-(-1)}\`)
\`•\` Cezalanan Üye: ${uye} (\`${uye.id}\`)
\`•\` Cezalayan Yetkili: ${message.author} (\`${message.author.id}\`)
\`•\` Ceza Sebebi: [\`${reason}\`] 
                                                                     `)

client.channels.cache.get("841692575471108156").send(embed1)
    
  db.push(`kullanici.${uye.id}.cezabilgi`, {
  Ceza: "Cezalı",
  Sebep: reason,
  Yetkili: message.author.id
});
uye.roles.add(ayar.cezalırol);

dbs.yaz('Voxi', `(Jail) ${message.author} Adlı (\`${message.author.id}\`) IDli  Kullanıcı ${reason} sebebiyle jail yemiş.`)


};

exports.config = {
  name: "jail",  
  guildOnly: true,
  aliases: ["cezalı"],  
};
