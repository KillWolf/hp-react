import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/Logo.png';
import classes from './BlogCard.module.css';

const BlogCard = (props) => {
    return (
        <NavLink key={props.blog.id} style={{ border: 'none' }} to={{ pathname: '/blog', search: props.blog.publicLink, state: { blog: props.blog } }}>
            <div className={classes.Card}>
                <div className={classes.CardTop}>
                    {props.blog.imageLink
                        ? <div style={{ backgroundImage: `url(${props.blog.imageLink}` }} className={classes.CardImage}></div>
                        : <div className={classes.CardLogo}><img src={logo} width="100" alt="Logo" /></div>}
                </div>
                <div className={classes.CardBottom}>
                    <h3>{props.blog.title}</h3>
                    <div className={classes.Author}>{props.blog.author}</div>
                    <div><i>{props.blog.date.getDate() + "-" + (props.blog.date.getMonth() + 1) + "-" + props.blog.date.getFullYear()}</i></div>
                </div>
            </div>
        </NavLink>
    )
};

export default BlogCard;