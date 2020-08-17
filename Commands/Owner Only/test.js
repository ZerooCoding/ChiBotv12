const Discord = module.require("discord.js");
const ms = require("ms");
const { BarChart } = require("text-chart");
const config = require("../../DataStore/Config/config.json");

module.exports = {
    name: "test",
    category: "Owner Only",
    description: "",
    usage: "",
    cooldown: "",
    aliases: [],
    run: async (bot, message, args, guildConf) => {
        if (message.author.id !== "101789503634554880") return;

    }
};