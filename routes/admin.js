const path = require('path');
const express = require('express');
const adminConrtrolle = require('../controller/admin');
const router = express.Router();




router.get('/add-product', adminConrtrolle.getAddProduct);

router.get('/products', adminConrtrolle.getProducts);
   
router.post('/add-product', adminConrtrolle.postAddProduct);

router.get('/edit-product/:productId', adminConrtrolle.getEditProduct);

router.post('/edit-product', adminConrtrolle.postEditProduct);

router.post('/delete-product', adminConrtrolle.postDeleteProduct);

module.exports=router;
