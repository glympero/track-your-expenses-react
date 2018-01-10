console.log('hoc');
// High Order Components (HOC) - A component (HOC) that render another component (Regular Component)
//Reuse Code
//Render hijacking
//Prop manipulation
//Abstract state

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p>The info is: {props.info}</p>
        </div>
    );
}

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, plese do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <h3>Please Login first </h3>}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);



Info.propTypes = {
    info: PropTypes.string
}

// class App extends React.Component {
//     constructor(props){
//         super(props);
//     }
    
//     render() {
//         return (
//             <div>Hello</div>
//         );
//     }
// }

//ReactDOM.render(<AdminInfo isAdmin={true} info='Flying next week' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='Flying next week' />, document.getElementById('app'));