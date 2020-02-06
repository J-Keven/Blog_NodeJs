const Posts = require('../models/post')
const Categorie = require('./reloadCategorias')

module.exports = {
    async reloadAll(){
        return await Posts.find().populate('categorie').sort({date: "desc"})
    },
    async reloadId(req, res){
        Categorie.reload().then((categories) => {
            Posts.findById(req.params).then((post) => {
                res.render('admin/editPost', {post: {
                    _id: post._id,
                    title: post.title,
                    slug: post.slug,
                    description: post.description,
                    content: post.content  
                },
                categorie: categories.map( item => {
                    return {
                        id: item._id,
                        name: item.name
                    }
                })
            })
            }).catch((err)=>{
                req.flash("err_msg", "houve um erro ao carregar os dados do post!")
                res.rendirect("/admin/posts")    
            })
        }).catch((err) => {
            req.flash("err_msg", "houve um erro ao listar as categorias!")
            res.rendirect("/admin/posts")
        })
        
    }
}