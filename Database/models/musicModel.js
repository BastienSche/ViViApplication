const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
  title: { type: String, required: false },
  url: { type: String, required: true },
  status: { type: String, enum: ['waiting', 'playing', 'played'], default: 'waiting' },
});

module.exports = mongoose.model('Music', musicSchema);
