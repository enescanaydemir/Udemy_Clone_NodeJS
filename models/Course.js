const mongoose = require('mongoose')
const slugify = require('slugify')
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
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

CourseSchema.pre('validate', function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next();
})


const Course = mongoose.model('Course', CourseSchema) //yukarıda oluşturduğumuz şablonu modele çevirdik
module.exports = Course