import React from 'react';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';
import { connect } from 'react-redux';

export class AddExpensePage extends React.Component {

  onSubmit = (expense) => {
    //this will be called from ExpenseForm and will provide an expense object
    //props.dispatch(addExpense(expense));
    this.props.addExpense(expense)
    this.props.history.push('/');
  }

  render(){
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

  //maps dispatch actions to props
  //it has access to dispatch
  //we return an object where we define various props
const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (expense) => {
      dispatch(addExpense(expense));
    }
  }
}

export default connect(null, mapDispatchToProps)(AddExpensePage);