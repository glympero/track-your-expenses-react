import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

console.log('redux-101');

//Action generators

// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

//Destructuring
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET',
  count: 0
});

//Reducers

const countReducer = (state = { count: 0 }, action) => {
  console.log('running');
  
  switch(action.type) {
    case 'INCREMENT' :
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT' :
      return {
        count: state.count - action.decrementBy
      };
    case 'RESET' :
      return {
        count: 0
      };
    case 'SET' :
      return {
        count: action.count
      };
    default :
      return state;
  }
};



const store = createStore(countReducer);

//console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 100 }));


store.dispatch(decrementCount());

store.dispatch(decrementCount( { decrementBy: 50 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());


const template = (
  <div>
      <h1>Hello</h1>
  </div>
);

ReactDOM.render(template, document.getElementById('app'));