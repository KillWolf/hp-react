import React from 'react';
import Card from './Card/Card';
import HeroImage from '../../utility/HeroImage/HeroImage';
import Aux from '../../hoc/Aux';
import classes from './Home.module.css';

const home = (props) => {
    const contentArray = [
        { title: '[ Advocacy ]', imageName: 'Advocacy' },
        { title: '[ Blog ]', imageName: 'Canyon' },
        { title: '[ Credentials ]', imageName: 'Mountain' }
    ];
    const cards = contentArray.map(content => <Card title={content.title} key={content.imageName} imageName={content.imageName} />)

    return (
        <Aux>
            <HeroImage headerString='HANNE PILEGAARD' imageName='Mountain' />
            <div className={classes.Body}>
                <div className={classes.TaglineContainer}>
                    <div className={classes.TagLine}>
                        <h2 className={classes.TaglineTitle}>ON A MISSION TO MAKE THE WORLD BETTER</h2>
                        <hr />
                    </div>
                </div>
                <div className={classes.CardsContainer}>
                    {cards}
                </div>
            </div>
        </Aux>
    )
};

export default home;