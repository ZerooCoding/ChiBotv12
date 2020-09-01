const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "chanlist",
    aliases: [],
    description: "View watched channels.",
    category: "Streaming",
    usage: "",
    ownerOnly: false,
    async execute(bot, message, args, settings) {
        //Declarations
        const channels = JSON.parse(readFileSync(path.join(__dirname, "./channels.json"), "utf8"));
        const member = message.member;
        let getChans = channels[member.guild.id];

        const watchList = new MessageEmbed()
            .setColor(bot.Color)
            .setTitle(`__**${member.guild.name}'s Watched Channels**__`);

        Object.entries(getChans).forEach(([k, chan]) => {
            watchList.addField(`${chan.ChannelName}`, `Last Post› ${chan.LastPost ? bot.Timestamp(chan.LastPost) : "Hasn't been live yet."}`);
        });

        message.channel.send({ embed: watchList })

    }
}