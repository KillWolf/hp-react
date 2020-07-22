import React, { useEffect, useState } from 'react';
import axios from '../../../axios-instances/axios-firebase'
import { NavLink } from 'react-router-dom';
import classes from './Blog.module.css';
import globalClasses from '../../../utility/Global/Common.module.css';
import HeroImage from '../../../utility/HeroImage/HeroImage'
import Spinner from '../../UI/Spinner/Spinner';

const Blog = (props) => {
    //TODO
    // 1. MAKE EMPTY BLOG
    // 2. ERROR HANDLING
    // 3. EDIT BUTTON

    let blog = null;
    let content = null;
    const indexOfQuestionMark = window.location.href.indexOf('?') + 1;
    const rootClasses = [classes.Blog, globalClasses.Panel].join(' ');


    const [config, setConfig] = useState({ loading: true, blog: {} });
    useEffect(() => {
        if (props.location.state && props.location.state.blog) {
            setConfig({ loading: false, blog: props.location.state.blog })
        } else {
            axios.get('/blogs.json')
                .then(response => {
                    const entries = Object.entries(response.data);
                    blog = entries
                        .map(entry => {
                            return { id: entry[0], ...entry[1], date: new Date(entry[1].date) }
                        })
                        .find(blog => {
                            return window.location.href.substring(indexOfQuestionMark) === blog.publicLink;
                        })
                    blog = blog ? blog : {};
                    setConfig({ loading: false, blog: blog })
                })
                .catch(error => {

                })
        }
    }, [])


    if (config.blog.id) {
        content = (
            <div>
                <h2>{config.blog.title}</h2>
                <div className={classes.DescriptiveText}>
                    <div><strong>{config.blog.author}</strong></div>
                    <div><i>{config.blog.date.getDate() + "-" + (config.blog.date.getMonth() + 1) + "-" + config.blog.date.getFullYear()}</i></div>
                </div>
                <div className={classes.SeparatingLine}></div>
                <div dangerouslySetInnerHTML={{ __html: config.blog.content }}></div>
            </div>
        )
    } else if(config.loading) {
        content = <Spinner />;
    } else {
        content = <div>Bloggen er ikke fundet, gå tilbage til <NavLink to='/blogs'>oversigten.</NavLink></div>
    }

    return (
        <div>
            <HeroImage headerString="BLOG" imageName="Mountain" />
            <div className={rootClasses}>
                {content}
            </div>
        </div>
    )
};

export default Blog;
