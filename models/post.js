const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    content: String,
    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Posts", postSchema);