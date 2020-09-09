const { Command, Permission } = require('@ponatech/bot');

module.exports = new Command({
  name: 'joe',
  description: 'Who is Joe?',
  permission: Permission.USER,
  category: 'funny',
  run(bot, message, meta) {
    meta.respond('Joe Mamma! 😂😂😂😂😂😂😂😂😂😂😂'); // LMAO 😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂 unknown word "LMAO" unknown word
  },
});
//joe mamma
// do it
// i dunno if i remember how
// its been a very long time
// start easy
// write the response over there
// and the description
