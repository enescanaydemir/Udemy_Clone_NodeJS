const bcrypt = require('bcrypt')
const User = require('../models/User')
const Category = require('../models/Category')

//Yeni bir user oluşturma işlemini fonksiyonel olarak ayarlayacağız. Bu fonksiyonu çalıştırmak için 'userRoute.js' adında bir route oluşturduk
exports.createUser = async(req, res) => {
    try {
        const user = await User.create(req.body); //req.body = form doldurma alanı. body'den bu bilgileri alarak user oluşturacak.

        res.status(201).redirect('/login')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
}

exports.logInUser = (req, res) => {
    try {
        const { email, password } = req.body //email ve pass'ı body den yakaladık

        User.findOne({ email: email }, (err, user) => { //emailin hangi user'a ait olduğunu bulduk. datadan gelen email ile login ekranından gelen emaili eşitledik aslında burda ({email: email}) olarak yazdık ancak aynı oldukları için sadece ({email}) yazmamız yeterli oluyor.
            if (user) { //bu koşul satırı içerisinde "kullanıcı var ise kullanıcının şifresi ile girilen şifrenin eşit olup olmadığını" kontrol ettik. Ayrıca bunun için bcrypt'den faydalandık
                bcrypt.compare(password, user.password, (err, same) => { //compare() = bcrypt'nin karşılaştırma fonksiyonu. İçerisinde parametre olarak ilk parametre girilen password, ikinci parametre olarakta datada bulunan user'ın password kısmını karşılaştırdık
                    if (same) {
                        req.session.userID = user._id //hangi user giriş yapıyorsa onu yakalamak için bu satırı yazıyoruz. userID ile ayrıştırarak buluyoruz.
                        res.status(200).redirect('/users/dashboard') //kullanıcı girişi yapıldıktan sonra ana sayfaya yönlendirilecek
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


exports.logOutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getDashboardPage = async(req, res) => {
    const user = await User.findOne({ _id: req.session.userID })
    const categories = await Category.find(); //tüm kategorileri çağırıp categories isimli değişkene atadık. Daha sonra bu categories yani bütün kategorileri dashboard'a gönderdik. Daha sonra dashboard içerisinde ilgili template içerisinde categories'i yakaladık.
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories
    })
}