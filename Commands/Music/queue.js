const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Check the music queue.",
    category: "Music",
    botPerms: ["CONNECT", "SPEAK"],
    async execute(bot, message, args, settings) {

        const queue = bot.queue.get(message.guild.id);
        if (!queue) return message.reply("There is nothing playing.").then(s => s.delete({ timeout: 1 * 60000 }));

        const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

        let queueEmbed = new MessageEmbed()
            .setTitle(`__**${message.guild.name} Music Queue**__`)
            .setDescription(description)
            .setColor(settings.color);

        const splitDescription = splitMessage(description, {
            maxLength: 2048,
            char: "\n",
            prepend: "",
            append: ""
        });

        splitDescription.forEach(async (m) => {
            queueEmbed.setDescription(m);
            message.channel.send(queueEmbed).then(s => s.delete({ timeout: 1 * 60000 }));
        });
    }
};