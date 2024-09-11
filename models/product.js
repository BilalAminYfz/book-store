const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

// const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const p = path.join(__dirname,'../','data','products.json');
const getProductFromFile = cb => {
    fs.readFile(p, (err, filecontent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(filecontent));
        }
    });

}
module.exports = class Product {
    constructor(id, title, imageURL, description, price) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
    save() {
        getProductFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductFromFile(products => {
            //changes
            console.log("All Products:", products);
            const product = products.find(prod => prod.id.toString() === id.toString());
            //   // changes 
            if (!product) {
                console.log(`Product with ID: ${id} not found.`);
                return; // Exit if the product is not found
            }

            const updatedProducts = products.filter(prod => prod.id.toString() !== id.toString());
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                console.log(updatedProducts);
                
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });

    }



    static fetchAll(cb) {
        getProductFromFile(cb);
    }
    static findByID(id, cb) {
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}