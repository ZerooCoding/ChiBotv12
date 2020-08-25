module.exports = {
    name: "restart",
    aliases: [],
    description: "Restart the Bot",
    category: "Owner Only",
    ownerOnly: true,
    async execute(bot, message, args) {
        try {
            await message.reply("Restarting!");
            process.exit(1);
        } catch (e) {
            message.reply(`\nERROR: ${e.message}`);
        }
    }
}