module.exports = (client, message) => {
  if (message.author.id !== '554152090411466754') {
    message.channel
      .send(':no_entry_sign: Only Blu can use this command! >:c')
      .then((msg) => {
        client.setTimeout(() => {
          msg.delete().catch(() => {});
        }, 3000);
      });
    return true;
  }
  return false;
};
