import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from '../../axios-instances/axios-firebase'
import * as helpers from '../../utility/Helpers/Helpers'
import Contact from './Contact';
import { act } from '@testing-library/react';

configure({ adapter: new Adapter() });


describe('<Contact />', () => {

    beforeEach(() => {    
        jest.restoreAllMocks();
      });

    it('smoke test', () => {
        //setup
        const wrapper = shallow(<Contact />);

        //action
        const value = wrapper.find("h1").text();

        //assertion
        expect(value).toEqual("CONTACT");
    });

    it('should call showResponseMessage upon submission of form ', async () => {
        //setup
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());
        const wrapper = mount(<Contact />);
        jest.spyOn(helpers, 'showResponseMessage').mockImplementation(_ => { });

        //action
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });

        //assertions
        expect(axios.post).toHaveBeenCalledTimes(1);
        await Promise.resolve();
        expect(helpers.showResponseMessage).toHaveBeenCalledTimes(1);
    });

    //TODO

    // MAKE SURE THAT RESPONSE MESSAGES DISAPPEAR AGAIN

    it('should show response message if data has been posted successfully', async () => {
        //setup
        const wrapper = mount(<Contact />);
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());

        //action
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        await act(() => Promise.resolve());
        wrapper.update();

        //assertion
        const responseText = wrapper.find('#responseMessage').text();
        expect(responseText).toEqual('Din besked er sendt.');
    });

    it('should show response message if data failed to be posted', async () => {

        //setup
        const wrapper = mount(<Contact />);
        jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject());

        //action
        wrapper.find('form').simulate('submit', {
            preventDefault: () => { }
        });
        await act(() => Promise.resolve());
        wrapper.update();

        //assertion
        const responseText = wrapper.find('#responseMessage').text();
        expect(responseText).toEqual('Der opstod en fejl ved sendning. Prøv igen senere.');
    });

})