import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

import { Link } from 'react-router-dom';

const ExpenseListItem = ({id, description, amount, createdAt}) => {
    return (
        <div>
            <h4><Link to={`/edit/${id}`}>{description}</Link></h4>
            <p>
                Cost: {numeral(amount/100).format('$0,0.00')}
                -
                Created At: {moment(createdAt).format('Do MMMM YYYY')}
            </p>
        </div>
    );
};

export default ExpenseListItem;