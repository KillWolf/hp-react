import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => {
    const usedClass = props.class ? classes[props.class] : classes.Spinner
    return (
        <div className={usedClass}>Loading...</div>
    )
};

export default spinner;