const mongoose = require('mongoose');
const Pin = mongoose.model('Pin');
const User = mongoose.model('User');

exports.allPins = async (req, res, next) => {
  const pins = await Pin.find().populate('author').exec();
  res.render('index', {
    title: 'All Pins',
    pins
  });
}

exports.userPins = async (req, res, next) => {
  const userId = req.params.userId;
  const pins = await Pin.find({author: userId}).populate('author').exec();
  const author = await User.findById(userId);
  res.render('index', {
    title: `Pins by ${author.twitter.username}`,
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
  newPin.author = req.user._id;
  await newPin.save();
  res.redirect('/');
}

exports.deletePin = async (req, res, next) => {
  const pin = await Pin.findById(req.params.pinId).populate('author').exec();
  if (!(pin.author._id.equals(req.user._id))) {
    req.flash('warning' , `Hands off! That's not your pin`);
    return res.redirect('back');
  }
  await pin.remove();
  req.flash('success', 'Pin has been deleted');
  res.redirect('back');
}
