import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getBlogs } from '../../../utility/Global/Blogs/BlogStore'
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
        style = { backgroundImage: `url("${img}")` }
    }

    let content = null;
    if (props.id === 'blog') {
        content = (
            <div className={classes.SingleCard}>
                <h3>{props.title}</h3>
                {state.loading
                    ? <div className={[classes.SpinnerContainer, classes.CardContainer].join(' ')}><Spinner class="SpinnerWhite" /> </div>
                    : <NavLink to={props.path + '?' + state.blog.publicLink}><div className={classes.CardContainer}>
                        <div style={{ backgroundImage: `url(${state.blog.imageLink}` }} className={classes.CardImage}></div>
                        <h5>NYESTE BLOG</h5>
                        <h3>{state.blog.title}</h3>
                    </div></NavLink>}
            </div>
        )
    } else {
        content = (
            <div className={classes.SingleCard}>
                <h3>{props.title}</h3>
                <div className={classes.CardContainer}>
                    <div style={style} className={classes.CardImage}></div>
                </div>
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