import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import * as BlogStore from '../../utility/Global/Blogs/BlogStore'
import Adapter from 'enzyme-adapter-react-16';
import axios from '../../axios-instances/axios-firebase'
import * as helpers from '../../utility/Helpers/Helpers'
import { BrowserRouter} from 'react-router-dom';
import Blogs from './Blogs';
import { act } from '@testing-library/react';

configure({ adapter: new Adapter() });


describe('<Blogs />', () => {
    const bloglistMockData = { 
        data: { 
            '1': { 
                'title': 'test most recent',
                'author': 'test author',
                'content': 'test content',
                'exerpt': 'test excerpt',
                'publicLink': 'test publicLink',
                'imageLink': 'test image',
                'date': '2016-03-04T11:51:01.057Z' 
            },
            '2': { 
                'title': 'test title',
                'author': 'test author',
                'content': 'test content',
                'exerpt': 'test excerpt',
                'publicLink': 'test publicLink',
                'imageLink': 'test image',
                'date': '2016-02-04T11:51:01.057Z' 
            },
            '3': { 
                'title': 'test title',
                'author': 'test author',
                'content': 'test content',
                'exerpt': 'test excerpt',
                'publicLink': 'test publicLink',
                'imageLink': 'test image',
                'date': '2016-01-04T11:51:01.057Z' 
            },
            '4': { 
                'title': 'test title',
                'author': 'test author',
                'content': 'test content',
                'exerpt': 'test excerpt',
                'publicLink': 'test publicLink',
                'imageLink': 'test image',
                'date': '2016-01-03T11:51:01.057Z' 
            },
        } 
    }

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.useFakeTimers();
    });

    it('smoke test', () => {
        //action
        const wrapper = shallow(<Blogs />);
        const value = wrapper.find("h1").text();

        //assertion
        expect(value).toEqual("WHAT'S UP");
    });

    it('should call getBlogs upon mounting', () => {
        //setup
        jest.spyOn(BlogStore, 'getBlogs').mockImplementation(_ => { });

        //action
        mount(<Blogs />);

        //assertion
        expect(BlogStore.getBlogs).toHaveBeenCalled();
    });


    it('should populate blogs list with blogs', async () => {
        //setup
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(bloglistMockData));

        //action
        const wrapper = mount(
            <BrowserRouter>
                <Blogs />
            </BrowserRouter>);

        // await Promise.resolve;
        await act(() => Promise.resolve());
        wrapper.update();

        //assertion
        expect(wrapper.find('.Cards').children()).toHaveLength(4);
    });

    it('should have most recent blog as first child', async () => {
        //setup
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(bloglistMockData));

        //action
        const wrapper = mount(
            <BrowserRouter>
                <Blogs />
            </BrowserRouter>);

        // await Promise.resolve;
        await act(() => Promise.resolve());
        wrapper.update();

        //assertion
        expect(wrapper.find('.Cards').childAt(0).find('h3').text()).toEqual('test most recent');
    });


})