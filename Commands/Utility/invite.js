module.exports = {
    name: "invite",
    description: "Create an instant invite.",
    category: "Utility",
    usage: "",
    userPerms: ["CREATE_INSTANT_INVITE"],
    botPerms: ["CREATE_INSTANT_INVITE"],
    async execute(bot, message, args, settings) {

        if (!settings.rulesChannel) return message.reply(`No rules channel set, Invites cannot be created.`);

        message.guild.channels.cache.get(settings.rulesChannel).createInvite({
            temporary: true,
            maxAge: 600,
            maxUses: 1,
            unique: true,
            reason: `${message.member.user.tag} used the Invite command.`
        }).then(invite => message.reply(`\nHere you go!\nThis invite will expire after ${invite.maxUses} use(s) or 10 minutes.\nhttps://discord.gg/${invite.code}`).then(sent => sent.delete({ timeout: 600000 })))
    }
};