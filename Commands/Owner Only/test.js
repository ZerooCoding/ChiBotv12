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

        let msg = await message.channel.send("Test!");

        await msg.react("⏹");

        const filter = (reaction, user) => user.id !== bot.user.id;
        var collector = msg.createReactionCollector(filter, {
            time: 300 * 1000
        });

        collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
                case "⏹":
                    if (reaction.count - 1 >= 2) {
                        reaction.users.cache.filter(u => { if (!u.bot) return u }).forEach(r => { reaction.users.remove(r); })
                    }
                    break;
            }
        })

    }
}