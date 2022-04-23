const Course = require('../models/Course')

//new course create function
exports.createCourse = async(req, res) => {
    const course = await Course.create(req.body)

    try { //hata yakalamak için try-catch kullandık
        res.status(201).json({
            status: 'success',
            course
        })
    } catch {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}