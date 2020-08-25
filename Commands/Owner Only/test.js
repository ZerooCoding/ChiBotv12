const { MessageEmbed } = require("discord.js");

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

        //Get welcome message
        const msg = await settings.welcomeMessage;

        //Replace options
        let replaced = await msg
            .replace("{server}", `**${message.guild.name}**`)
            .replace("{user}", `<@${message.member.id}>`)
            .replace("{channel}", `<#${settings.rulesChannel}>`)
            .replace("{nl}", `\n`)
            .toString();

        //Set up embed
        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setColor(bot.Color)
            .setDescription([replaced]);

        message.channel.send({ embed: embed });

    }
}