const { MessageEmbed, escapeMarkdown } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "shitPostToggle",
    aliases: ["spt"],
    description: "Toggle the Shitposts",
    category: "Owner Only",
    ownerOnly: true,
    hidden: true,
    async execute(bot, message, args, settings) {

        if (bot.ShitPost === false) {
            bot.ShitPost = true
            return message.reply(`\nToggled ShitPost events \`ON\` for this session.`).then(s => s.delete({ timeout: 30 * 1000 }));
        }

        if (bot.ShitPost === true) {
            bot.ShitPost = false
            return message.reply(`\nToggled ShitPost events \`OFF\`for this session.`).then(s => s.delete({ timeout: 30 * 1000 }));
        }

    }
}