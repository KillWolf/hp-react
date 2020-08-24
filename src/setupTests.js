// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Router } from 'react-router-dom';

import App from './containers/App';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
//   const wrapper = shallow(<Router><App /></Router>);
//   console.log('lol', wrapper.debug());
//   console.log('lol', wrapper.html());
});