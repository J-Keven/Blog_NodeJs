const posts = require("../models/post")

module.exports = {
    async deletePost(req, res){
        await posts.remove({_id: req.body.id}).then(()=>{
            req.flash("success_msg", "Post deletado com sucesso!")
            
        }).catch((err)=>{
            req.flash("err_msg", "Houve um erro ao deletar o post, tente novamente!")
        })
        res.redirect('/admin/posts')
    }
}