const User = require('../models/User') //kullanıcı modelini import ettik

module.exports = (req, res, next) => {
    User.findById(req.session.userID, (err, user) => { // findById ile kullanıcıların id sine göre listeledik ve session ile ID ye göre sıralama yaptık.
        if (err || !user) return res.redirect('/login') //kodaciklama: 'eğer, hata verirse veya kullanıcı yok ise login sayfasına yönlendir'
        next();
    })
}


/* 
    -SAYFANIN AMACI VE SAYFADA YAPILANLAR-
- Kullanıcı yetkisi olmayan bir linke(dashboard) girmeye çalıştığı zaman onu redirect edecek yani başka sayfaya(login) yönlendirecek bir olay tanımlayacağız
- Yetkisi olup olmadığını da kullanıcıyı yakalayarak anlayacağız
- Yukarıda yaptığımız kullanıcı giriş yapmadığı halde dashboard yani "kullanıcı özel" sayfasına giriş yapmaya çalıştığında "login" sayfasına yönlendirdik.
*/