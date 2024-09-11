const Product=require('../models/product');
const fs =require('fs');
const path =require('path')

exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: 'admin/edit-product',
        editing: false
    });
};

exports.postAddProduct = (req,res,next) => {
    const title=req.body.title;
    const imageURL=req.body.imageURL;
    const price=req.body.price;
    const description=req.body.description;
    const product=new Product(null,title,imageURL,description,price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req,res,next) => { 
    console.log(req); 
    const editMode = req.query.edit==='true';   
    const prodID=req.params.productId;
    console.log('Product ID:', prodID);
    if(!editMode){  
       return res.redirect('/');
    }
    Product.findByID(prodID, product => {
        if(!product){
            return res.redirect('/'); 
        }
        res.render('admin/edit-product',{
            pageTitle: 'Edit Product',
            path: 'admin/edit-product',  
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req,res,next) =>{
    console.log('eddit product');
    const prodID = req.body.productID;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageURL;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodID,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice
    );
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req,res,next) => {
    Product.fetchAll((products) => {        
        res.render('admin/products',
        {prods:products, 
        pageTitle:'Admin Products',
        path: '/admin/products' ,
    });
    }); 
};

exports.postDeleteProduct = (req, res, next) => {
    const prodID = JSON.parse(req.body.productID);    
    Product.deleteById(prodID);
    res.redirect('/admin/products');
};