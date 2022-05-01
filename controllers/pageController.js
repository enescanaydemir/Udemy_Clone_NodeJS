// Sayfa gösterimi dosyası

exports.getIndexPage = (req, res) => {
    console.log(req.session.userID) //her index sayfasına geldiğinde hangi kullanıcı session da ise yani giriş yapan kullanıcının id'sini console'a yazdıracak 
    res.status(200).render('index', {
        page_name: "index" //sayfa başlığı
    })
}


exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about" //sayfa başlığı
    })
}

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register' //sayfa başlığı
    })
}

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login' //sayfa başlığı
    })
}