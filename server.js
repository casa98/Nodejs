const http = require('http');

const server = http.createServer((req, res) => {
    // Function executed everytime server receives a request
    console.log(req.url, req.method);
    // Set header
    res.setHeader('Content-Type', 'text/html');
    res.end('<p>Hello nenas</p>');
});

server.listen(8000, 'localhost', () => {
    console.log('Server running on port 8000');
});