const greet = (name) => {
    console.log(`Hello, ${name}`);
}

greet('Mario');


console.log(__dirname);
console.log(__filename);

/////////////////////////////////////////////////////////

const names = require('./modules'); 

// console.log(names);
console.log(names.people)
console.log(names.values)


/*
// Or I can also:
const {people, values} = require('./modules');

// console.log(names);
console.log(people)
console.log(values) 
*/