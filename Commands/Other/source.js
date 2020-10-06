const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "source",
    aliases: [],
    description: "Shows my Source Code",
    category: "Other",

    async execute(bot, message, args, settings) {

        const embed = new MessageEmbed()
            .setTitle("__**ChiBot's Code**__")
            .setColor("#700707")
            .setThumbnail("http://share.voxxie.me/i/OCVr2M.png")
            .setDescription("Source Code can be found [Here on Github](https://github.com/VoxxieBoxxie/ChiBotv12/tree/CleanChi)\nMy Creator is 👑 Ms.Voxxie#0001\nCreate an Issue if anything comes up!")

        message.channel.send({ embed: embed });

    }
}