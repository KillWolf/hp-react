import React, { useEffect, useState } from 'react';
import { getBlogs } from '../../../utility/Global/Blogs/BlogStore'
import { NavLink } from 'react-router-dom';
import classes from './Blog.module.css';
import globalClasses from '../../../utility/Global/Common.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const Blog = (props) => {
    //TODO
    // 1. MAKE EMPTY BLOG
    // 2. ERROR HANDLING
    // 3. EDIT BUTTON

    let blog = null;
    let content = null;
    const queryString = decodeURIComponent(window.location.href.substring(window.location.href.indexOf('?') + 1));
    let rootClasses = [globalClasses.Panel];

    const [config, setConfig] = useState({ loading: true, blog: {}, error: false });
    useEffect(() => {
        if (props.location.state && props.location.state.blog) {
            setConfig({ loading: false, blog: props.location.state.blog, error: false })
        } else {
            getBlogs()
                .then(response => {
                    blog = response
                        .find(blog => {
                            return queryString === blog.publicLink;
                        })
                    blog = blog ? blog : {};
                    setConfig({ loading: false, blog: blog, error: blog.id ? false : true });
                })
                .catch(error => setConfig({ loading: false, blog: {}, error: true }));

        }
    }, [])

    if (config.error) {
        rootClasses.push(classes.Error);
    }


    if (config.blog.id) {
        content = (
            <div>
                <div className={classes.DescriptiveText}>
                    <div>
                        <NavLink to="/blogs" className={[classes.NavigationLink, globalClasses.Link].join(' ')}> Tilbage til blogs</NavLink>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div><strong>{config.blog.author}</strong></div>
                        <div><i>{config.blog.date.getDate() + "-" + (config.blog.date.getMonth() + 1) + "-" + config.blog.date.getFullYear()}</i></div>
                    </div>
                </div>
                <div className={classes.SeparatingLine}></div>
                <div dangerouslySetInnerHTML={{ __html: config.blog.content }}></div>
            </div>
        )
    } else if (config.loading) {
        content = <Spinner />;
    } else {
        content = <div>Bloggen er ikke fundet, gå tilbage til <NavLink to='/blogs' className={globalClasses.Link}>oversigten.</NavLink></div>
    }

    return (
        <div>
            <h1 className={globalClasses.Header}>{config.blog.title}</h1>
            <div className={rootClasses.join(' ')}>
                {content}
            </div>
        </div>
    )
};

export default Blog;
