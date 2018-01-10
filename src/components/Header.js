import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => (
    <header>
      <h1>Expensify</h1>
      <div className="container">
        <NavLink to="/" className="item" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" className="item" activeClassName="is-active">Create Expense</NavLink>
        <NavLink to="/help" className="item" activeClassName="is-active">Help Page</NavLink>
      </div>
    </header>
  );

export default Header;