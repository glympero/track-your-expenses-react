import moment from 'moment';

const getVisibleExpenses = (expenses, filters) => {
    const {text, sortBy, startDate, endDate} = filters;
    return expenses.filter(expense => {
        const createdAtMoment = moment(expense.createdAt);
        
        //if startDate is undefined then first evaluation is true so filter not taken into account
        //If not undefined, then we check if expense is created at later or equal point of start date filter
        //const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        //If not undefined, then we check if expense was created at earlier or equal point of end date filter
        //const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

        const textMatched = typeof text === 'string' && expense.description.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        
        return textMatched && startDateMatch && endDateMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if (sortBy === 'amount') {
            return b.amount - a.amount;
        }
    });
};

export default getVisibleExpenses;