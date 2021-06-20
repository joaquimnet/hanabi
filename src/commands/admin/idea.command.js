const { Command, TextHelpers: Text } = require('sensum');

const Prompter = require('chop-prompter');

const Idea = require('../../models/idea');

module.exports = new Command({
  name: 'idea',
  description: 'Ideas, duh~',
  category: 'admin',
  aliases: ['ideas', 'todo', 'todos'],
  // args: ['action'],
  // delete: false,
  hidden: true,
  cooldown: 0,
  args: {
    command: {
      type: 'enum',
      values: [
        'add',
        'new',
        '+',
        'mine',
        'list',
        'me',
        'my',
        'edit',
        'change',
        'upgrade',
        'remove',
        'delete',
        'del',
        'rem',
        'erase',
      ],
    },
  },
  // kaffe roasted me :(
  usage: '{your action} [your idea]',
  examples: ['add Eat candy.', 'edit 5', 'delete 5', 'mine'],
  async run(bot, message, meta) {
    const { args } = meta;
    // helper function to check the first argument.
    const theCommandIs = (cmd) => {
      if (Array.isArray(cmd)) {
        return cmd.some(
          (c) => args.command && args.command.toLowerCase() === c.toLowerCase(),
        );
      }
      return args.command && cmd.toLowerCase() === args.command.toLowerCase();
    };

    // will list all ideas
    if (!args.command) {
      const ideas = await Idea.find({});

      if (!ideas.length) {
        this.send('There are no ideas yet. :c');
        return;
      }
      this.send(
        bot.lines(
          `Commands: __add__ __list__ __delete__ | All ideas: ${ideas.length}`,
          ...ideas.map((i) => i.display()),
          `__For help use ${this.client.options.prefix}help idea__`,
        ),
        { split: true },
      );
      return;
    }

    // Add new idea
    if (theCommandIs(['add', 'new', '+'])) {
      if (!meta.content) {
        this.send('What is your idea tho? :c');
        return;
      }
      const yourIdea = meta.content;
      if (yourIdea.length > 500) {
        this.send('Are you serious? :neutral_face:\nThat idea is too long!!');
        // ya know what else is too long? 😏
        return;
      }
      const newIdea = new Idea({
        title: yourIdea,
        creator: meta.userId,
      });
      await newIdea.save();
      this.send(bot.lines('**DONE** Idea added! :)', newIdea.display()));
      return;
    }

    // MY ideas
    if (theCommandIs(['mine', 'list', 'me', 'my'])) {
      const myIdeas = await Idea.find({ creator: message.author.id });
      if (!myIdeas.length) {
        this.send("You don't have any ideas yet. :c");
        return;
      }
      const customPrefix = meta.settings.prefix;
      const defaultPrefix = bot.config.defaultSettings.prefix;
      this.send(
        bot.lines(
          `Commands: __add__ __list__ __delete__ | You have: ${myIdeas.length} ideas!`,
          ...myIdeas.map((i) => i.display()),
          `__For help use ${customPrefix ?? defaultPrefix}help idea__`,
        ),
        { split: true },
      );
    }

    // edit idea
    if (theCommandIs('edit', 'change', 'upgrade')) {
      const [id] = Text.numbers(meta.content);
      if (!id) {
        this.send('The id must be a valid number!');
        return;
      }
      const ideaToEdit = await Idea.findOne({ ideaId: id }).exec();
      if (!ideaToEdit) {
        this.send('I could not find an idea with that id. :c');
        return;
      }
      let res = await Prompter.confirm({
        channel: message.channel,
        userId: meta.userId,
        question: bot.lines(
          'Would you like to edit this idea?',
          ideaToEdit.display(),
        ),
      });
      if (res === true) {
        res = await Prompter.message({
          channel: message.channel,
          userId: meta.userId,
          question: 'What would you like the idea to say?',
          deleteMessage: false,
          timeout: 60000,
        });
        if (!res || !res.first()) {
          this.send('Okay then.');
          return;
        }
        const ideaContent = res.first();
        if (ideaContent.length > 500) {
          this.send('Are you serious? :neutral_face:\nThat idea is too long!!');
          // ya know what else is too long? 😏
          return;
        }
        ideaToEdit.title = ideaContent;
        await ideaToEdit.save();
        this.send(bot.lines('**DONE** Idea updated! :)', ideaToEdit.display()));
      } else if (res === false || res === null) {
        this.send('Okay then.');
      }
      return;
    }

    // delete idea
    if (theCommandIs(['remove', 'delete', 'del', 'rem', 'erase'])) {
      const [id] = Text.numbers(meta.content);
      if (!id) {
        this.send('The id must be a valid number!');
        return;
      }
      const ideaToDelete = await Idea.findOne({ ideaId: id }).exec();
      if (!ideaToDelete) {
        this.send('I could not find an idea with that id. :c');
        return;
      }
      await ideaToDelete.remove();
      this.send('I have deleted your requested idea.');
    }
  },
});
