const express = require('express')
const courseController = require('../controllers/courseController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router()

//yeni bir kurs oluşturmak için yapmamız gereken post request göndermek olacak çünkü form dolduracağız
router.route('/').post(roleMiddleware(["teacher", "admin"]), courseController.createCourse) //http://localhost:3000/courses
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
router.route('/enroll').post(courseController.enrollCourse) //kullanıcıya yeni bir kurs eklediğimiz için post yaptık
router.route('/release').post(courseController.releaseCourse)

module.exports = router