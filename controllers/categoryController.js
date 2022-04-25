//category ye ait controller dosyası. Bu dosyada, category oluşturmayı, silmeyi, değiştirmeyi fonksiyonel olarak burada yapacağız

const Category = require('../models/Category')

//new course create function
exports.createCategory = async(req, res) => {

    try {
        const category = await Category.create(req.body)

        res.status(201).json({
            status: 'success',
            category,
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }
}