import { 
    setTextFilter, 
    sortByDate, 
    sortByAmount, 
    setStartDate, 
    setEndDate } 
from '../../actions/filters';

import moment from 'moment';

test('should setup setting empty text filters', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('should setup setting text filters', () => {
    const action = setTextFilter('Rent');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Rent'
    });
});

test('should setup setting Date ordering', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('should setup setting Amount ordering', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should setup setting startdate to undefined', () => {
    const action = setStartDate();
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: undefined
    });
});

test('should setup setting startdate', () => {
    
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should setup setting enddate to undefined', () => {
    const action = setEndDate();
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: undefined
    });
});

test('should setup setting enddate to undefined', () => {
    const action = setEndDate(moment(1));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(1)
    });
});
