const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pinSchema = new Schema({
  name: {
    type: String,
    required: 'Your pin needs a name'
  },
  url: {
    type: String,
    required: 'Your pin needs a URL'
  }
});

module.exports = mongoose.model('Pin', pinSchema);
