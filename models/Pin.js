const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = mongoose.model('User');

const pinSchema = new Schema({
  name: {
    type: String,
    required: 'Your pin needs a name'
  },
  url: {
    type: String,
    required: 'Your pin needs a URL'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Pin', pinSchema);
