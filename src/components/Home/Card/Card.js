import React from 'react';
import classes from './Card.module.css';

const card = (props) => {
    const images = require.context('../../../assets/thumbnails', true);
    let img = images(`./${props.imageName}-thumb.jpeg`);
    const style = {width: '300px', height: '210px', background: `url("${img}")`}

    return (
        <div className={classes.SingleCard}>
            <h3>{props.title}</h3>
            <div style={style}></div>
            {/* <img src={img} width="300" alt="" /> */}
            <div>lol</div>
        </div>
    )
};

export default card;