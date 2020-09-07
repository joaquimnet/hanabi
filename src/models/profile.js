const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
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
    votes: {
      count: { type: Number, default: 0 },
      countPerMonth: {
        type: Object,
        default: {},
      },
      time: { type: Date, default: new Date('1970-01-01') },
    },
    money: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

/**
 * Currency methods
 */

profileSchema.methods.setMoney = async function (bot, amount) {
  const newAmount = Math.floor(Math.abs(amount));
  await mongoose
    .model('profile')
    .updateOne({ _id: this._id }, { money: newAmount });
  await bot.profiles.refresh(this._id);
  return true;
};

profileSchema.methods.giveMoney = async function (bot, amount) {
  const newAmount = this.money + Math.floor(Math.abs(amount));
  await mongoose
    .model('profile')
    .updateOne({ _id: this._id }, { money: newAmount });
  await bot.profiles.refresh(this._id);
  return newAmount;
};

profileSchema.methods.takeMoney = async function (bot, amount) {
  const newAmount = this.money - Math.floor(Math.abs(amount));
  await mongoose
    .model('profile')
    .updateOne({ _id: this._id }, { money: newAmount < 0 ? 0 : newAmount });
  await bot.profiles.refresh(this._id);
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
    .model('profile')
    .updateOne({ _id: this._id }, { money: this.money - transferredAmount });
  await bot.profiles.refresh(this._id);

  const target = await bot.getProfile(targetId);
  await mongoose
    .model('profile')
    .updateOne(
      { _id: target._id },
      { money: target.money + transferredAmount },
    );
  await bot.profiles.refresh(target._id);

  return [this.money - transferredAmount, target.money + transferredAmount];
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
    profile = new mongoose.model('profile')({ _id: userId });
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
