module.exports = (name, slug)=>{
    let erros = []
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
    return erros
}