module.exports = {
    name: "bulk",
    aliases: [],
    description: "Bulk Delete messages.",
    category: "Moderation",
    usage: "<count> | <count> <@user>",
    userPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    async execute(bot, message, args, settings) {

        //Declarations
        const User = message.mentions.users.first();
        let from;
        const Amount = parseInt(args[0]);

        //Check if Amount is provided
        if (!Amount) return message.reply(`\nPlease provide the number of messages you'd like deleted.`);

        //Purge
        message.channel.messages.fetch({ limit: Amount + 1 }).then(async messages => {
            if (User) {
                from = `from \`${User.tag}\``;
                const filterBy = User ? User.id : bot.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, Amount);
            } else {
                from = "";
            }
            await message.channel.bulkDelete(messages).catch(err => message.reply(`\nAn error occured:\n**${err.message}**`));
            await message.reply(`\nPurge Successful, Deleted \`${Amount}\` messages ${from}`);
        })

    }
}