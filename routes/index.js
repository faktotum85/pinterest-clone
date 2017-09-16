const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinController');
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', catchErrors(pinController.homePage));
router.get('/add', pinController.addPin);
router.post('/add', catchErrors(pinController.createPin));

module.exports = router;
