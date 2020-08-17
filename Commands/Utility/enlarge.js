const Discord = module.require("discord.js");
const config = require("../../DataStore/Config/config.json");

module.exports = {
    name: "enlarge",
    category: "Utility",
    description: "Enlarge an emoji.",
    usage: "<emoji>",
    aliases: ["e"],
    run: async (bot, message, args, guildConf) => {
        if (!args[0]) return message.reply("Please provide a valid Emoji to enlarge.").then(s => s.delete({ timeout: 10 * 1000 }));
        let type;
        const CutFront = args[0].replace("<", "");
        const CutBack = CutFront.replace(">", "");
        const Slice = CutBack.split(":");
        if (Slice.includes("a")) {
            type = ".gif";
        } else {
            type = ".png";
        }
        console.log(Slice[2]);
        const Emoji = `https://cdn.discordapp.com/emojis/${Slice[2]}${type}?v=1`;
        if (Emoji) {
            try {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.success_color)
                    .setImage(Emoji)
                    .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }));
                message.channel.send({ embed: embed });
            } catch (e) {
                console.log(e);
            }
        } else {
            return message.reply("Please provide a valid Emoji to enlarge.").then(s => s.delete({ timeout: 10 * 1000 }));
        }

    }
};