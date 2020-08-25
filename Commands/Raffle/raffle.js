const ms = require("ms")

module.exports = {
    name: "raffle",
    aliases: [],
    description: "Start a raffle",
    category: "Raffle",
    usage: "<time> <#winners> <prize>",
    cooldown: "60",
    example: "2d 1 A big ol' hug!",
    args: true,
    async execute(bot, message, args, settings) {

        //Declarations
        const Time = ms(args[0]);
        const WinnerCount = parseInt(args[1]);
        const Prize = args.slice(2).join(" ");


        //Checks
        if (!Time) return message.reply(`\nPlease provide a duration for the raffle.`).then(s => s.delete({ timeout: 30 * 1000 }));
        if (!WinnerCount) return message.reply(`\nPlease provide the number of winners for this raffle.`).then(s => s.delete({ timeout: 30 * 1000 }));
        if (!Prize) return message.reply(`\nPlease provide a prize for the raffle.`).then(s => s.delete({ timeout: 30 * 1000 }));

        //Do the raffle
        bot.Raffle.start(message.channel, {
            time: Time,
            prize: Prize,
            winnerCount: WinnerCount,
            messages: {
                giveaway: "🎉🎉**Giveaway Started!** 🎉🎉",
                giveawayEnded: "🎉🎉**Giveaway Ended!** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                }
            }
        });
    }
}