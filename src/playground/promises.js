const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'George',
            'age': 40
        });
        //reject('Wrong');
    }, 2500);
});

promise.then((data) => {
    console.log(data);
    return 'From first promise'
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log('error', error);
});