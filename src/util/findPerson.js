const { User, GuildMember } = require('discord.js');
// this looks right
// i worked rlly hard on this function, its a work of art.
module.exports = async (person, message) => {
  if (!person) return undefined;

  if (person instanceof GuildMember && !person.user.bot) {
    return person.user;
  }

  if (person instanceof User) {
    if (person.bot) return undefined;
    return person;
  }

  if (person.bot) return undefined;

  if (person && person.user) {
    if (person.user.bot) {
      return undefined;
    }
    return person.user;
  }

  let guildie;
  if (typeof person === 'string') {
    try {
      guildie = await message.guild.members.fetch(person);
      if (!guildie)
        guildie = await message.guild.members.fetch({
          query: person,
          limit: 1,
        });
    } catch {
      return undefined;
    }
  }

  if (guildie && guildie.user.bot) return undefined;
  if (guildie && guildie.user) return guildie.user;

  return undefined;
};
