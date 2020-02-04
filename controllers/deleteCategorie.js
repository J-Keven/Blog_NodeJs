const categories = require('../models/Categora')

module.exports = {
    async delete(req, res){
        categories.deleteOne({_id: req.body.id}).then(()=>{
            req.flash('success_msg', "Categoria deletada com sucesso!")
            res.redirect('/admin/categoria')

        }).catch((err)=>{
            req.flash('err_msg', "Erro ao deleter a categoria, tente novamente!")
            res.redirect('/admin')
            
        })
    }
}