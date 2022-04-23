const express = require('express');

const app = express();

//Template Engine
app.set("view engine", "ejs") //template engine'imizin ejs olduğunu belirttik


//Middlewares
app.use(express.static("public")) //statik dosyalarımızı belirttik


//ROUTES(YÖNLENDİRMELER)
app.get('/', (req, res) => {
    res.status(200).render('index', {
        page_name: "index"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        page_name: "about"
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`App started on port ${port}`)
})