import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref('users').set({
//     name: 'George Lymperopoulos',
//     age: 40,
//     stressLevel: 6,
//     job: {
//         title: 'Developer',
//         company: 'Google'
//     },
//     isSingle: false,
//     location: {
//         city: 'Athens',
//         country: 'Greece'
//     },
//     attributes: {
//         height: 179,
//         weight: 75
//     }
// }).then(() => {
//     console.log('Saved');
// }).catch((error) => {
//     console.log(error);
// });

// database.ref('users/age').set(37).then(()=>{
//     console.log('Updated')
// }).catch((e) => {
//     console.log(e);
// });

// database.ref('users/attributes/weight').set(74).then(() => {
//     console.log('Updated2')
// }).catch((e) => {
//     console.log(e);
// });

// database.ref('users/isSingle')
//     .remove()
//     .then(() => {
//     console.log('removed')
//     })
//     .catch((error) => {
//     console.log(error);
//     });

//database.ref('users/isSingle').set(null);

// database.ref('users').update({
//     age: 10,
//     name: 'Maria',
//     isSingle: null,
//     'location/city': 'Arta', //this for nested values
//     'job/company': 'Amazon',
//     stressLevel: 9
// }).then(() => {
//     console.log('data updated')
// }).catch((e) => {
//     console.log(e);
// });

//Get Data from database ONCE

// database.ref('users').once('value')
//     .then((snapshot) => {
//         const val = snapshot.val(); //what is returned from firebase
//         console.log(snapshot.val());
//     })
//     .catch((e) => {
//         console.log(e);
//     });

//get Data from database - get notified on database changes - SUBSCRIBE
// database.ref('users').on('value', (snapshot) => {
//     console.log(snapshot.val());
// });

// setTimeout(() => {
//     database.ref('users').update({
//         'job/company': 'amtdocs'
//     });
// }, 3000);

// //UNSUSBRIBE FROM getting notified from database changes (ie page change)
// setTimeout(() => {
//     database.ref('users').off();
// }, 5000);

// //not not getting notified
// setTimeout(() => {
//     database.ref('users').update({
//         'job/company': 'not existing'
//     });
// }, 7000);

//Removing a single subscription

 

// const onValueChange = database.ref('users/job').on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (error) => {
//     console.log(error);
// });

// database.ref('users/job').off(onValueChange);

// const onValueChange = database.ref('users').on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company} and lives in ${val.location.city}`)
// }, (error) => {
//     console.log(error);
// });

// setTimeout(() => {
//     database.ref('users').off('value', onValueChange);
// }, 2000);


//firebase does not support arrays!

// const notes = [{
//     id: '12',
//     title: 'First Note',
//     body: 'This is my note'
// },{
//     id: '13',
//     title: 'Second Note',
//     body: 'This is my note'
// }];

// const firebaseNotes = {
//     uniqueID1: {
//         title: 'First Note',
//         body: 'This is my note'
//     },
//     uniqueID2: {
//         title: 'Second Note',
//         body: 'This is my note'
//     }
// };

//database.ref('notes').set(notes);

//when using ref('loc').push() -> firebase creates a new property on our reference

// database.ref('notes').push({
//     title: 'Second Note',
//     body: 'This is my body'
// });

// database.ref('notes/-L3JT0dxYqZeKf-V3f90').once('value').then((snapshot) => {
//     console.log(snapshot.val());
// });

//database.ref('notes/-L3JT0dxYqZeKf-V3f90').remove();

// const note = {
//     description: 'Books',
//     note: 'Return books',
//     amount: 160,
//     createdAt: 23
// }

//database.ref('expenses').push(note);

// const firebaseExpenses = database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];
//         //const val = snapshot.val();
//         snapshot.forEach((child) => {
//             expenses.push({
//                 id: child.key,
//                 ...child.val()
//             });
//         });
//         console.log(expenses);
// });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((child) => {
//         expenses.push({
//             id: child.key,
//             ...child.val()
//         });
//     });
//     console.log(expenses);
// }, (error) => {
//     console.log(error);
// });

//What is being removed from database
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // when something changes/updated in database
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// setTimeout(() => {
//     database.ref('expenses/-L3JUEkiXIqYdTodtm16').update({
//         amount: 10000
//     });
// }, 3000);

// //when something is added to database

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });