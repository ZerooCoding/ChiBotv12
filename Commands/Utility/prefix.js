const Discord = module.require("discord.js");
const config = require("../../DataStore/Config/config.json");

module.exports = {
    name: "prefix",
    category: "Utility",
    description: "Get this guilds prefix.",
    usage: "",
    cooldown: '2',
    aliases: [],
    run: async (bot, message, args, guildConf) => {

        message.reply(`\nThe prefix for ${message.guild.name} is \`${guildConf.prefix}\` or <@${bot.user.id}>.`);

    }
};