const express = require('express');
const pageRoute = require('./routes/pageRoute')

const app = express();

//Template Engine
app.set("view engine", "ejs") //template engine'imizin ejs olduğunu belirttik


//Middlewares
app.use(express.static("public")) //statik dosyalarımızı belirttik


//ROUTES(YÖNLENDİRMELER)
app.use('/', pageRoute) //index url isteği geldiğinde pageRoute kullanmasını söylüyoruz


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})