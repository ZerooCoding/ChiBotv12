const Discord = module.require("discord.js");
const ms = require("ms");
const config = require("../../DataStore/Config/config.json");

module.exports = {
    name: "poll",
    category: "Utility",
    description: "Create a Poll",
    usage: "<title>(optional)",
    cooldown: "10",
    aliases: [],
    run: async (bot, message, args, guildConf) => {

        let msgs = [];
        let final = [];
        let toDelete = [];
        let max = 8;
        let title = args.join(" ");

        const EmojiOptions = [
            "1️⃣",
            "2️⃣",
            "3️⃣",
            "4️⃣",
            "5️⃣",
            "6️⃣",
            "7️⃣",
            "8️⃣"
        ];

        let e1;
        let e2;
        let e3;
        let e4;
        let e5;
        let e6;
        let e7;
        let e8;

        const notif = await message.reply(`Type your poll options one message at a time, You have [\`${max}\`] options remaining.\nType \`finish\` when finished.`)

        const filter = m => m.author.id === message.author.id;
        var collector = message.channel.createMessageCollector(filter, {
            time: ms("5m"),
            max: max
        });

        collector.on('collect', async m => {
            if (m.content.toLowerCase() === "finish") {
                return collector.stop({ reason: "User Input" })
            }
            max = max - 1;
            await notif.edit(`<@${message.member.id}>, Type your poll options one message at a time, You have [\`${max}\`] options remaining.\nType \`finish\` when finished.`)
            msgs.push(m.content);
            toDelete.push(m.id);
        });

        collector.on('end', async () => {

            for (var i = 0; i < toDelete.length; i++) {
                await message.channel.messages.cache.get(toDelete[i]).delete({ timeout: 500 });
            }

            await notif.delete({ timeout: 500 });

            await message.delete({ timeout: 500 });

            if (!msgs.length) return message.reply("No poll options provided. Command cancelled.").then(s => s.delete({ timeout: 20 * 1000 }));

            for (var i = 0; i < msgs.length; i++) {
                final.push(`${EmojiOptions[i]} ${msgs[i]}`)
            }

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
                .setColor(config.success_color)
                .setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);

            const pollmsg = await message.channel.send({ embed: embed })

            for (var i = 0; i < msgs.length; i++) {
                pollmsg.react(EmojiOptions[i]);
            }

            const rfilter = (reaction, user) => user.id !== bot.user.id;
            var rcollector = pollmsg.createReactionCollector(rfilter, {
                time: ms("1h")
            });

            rcollector.on("collect", async (reaction, user) => {
                if (!pollmsg) return;

                switch (reaction.emoji.name) {
                    case EmojiOptions[0]:
                        if (!msgs[0]) return reaction.users.remove(user).catch(console.error);
                        e1 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[1]:
                        if (!msgs[1]) return reaction.users.remove(user).catch(console.error);
                        e2 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[2]:
                        if (!msgs[2]) return reaction.users.remove(user).catch(console.error);
                        e3 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[3]:
                        if (!msgs[3]) return reaction.users.remove(user).catch(console.error);
                        e4 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                        ${final.join("\n")}
        
                        =======================
                        
                        ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                        ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                        ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                        ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                        ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                        ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                        ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                        ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[4]:
                        if (!msgs[4]) return reaction.users.remove(user).catch(console.error);
                        e5 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[5]:
                        if (!msgs[5]) return reaction.users.remove(user).catch(console.error);
                        e6 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[6]:
                        if (!msgs[6]) return reaction.users.remove(user).catch(console.error);
                        e7 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;

                    case EmojiOptions[7]:
                        if (!msgs[7]) return reaction.users.remove(user).catch(console.error);
                        e8 = "■".repeat(reaction.count - 1);
                        embed.setDescription(`${title ? `__${title}__` : '__Poll Started__'}
                
                ${final.join("\n")}

                =======================
                
                ${e1 ? `${EmojiOptions[0]} ${e1} ${e1.length}` : ""}
                ${e2 ? `${EmojiOptions[1]} ${e2} ${e2.length}` : ""}
                ${e3 ? `${EmojiOptions[2]} ${e3} ${e3.length}` : ""}
                ${e4 ? `${EmojiOptions[3]} ${e4} ${e4.length}` : ""}
                ${e5 ? `${EmojiOptions[4]} ${e5} ${e5.length}` : ""}
                ${e6 ? `${EmojiOptions[5]} ${e6} ${e6.length}` : ""}
                ${e7 ? `${EmojiOptions[6]} ${e7} ${e7.length}` : ""}
                ${e8 ? `${EmojiOptions[7]} ${e8} ${e8.length}` : ""}`);
                        pollmsg.edit({ embed: embed })
                        break;
                }
            });
        });
    }
};