const categoria = require('../models/Categora')

module.exports = {
    async reload(req, res){
        await categoria.find().sort({date:'desc'}).then((categorias)=>{
            res.render('admin/categoria', {categorias: categorias.map( item => {
                return {name: item.name, slug: item.slug, date: item.date}
                })
            })
        }).catch((err)=>{
            req.flash('err_msg', "Houve um erro ao carregar as categorias!")
            res.redirect('/admin')
        })
    }
}