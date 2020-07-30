import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getBlogs } from '../../utility/Global/Blogs/BlogStore'
import Aux from '../../hoc/Aux';
import logo from '../../assets/images/Logo.png';
import Spinner from '../UI/Spinner/Spinner'
import classes from './Blogs.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import { ErrorMessage } from '../../utility/Global/Error/ServiceHandling/Error/ErrorHandling'

const Blogs = () => {

    const rootClasses = [globalClasses.Panel].join(' ');
    const [config, setConfig] = useState({ loading: true, blogs: [], error: false });

    useEffect(() => {
        getBlogs(setConfig)
    }, [])

    let content = <Spinner />;

    if (!config.loading && config.error) {
        content = ErrorMessage('Der opstod en fejl.', { message: 'Prøv igen', method: () => getBlogs(setConfig) });
    } else if (!config.loading) {
        content = (
            <Aux>
                {config.blogs.map(blog => {
                    return (
                        <NavLink key={blog.id} style={{ border: 'none' }} to={{ pathname: '/blog', search: blog.publicLink, state: { blog: blog } }}>
                            <div className={classes.Card}>
                                <div className={classes.CardLogo}>
                                    <img src={logo} width="100" alt="Logo" />
                                </div>
                                <h4>{blog.title}</h4>
                                <p>{blog.excerpt}</p>
                                <div className={classes.DescriptiveInfo}>
                                    <div><strong>{blog.author}</strong></div>
                                    <div><i>{blog.date.getDate() + "-" + (blog.date.getMonth() + 1) + "-" + blog.date.getFullYear()}</i></div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })
                }
            </Aux>)
    }

    return (
        <div>
            <h1 className={globalClasses.Header}>WHAT'S UP</h1>
            <div className={rootClasses}>
                <div className={classes.Cards}>
                    {content}
                </div>
            </div>
        </div>
    )
};

export default Blogs;