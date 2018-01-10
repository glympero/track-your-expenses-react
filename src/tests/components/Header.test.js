// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import React from 'react';

import Header from '../../components/Header';

// test('should render header correctly', () => {
//     const renderer = new ReactShallowRenderer();

//     renderer.render(<Header />);
//     expect(renderer.getRenderOutput()).toMatchSnapshot();
// });

test('should render header correctly', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Expensify');

    expect(wrapper).toMatchSnapshot();
});