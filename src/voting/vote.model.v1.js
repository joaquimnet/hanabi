const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    // This will look like: (userId)_(year month)
    _id: { type: String, required: true },
    dating: {
      day: { type: Number, index: true, default: () => new Date().getDate() },
    },
    userId: {
      type: String,
      reference: 'profile',
      required: true,
      index: true,
    },
    voteCount: { type: Number, default: 0 },
    votes: [
      {
        type: { type: String, required: true },
        isWeekend: { type: Boolean, required: true },
        environment: {
          type: String,
          default: process.env.NODE_ENV ?? 'development',
        },
        time: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamp: true },
);

schema.statics.addVote = async function (userId, type, isWeekend) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const Model = model('vote', schema);
  await Model.updateOne(
    {
      'dating.day': day,
      _id: `${userId}_${year}${String(month).padStart(2, '0')}`,
    },
    {
      userId,
      $push: {
        events: {
          type,
          isWeekend,
          time: new Date(),
        },
      },
      $inc: {
        voteCount: 1,
      },
    },
    { upsert: true },
  );
};

module.exports = model('vote', schema);
