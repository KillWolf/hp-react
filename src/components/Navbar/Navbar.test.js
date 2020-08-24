import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import Navbar from './Navbar';

configure({adapter: new Adapter()});

describe('<Navbar />', () => {
    // it('should render without crashing', () => {
    //     shallow(<Navbar />);
    // });
    
    // it('should render one logo', () => {
    //     const wrapper = shallow(<Navbar />);
        
    //     console.log('lol', wrapper.html());
    //     //expect(wrapper.find(Link).length).equal(1);
    // });
})