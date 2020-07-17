import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios-instances/axios-firebase'
import Aux from '../../hoc/Aux';
import logo from '../../assets/images/Logo.png';
import HeroImage from '../../utility/HeroImage/HeroImage'
import Spinner from '../UI/Spinner/Spinner'
import classes from './Blogs.module.css';

const Blogs = (props) => {

    //TODO
    //1. CAN I COMBINE BLOGS AND BLOG?
    const [config, setConfig] = useState({ loading: true, blogs: [] });
    useEffect(() => {
        axios.get('/blogs.json')
            .then(response => {
                const entries = Object.entries(response.data);
                const blogsArray = entries.map(entry => {
                    return { id: entry[0], ...entry[1], date: new Date(entry[1].date) }
                })
                setConfig({ loading: false, blogs: blogsArray })
            })
            .catch(error => {

            })
    }, [])

    let content = null;
    if (config.loading) {
        content = <Spinner />
    } else {
        content = (
            <Aux>
                {config.blogs.map(blog => (
                    <NavLink key={blog.id} style={{border: 'none'}} to={{pathname: '/blog', search: blog.publicLink, state: {blog: blog}}}>
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
                ))
                }
            </Aux>)
    }

    return (
        <div>
            <HeroImage headerString="BLOGS" imageName="Mountain" />
            <div className={classes.Blogs}>
                <div className={classes.Cards}>
                    {content}
                </div>
            </div>
        </div>
    )
};

export default Blogs;