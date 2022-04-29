// Bu sayfada, Yeni bir user oluşturma işlemini fonksiyonel olarak ayarlayacağız. Bu fonksiyonu çalıştırmak için 'userRoute.js' adında bir route oluşturduk
const User = require('../models/User')
const bcrypt = require('bcrypt')

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

exports.loginUser = (req, res) => {
    try {
        const { email, password } = req.body //email ve pass'ı body den yakaladık

        User.findOne({ email: email }, (err, user) => { //emailin hangi user'a ait olduğunu bulduk. datadan gelen email ile login ekranından gelen emaili eşitledik aslında burda ({email: email}) olarak yazdık ancak aynı oldukları için sadece ({email}) yazmamız yeterli oluyor.
            if (user) { //bu koşul satırı içerisinde "kullanıcı var ise kullanıcının şifresi ile girilen şifrenin eşit olup olmadığını" kontrol ettik. Ayrıca bunun için bcrypt'den faydalandık
                bcrypt.compare(password, user.password, (err, same) => { //compare() = bcrypt'nin karşılaştırma fonksiyonu. İçerisinde parametre olarak ilk parametre girilen password, ikinci parametre olarakta datada bulunan user'ın password kısmını karşılaştırdık
                    if (same) {
                        res.status(200).send('YOU ARE LOGED IN') //Bu kısımda kullanıcı giriş yaptıktan sonra kullanıcının profiline yönlendirilicek ancak şuan o ekran olmadığı için yani USER SESSION olmadığı için şimdilik mesaj gönderiyoruz
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}