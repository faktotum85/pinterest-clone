const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');


router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { successRedirect: '/',
                                                             failureRedirect: '/' }));

router.get('/logout', userController.logOut);

module.exports = router;
