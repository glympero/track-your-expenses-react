import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    }

    onDatesChange = ({ startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({
            calendarFocused
        }));
    }

    render() {
        return (
            <div>
                <input type='text' value={this.props.filters.text} onChange={(event) => {
                    this.props.dispatch(setTextFilter(event.target.value));
                    //console.log(event.target.value);
                }} />
                <select value={this.props.filters.sortBy} onChange={(e) => {
                    const filter = e.target.value;
                    if(filter === 'date') {
                        this.props.dispatch(sortByDate());
                    }else if(filter === 'amount') {
                        this.props.dispatch(sortByAmount());
                    }
                }}>
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} 
                    endDate={this.props.filters.endDate} 
                    onDatesChange={this.onDatesChange} 
                    focusedInput={this.state.calendarFocused} 
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);

 