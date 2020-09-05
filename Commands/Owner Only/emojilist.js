module.exports = {
    name: "emojilist",
    aliases: ["el"],
    description: "List all of the guilds emoji's",
    category: "Owner Only",
    ownerOnly: true,
    async execute(bot, message, args) {

        let list = [];

        message.guild.emojis.cache.map(em => {
            list.push(`${em.toString()} => :${em.name}:`)
        })

        message.channel.send(list.sort().join("\n"), { split: true })

    }
}