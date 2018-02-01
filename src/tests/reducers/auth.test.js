import authReducer from '../../reducers/auth';
//import expenses from '../fixtures/expenses';


test('should setup default auth state ', () => {
    const state = authReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});

test('should login', () => {
    const uid = '1234';
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer({}, action);
    expect(state).toEqual({uid});
    expect(state.uid).toEqual(action.uid);
});

test('should logout', () => {
    const action = {
        type: 'LOGOUT'
    }

    const state = authReducer({uid: '1234'}, action);
    expect(state).toEqual({});
});