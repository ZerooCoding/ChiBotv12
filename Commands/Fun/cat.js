const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "Random Cat!",
    category: "Fun",
    async execute(bot, message, args, settings) {

        let cat;
        await fetch('http://aws.random.cat/meow').then(r => r.json()).then(j => cat = j);

        const embed = new MessageEmbed()
            .setImage(`${cat.file}`)
            .setColor(settings.color)
            .setFooter(`A fox for ${message.author.username}!`);

        message.channel.send({ embed: embed });

    }
}