const categoria = require('../models/Categora')

module.exports = {
    async storeCatergoria(req, res){
        let erros = []
        const {name, slug} = req.body
        if(!name){
            erros.push({
                texto: "Nome inválido!"
            })
        }
        if(!slug){
            erros.push({
                texto: "slug inválido!"
            })
        }
        if(name.length < 2){
            erros.push({
                texto: "Nome da categoria é muiro curto!"
            })
        }
        if(erros.length > 0){
                res.render('admin/addCategoria', {erros: erros})
        }
        else{
            await categoria.create({
                name,
                slug,
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