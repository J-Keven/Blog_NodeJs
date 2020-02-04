const Post = require('../models/post')

module.exports = {
    async storePost(req, res){
        const { title, slug, description, content, categorie } = req.body
        await Post.create({
            title,
            slug,
            description,
            content,
            categorie,
        })
        res.redirect('/admin/posts')
    }
}