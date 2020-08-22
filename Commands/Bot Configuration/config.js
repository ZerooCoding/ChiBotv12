const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "config",
    aliases: ["set"],
    description: "Changes Guild Configuration files for the Bot.",
    category: "Bot Configuration",
    usage: " | <setting> | <setting> <new setting>",
    ownerOnly: false,
    hidden: false,
    nsfw: false,
    userPerms: ["MANAGE_GUILD"],
    botPerms: [],
    async execute(bot, message, args, settings) {

        const setting = args[0];
        const newSetting = args.slice(1).join(" ");

        switch (setting) {
            //Prefix
            case "prefix": {
                if (!newSetting) return message.reply(`\nCurrent prefix: \`${settings.prefix}\``);
                try {
                    await bot.updateGuild(message.guild, { prefix: newSetting });
                    message.reply(`\nPrefix Updated: \`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //Color
            case "color": {
                if (!newSetting) return message.reply(`\nCurrent color: \`${settings.color}\``);
                try {
                    await bot.updateGuild(message.guild, { color: newSetting });
                    message.reply(`\nColor Updated: \`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }

            //Start Booleans
            //shouldLog
            case "shouldLog": {
                if (!newSetting) return message.reply(`\nshouldLog: \`${settings.shouldLog}\``);
                try {
                    await bot.updateGuild(message.guild, { shouldLog: newSetting });
                    message.reply(`\nSetting Updated: shouldLog:\`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //shouldWelcome
            case "shouldWelcome": {
                if (!newSetting) return message.reply(`\nshouldWelcome: \`${settings.shouldWelcome}\``);
                try {
                    await bot.updateGuild(message.guild, { shouldWelcome: newSetting });
                    message.reply(`\nSetting Updated: shouldWelcome:\`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //profanityFilter
            case "profanityFilter": {
                if (!newSetting) return message.reply(`\nprofanityFilter: \`${settings.profanityFilter}\``);
                try {
                    await bot.updateGuild(message.guild, { profanityFilter: newSetting });
                    message.reply(`\nSetting Updated: profanityFilter:\`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //pinboardEnabled
            case "pinboardEnabled": {
                if (!newSetting) return message.reply(`\npinboardEnabled: \`${settings.pinboardEnabled}\``);
                try {
                    await bot.updateGuild(message.guild, { pinboardEnabled: newSetting });
                    message.reply(`\nSetting Updated: pinboardEnabled:\`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //Start Roles
            //ownerRole
            case "ownerRole": {
                if (!newSetting) return message.reply(`\nownerRole: \`${settings.ownerRole}\``);
                try {

                    const role = message.mentions.roles.first();

                    await bot.updateGuild(message.guild, { ownerRole: `${role.id ? role.id : newSetting}` });
                    message.reply(`\nSetting Updated: ownerRole: ${role.id ? role.name : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //adminRole
            case "adminRole": {

                const role = message.mentions.roles.first();

                if (!newSetting) return message.reply(`\nadminRole: \`${settings.adminRole}\``);
                try {
                    await bot.updateGuild(message.guild, { adminRole: `${role.id ? role.id : newSetting}` });
                    message.reply(`\nSetting Updated: adminRole: ${role.id ? role.name : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //modRole
            case "modRole": {

                const role = message.mentions.roles.first();

                if (!newSetting) return message.reply(`\nmodRole: ${role.id ? role.name : newSetting}`);
                try {
                    await bot.updateGuild(message.guild, { modRole: newSetting });
                    message.reply(`\nSetting Updated: modRole:\`${newSetting}\``)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //Start Channels
            //welcomeChannel
            case "welcomeChannel": {
                if (!newSetting) return message.reply(`\nwelcomeChannel: \`${settings.welcomeChannel}\``);
                try {

                    let channel = message.mentions.channels.first();

                    await bot.updateGuild(message.guild, { welcomeChannel: `${channel.id ? channel.id : newSetting}` });
                    message.reply(`\nSetting Updated: welcomeChannel: ${channel.id ? channel : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: ** ${error.message} ** `)
                }
                break;
            }
            //rulesChannel
            case "rulesChannel": {
                if (!newSetting) return message.reply(`\nrulesChannel: \`${settings.rulesChannel}\``);
                try {

                    let channel = message.mentions.channels.first();

                    await bot.updateGuild(message.guild, { rulesChannel: `${channel.id ? channel.id : newSetting}` });
                    message.reply(`\nSetting Updated: rulesChannel: ${channel.id ? channel : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //auditLogChannel
            case "auditLogChannel": {
                if (!newSetting) return message.reply(`\nauditLogChannel: \`${settings.auditLogChannel}\``);
                try {

                    let channel = message.mentions.channels.first();

                    await bot.updateGuild(message.guild, { auditLogChannel: `${channel.id ? channel.id : newSetting}` });
                    message.reply(`\nSetting Updated: auditLogChannel: ${channel.id ? channel : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: ** ${error.message} ** `)
                }
                break;
            }
            //roleAssignChannel
            case "roleAssignChannel": {
                if (!newSetting) return message.reply(`\nroleAssignChannel: \`${settings.roleAssignChannel}\``);
                try {

                    let channel = message.mentions.channels.first();

                    await bot.updateGuild(message.guild, { roleAssignChannel: `${channel.id ? channel.id : newSetting}` });
                    message.reply(`\nSetting Updated: roleAssignChannel: ${channel.id ? channel : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //pinboardChannel
            case "pinboardChannel": {
                if (!newSetting) return message.reply(`\npinboardChannel: \`${settings.pinboardChannel}\``);
                try {

                    let channel = message.mentions.channels.first();

                    await bot.updateGuild(message.guild, { pinboardChannel: `${channel.id ? channel.id : newSetting}` });
                    message.reply(`\nSetting Updated: pinboardChannel: ${channel.id ? channel : newSetting}`)
                } catch (error) {
                    message.reply(`\nAn error occurred: **${error.message}**`)
                }
                break;
            }
            //Default
            default: {
                try {
                    const list = new MessageEmbed()
                        .setTitle(`__**${message.guild.name}'s Configuration**__`)
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
                        .setColor(bot.Color)
                        .setDescription(`

                    **prefix›** ${settings.prefix}
                    **color›** ${settings.color}

                    **shouldLog›** ${settings.shouldLog}
                    **shouldWelcome›** ${settings.shouldWelcome}
                    **profanityFilter›** ${settings.profanityFilter}
                    **pinboardEnabled›** ${settings.pinboardEnabled}

                    **ownerRole›** ${!isNaN(settings.ownerRole) ? message.guild.roles.cache.get(settings.ownerRole) : "Not Set, Please mention Role or set Role ID."}
                    **adminRole›** ${!isNaN(settings.adminRole) ? message.guild.roles.cache.get(settings.adminRole) : "Not Set, Please mention Role or set Role ID."}
                    **modRole›** ${!isNaN(settings.modRole) ? message.guild.roles.cache.get(settings.modRole) : "Not Set, Please mention Role or set Role ID."}
                    
                    **welcomeChannel›** ${!isNaN(settings.welcomeChannel) ? message.guild.channels.cache.get(settings.welcomeChannel) : "Not Set, Please mention Channel or set Channel ID."}
                    **rulesChannel›** ${!isNaN(settings.rulesChannel) ? message.guild.channels.cache.get(settings.rulesChannel) : "Not Set, Please mention Channel or set Channel ID."}
                    **auditLogChannel›** ${!isNaN(settings.auditLogChannel) ? message.guild.channels.cache.get(settings.auditLogChannel) : "Not Set, Please mention Channel or set Channel ID."}
                    **roleAssignChannel›** ${!isNaN(settings.roleAssignChannel) ? message.guild.channels.cache.get(settings.roleAssignChannel) : "Not Set, Please mention Channel or set Channel ID."}
                    **pinboardChannel›** ${!isNaN(settings.pinboardChannel) ? message.guild.channels.cache.get(settings.pinboardChannel) : "Not Set, Please mention Channel or set Channel ID."}
                    `);
                    message.channel.send({ embed: list });
                } catch (error) {
                    console.error(error);
                }
            }
        }

    }
}