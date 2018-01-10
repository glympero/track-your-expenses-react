import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


let editExpense, removeExpense, wrapper, history, match
beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    match = { params: 1 }

    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpense} 
            removeExpense={removeExpense} 
            history={history} 
            match={match}
            expense={expenses[0]}
        />
    )
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should test editExpense correctly', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);
});

test('should test remove expense correctly', () => {
    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id})
});