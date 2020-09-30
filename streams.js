const fs = require('fs')

// For reading a Stream
const readStream = fs.createReadStream('./blog/large.txt')
// For writing a Stream
const writeStream = fs.createWriteStream('./blog/largeWrite.txt')

readStream.on('data', (chunk) => {
    console.log('----- NEW CHUNK -----');
    console.log(chunk);

    // Put it on largeWrite.txt file
    writeStream.write('\n----- NEW DATA CHUNK -----\n');
    writeStream.write(chunk);
});