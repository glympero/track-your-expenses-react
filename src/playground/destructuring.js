console.log('destructuring...');

//Object destructuring

const person = {
    name: 'George',
    age: 40,
    location: {
        city: 'Athens',
        temp: 8
    }
};

// const name = person.name;
// const age = person.age

//This line creates two variables and assignes values
//based on the (name = person.name)
const {name, age} = person;

const {temp: temperature, city } = person.location;

console.log(`${name} is ${age} year(s) old.`);

console.log(`It's ${temperature} in ${city}.`)

const book = {
    title: 'Origin',
    author: 'Dan Brown',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

//Array destructuring

const address = [
    'Zarra 23',
    'Arta',
    'Epirus',
    '47100'
];

const [streetName, cityName, stateName, zipCode] = address;

console.log(`You are in ${streetName}, state ${stateName}`);

const item = [
    'Coffee (hot)',
    '$2.00',
    '$2.50',
    '$3.00'
];

const [itemForSale, , mediumCoffee = '$4.00'] = item;

console.log(`A medium ${itemForSale} costs ${mediumCoffee}`);