const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"], //enum: alabileceği değerler.
        default: "student"
    }
})

UserSchema.pre('save', function(next) {
    const user = this //buradaki this "hangi kullanıcı giriş işlemi yapıyorsa o kullanıcıyı yakala" anlamında kullanıldı.
    bcrypt.hash(user.password, 10, (error, hash) => { // ilk çnce aldığımız pass i hash ile şifreliyoruz, daha sonra kaydetmeden çnce hash olarak kaydetmesini söylüyoruz.
        user.password = hash;
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User