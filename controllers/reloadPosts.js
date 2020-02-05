const Posts = require('../models/post')

module.exports = {
    async reloadAll(){
        return await Posts.find().populate('categorie').sort({date: "desc"})
    }
    
}