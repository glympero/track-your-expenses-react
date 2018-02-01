// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import React from 'react';

import { Header } from '../../components/Header';

// test('should render header correctly', () => {
//     const renderer = new ReactShallowRenderer();

//     renderer.render(<Header />);
//     expect(renderer.getRenderOutput()).toMatchSnapshot();
// });


test('should render header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />);

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Expensify');

    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').prop('onClick')();
    //history is our spy above and we check if it has been called with the correct data passed in.
    expect(startLogout).toHaveBeenCalled();
});

//should call startLogout on button click