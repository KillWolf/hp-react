import React, { useEffect, useState } from 'react';
import classes from './Recommendations.module.css';
import Aux from '../../hoc/Aux';
import HeroImage from '../../utility/HeroImage/HeroImage'
import axios from '../../axios-instances/axios-firebase'

const Credentials = (props) => {

    //TODO
    // 1. MAKE EMPTY RECOMMENDATIONS
    // 2. ERROR HANDLING
    // 3. EDIT BUTTON

    const [recommendations, setRecommendations] = useState([])
    useEffect(() => {
        axios.get('/recommendations.json')
            .then(response => {
                const entries = Object.entries(response.data);
                const recommendationArray = entries.map(entry => {
                    return {id: entry[0], ...entry[1]}
                })
                setRecommendations(recommendationArray)
            })
            .catch(error => {

            })
    })

    return (
        <div>
            <HeroImage headerString="RECOMMENDATIONS" imageName="Mountain" />
            <div className={classes.Recommendations}>
                {recommendations.map(recommendation => (
                    <Aux key={recommendation.id}>
                        <h2>{recommendation.title}</h2>
                        <div className={classes.Blockquote}>{recommendation.content}</div>
                        <cite>{recommendation.author}</cite>
                    </Aux>
                ))}
            </div>
        </div>
    )
};

export default Credentials;