/*
app -> ORM -> database
Habambi -> Mongoose -> MongoDB
*/
const { model, Schema } = require('mongoose');

const schema = new Schema({
  schemaVersion: { type: Number, default: 1 },
  content: {
    type: String,
    required: true,
  },
  fireDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userTag: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
});
// mm/dd//yyyy dd/mm/yyyy yyyy/mm/dd => date format

module.exports = model('reminder', schema);
