// importando os modulos
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const handleBars = require('express-handlebars');
const session = require('express-session')
const flash = require('connect-flash')
const passport = require("passport")

require('./config/auth')(passport)

const adminRouters = require('./routes/admin')
const usersRouters = require('./routes/user')
const reloadPosts = require('./controllers/reloadPosts')
const categoria = require('./models/Categora')
const Posts = require('./models/post')
const path = require('path')

const app = express()

mongoose.connect("mongodb+srv://keven:jhonas4313@cluster0-vvpyt.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{26
    console.log('Conectado com sucesso')
}).catch((err)=>{
    console.log(`Erro: ${err}`)
})

// sessões
app.use(session({
    secret: 'curosodenode',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.err_msg = req.flash('err_msg')
    res.locals.error = req.flash('error')
    res.locals.login = req.user || null
    next()
})

// configurações do body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// configurações do handlebars
app.engine('handlebars', handleBars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

// configurando express.static
app.use(express.static(path.join(__dirname,'public')))

// rotas

app.get('/',(req, res)=>{
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

app.post('/SearchPosts', (req, res) =>{
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

app.get('/leiamais/:_id', (req, res)=>{
    Posts.findOne(req.params).populate('categorie').then((post) =>{
        res.render('admin/PostSaibaMais', {post: {
            title: post.title,
            slug: post.slug,
            description: post.description,
            content: post.content,
            categorie: post.categorie.name,
            date: post.date,
            userName: post.user
        }})
    }).catch()
})

app.use('/admin', adminRouters)
app.use('/user', usersRouters)

// definindo a porta

const PORT = ( process.env.PORT || 3000 )
app.listen(PORT, ()=>{
    console.log(`O serever esta rodando no endereço: http://localhost:${PORT}`)
})