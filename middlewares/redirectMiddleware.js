module.exports = (req, res, next) => {
    // aşağıda, 'eğer kullanıcı var ise ana sayfaya yönlendir' dedik.
    if (req.session.userID) {
        return res.redirect('/')
    }
    next();

};





/*
- Bu dosyada da yaptığımız işlem, kullanıcı giriş yaptığında "login" sayfasına veya "create user" sayfasına ulaşamaması lazım çünkü giriş yaptı veya kullanıcı oluşturdu. Bunu engellemek için bir middlware(ara yazılım) yazacağız
- Ayrıyaten yukarıda oluşturduğumuz middleware'i yani bu sayfayı login sayfasına giderken veya create user sayfasına giderken kullanacağız. Yani kullanıcı olmasına rağmne bu sayfalara yönelmek istendiğinde ana sayfaya yönlendirilecekler. Bu kullanma işini de pageRoute sayfasında yapacağız
*/