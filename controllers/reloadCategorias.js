const categoria = require('../models/Categora')

module.exports = {
    async reload(req, res){
        await categoria.find().sort({date:'desc'}).then((categorias)=>{
            res.render('admin/categoria', {categorias: categorias.map( item => {
                return {id: item._id, name: item.name, slug: item.slug, date: item.date}
                })
            })
        }).catch((err)=>{
            req.flash('err_msg', "Houve um erro ao carregar as categorias!")
            res.redirect('/admin')
        })
    },

    async reloadId(req, res){
        CategoriaId = await categoria.findById(req.params)
        res.render("admin/editCategoria",{
            CategoriaId: {
                    id: CategoriaId._id, 
                    name: CategoriaId.name, 
                    slug: CategoriaId.slug
                }
            }
        )
    }
}