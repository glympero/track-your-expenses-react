import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup add expense action object', () => {
    const expense = {
        description: 'Test Expense',
        amount: 1000,
        createdAt: 1000,
        note: 'Nothing'
    };
    const action = addExpense(expense);
    const id = {
        id: action.expense.id
    }
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {...expense, ...id}
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    
    const defaults = { 
        description : '', 
        note : '', 
        amount: 0, 
        createdAt: 0
    }
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...defaults,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values and any for id', () => {
    const action = addExpense();
    
    const defaults = { 
        description : '', 
        note : '', 
        amount: 0, 
        createdAt: 0
    }
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...defaults,
            id: expect.any(String)
        }
    });
});

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

