const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router()

//yeni bir kurs oluşturmak için yapmamız gereken post request göndermek olacak çünkü form dolduracağız
router.route('/').post(courseController.createCourse)
router.route('/').get(courseController.getAllCourses) //kursları listeleyeceğimiz için .get ile çağırdık


module.exports = router