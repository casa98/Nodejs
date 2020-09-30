const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Function executed everytime server receives a request

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
    }
    
    // Send HTML file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end()
        }else{
            res.end(data);
        }
    });

});

server.listen(8000, 'localhost', () => {
    console.log('Server running on port 8000');
});