const Post = require('../models/post')
const validationPosts = require('../utils/validationPostsEdit')
const Categories = require('./reloadCategorias')

module.exports = {
    async storePost(req, res){
        const { title, slug, description, content, categorie } = req.body
        const err =  validationPosts(categorie)
        if(err.length > 0){
            Categories.reload().then((categorie) => {
                res.render('admin/addPost',{err: err, categorie: categorie.map(item => {
                    return {
                        id: item._id,
                        name: item.name
                    }
                })})
            })
        }
        else{
            await Post.create({
                title,
                slug,
                description,
                content,
                categorie,
                user: req.user.name
            }).then(()=>{
                req.flash("success_msg", "Post cadastrar com suucesso!")
                res.redirect('/admin/posts')
            }).catch((err)=>{
                req.flash("err_msg", "Erro ao cadastrar o post. Por favor tente novamente!");
            })
        }
    },
    async saveEditionsPost(req, res){
        const { _id, title, slug, description, content, categorie } = req.body
        const err = validationPosts(categorie)
        if(err.length > 0){
            res.render('admin/addPost',{err: err})
        }
        else{   
            Post.findOne({_id:_id}).then((post) =>{
                post.title = title
                post.slug = slug
                post.description = description
                post.content = content
                post.categorie = categorie
                post.save().then(() => {
                    req.flash("success_msg", "Postagem editada com sucesso!")
                    res.redirect('/admin/posts')
                }).catch(() => {
                    req.flash("err_msg", "Erro ao editar a Postagem, tente novamente!")
                    res.redirect('/admin/posts')
                })
            })
        }

    }
}