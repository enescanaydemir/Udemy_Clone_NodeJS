const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router()

//yeni bir kurs oluşturmak için yapmamız gereken post request göndermek olacak çünkü form dolduracağız
router.route('/').post(courseController.createCourse) //http://localhost:3000/courses
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)

module.exports = router