module.exports = {
    name: "restart",
    aliases: [],
    description: "Restart the Bot",
    category: "Owner Only",
    usage: "",
    ownerOnly: true,
    hidden: false,
    nsfw: false,
    userPerms: [],
    botPerms: [],
    async execute(bot, message, args) {
        try {
            await message.reply("Restarting!");
            process.exit(1);
        } catch (e) {
            message.reply(`\nERROR: ${e.message}`);
        }
    }
}