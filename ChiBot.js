const Discord = require("discord.js");
const { Token } = require("./DataStore/Config/Config.json");
const { GiveawaysManager } = require("discord-giveaways");

const lib = require("./Core/EventLoader.js");
const bot = new Discord.Client();
lib.setup(bot);

module.exports = { bot: bot };

//Command Info
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.cooldowns = new Discord.Collection();

//Database
bot.mongoose = require("./database/mongoose");
bot.defaults = require("./database/databaseDefaults");
require("./database/functions")(bot)

//Declare myself as Owner of bot.
bot.Owner = "101789503634554880";

//Raffle Manager
bot.Raffle = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        embedColor: "#51db8f",
        embedColorEnd: "#4ee32d",
        reaction: "🎉"
    }
});

['Command Loader'].forEach(handler => {
    require(`./Events/${handler}`)(bot);
});

bot.once("ready", () => {
    console.log(`${bot.user.tag} Online and Ready in ${bot.guilds.cache.size} guilds.`);
});

bot.mongoose.init();
bot.login(Token);