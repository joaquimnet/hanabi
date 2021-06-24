const mongoose = require('mongoose');

const Hanabi = require('./hanabi');

const { Schema } = mongoose;

const ideaSchema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    ideaId: {
      type: Number,
      // required: true,
      unique: true,
    },
    title: {
      type: String,
      minlength: 3,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, optimisticConcurrency: true },
);

ideaSchema.pre('save', async function preSave(next) {
  // get next id
  const hanabiConfig = await Hanabi.findOne({})
    .select('stats.currentIdeaId')
    .exec();
  // @_@
  const nextId = hanabiConfig.stats.currentIdeaId + 1;
  this.ideaId = nextId;
  hanabiConfig.stats.currentIdeaId += 1;
  await hanabiConfig.save();
  next();
});

ideaSchema.methods.display = function display() {
  return `:white_flower::arrow_right:**[${this.ideaId}]** ${this.title}`;
};

// TODO: Add mongoose-unique-validator
module.exports = mongoose.model('Idea', ideaSchema);
