import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';

import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => {
    return (
        <div className='content-container'>
        <div className='list-header'>
            <div className='show-for-mobile'>Expenses</div>
            <div className='show-for-desktop'>Expense</div>
            <div className='show-for-desktop'>Amount</div>
        </div>
        <div className='list-body'>
            {
                props.expenses.length === 0 ? (
                    <div>
                        <span className='list-item list-item--message'>No expenses Found</span>
                    </div>
                    
                ) : (
                    
                    props.expenses.map((expense) => {
                        return (
                            // <ExpenseListItem 
                            //     key={expense.id} 
                            //     description={expense.description}
                            //     amount={expense.amount}
                            //     createdAt={expense.createdAt}
                            // />
                            <ExpenseListItem key={expense.id}  {...expense} />
                        );
                    })
                )
            }
        </div>
        </div>        
    );
};

// const ConnectedExpenseList = connect((state) => {
//     console.log(state.expenses)
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default ConnectedExpenseList;

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(ExpenseList);
