const { MessageEmbed } = require("discord.js");
const request = require("request");

module.exports = {
    name: "inspire",
    aliases: [],
    description: "Feel Inspired...",
    category: "Fun",
    async execute(bot, message, args, settings) {

        //Just do it lol
        request("http://inspirobot.me/api?generate=true", (error, response, body) => {
            let QuoteEmbed = new MessageEmbed()
                .setAuthor(`${message.member.displayName}`, `${message.member.user.displayAvatarURL({ dynamic: true })}`)
                .setDescription("*Feel The Inspiration*")
                .setImage(body)
                .setColor(settings.color)
                .setFooter(bot.Timestamp(new Date()))

            message.channel.send({ embed: QuoteEmbed });
        });
    }
}