import React from 'react';
import classes from './ErrorHandling.module.css';

export const ErrorMessage = (message, buttonObject) => {
    return (
        <div className={classes.Error}>
            <div>{message}</div>
            {buttonObject ? <button onClick={buttonObject.method}>{buttonObject.message}</button> : null}
        </div>)

}