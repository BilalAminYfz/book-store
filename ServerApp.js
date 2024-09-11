const path=require('path');

//const http = require('http');
//Import the HTTP Module: This line imports Node.js's built-in http module, which allows you to create an HTTP server.
const express=require('express');
const bodyparser=require('body-parser');
const errorController=require('./controller/error');


//Import Express Module: This line imports the express module, a popular web framework for Node.js that simplifies the process of building web applications and APIs.

const app=express();

app.set('view engine','ejs');
app.set('views','view');
// app.set('view engine','pug');
//app.set('views',path.join(__dirname,'view'));

const adminrouter=require('./routes/admin');
const shoprouter=require('./routes/shop');
const { error } = require('console');
//Create Express Application: This line creates an instance of an Express application. The app object has methods for configuring the server, handling requests, and defining routes.

// Body parser 
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminrouter);
app.use(shoprouter);
//we add this to handle 404 errors
app.use(errorController.getError);




app.listen(3000,()=>{
    console.log('connected to server');
    
});
