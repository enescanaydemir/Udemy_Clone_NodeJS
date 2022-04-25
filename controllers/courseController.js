const Course = require('../models/Course')

//new course create function
exports.createCourse = async(req, res) => {

    try { //hata yakalamak için try-catch kullandık
        const course = await Course.create(req.body)

        res.status(201).json({ // Bu kısumda postman üzerinden yaptığımız data testinde bize geri dönüş sağlaması için bir kontrol yazdık. 
            status: 'success',
            course
        })
    } catch (error) { //yanlış ise data testinde burası çıkacak.
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}

//Tüm kursları sıralama
exports.getAllCourses = async(req, res) => {

    try {
        const courses = await Course.find();

        res.status(200).render('courses', {
            courses,
            page_name: 'courses',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}