const fs = require('fs');
const path = require('path');
let  products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'))
let  categories = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','categories.json'),'utf-8'));

const firstLetter = require('../utils/firstLetter');


module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            categories,
            firstLetter
        })
    },
    store : (req,res) => {
        
        const {name,description,price,discount,category} = req.body;

        let product = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            discount : +discount,
            category,
            image : req.file ? req.file.filename : 'default.jpg',
            features : []
        }

        products.push(product);

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8');

        return res.redirect('/admin')

    },
    detail : (req,res) => {
    
        return res.render('productDetail',{
            product : products.find(product => product.id === +req.params.id)
        })
    },
    edit : (req,res) => {
        return res.render('productEdit',{
            product : products.find(product => product.id === +req.params.id),
            categories,
            firstLetter,
        })
    },
    update : (req,res) => {
        
        const {name,description,price,discount,category} = req.body;

        let product = products.find(product => product.id === +req.params.id);

        let productModified = {
            id : +req.params.id,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            discount : +discount,
            category,
            image : product.image,
            features : product.features
        }

        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8');

        return res.redirect('/admin')


    },
    search : (req,res) => res.render('admin',{
        title : 'Resultado de la búsqueda',
        categories,
        products : products.filter(product => product.name.toLowerCase().includes(req.query.search.toLowerCase()))
    }),
    filter : (req,res) => res.render('admin',{
        title : 'Categoría: ' + req.query.category,
        categories,
        products : products.filter(product => product.category === req.query.category)
    }),
    destroy : (req,res) => {

        let productsModified = products.filter(product => product.id !== +req.params.id);

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8');

        return res.redirect('/admin')    
    }
}