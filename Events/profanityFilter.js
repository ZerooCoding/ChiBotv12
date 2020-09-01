const { bot } = require("../CleanChiBot");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");

const profanity = [
    /n[i1]gg?[e3]r[s\$]?/i,
    /(ph|f)[a@]g[s\$]?(?![A-Z])/i,
    /(ph|f)[a@]gg[s\$]?(?![A-Z])/i,
    /(ph|f)[a@]gg?[o0][t\+][s\$]?(?![A-Z])/i,
    /w[i1]gg[e3]r[s]?/i,
    /w[e3]tb[a@]ck[s]?/i,
    /dyke[s]?/i,
    /chink[s]?(?![A-Z])/i,
    /retard[s]?(?![A-Z])/i,
    /retard[e]d?(?![A-Z])/i,
];

bot.on('message', async message => {
    if (!message.guild || message.author.bot) return;

    const settings = await bot.getGuild(message.guild);

    let badWord;
    let send = false;

    const auditLogChannel = message.guild.channels.cache.get(settings.auditLogChannel)
    if (!settings.profanityFilter) return;

    if (message.member.roles.cache.has(settings.ownerRole)) return;
    if (message.member.roles.cache.has(settings.adminRole)) return;
    if (message.member.roles.cache.has(settings.modRole)) return;

    const sentence = message.content.split(/ +/g);

    for (let i = 0; i < profanity.length; i++) {
        if (RegExp(profanity[i]).test(sentence) == true) {
            badWord = sentence;
            send = true;
        }
    }

    if (send == true) {

        const ProfaneEmbed = new MessageEmbed()
            .setTitle("__**Profanity Filter**__")
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setColor(bot.Color)
            .setDescription(`
            **${message.member.displayName} Said ›** ${badWord.join(" ")}
            **In Channel ›** ${message.channel.name}
            ** At Time ›** ${moment(Date.now()).format("MMMM Do YYYY, h:mm a")}
            `)

        message.delete();

        if (!settings.shouldLog) return;

        auditLogChannel.send({ embed: ProfaneEmbed });
    }
})