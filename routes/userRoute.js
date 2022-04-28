//authController dosyasının içerisindeki fonksiyonu çalıştırmak için aşağıda bir router yazdık ve url eklemesi yaptık daha sonra bu router'ı export ettik. Bu router'ı app.js içerisine yazmak için export ettik
const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.createUser) // http://localhost:3000/user/signup

module.exports = router;