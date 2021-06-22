const { Command } = require('sensum');

module.exports = new Command({
  name: 'donotdm',
  description: 'Opt-out from DMs from Hanabi. This is useful for if you are getting messages from a spammy person, or someone you do not want to interact with.',
  category: 'info',
  runIn: ['text', 'guild', 'dm'],
  delete: true,
  hidden: true,
  async run(bot, message, ctx) {
    if (ctx.profile.flags.canReceiveDMs) {
      this.send("It's done... I will no longer send messages to you via dms.");
      ctx.profile.flags.canReceiveDMs = false;
      await ctx.profile.save();
    } else {
      this.send("Done! I will send dms to you when acquired.");
      ctx.profile.flags.canReceiveDMs = true;
      await ctx.profile.save();
    }
    console.log('Profile:', await bot.getProfile(ctx.userId));
  },
});
