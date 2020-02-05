const Post = require('../models/post')

module.exports = {
    async storePost(req, res){
        const { title, slug, description, content, categorie } = req.body
        let err = []
        if(categorie == "0"){
            err.push({
                text: "Nenhuma categoria cadastrada, por favor cadastre uma categoria antes!"
            })
        }

        if(err.length > 0){
            res.render('admin/addPost',{err: err})
        }
        else{
            await Post.create({
                title,
                slug,
                description,
                content,
                categorie,
            }).then(()=>{
                req.flash("success_msg", "Post cadastrar com suucesso!")
                res.redirect('/admin/posts')
            }).catch((err)=>{
                req.flash("err_msg", "Erro ao cadastrar o post. Por favor tente novamente!");
            })
        }
    }
}