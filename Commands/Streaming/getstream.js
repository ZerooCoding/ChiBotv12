const { MessageEmbed, escapeMarkdown } = require("discord.js");
const { readFileSync, writeFileSync } = require("fs");
const config = require("../../DataStore/Config/Config.json");
const path = require("path");

const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');

const clientId = config.TwitchClientID;
const accessToken = config.TwitchAccessToken;
const authProvider = new ClientCredentialsAuthProvider(clientId, accessToken);
const Twitch = new ApiClient({ authProvider });

module.exports = {
    name: "getstream",
    aliases: ["get"],
    description: "test cmd",
    category: "Streaming",
    usage: "",
    ownerOnly: true,
    hidden: false,
    nsfw: false,
    userPerms: [],
    botPerms: [],
    async execute(bot, message, args, settings) {
        console.log("Cmd Ran");
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
            // .setFooter(`${bot.Timestamp(stream.startDate)}`)
            return embed;
        };

        //Get Channels
        const channels = await JSON.parse(readFileSync(path.join(__dirname, "./channels.json"), "utf8"));

        //Check Each Channel
        (Object.values(channels[message.guild.id]).map(async (chan) => {
            const stream = await Twitch.helix.streams.getStreamByUserName(chan.ChannelName);
            if (stream) {

                //Check if posted since 24h ago..
                //if (chan.LastPost > 60 * 60 * 24) return;

                //Setup Embed Settings
                await setEmbed(stream, chan)
                message.channel.send({ embed: embed });

                //Write Database
                // chan.LastPost = Date.now();

                // //Write to Database
                // writeFileSync(path.join(__dirname, "./channels.json"), JSON.stringify(channels, null, 2), function (err) {
                //     if (err) return;
                // });
            } else {
                return;
            }
        }));
    }
}