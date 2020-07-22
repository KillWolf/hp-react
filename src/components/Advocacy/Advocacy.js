import React from 'react';
import HeroImage from '../../utility/HeroImage/HeroImage';
import classes from './Advocacy.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import Aux from '../../hoc/Aux';

const Advocacy = () => {
    const rootClasses = [globalClasses.Panel, classes.Advocacy].join(' ');
    return (
        <Aux>
            <HeroImage headerString="ADVOCACY" imageName="Canyon" />
            <div className={rootClasses}>
                ADVOCACY TEXT
            </div>
        </Aux>
    )
};

export default Advocacy;