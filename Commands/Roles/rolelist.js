const { MessageEmbed, escapeMarkdown } = require("discord.js");

module.exports = {
    name: "rolelist",
    aliases: [],
    description: "Displays this servers assignable roles.",
    category: "Roles",
    usage: "",
    ownerOnly: false,
    hidden: false,
    nsfw: false,
    userPerms: ["MANAGE_ROLES"],
    botPerms: [],
    async execute(bot, message, args, settings) {
        //Basic Checks
        if (isNaN(settings.roleAssignChannel)) return message.reply(`\nSorry, This command connot be used without a \`roleAssignChannel\` set up.`);
        if (message.channel.id != settings.roleAssignChannel) return message.reply(`\nPlease use this command in <#${settings.roleAssignChannel}>.`);

        //Assume staff roles are not assignable.
        const ignoredRoles = [
            "ADMINISTRATOR",
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "MANAGE_CHANNELS",
            "VIEW_AUDIT_LOG",
            "MANAGE_GUILD"
        ];

        //Get the Roles and filter out undefined.
        const Roles = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => {
                if (
                    !r.permissions.any(ignoredRoles) &&
                    r.permissions.has("SEND_MESSAGES") &&
                    r.id !== message.guild.id &&
                    !r.name.includes("Trusted") &&
                    !r.name.includes("Nitro")
                )
                    return r.name;
            })
            .filter(x => x !== undefined).join("\n");

        //Create the Embed
        const embed = new MessageEmbed()
            .setColor(settings.color)
            .setTitle(`**${message.guild.name}'s Roles**`)
            .setDescription(escapeMarkdown(Roles))
            .addField("To Assign a Role›", `${settings.prefix}role <rolename>`)
            .addField("To unAssign a Role›", `${settings.prefix}rmrole <rolename>`);

        //Send it
        message.channel.send({ embed: embed });
    }
}