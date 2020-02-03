const categoria = require('../models/Categora')
const validationIsParams = require('../utils/validationIsParams')

module.exports = {
    async Save(req, res){
        const { name, slug } = req.body
        const erros = validationIsParams(name, slug)
        const { id } = req.params
        console.log(id)
        if(erros.length > 0){
            res.render('admin/editCategoria', {erros: erros, CategoriaId: {
                id: id,
                name: name,
                slug: slug
            }})
        }
        else{
            categoria.findOne({_id: id}).then((Categora)=>{
                Categora.name = name
                Categora.slug = slug
                Categora.save().then(()=>{
                    req.flash('success_msg', "Categoria editada com sucesso!")
                    res.redirect('/admin/categoria')
                }).catch((err)=>{
                    req.flash('err_msg', "Erro ao editar a categoria, tente novamente!")
                    res.redirect('/admin')
                })
            })
        }
    }
}