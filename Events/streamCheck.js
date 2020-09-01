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
            .setTitle(`${(await stream.getUser()).displayName} is now live!`)
            .setDescription(`[https://www.twitch.tv/${chan.ChannelName}](https://www.twitch.tv/${chan.ChannelName})`)
            .setThumbnail((await stream.getUser()).profilePictureUrl)
            .setImage(stream.thumbnailUrl.replace("{width}", 960).replace("{height}", 540))
            .addField("Playing›", `${(await stream.getGame()).name}`, true)
            .addField("Current Viewers›", `${stream.viewers}`, true)
            .addField("Live Since›", `${bot.Timestamp(stream.startDate)}`)
            .setFooter(`Last Updated› ${bot.Timestamp(Date.now())}`)
        return embed;
    };

    bot.guilds.cache.map(async guild => {
        const settings = await bot.getGuild(guild);
        const streamChan = guild.channels.cache.get(settings.streamNotifChannel);
        if (streamChan) {
            (Object.values(channels[guild.id]).map(async (chan) => {
                let streamMsg;
                const stream = await Twitch.helix.streams.getStreamByUserName(chan.ChannelName);
                if (stream) {

                    //Check if message has been posted, if so update it.
                    if (await !(chan.lastPost > 60 * 60 * 24) && await chan.postMessage) {
                        let msgs = await streamChan.messages.fetch({ limit: 100 });
                        if (msgs.get(chan.postMessage)) {
                            const msg = await msgs.get(chan.postMessage);
                            await setEmbed(stream, chan)
                            msg.edit({ embed: embed });
                        }

                    } else {

                        //Check if posted since 24h ago..
                        if (await chan.LastPost > 60 * 60 * 24) return;

                        //Setup Embed Settings
                        await setEmbed(stream, chan)
                        streamMsg = await streamChan.send({ embed: embed });

                        //Write Database
                        chan.postMessage = streamMsg.id;
                        chan.LastPost = Date.now();
                        //Write to Database
                        writeFileSync(path.join(__dirname, "../Commands/Streaming/", "./channels.json"), JSON.stringify(channels, null, 2), function (err) {
                            if (err) return;
                        });

                    }
                }
            }));
        }
    })


    setTimeout(() => streamCheck(delay), delay);
}

streamCheck(120 * 1000)