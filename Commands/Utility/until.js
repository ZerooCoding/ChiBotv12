const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Sugar = require("sugar");

module.exports = {
    name: "until",
    aliases: ["when"],
    description: "Check how long until a date.",
    example: "December 25th",
    category: "Utility",
    usage: "<date>",
    args: true,
    async execute(bot, message, args, settings) {

        //Declarations
        const humanDate = args.join(" ");
        const convertedDate = Sugar.Date.create(humanDate);
        const until = moment().to(convertedDate);

        //Setup Embed
        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${humanDate} is ${until}.`)
            .setColor(settings.color)

        message.channel.send({ embed: embed })

    }
}