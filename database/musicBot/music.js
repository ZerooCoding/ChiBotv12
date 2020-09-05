const { bot } = require("../../CleanChiBot");
const ytdlDiscord = require("ytdl-core-discord");

module.exports = {
    async play(song, message) {
        const queue = bot.queue.get(message.guild.id);

        if (!song) {
            queue.channel.leave();
            bot.queue.delete(message.guild.id);
            return queue.textChannel.send("🚫 Music queue ended.").then(s => s.delete({ timeout: 30 * 1000 }));
        }

        let stream = null;

        try {
            if (song.url.includes("youtube.com")) {
                stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
            }
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }

            console.error(error);
            return message.channel.send(`Error: ${error.message ? error.message : error}`).then(s => s.delete({ timeout: 30 * 1000 }));
        }

        queue.connection.on("disconnect", () => bot.queue.delete(message.guild.id));

        const type = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
        const dispatcher = queue.connection
            .play(stream, { type: type })
            .on("finish", () => {
                if (collector && !collector.ended) collector.stop();

                if (queue.loop) {
                    // if loop is on, push the song back at the end of the queue
                    // so it can repeat endlessly
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message);
                } else {
                    // Recursively play the next song
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                }
            })
            .on("error", (err) => {
                console.error(err);
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            });
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        try {
            var playingMessage = await queue.textChannel.send(`🎶 Started playing: **${song.title}**\n${song.url}`);
            await playingMessage.react("⏭");
            await playingMessage.react("⏯");
            await playingMessage.react("🔁");
            await playingMessage.react("⏹");
        } catch (error) {
            console.error(error);
        }

        const filter = (reaction, user) => user.id !== bot.user.id;
        var collector = playingMessage.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        });

        collector.on("collect", (reaction, user) => {
            if (!queue) return;
            const member = message.guild.member(user);
            const chan = queue.channel;
            let requiredVote = Math.round(chan.members.size / 2);

            switch (reaction.emoji.name) {
                case "⏭":
                    queue.textChannel.send(`${user} 📫 voted to skip the song. \`${reaction.count - 1}/${requiredVote}\`votes.`).then(s => s.delete({ timeout: 10 * 1000 }));
                    if (reaction.count - 1 >= requiredVote) {
                        reaction.users.cache.filter(u => { if (!u.bot) return u }).forEach(r => { reaction.users.remove(r); });
                        queue.playing = true;

                        queue.connection.dispatcher.end();
                        queue.textChannel.send(`✅ Vote Passed | ⏩ skipped the song`).then(s => s.delete({ timeout: 10 * 1000 }));
                        collector.stop();
                    }
                    break;

                case "⏯":
                    queue.textChannel.send(`${user} 📫 voted to pause/resume the music. \`${reaction.count - 1}/${requiredVote}\`votes.`).then(s => s.delete({ timeout: 10 * 1000 }));
                    if (reaction.count - 1 >= requiredVote) {
                        reaction.users.cache.filter(u => { if (!u.bot) return u }).forEach(r => { reaction.users.remove(r); });

                        if (queue.playing) {
                            queue.playing = !queue.playing;
                            queue.connection.dispatcher.pause(true);
                            queue.textChannel.send(`✅ Vote Passed | ⏸ paused the music.`).then(s => s.delete({ timeout: 10 * 1000 }));
                        } else {
                            queue.playing = !queue.playing;
                            queue.connection.dispatcher.resume();
                            queue.textChannel.send(`✅ Vote Passed | ▶ resumed the music!`).then(s => s.delete({ timeout: 10 * 1000 }));
                        }
                    }
                    break;

                case "🔁":
                    queue.textChannel.send(`${user} 📫 voted to enable/disable loop. \`${reaction.count - 1}/${requiredVote}\`votes.`).then(s => s.delete({ timeout: 10 * 1000 }));
                    if (reaction.count - 1 >= requiredVote) {
                        reaction.users.cache.filter(u => { if (!u.bot) return u }).forEach(r => { reaction.users.remove(r); });

                        queue.loop = !queue.loop;
                        queue.textChannel.send(`✅ Vote Passed | 🔁 Loop is now ${queue.loop ? "**on**" : "**off**"}`).then(s => s.delete({ timeout: 10 * 1000 }));
                    }
                    break;

                case "⏹":
                    queue.textChannel.send(`${user} 📫 voted to stop the music. \`${reaction.count - 1}/${requiredVote}\`votes.`).then(s => s.delete({ timeout: 10 * 1000 }));
                    if (reaction.count - 1 >= requiredVote) {
                        reaction.users.cache.filter(u => { if (!u.bot) return u }).forEach(r => { reaction.users.remove(r); });

                        queue.songs = [];
                        queue.textChannel.send(`✅ Vote Passed | ⏹ stopped the music!`).then(s => s.delete({ timeout: 10 * 1000 }));
                        try {
                            queue.connection.dispatcher.end();
                        } catch (error) {
                            console.error(error);
                            queue.connection.disconnect();
                        }
                        collector.stop();
                    }
                    break;

                default:
                    reaction.users.remove(user).catch(console.error);
                    break;
            }
        });

        collector.on("end", () => {
            playingMessage.reactions.removeAll().catch(console.error);
            if (!playingMessage.deleted) {
                if (playingMessage) {
                    playingMessage.delete({ timeout: 30 * 1000 }).catch(console.error);
                }
            }
        });
    }
};