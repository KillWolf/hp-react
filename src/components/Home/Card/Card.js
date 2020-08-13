import React, { useState, useEffect } from 'react';
import { getBlogs } from '../../../utility/Global/Blogs/BlogStore'
import BlogCard from '../../Blog/BlogCard/BlogCard'
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux';
import classes from './Card.module.css';

const Card = (props) => {
    let style = {};
    let img = null;
    const images = require.context('../../../assets/thumbnails', true);

    const [state, setState] = useState({ loading: true, error: false, blog: {} })

    useEffect(() => {
        getBlogs()
            .then(result => {
                console.log(result[0])
                setTimeout(() => {
                    setState({ loading: false, error: false, blog: result[0] })
                }, 3000)
            })
            .catch(error => console.log(error));
    }, [])

    if (props.imageName) {
        img = images(`./${props.imageName}-thumb.jpeg`);
        style = { width: '300px', height: '210px', background: `url("${img}")` }
    }

    let content = null;

    if (props.id === 'blog') {
        content = state.loading 
        ? <div className={classes.SpinnerContainer}><Spinner class="SpinnerWhite" /> </div>
        : <BlogCard blog={state.blog} />
    } else {
        content = (
            <div className={classes.SingleCard}>
                <h3>{props.title}</h3>
                <div style={style}></div>
                <div>lol</div>
            </div>
        )
    }

    return (
        <Aux>
            {content}
        </Aux>
    )
};

export default Card;