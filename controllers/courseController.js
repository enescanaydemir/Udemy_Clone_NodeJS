const Course = require('../models/Course')
const Category = require('../models/Category')

//new course create function
exports.createCourse = async(req, res) => {

    try { //hata yakalamak için try-catch kullandık
        const course = await Course.create(req.body)

        res.status(201).redirect('/courses')

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

        const categorySlug = req.query.categories; //query den gelen parametreyi(categories) yakalıyoruz. 

        const category = await Category.findOne({ slug: categorySlug })

        let filter = {};

        if (categorySlug) {
            filter = { category: category._id }
        }


        const courses = await Course.find(filter).sort('-createdAt')
        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}

//Kurs sayfasının linkine gitme
exports.getCourse = async(req, res) => {

    try {
        const course = await Course.findOne({ slug: req.params.slug }) //findOne = id yerine slug kullandığımız için findById yerine findOne yazdık.

        res.status(200).render('course', {
            course,
            page_name: 'courses',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}