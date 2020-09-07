const channelRegex = /(?<=<#)(\d+?)(?=>)/g;

module.exports = (message) => {
  const channelsInMessage = message.content.match(channelRegex) || [];

  const channelsInGuild = message.guild.channels.cache.filter(
    (c) => c.type === 'text',
  );

  const channels = channelsInMessage
    // remove duplicates
    .filter((v, i, a) => a.indexOf(v) === i)
    // get the channels
    .map((c) => channelsInGuild.get(c))
    // remove falsy values
    .filter((c) => !!c);

  return channels;
};
