const { bot } = require("../CleanChiBot");
const { MessageEmbed } = require("discord.js");

bot.on("voiceStateUpdate", async (oldState, newState) => {
    const queue = await bot.queue.get(oldState.member.guild.id);
    if (!queue) return;
    const voiceChan = oldState.member.guild.channels.cache.get(queue.channel.id);
    if (voiceChan.members.size <= 1) {
        setTimeout(async () => {
            queue.textChannel.send(`🚫 **${queue.channel.name}** is now empty, Clearing queue.`).then(s => s.delete({ timeout: 30 * 1000 }));
            await voiceChan.leave();
            bot.queue.delete(oldState.member.guild.id);
        }, 10 * 1000);
    }
});