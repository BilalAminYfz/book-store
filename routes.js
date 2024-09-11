const fs=require('fs');

const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/'){
    res.write('<html>');
    res.write('<head><title> Enter Message </title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
    res.write('</html>');
    return res.end();
    //This line writes the <body> section of the HTML document. It includes an HTML form. The form has an action attribute set to "/message", indicating that when the form is submitted, the data will be sent to the "/message" route on the server.
    // The method attribute is set to "POST", indicating that the form data will be sent using the HTTP POST method. Inside the form, there is an <input> element of type "text" with the name "message", allowing the user to input a message.
    // There is also a <button> element of type "submit" which, when clicked, will submit the form.

}
if(url==='/message' && method==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
    });
    req.on('end',()=>{
        const parsebody=Buffer.concat(body).toString();
        const message=parsebody.split('=')[1];
        fs.writeFile('message.text',message, err=>{
            res.statusCode=302;
            res.setHeader('Location', '/');
            return res.end(); 

        });
   
    //This line checks if the requested URL is /message and if the HTTP method used is POST.
    // This condition ensures that the server is handling a POST request to the /message endpoint.
  //      fs.writeFileSync('message.text','Dummmy');
    //This line writes a dummy message to a file named message.text synchronously using the writeFileSync method from the fs module.
    // This means that the server will block and wait until the file write operation is complete before continuing.
   
    //After writing to the file, the server sets the status code to 302 (found/redirect) and sets the Location header to '/'.
    // This redirects the client back to the root URL (/) after processing the form submission.
    });
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title> My First Page </title><head>');
res.write('<body>Hello From node.js Server!</body>');
res.write('</html>');
res.end();
//process.exit();
}

module.exports = requestHandler;

