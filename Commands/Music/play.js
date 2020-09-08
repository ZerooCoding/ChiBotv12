const config = require("../../DataStore/Config/Config.json");
const ytdl = require('ytdl-core');
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(config.YoutubeAPI);
const { play } = require("../../DataStore/Functions/music");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    aliases: [],
    description: "Play a song from youtube.",
    category: "Music",
    usage: "<url> or <search query>",
    botPerms: ["CONNECT", "SPEAK"],
    async execute(bot, message, args, settings) {

        const { channel } = message.member.voice;

        const serverQueue = bot.queue.get(message.guild.id);
        if (!channel) return message.reply("You need to join a voice channel first!").then(s => s.delete({ timeout: 30 * 1000 })).catch(console.error);
        if (serverQueue && channel !== message.guild.me.voice.channel)
            return message.reply(`You must be in the same channel as ${bot.user}`).then(s => s.delete({ timeout: 30 * 1000 })).catch(console.error);

        if (!args.length)
            return message
                .reply(`Usage: ${settings.prefix}play <YouTube URL | Video Name>`)
                .catch(console.error);

        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);

        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };

        let songInfo = null;
        let song = null;

        if (urlValid) {
            try {
                songInfo = await ytdl.getInfo(url);
                console.log(songInfo.videoDetails.thumbnail.thumbnails[`${songInfo.videoDetails.thumbnail.thumbnails.length - 1}`].url);
                song = {
                    title: songInfo.videoDetails.title,
                    thumbnail: await songInfo.videoDetails.thumbnail.thumbnails[`${songInfo.videoDetails.thumbnail.thumbnails.length - 1}`].url,
                    url: songInfo.videoDetails.video_url,
                    duration: await songInfo.videoDetails.lengthSeconds,
                    addedby: message.member
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).then(s => s.delete({ timeout: 30 * 1000 })).catch(console.error);
            }
        } else {
            try {
                const results = await youtube.searchVideos(search, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                    title: songInfo.videoDetails.title,
                    thumbnail: await songInfo.videoDetails.thumbnail.thumbnails[`${songInfo.videoDetails.thumbnail.thumbnails.length - 1}`].url,
                    url: songInfo.videoDetails.video_url,
                    duration: await songInfo.videoDetails.lengthSeconds,
                    addedby: message.member
                };
            } catch (error) {
                console.error(error);
                return message.reply("No video was found with a matching title").then(s => s.delete({ timeout: 30 * 1000 })).catch(console.error);
            }
        }

        if (serverQueue) {

            const queuedEmbed = new MessageEmbed()
                .setAuthor(song.addedby.displayName, song.addedby.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`${song.title}`)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setColor(settings.color)
                .addField("Channel", `${message.channel.name}`, true)
                //.addField("Position in Queue", `${serverQueue.songs.indexOf(song.title) + 1}`)
                .addField("Song Duration", `${bot.msToTime(song.duration * 1000)}`, true)

            serverQueue.songs.push(song);
            return serverQueue.textChannel
                .send({ embed: queuedEmbed })
                //.send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
                .then(s => s.delete({ timeout: 30 * 1000 }))
                .catch(console.error);
        }

        queueConstruct.songs.push(song);
        bot.queue.set(message.guild.id, queueConstruct);

        try {
            queueConstruct.connection = await channel.join();
            play(queueConstruct.songs[0], message);
        } catch (error) {
            console.error(error);
            bot.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(`Could not join the channel: ${error}`).then(s => s.delete({ timeout: 30 * 1000 })).catch(console.error);
        }
    }
};