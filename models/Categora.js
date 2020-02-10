const mongoose = require('mongoose')

const CategoriaSchema = new mongoose.Schema({
    name: String,
    slug: String,
    user: String,
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Categoria', CategoriaSchema);  