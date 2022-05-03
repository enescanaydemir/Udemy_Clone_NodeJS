//Bu middleware fonksiyonunun diğerlerinden farkı, öncekilerde req, res döndürüyorduk ancak bu fonksiyonda bizim ilk önce kullanıcı kontrolünü yapmamız gerekiyor daha sonra istek gönderip cevap almamız gerekiyor.
module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role; //burada userRole değişkenine, ön yüzde yazdığımız ve body yani create sayfasındaki bilgileri gönderiyoruz. burada yazılan role ise front-end klasöründe teacher - student seçeneklerini verdiğimiz bölümün name'inden geliyor orada verdiğimiz name ile uyuşmak zorunda yoksa seçeneklerin seçilmesi bir işe yaramaz.
        if (roles.includes(userRole)) { // kodaciklama: eğer roles(teacher,admin), girilen rollere(userRole) denk ise devam et. Değil ise yani student ise yetki verilmez yani else ile devam eder.
            next()
        } else {
            return res.status(401).send('YOU CANT DO IT')
        }
    }
}