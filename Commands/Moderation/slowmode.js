const Discord = module.require("discord.js");
const config = require("../../DataStore/Config/config.json");

module.exports = {
    name: "slowmode",
    category: "Moderation",
    description: "Slow down the channel.",
    usage: "<seconds> (Optional)",
    accessibility: "Moderators +",
    aliases: ["slow"],
    run: async (bot, message, args, guildConf) => {

        message.delete();

        if (!message.member.roles.cache.has(guildConf.ownerRole) || message.member.roles.cache.has(guildConf.adminRole) || message.member.roles.cache.has(guildConf.modRole)) return message.reply('Sorry, You can\'t use this command.').then(s => s.delete({ timeout: 20 * 1000 }));
        let speed = args[0];
        if (!speed) { speed = 5 }
        if (speed > 15) {
            speed = 15
            message.reply(`Provided interval of ${args[0]} was too high, Defaulting to max of 15 seconds.`).then(s => s.delete({ timeout: 10 * 1000 }));
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }));

        if (message.channel.rateLimitPerUser <= 0) {

            embed.setColor(config.warning_color)
            embed.setDescription(`Slowmode has been enabled by ${message.member.displayName}, Slowmode is now: ${speed} seconds.`);
            await message.channel.setRateLimitPerUser(speed);

        } else if (message.channel.rateLimitPerUser >= 1) {

            embed.setColor(config.success_color)
            embed.setDescription(`Slowmode has been disabled by ${message.member.displayName}. You are free to chat normally.`);
            await message.channel.setRateLimitPerUser(0);

        }

        message.channel.send({ embed: embed });

    }
};