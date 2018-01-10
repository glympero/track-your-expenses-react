import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = (props) => {
    return (
      <div>
      <h1>This is my dashboard component</h1>
      <ExpenseListFilters />
      <ExpenseList />
    </div>
    );
  };

export default ExpenseDashboardPage;