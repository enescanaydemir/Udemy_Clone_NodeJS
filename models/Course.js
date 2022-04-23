const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: { //name için sadece veri tipi belirtmek yerine başka özelliklerde vermek için obje olarak tanımladık ve içerisine özellikleri yazdık
        type: String,
        unique: true, //unique: kursların tek bir isimleri olsun istiyoruz yani benzersiz bir isim olacak şartı 
        required: true //required: doldurulması zorunlu alan
    },
    description: { //kurs videolarının tanım kısımları
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Course = mongoose.model('Course', CourseSchema) //yukarıda oluşturduğumuz şablonu modele çevirdik
module.exports = Course