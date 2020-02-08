const express = require('express')
const router = express.Router()

const categoriaCOntroller = require('../controllers/CategoriaController')
const reloadCategorias = require('../controllers/reloadCategorias')
const saveEdition = require("../controllers/SaveEditions")
const deleteCategoria = require('../controllers/deleteCategorie')
const postSave = require('../controllers/postSave')
const reloadPosts = require('../controllers/reloadPosts')
const deletePost = require('../controllers/deleteposts')
const Posts = require('../models/post')
const categoria = require('../models/Categora')

router.get('/',(req, res)=>{
    reloadPosts.reloadAll().then((posts) => {
        res.render('index', {
            posts: posts.map(item => {
                return {
                    _id: item._id,
                    title: item.title,
                    description: item.description,
                    content: item.content,
                }
            })
        })
    }).catch((err) => {

    })
})

router.get('/posts', (req, res)=>{
    reloadPosts.reloadAll().then((posts) =>{
        res.render('admin/posts', {posts: posts.map( post => {
            return {
                id: post._id,
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: post.content,
                categorie: post.categorie.name,
                date: post.date
            }
        })})
    })
})


router.get('/posts/add', (req, res)=>{
    reloadCategorias.reload().then((categories)=>{
        res.render('admin/addPost', {categories: categories.map(item=>{
            return {id: item._id, name: item.name, slug: item.slug, date: item.date}
        })
    })
}).catch((err)=>{
    req.flash("err_msg", "Houve um erro ao carregar as categorias, tente novamente!!")
    res.redirect('/admin')
})
})

router.post('/posts/new', postSave.storePost)

router.post('/posts/delete', deletePost.deletePost)

router.get('/posts/edit/:_id', reloadPosts.reloadId)

router.post('/posts/saveEditions', postSave.saveEditionsPost)

router.get('/categoria', (req, res)=>{
    reloadCategorias.reload().then((categories)=>{
            res.render('admin/categoria', {categories: categories.map( item => {
                return {id: item._id, name: item.name, slug: item.slug, date: item.date}
                })
            })
        }).catch((err)=>{
            req.flash('err_msg', "Houve um erro ao carregar as categorias!")
            res.redirect('/admin')
        })
})

router.get('/categoria/add', (req, res)=>{
    res.render('admin/addCategoria')
})

router.post('/categoria/new',categoriaCOntroller.storeCatergoria)

router.get('/categoria/edit/:_id', reloadCategorias.reloadId)

router.post('/categoria/edition/:id', saveEdition.Save)

router.post('/categoria/delete/', deleteCategoria.delete)

router.get('/cadastre-se', (req, res) =>{
    res.send("Paina de cadastro")
})

router.get('/login', (req, res) =>{
    res.render('user/login')
})

router.get('/leiamais/:_id', (req, res)=>{
    Posts.findOne(req.params).populate('categorie').then((post) =>{
        res.render('admin/PostSaibaMais', {post: {
            title: post.title,
            slug: post.slug,
            description: post.description,
            content: post.content,
            categorie: post.categorie.name,
            date: post.date
        }})
    }).catch()
})

router.post('/SearchPosts', (req, res) =>{
    categoria.findOne({slug: req.body.slug.toLowerCase()}).then((categorias) => {
        if(categorias){         
            Posts.find({categorie: categorias._id}).then((posts) =>{
                res.render('categorias/index', {posts: posts.map(item =>{
                    return {
                        _id: item._id,
                        title: item.title,
                        description: item.description
                    }
                })})
            })
        }
        else{
            req.flash('err_msg', "Esta Categoria nao existe")
            res.redirect('/admin')
        }
    })
})
module.exports = router