const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')

//new course create function
exports.createCourse = async(req, res) => {

    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID //Hangi kullanıcının giriş yaptığını session içerisindeki userID'den alıp ayrımını yapacağız. Yani bu kısmını, kurs oluşturulduğunda hangi user oluşturuldu onu bulmak için yapıyoruz.
        })

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
        const course = await Course.findOne({ slug: req.params.slug }).populate('user')

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


exports.enrollCourse = async(req, res) => {

    try {

        const user = await User.findById(req.session.userID) //ilgili user bulunuyor
        await user.courses.push({ _id: req.body.course_id }) //ilgili user ın kurslar bölümüne yeni kursu ekliyor
        await user.save() //kullanıcıyı kaydediyor

        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}