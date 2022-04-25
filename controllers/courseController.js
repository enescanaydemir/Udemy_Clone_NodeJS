const Course = require('../models/Course')

//new course create function
exports.createCourse = async(req, res) => {
    const course = await Course.create(req.body)

    try { //hata yakalamak için try-catch kullandık
        res.status(201).json({ // Bu kısumda postman üzerinden yaptığımız data testinde bize geri dönüş sağlaması için bir kontrol yazdık. 
            status: 'success',
            course
        })
    } catch { //yanlış ise data testinde burası çıkacak.
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}