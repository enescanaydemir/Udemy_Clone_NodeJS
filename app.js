const express = require('express');
const pageRoute = require('./routes/pageRoute')
const mongoose = require('mongoose')
const courseRoute = require('./routes/courseRoute')


const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/udemyclone-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('DB Connected Successfly')
})


//Template Engine
app.set("view engine", "ejs") //template engine'imizin ejs olduğunu belirttik


//Middlewares
app.use(express.static("public")) //statik dosyalarımızı belirttik


//ROUTES(YÖNLENDİRMELER)
app.use('/', pageRoute) //index url isteği geldiğinde pageRoute kullanmasını söylüyoruz
app.use('/courses', pageRoute)


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})