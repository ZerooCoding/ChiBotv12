const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "fox",
    description: "Random Fox!",
    category: "Fun",
    async execute(bot, message, args, settings) {

        let fox;
        await fetch('https://randomfox.ca/floof/').then(r => r.json()).then(j => fox = j);

        const embed = new MessageEmbed()
            .setImage(`${fox.image}`)
            .setColor(settings.color)
            .setFooter(`A fox for ${message.author.username}!`);

        message.channel.send({ embed: embed });

    }
}