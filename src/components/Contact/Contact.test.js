import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Contact from './Contact';
import Aux from '../../hoc/Aux';

configure({adapter: new Adapter()});

describe('<Contact />', () => {
    it('should contain Aux wrapper', () => {
        const wrapper = shallow(<Contact />);
        expect(wrapper.find(Aux)).toHaveLength(1);
    });

    it('should contain contain title string "CONTACT"', () => {
        const wrapper = shallow(<Contact />);
        const value = wrapper.find("h1").text();

        expect(value).toEqual("CONTACT");
    });

    
    // it('should render one logo', () => {
    //     const wrapper = shallow(<Navbar />);
        
    //     console.log('lol', wrapper.html());
    //     //expect(wrapper.find(Link).length).equal(1);
    // });
})