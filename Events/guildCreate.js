const { bot } = require("../CleanChiBot");
bot.on("guildCreate", async guild => {
    console.log(`${guild.name} joined | Test`);
    try {
        const newGuild = {
            guildID: guild.id,
            guildName: guild.name
        };
        await bot.createGuild(newGuild)
    } catch (error) {
        console.error(error);
    }
});
