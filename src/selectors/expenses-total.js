
const selectExpensesTotal = (expenses, filters) => {
    return expenses.map((expense) => {
        return expense.amount;
    }).reduce((sum, value) => {
        return sum + value;
    }, 0);
}

export default selectExpensesTotal;