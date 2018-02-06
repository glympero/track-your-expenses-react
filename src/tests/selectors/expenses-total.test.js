import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 from empty array', () => {
    const noExpenses = [];
    const result = selectExpensesTotal(noExpenses);
    expect(result).toBe(0)
});

test('should return multiple expenses', () => {
    
    const result = selectExpensesTotal(expenses);
    expect(result).toBe(24600)
});

test('should return single expense', () => {
    
    const result = selectExpensesTotal([expenses[0]]);
    expect(result).toBe(100)
});

