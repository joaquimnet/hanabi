const { EventHandler } = require('sensum');

const Listener = require('./listener.model.v1');

module.exports = new EventHandler({
  name: 'ready',
  async run(bot) {
    const listenerList = bot.botListeners.array();
    const listenerNames = listenerList.map((l) => l.makeName());

    await Listener.bulkWrite(
      listenerList
        .map((listener, i) => {
          return {
            updateOne: {
              filter: { _id: listener.makeName() },
              update: {
                _id: listener.makeName(),
                name: listener.makeName(),
                words: listener.words,
                category: listener.category,
                slug: listener.category + '-' + String(i).padStart(3, '0'),
                cooldown: listener.cooldown,
                permission: listener.permission ?? 0,
                globalCooldown: listener.globalCooldown ?? 0,
                priority: listener.priority ?? 0,
                maxMessageLength: listener.maxMessageLength,
              },
              upsert: true,
            },
          };
        })
        .concat({
          deleteMany: {
            filter: { _id: { $nin: listenerNames } },
          },
        }),
    );
  },
});
