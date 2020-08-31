const { bot } = require("../CleanChiBot");
const { MessageEmbed } = require("discord.js");

bot.on("messageDelete", async message => {

    //Declarations
    const settings = await bot.getGuild(message.member.guild);
    const logChan = message.guild.channels.cache.get(settings.auditLogChannel);

    //Checks
    if (!settings.shouldLog) return;
    if (!logChan) return;

    //Fetch Audit Entry
    const entry = await message.guild.fetchAuditLogs({ type: 'MESSAGE_DELETE' }).then(audit => audit.entries.first());

    let user = ""
    if (entry.extra) {
        if (entry.extra.channel.id === message.channel.id
            && (entry.target.id === message.author.id)
            && (entry.createdTimestamp > (Date.now() - 5000))
            && (entry.extra.count >= 1)) {
            user = entry.executor.tag
        } else {
            user = message.author.tag
        }
    }


    //Set up Embed
    const embed = new MessageEmbed()
        .setAuthor(`${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(bot.Color)
        .setDescription(`**Message Deleted In›** <#${message.channel.id}>`)
        .addFields(
            { name: 'Deleted By›', value: `${user}` },
            { name: 'Deleted Message›', value: `${message.cleanContent}` },
            { name: 'Additional Information›', value: `**Author-ID›** ${message.member.id}\n**Channel-ID›** ${message.channel.id}\n**Message-ID›** ${message.id}` }
        )
        .setFooter(bot.Timestamp(new Date()));

    //Send It

    await logChan.send({ embed: embed });

})