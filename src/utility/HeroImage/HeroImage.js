import React from 'react';
import classes from './HeroImage.module.css';

const heroimage = (props) => {
    const images = require.context('../../assets/images', true);
    let img = images(`./${props.imageName}.jpeg`);

    return (
        <div className={classes.HeroImage}>
            <div className={classes.HeroImageTextContainer}>
                <h1 className={classes.HeroImageText}>{props.headerString}</h1>
            </div>
            <div className={classes.HeroImageImage}>
                <img src={img} alt={props.imageName} />
            </div>
        </div>
    )


};

export default heroimage;