import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

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

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(
            jsx,
            document.getElementById('app')
        );
        hasRendered = true;
    }
}

ReactDOM.render(
    <LoadingPage />,
    document.getElementById('app')
);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //console.log('email', user.email)
        store.dispatch(login(user.uid, user.email));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
              }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});


