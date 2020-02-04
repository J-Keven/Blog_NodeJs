const categoria = require('../models/Categora')

module.exports = {
    async reload(){
        return await categoria.find().sort({date:'desc'})//
    },
    async reloadId(req, res){
        await categoria.findById(req.params).then((CategoriaId)=>{
            res.render("admin/editCategoria",{
                CategoriaId: {
                    id: CategoriaId._id, 
                    name: CategoriaId.name, 
                    slug: CategoriaId.slug
                }
            })
        })
    }
}