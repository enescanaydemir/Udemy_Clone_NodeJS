const express = require('express');
const pageRoute = require('./routes/pageRoute')
const mongoose = require('mongoose')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')


const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/udemyclone-db').then(() => {
    console.log('DB Connected Successfly')
})


//Template Engine
app.set("view engine", "ejs") //template engine'imizin ejs olduğunu belirttik


//Middlewares
app.use(express.static("public")) //statik dosyalarımızı belirttik
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//ROUTES(YÖNLENDİRMELER)
app.use('/', pageRoute) //index url isteği geldiğinde pageRoute kullanmasını söylüyoruz
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
});