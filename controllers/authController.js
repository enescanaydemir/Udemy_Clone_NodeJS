// Bu sayfada, Yeni bir user oluşturma işlemini fonksiyonel olarak ayarlayacağız. Bu fonksiyonu çalıştırmak için 'userRoute.js' adında bir route oluşturduk
const User = require('../models/User')

exports.createUser = async(req, res) => {
    try {
        const user = await User.create(req.body); //req.body = form doldurma alanı. body'den bu bilgileri alarak user oluşturacak.

        res.status(201).json({
            status: 'success',
            user,
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}