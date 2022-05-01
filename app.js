const express = require('express');
const pageRoute = require('./routes/pageRoute')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/udemyclone-db').then(() => {
    console.log('DB Connected Successfly')
})


//Template Engine
app.set("view engine", "ejs") //template engine'imizin ejs olduğunu belirttik


//Global Variable(bu bölümün amacı, kullanıcı giriş yaptığında login kısmını görmesine gerek olmaması veya giriş yapmadığında dashboard kısmını görmemesi gerektiği için o kısımları ayıracağız)
//Global değişkeni global nesnesine bağlayarak oluşturacağız

global.userIn = null


//Middlewares
app.use(express.static("public")) //statik dosyalarımızı belirttik
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ // express-session'ın döküman sayfasında yazan kullanım şekli;
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/udemyclone-db' })
}))

//ROUTES(YÖNLENDİRMELER)
app.use('*', (req, res, next) => {
    userIN = req.session.userID
    next();
})
app.use('/', pageRoute) //index url isteği geldiğinde pageRoute kullanmasını söylüyoruz
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute) // /users olduğu zaman userRoute'u çalıştıracak


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
});