import uuid from 'uuid';
import database from '../firebase/firebase';
// ADD_EXPENSE
const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// This returns function and works because we use redux thunk
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount= 0, 
            createdAt = 0 
        } = expenseData; //setup defaults for expense

        const expense = {
            description,
            note,
            amount,
            createdAt 
        };
        //return is used for testing (promise chaining)
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};

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

export { addExpense, removeExpense, editExpense };