const { bot } = require("../CleanChiBot");
const { permissions } = require("../DataStore/util/util");
const ms = require("ms");
const { Collection } = require("discord.js");

bot.on('message', async message => {

    //Get Guild Settings
    let settings;
    try {
        settings = await bot.getGuild(message.guild);
    } catch (error) {
        console.error(error);
    }

    //Set up settings
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;

    //Command loader
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (!command) return message.delete({ timeout: 30 * 1000 });

    //Cooldown Manager
    if (!bot.cooldowns.has(command.name)) { bot.cooldowns.set(command.name, new Collection()); }

    const now = Date.now();
    const timestamps = bot.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)) {
        const expireationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expireationTime) {
            const timeLeft = (expireationTime - now);
            return message.reply(`Please wait ${ms(timeLeft)} before using \`${command.name}\``).then(s => s.delete({ timeout: 30 * 1000 }));
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id);
    }, cooldownAmount);

    //Check if command is Owner Only
    if (command.ownerOnly && message.member.id !== bot.Owner) {
        return message.reply(`\nSorry, This command is locked.`);
    }

    //Check if args are required
    if (command.args && !args.length) {
        return message.reply(`\nPlease check the required arguments for the command \`${command.name}\`.`);
    }

    //Check for permissions of user
    if (command.userPerms.length > 0) {
        const usermissing = message.channel.permissionsFor(message.author).missing(command.userPerms)
        if (usermissing.length > 0) {
            if (usermissing.length === 1) {
                return message.reply(`\nSorry, The command \`${command.name}\` requires the permission "\`${permissions[usermissing[0]]}\`".`).then(s => s.delete({ timeout: 30 * 1000 }));
            }
            return message.reply(`\nSorry, The command \`${command.name}\` requires the following permissions:\n\`${usermissing.map(perm => permissions[perm]).join(", ")}\``).then(s => s.delete({ timeout: 30 * 1000 }));
        }
    }

    //Check for bot permissions
    if (command.botPerms.length > 0) {
        const botmissing = message.channel.permissionsFor(message.guild.me).missing(command.botPerms)
        if (botmissing.length > 0) {
            if (botmissing.length === 1) {
                return message.reply(`\nI cannot execute the command \`${command.name}\`, I'm missing the the permission: "\`${permissions[botmissing[0]]}\`".`).then(s => s.delete({ timeout: 30 * 1000 }));
            }
            return message.reply(`\nI cannot execute the command \`${command.name}\`, I'm missing the the following permissions:\n\`${botmissing.map(perm => permissions[perm]).join(", ")}\``).then(s => s.delete({ timeout: 30 * 1000 }));
        }
    }

    //Check if channel is nsfw
    if (!message.channel.nsfw && command.nsfw) {
        return message.reply(`\nSorry this command may only be used in channels marked as \`NSFW\`.`);
    }

    //Run Command
    try {
        if (command) {
            if (message) {
                message.delete({ timeout: 60 * 1000 }).catch(err => console.error(err));
            }
            command.execute(bot, message, args, settings);
        }
    } catch (e) {
        message.reply(`\nCommaned Execution Failed:\n${e}`);
    }
});