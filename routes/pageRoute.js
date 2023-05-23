const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndex);
router.route('/about').get(pageController.getAbout);
router.route('/register').get(redirectMiddleware, pageController.getRegister);
router.route('/login').get(redirectMiddleware, pageController.getLogin);
router.route('/contact').get(pageController.getContact);
router.route('/contact').post(pageController.sendEmail);

module.exports = router;
