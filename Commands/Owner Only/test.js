const { msgEmbed } = require("discord.js");

module.exports = {
    name: "test",
    aliases: [],
    description: "test cmd",
    category: "Owner Only",
    usage: "",
    ownerOnly: true,
    hidden: true,
    nsfw: false,
    userPerms: [],
    botPerms: [],
    async execute(bot, message, args, settings) {

        let channel = message.content.split("twitch.tv/")

        if (!channel[1]) {
            channel = args[0]
        }
        console.log(channel);
    }
}