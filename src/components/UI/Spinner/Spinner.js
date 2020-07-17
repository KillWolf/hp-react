import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={classes.Spinner} style={{backgroundColor: props.backgroundColor, }}>Loading...</div>
);

export default spinner;