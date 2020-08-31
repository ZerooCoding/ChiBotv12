const { bot } = require("../CleanChiBot");
const { MessageEmbed } = require("discord.js");

bot.on("guildMemberAdd", async member => {
    //Get Settings
    const settings = await bot.getGuild(member.guild);

    //Get welcome message
    const msg = await settings.welcomeMessage;

    //Get channel
    const welcomeChan = member.guild.channels.cache.get(settings.welcomeChannel);
    const auditChan = member.guild.channels.cache.get(settings.auditLogChannel);

    //Setup embed
    const embed = new MessageEmbed()
        .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
        .setColor(bot.Color)
        .setFooter(`At› ${bot.Timestamp(new Date())}`);

    //Welcome Message
    if (welcomeChan && settings.shouldWelcome) {
        try {
            //Replace options
            let replaced = await msg
                .replace("{server}", `**${member.guild.name}**`)
                .replace("{user}", `<@${member.id}>`)
                .replace("{channel}", `<#${settings.rulesChannel}>`)
                .replace("{nl}", `\n`)
                .toString();

            //Set Description
            embed.setDescription([replaced]);

            //Send it
            welcomeChan.send({ embed: embed });
        } catch (e) {
            console.log(e);
        }
    }

    //audit Welcome
    if (auditChan && settings.shouldLog) {
        try {
            //Setup Embed
            embed.setDescription(`<@${member.id}> joined the server.`);
            embed.addField("Additional Information›", `**User Tag›** ${member.user.tag}\n**User-ID›** ${member.user.id}`);
            console.log(bot.Timestamp(member.user.createdTimestamp));

            //Send it
            auditChan.send({ embed: embed });
        } catch (e) {
            console.log(e);
        }
    }
});