import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getBlogs } from '../../../utility/Global/Blogs/BlogStore';
import { ErrorMessage } from '../../../utility/Global/Error/ServiceHandling/Error/ErrorHandling';
import Spinner from '../../UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux';
import classes from './Card.module.css';

const Card = (props) => {
    let style = {};
    let img = null;
    const images = require.context('../../../assets/thumbnails', true);
    const hoverClasses = [classes.SingleCard];

    const [state, setState] = useState({ loading: true, error: false, blogs: {} })
    const getBlog = () => {
        getBlogs(setState, true)
    }

    useEffect(() => {
        getBlog(setState, true);
    }, [])


    if (props.imageName) {
        img = images(`./${props.imageName}-thumb.jpeg`);
        style = { backgroundImage: `url("${img}")` }
    }

    let content = null;
    if (!state.loading) {
        hoverClasses.push(classes.SingleCardHover)
    }

    if (state.error && props.id === 'blog') {
        content = ErrorMessage('Der opstod en fejl med at hente blogs.', { message: 'Prøv igen', method: () => getBlogs(setState, true) });
    }
    else if (props.id === 'blog') {
        content = (
            <div className={hoverClasses.join(' ')}>
                <h3>{props.title}</h3>
                {state.loading
                    ? <div className={[classes.SpinnerContainer, classes.CardContainer].join(' ')}><Spinner class="SpinnerWhite" /> </div>
                    : <NavLink to={props.path + '?' + state.blogs.publicLink}><div className={classes.CardContainer}>
                        <div style={{ backgroundImage: `url(${state.blogs.imageLink}` }} className={classes.CardImage}></div>
                        <h5>NYESTE BLOG</h5>
                        <h3>{state.blogs.title}</h3>
                    </div></NavLink>}
            </div>
        )
    } else {
        content = (
            <div className={[classes.SingleCard, classes.SingleCardHover].join(' ')}>
                <h3>{props.title}</h3>
                <NavLink to={props.path}>
                    <div className={classes.CardContainer}>
                        <div style={style} className={classes.CardImage}></div>
                        <h5 style={{ opacity: '0' }}>{props.title}</h5>
                        <h3>Noget generisk information om emnet</h3>
                    </div>
                </NavLink>
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