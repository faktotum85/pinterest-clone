const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(pinController.allPins));
router.get('/user/:userId', catchErrors(pinController.userPins));
router.get('/add', isAuthenticated, pinController.addPin);
router.post('/add', isAuthenticated, catchErrors(pinController.createPin));
router.get('/delete/:pinId', isAuthenticated, catchErrors(pinController.deletePin));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('info', 'You need to be logged in to do that');
  res.redirect('/');
};

module.exports = router;
