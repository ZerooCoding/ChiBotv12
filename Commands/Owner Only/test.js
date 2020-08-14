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

        const barChart = new BarChart();
        barChart.setData([["apples", 15], ["oranges", 3], ["bananas", 12]]);
        message.channel.send(barChart.render())

    }
};