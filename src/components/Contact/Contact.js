import React from 'react';
import classes from './Contact.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import HeroImage from '../../utility/HeroImage/HeroImage';
import Aux from '../../hoc/Aux';

const Contact = () => {
    const rootClasses = [globalClasses.Panel, classes.Contact].join(' ');
    return (
        <Aux>
            <h1 className={globalClasses.Header}>CONTACT</h1>
            <div className={rootClasses}>
                CONTACT TEXT
            </div>
        </Aux>
    )
};

export default Contact