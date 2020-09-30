const fs = require('fs');

/*
// Reading files
fs.readFile('./blog/blog.txt', (error, data) => {
    // This function is executed when file is finally read (that's asynchronous)
    if(error){
        console.log(error);
    }
    console.log(data.toString());
});
console.log('Last line');
*/


/*
// Writing files
// If file doesn't exist, it'll create a new one
fs.writeFile('./blog/blog.txt', 'This will be the new text', () => {
    console.log('File data updated');
});
*/


/*
// Directories
// Check if dir already exists (Synchronous code, it'll block it for a moment to check if dir exists and then proceed)
if(!fs.existsSync('./assets')){     // If dir doesn't exist, enter and create it
    fs.mkdir('./assets', (error) => {
        if(error){
            console.log(error);
        }
        console.log('Directory created');
    });
}else{      // If exists, delete it haha
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('Folder deleted')
    })
}
*/


// Deleting files
/**
 * for dirs: fs.rmdir(err)
 * for files: fs.unlink(err)
 * 
 */