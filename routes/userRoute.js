const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.route('/signup').post(authController.createUser) // http://localhost:3000/user/signup
router.route('/login').post(authController.logInUser)
router.route('/logout').get(authController.logOutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage) //http://localhost:3000/user/dashboard //kodaciklamasi: 'eğer authMiddlewware okeyse getDashboardPage'e geç'

module.exports = router;