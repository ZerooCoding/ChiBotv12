const { bot } = require("../CleanChiBot");
const config = require("../DataStore/Config/Config.json");
const { MessageEmbed, escapeMarkdown } = require("discord.js");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');

const clientId = config.TwitchClientID;
const accessToken = config.TwitchAccessToken;
const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
const Twitch = new ApiClient({ authProvider });

async function streamCheck(delay) {
    const channels = await JSON.parse(readFileSync(path.join(__dirname, "../Commands/Streaming/", "./channels.json"), "utf8"));

    //Setup Embed
    let embed;
    async function setEmbed(stream, chan) {
        embed = new MessageEmbed()
            .setColor("#6441a4")
            .setTitle(`${chan.ChannelName} is now live!`)
            .setDescription(`[https://www.twitch.tv/${chan.ChannelName}](https://www.twitch.tv/${chan.ChannelName})`)
            .setThumbnail((await stream.getUser()).profilePictureUrl)
            .setImage(stream.thumbnailUrl.replace("{width}", 960).replace("{height}", 540))
            .addField("Playing›", `${(await stream.getGame()).name}`, true)
            .addField("Current Viewers›", `${stream.viewers}`, true)
            .addField("Live Since›", `${bot.Timestamp(stream.startDate)}`)
        return embed;
    };

    bot.guilds.cache.map(async guild => {
        const settings = await bot.getGuild(guild);
        const streamChan = guild.channels.cache.get(settings.streamNotifChannel);
        if (streamChan) {
            (Object.values(channels[guild.id]).map(async (chan) => {
                const stream = await Twitch.helix.streams.getStreamByUserName(chan.ChannelName);
                if (stream) {
                    //Check if posted since 24h ago..
                    if (await chan.LastPost > 60 * 60 * 24) return;;

                    //Setup Embed Settings
                    await setEmbed(stream, chan)
                    streamChan.send({ embed: embed });

                    //Write Database
                    chan.LastPost = Date.now();
                    //Write to Database
                    writeFileSync(path.join(__dirname, "../Commands/Streaming/", "./channels.json"), JSON.stringify(channels, null, 2), function (err) {
                        if (err) return;
                    });
                }
            }));
        }
    })


    setTimeout(() => streamCheck(delay), delay);
}

streamCheck(120 * 1000)