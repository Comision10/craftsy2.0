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
    detail : (req,res) => {
    
        return res.render('productDetail',{
            product : products.find(product => product.id === +req.params.id)
        })
    }
}