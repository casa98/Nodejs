const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Function executed everytime server receives a request
    
    // Send HTML file
    fs.readFile('./views/index.html', (err, data) => {
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