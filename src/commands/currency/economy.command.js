const { Command } = require('sensum');

const Profile = require('../../models/profile');

module.exports = new Command({
  name: 'economy',
  description: 'Info about the Hanabi economy, duh~',
  category: 'currency',
  aliases: ['eco'],
  async run(bot, message, meta) {
    const [{ money }] = await Profile.aggregate([
      { $group: { _id: '', money: { $sum: '$money' } } },
      { $project: { _id: 0, money: '$money' } },
    ]);

    const top5Profiles = await Profile.find({})
      .limit(5)
      .sort({ money: -1 })
      .exec();

    const hanabiProfile = await Profile.findOne({
      _id: '750693579109695638',
    }).exec();

    const hanabiMoney = hanabiProfile.money;

    const top5 = top5Profiles.map((p, i) => {
      const medals = {
        0: ':first_place:',
        1: ':second_place:',
        2: ':third_place:',
        3: ':small_blue_diamond:',
        4: ':small_blue_diamond:',
      };
      // if !u this user does not share a server with Hanabi.
      // TODO: Check profiles database for this user.
      const u = bot.users.cache.get(p._id);
      return `${medals['' + i]}**${u ? u.username : 'Anonymous Hana Flower'}:** ${
        p.money
      }`;
    });

    const msg = [];

    msg.push(`__There is currently **${money}¥** in the economy.__`);
    top5.forEach((top5Person) => msg.push(top5Person));
    msg.push(
      `:blue_heart: And I have **${hanabiMoney}¥** :smiling_face_with_3_hearts:`,
    );

    this.send(...msg, { split: true });
  },
});
