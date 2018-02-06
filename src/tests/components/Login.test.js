import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../components/Login';

let startLogin;

test('should render Login correctly', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Login with Google');

    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin', () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<Login startLogin={startLogin} />);
    wrapper.find('button').simulate('click');
    //history is our spy above and we check if it has been called with the correct data passed in.
    expect(startLogin).toHaveBeenCalled();
});