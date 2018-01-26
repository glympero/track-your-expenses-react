import moment from 'moment';

export default [
    {
        id: '1',
        description: 'Gum',
        amount: 100,
        createdAt: 0,
        note: ''
    },
    {
        id: '2',
        description: 'February Rent',
        amount: 20000,
        createdAt: moment(0).subtract(2, 'days').valueOf(),
        note: 'This is a new note'
    },
    {
        id: '3',
        description: 'Credit Card',
        amount: 4500,
        createdAt: moment(0).add(2, 'days').valueOf(),
        note: ''
    }
];