import React, { useState, useEffect } from 'react';
import { getBlogs } from '../../utility/Global/Blogs/BlogStore'
import Aux from '../../hoc/Aux';
import BlogCard from './BlogCard/BlogCard'
import Spinner from '../UI/Spinner/Spinner'
import classes from './Blogs.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import { ErrorMessage } from '../../utility/Global/Error/ServiceHandling/Error/ErrorHandling'

const Blogs = () => {

    const rootClasses = [globalClasses.Panel].join(' ');

    const [config, setConfig] = useState({ loading: true, blogs: [], error: false });

    useEffect(() => {
        getBlogs(setConfig);
    }, []);

    let content = <Spinner />;

    if (!config.loading && config.error) {
        content = ErrorMessage('Der opstod en fejl.', { message: 'Prøv igen', method: () => getBlogs(setConfig) });
    } else if (!config.loading) {
        console.log(config.loading, config.error, config.response)
        content = (
            <Aux>
                {config.blogs.map(blog => {
                    return (
                        <BlogCard blog={blog} />
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