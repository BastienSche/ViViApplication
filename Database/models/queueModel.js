const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  musics: [{ type: String, required: true }], // Changed to String
});

module.exports = mongoose.model('Queue', queueSchema);
