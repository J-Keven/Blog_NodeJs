module.exports = (categotieId)=>{
    let err = []
    if(categotieId == "0"){
        err.push({
            text: "Nenhuma categoria cadastrada, por favor cadastre uma categoria antes!"
        })
    }
    return err
}