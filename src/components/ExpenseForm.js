import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import ExpenseDashboardPage from './ExpenseDashboardPage';

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note
        }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        /*eslint no-control-regex: "error"*/
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { //If there is no amount or amount is matched
            this.setState(() => ({
                amount
            }));
        }        
    }

    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({
                createdAt
            }));
        }
    }

    onFocusChange = ( { focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({
                error: 'Please provide description and amount'
            }));
        }else {
            this.setState(() => ({
                error: ''
            }));
            const description = this.state.description;
            const note = this.state.note;
            const amount = parseFloat(this.state.amount, 10) * 100;
            const createdAt = this.state.createdAt.valueOf();
            this.props.onSubmit({ //this is the function passed from addExpense component
                description,
                note,
                amount,
                createdAt
            });
        }
    }

    render() {
        return (
            <form className='form' onSubmit={this.onSubmit}>
                { !!this.state.error && <p className='form__error'>{this.state.error}</p>}
                <input className='text-input' type='text' value={this.state.description} onChange={this.onDescriptionChange} placeholder='Description' autoFocus/>
                <input className='text-input' type='text' value={this.state.amount} onChange={this.onAmountChange} placeholder='amount' />
                <textarea className='text-area'value={this.state.note} onChange={this.onNoteChange} placeholder='Add a note for your expense (optional)'>
                </textarea>
                <SingleDatePicker
                    date={this.state.createdAt} 
                    onDateChange={this.onDateChange} 
                    focused={this.state.calendarFocused} 
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1} //Show only one month
                    isOutsideRange={(day) => false} //Select days before current day
                />
                <div>
                    <button className='button'
                        //disabled={!this.state.description || !this.state.amount}
                    >Submit</button>
                </div>
            </form>
        );
    }
}

export default ExpenseForm;