const mongoose = require('mongoose');
const Pin = mongoose.model('Pin');

exports.homePage = async (req, res, next) => {
  const pins = await Pin.find();
  res.render('index', {
    title: 'Home',
    pins
  });
}

exports.addPin = (req, res, next) => {
  res.render('addPin', {
    title: 'Add a new Pin'
  });
}

exports.createPin = async (req, res, next) => {
  const newPin = new Pin(req.body);
  await newPin.save();
  res.redirect('/');
}
