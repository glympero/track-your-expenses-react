import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {

  onRemove = () => {
    //props.dispatch(removeExpense({ id }));
    this.props.startRemoveExpense( {id: this.props.expense.id} );
    this.props.history.push('/');
  }

  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
      <h1>This is my edit expense component</h1>
      <p>Editing item with the id of {this.props.match.params.id}</p>
      <ExpenseForm
        onSubmit={this.onSubmit}
        expense={this.props.expense}
      />
      <button onClick={this.onRemove}>Remove</button>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let expense = state.expenses.find( e => e.id === props.match.params.id);
  return {
    expense
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startRemoveExpense: (data) => {
      dispatch(startRemoveExpense(data));
    },
    editExpense: (id, expense) => {
      dispatch(editExpense(id, expense));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);