import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup add expense action object', () => {
    // const expense = {
    //     description: 'Test Expense',
    //     amount: 1000,
    //     createdAt: 1000,
    //     note: 'Nothing'
    // };
    const action = addExpense(expenses[2]);
    // const id = {
    //     id: action.expense.id
    // }
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
    
//     const defaults = { 
//         description : '', 
//         note : '', 
//         amount: 0, 
//         createdAt: 0
//     }
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...defaults,
//             id: expect.any(String)
//         }
//     });
// });

// test('should setup add expense action object with default values and any for id', () => {
//     const action = addExpense();
    
//     const defaults = { 
//         description : '', 
//         note : '', 
//         amount: 0, 
//         createdAt: 0
//     }
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...defaults,
//             id: expect.any(String)
//         }
//     });
// });

test('should setup edit expense action object', () => {
    const id = '123abc';
    const updates = {
        description: 'New Test'
    };

    const action = editExpense(id, updates);
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'New Test'
        }
    })
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is cool',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });
        database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(defaultData);
            done();
        });
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
}); 

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});