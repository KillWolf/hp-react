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
    const cardClasses = [classes.Card];

    const [config, setConfig] = useState({ loading: true, blogs: [], error: false });

    useEffect(() => {
        setConfig({ loading: true, blogs: [], error: false });
        getBlogs(setConfig)
            .then(response => setConfig(prevState => ({ ...prevState, loading: false, blogs: response })))
            .catch(() => setConfig(prevState => ({ ...prevState, loading: false, blogs: [], error: true })));
    }, []);

    let content = <Spinner />;

    if (!config.loading && config.error) {
        content = ErrorMessage('Der opstod en fejl.', { message: 'Prøv igen', method: () => getBlogs(setConfig) });
    } else if (!config.loading) {
        content = (
            <Aux>
                {config.blogs.map(blog => {
                    return (
                        <NavLink key={blog.id} style={{ border: 'none' }} to={{ pathname: '/blog', search: blog.publicLink, state: { blog: blog } }}>
                            <div className={cardClasses.join(' ')}>
                                <div className={classes.CardTop}>
                                    {blog.imageLink 
                                    ? <div style={{backgroundImage: `url(${blog.imageLink}`}} className={classes.CardImage}></div> 
                                    : <div className={classes.CardLogo}><img src={logo} width="100" alt="Logo" /></div>}
                                </div>
                                <div className={classes.CardBottom}>
                                    <h3>{blog.title}</h3>
                                    <div className={classes.Author}>{blog.author}</div>
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