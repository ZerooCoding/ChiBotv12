const mongoose = require("mongoose");
const moment = require("moment");
const { Guild } = require("./models");

module.exports = bot => {
    bot.getGuild = async (guild) => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return bot.defaults.defaultSettings;
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }
        console.log(`Guild "${data.guildName}" updated its settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    bot.createGuild = async (settings) => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, bot.defaults.defaultSettings);
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save().then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };

    bot.clean = text => {
        if (typeof (text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };

    bot.Timestamp = date => {
        moment(date).format("MMMM Do YYYY, h:mm a");
    };

};