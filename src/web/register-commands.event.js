const { EventHandler } = require('sensum');

const Command = require('./command.model.v1');

module.exports = new EventHandler({
  name: 'ready',
  async run(bot) {
    const commandList = bot.commands.array();
    const commandNames = [...bot.commands.keys()];

    await Command.bulkWrite(
      commandList
        .map((command) => {
          return {
            updateOne: {
              filter: { _id: command.name },
              update: {
                _id: command.name,
                name: command.name,
                description: command.description,
                category: command.category,
                usage: command.usage ?? '',
                help: command.help ?? '',
                permission: command.permission ?? 0,
                cooldown: command.cooldown ?? 3,
                aliases: command.aliases ?? [],
                runIn: command.runIn ?? ['text'],
                examples: command.examples ?? [],
                args: command.args ?? {},
                delete: command.delete ?? false,
                hidden: command.hidden ?? false,
              },
              upsert: true,
            },
          };
        })
        .concat({
          deleteMany: {
            filter: { _id: { $nin: commandNames } },
          },
        }),
    );
  },
});
