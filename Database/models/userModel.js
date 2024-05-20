const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseToken: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);