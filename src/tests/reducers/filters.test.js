import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    //@@INIT is the default action that is called from redux to initialize state
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should setup date to sort by date', () => {
    const defaultState = {
        text:'Rent',
        sortBy: 'Amount',
        startDate: moment(0).add(2, 'days'),
        endDate: undefined
    }
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(defaultState, action);
    expect(state).toEqual({
        text: 'Rent',
        sortBy: 'date',
        startDate: moment(0).add(2, 'days'),
        endDate: undefined
    })
});

test('should setup date to sort by amount', () => {
    
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'Rent'
    }
    const state = filtersReducer(undefined, action);
    expect(state).toEqual({
        text: 'Rent',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set start date filter', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment(0).add(2, 'days')
    }
    const state = filtersReducer(undefined, action);
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment(0).add(2, 'days'),
        endDate: moment().endOf('month')
    });
});

test('should set end date filter', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment(0).subtract(2, 'days')
    }
    const state = filtersReducer(undefined, action);
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment(0).subtract(2, 'days')
    });
});
