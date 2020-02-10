const categoria = require('../models/Categora')
const validationIsParams = require('../utils/validationIsParams')

module.exports = {
    async storeCatergoria(req, res){
        const {name, slug} = req.body
        let erros = validationIsParams(name, slug)
        
        if(erros.length > 0){
                res.render('admin/addCategoria', {erros: erros})
        }
        else{
            await categoria.create({
                name,
                slug: slug.toLowerCase(),
                user: req.user.name
            }).then(()=>{ 
                req.flash('success_msg',"Categoria criada com sucesso!" )
                res.redirect('/admin/categoria')
            }).catch(()=>{
                req.flash('err_smg', "Houve um erro ao salvar a categoria, tente novamente!")
                req.redirect('/admin')
            })
        }
    }
}