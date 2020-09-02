const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
  _id: {
    required: true,
    type: String,
  },
});

module.exports = model('profile', profileSchema);
