const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "uptime",
    aliases: ["up"],
    description: "Displays Bot Uptime",
    category: "Utility",
    async execute(bot, message, args, settings) {

        const embed = new MessageEmbed()
            .setAuthor(bot.user.tag, bot.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`**${bot.user.username}'s Uptime**`)
            .setColor(settings.color)
            .addField(`Last Startup›`, moment(bot.StartedAt).fromNow())
            .addField(`Online For›`, Math.round(bot.ActiveFor))

        message.reply({ embed: embed }).then(s => s.delete({ timeout: 60 * 1000 }));

    }
}