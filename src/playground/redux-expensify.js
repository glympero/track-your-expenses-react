console.log('redux-expensify');
import uuid from 'uuid';
// ADD_EXPENSE

const addExpense = (
    { 
        description = '', 
        note = '', 
        amount= 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
// SORT_BY_DATE

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE

//Not setting default to undefined as the default value for a parameter not set is undefined!
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
// SET_END_DATE

const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

// Break application to multiple reducers

import { createStore, combineReducers } from 'redux';

//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense ];
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense;
            })
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

// Get visible expenses (use filters)

const getVisibleExpenses = (expenses, filters) => {
    const {text, sortBy, startDate, endDate} = filters;
    return expenses.filter(expense => {
        //if startDate is undefined then first evaluation is true so filter not taken into account
        //If not undefined, then we check if expense is created at later or equal point of start date filter
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        //If not undefined, then we check if expense was created at earlier or equal point of end date filter
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        const textMatched = !!text && expense.description.toLowerCase().indexOf(text.toLowerCase()) !== -1; 
        
        return textMatched && startDateMatch && endDateMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if (sortBy === 'amount') {
            return b.amount - a.amount;
        }
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    //console.log(state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    //console.log(state);
    console.log(visibleExpenses);
});

//console.log(store.getState());

const firstExpense = store.dispatch(addExpense({
    description: 'February Rent',
    note: 'This is my note',
    amount: 10000,
    createdAt: 500
}));

const secondExpense = store.dispatch(addExpense({
    description: 'Coffee Rent',
    amount: 100,
    createdAt: 1100
}));

//"efbf6aa0-f2ab-40c8-ae64-dc08fd17354d"

// store.dispatch(removeExpense({
//     //id: store.getState().expenses[0].id
//     id: firstExpense.expense.id
// }));

store.dispatch(editExpense(secondExpense.expense.id, {
    note: 'We have to learn it fastttt'
}));

store.dispatch(setTextFilter('rent'));
store.dispatch(sortByDate());
store.dispatch(sortByAmount());


// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(100));
// store.dispatch(setEndDate(600));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());
//DEMO

const demoState = {
    expenses: [{
        id: '212121212',
        description: 'January Rent',
        note: 'This was the last rent paid',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',  //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Jen',
//     age: 24
// };

// console.log({
//     ...user,
//     location: 'Nea Ionia',
//     name: "George"
// });