const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    _id: {
      required: true,
      type: String,
    },
    flower: {
      count: { type: Number, default: 0 },
      time: { type: Date, default: new Date('1970-01-01') },
    },
    daily: {
      count: { type: Number, default: 0 },
      time: { type: Date, default: new Date('1970-01-01') },
    },
    bets: {
      // count: { type: Number, default: 0 },
      time: { type: Date, default: new Date('1970-01-01') },
    },
    money: {
      type: Number,
      required: true,
      default: 0,
    },
    anilistId: {
      type: Number,
      required: false,
    },
    flags: {
      hasReceivedFirstDM: {
        type: Boolean,
        required: true,
        default: false,
      },
      canReceiveDMs: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
    achievements: [
      {
        _id: { type: String, required: true },
        achievement: { type: String, ref: 'achievement' },
        achievementGroup: { type: String, required: true },
        progress: { type: Number, required: true, default: 0 },
        completedAt: { type: Date, default: null },
        claimedReward: { type: Boolean, required: true, default: false },
      },
    ],
    ideas: [
      {
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
    ],
  },
  { timestamps: true },
);

/**
 * Currency methods
 */

profileSchema.methods.setMoney = async function (bot, amount) {
  const newAmount = Math.floor(Math.abs(amount));
  await mongoose
    .model('profile', profileSchema)
    .updateOne({ _id: this._id }, { money: newAmount });
  return true;
};

profileSchema.methods.giveMoney = async function (bot, amount) {
  const newAmount = this.money + Math.floor(amount);
  await mongoose
    .model('profile', profileSchema)
    .updateOne({ _id: this._id }, { money: newAmount });
  return newAmount;
};

profileSchema.methods.takeMoney = async function (bot, amount) {
  const newAmount = this.money - Math.floor(amount);
  await mongoose
    .model('profile', profileSchema)
    .updateOne({ _id: this._id }, { money: newAmount < 0 ? 0 : newAmount });
  return newAmount < 0 ? 0 : newAmount;
};

profileSchema.methods.transferMoney = async function (bot, targetId, amount) {
  const transferredAmount = Math.floor(Math.abs(amount));
  if (transferredAmount > this.money) {
    throw new Error(
      `Tried to transfer ${transferredAmount} from ${this.userId} to ${targetId} but current balance is ${this.money}.`,
    );
  }

  await mongoose
    .model('profile', profileSchema)
    .updateOne({ _id: this._id }, { money: this.money - transferredAmount });

  const target = await bot.getProfile(targetId);
  await mongoose
    .model('profile', profileSchema)
    .updateOne(
      { _id: target._id },
      { money: target.money + transferredAmount },
    );

  return [this.money - transferredAmount, target.money + transferredAmount];
};

profileSchema.methods.getAchievementProgress = function getAchievementProgress(
  flag,
) {
  return this.achievements.find((doc) => doc.achievement === flag);
};

// Statics
profileSchema.statics.getOrCreate = async function getOrCreate(userId) {
  let profile;
  try {
    profile = await this.findOne({ _id: userId });
    if (profile) {
      return profile;
    }
    // eslint-disable-next-line new-cap
    profile = new mongoose.model('profile', profileSchema)({ _id: userId });
    await profile.save();
    return profile;
  } catch (err) {
    err.stack =
      `[Profile/getProfile] Could not get profile for id: ${userId}\n` +
      err.stack;
    throw err;
  }
};

module.exports = model('profile', profileSchema);
