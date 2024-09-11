const { render } = require('pug');
const Product=require('../models/product');
const Cart=require('../models/cart');



exports.getProducts=(req, res, next)=>{
    Product.fetchAll((products) => {
        res.render('shop/product-list',
        {prods:products, 
        pageTitle:'All Products',
        path: '/products' 
    });
    }); 
} ; 

exports.getProduct=(req, res, next)=>{
    const prodID=req.params.productID;
    Product.findByID(prodID, product=>{
        res.render('shop/product-detail',{
            product:product,
            pageTitle:product.title,
            path:'/products'
        })
    });
};

exports.getIndex = (req,res,next) => {
    Product.fetchAll((products) => {
        res.render('shop/index',
        {prods:products, 
        pageTitle:'Shop',
        path: '/' 
    });
    }); 
};

exports.getCart = (req,res,next) => {
    res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your cart'
    });
};

exports.postCart = (req,res,next) => {
    const prodID=req.body.productID;
    Product.findByID(prodID, (product) => {
       Cart.addProduct(prodID, product.price);
       //return res.redirect('/cart');
    });
    res.redirect('/cart');
};

exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'Your orders'
    });
};

exports.getCheckout = (req,res,next) => { 
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle: '/Checkout'
    });
};
    
    