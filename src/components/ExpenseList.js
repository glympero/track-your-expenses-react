import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';

import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => {
    return (
        <div>
        <h3>Expenses List</h3>
            {
                props.expenses.length === 0 ? (
                    <p>No expenses Found</p>
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
            {}
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
