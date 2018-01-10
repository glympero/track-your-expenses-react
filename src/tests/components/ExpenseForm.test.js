import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('Please provide description and amount');
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {  //at->the number of input found
        target: { value: 'New description'}
    });

    expect(wrapper.state('description')).toBe('New description');
});

test('should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value: 'New Note provided'}
    });
    expect(wrapper.state('note')).toBe('New Note provided');
});

test('should change date', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(moment()) //Enzyme function to access prop or props
    expect(wrapper.state('createdAt')).toEqual(moment());
});

test('should set calendar focus', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
    expect(wrapper.state('calendarFocused')).toBe(true);
});

test('should set a valid amount', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: '100.11'}
    });
    expect(wrapper.state('amount')).toBe('100.11');
});

test('should not set a invalid amount', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value: '12.121'}
    });
    expect(wrapper.state('amount')).toBe('');
});

//TEST SPIES
test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    // onSubmitSpy();
    // expect(onSubmitSpy).toHaveBeenCalled();
    // onSubmitSpy('George');
    // expect(onSubmitSpy).toHaveBeenCalledWith('George');

    //Set the onSubmit from form to our spy
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    //Simulate form submission
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
        amount: expenses[0].amount
    });
});