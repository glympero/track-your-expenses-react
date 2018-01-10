import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByAmount } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

//calling the returned function from configureStore file.
//We can use functions like store.dispatch, store.subscribe
const store = configureStore();

// store.dispatch(addExpense({
//     description: 'Water Bill',
//     amount: 100,
//     createdAt: 10
// }));

// store.dispatch(addExpense({
//     description: 'Gas Bill',
//     amount: 200,
//     createdAt: 200
// }));

// store.dispatch(addExpense({
//     description: 'Rent',
//     amount: 1000,
//     createdAt: -100
// }));

// store.dispatch(setTextFilter('bill'));
// store.dispatch(sortByAmount());

const state = store.getState();
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//console.log(visibleExpenses);

// setTimeout(() => {
//     store.dispatch(addExpense({
//         description: 'Internet Bill',
//         amount: 500,
//         createdAt: 5
//     }));
// }, 3000);


ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('app')
);


