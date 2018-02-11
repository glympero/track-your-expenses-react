import React from 'react';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { connect } from 'react-redux';

export class AddExpensePage extends React.Component {

  onSubmit = (expense) => {
    //this will be called from ExpenseForm and will provide an expense object
    //props.dispatch(addExpense(expense));
    this.props.startAddExpense(expense)
    this.props.history.push('/');
  }

  render(){
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Add Expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

  //maps dispatch actions to props
  //it has access to dispatch
  //we return an object where we define various props
const mapDispatchToProps = (dispatch) => {
  return {
    startAddExpense: (expense) => {
      dispatch(startAddExpense(expense));
    }
  }
}

export default connect(null, mapDispatchToProps)(AddExpensePage);