import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should setup default expenses state ', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should add an expense', () => {
    const expense = {
        id: '100',
        description: 'Rent',
        amount: 1000,
        createdAt: 1000
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should remove an expense', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([
        expenses[1], expenses[2]
    ]);
});

test('should not remove an expense', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '4'
    }
    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('shound edit an existing expense', () => {
    const editedExpense = {
        description: 'March Credit',
        amount: 10000
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: editedExpense
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([
        expenses[0],
        {
            id: expenses[1].id,
            description: 'March Credit',
            amount: 10000,
            note: 'This is a new note',
            createdAt: moment(0).subtract(2, 'days').valueOf()
        },
        expenses[2]
    ]);
    expect(state[1].amount).toBe(editedExpense.amount);
    expect(state[1].description).toBe(editedExpense.description);
});

test('shound not edit an expense with wrong id', () => {
    const editedExpense = {
        description: 'March Credit',
        amount: 10000
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '5',
        updates: editedExpense
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses)
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});